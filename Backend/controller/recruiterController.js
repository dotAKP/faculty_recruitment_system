import bcrypt from 'bcrypt';
import mailer from '../router/mailer.js';
import recruiterSchema from '../model/recruiterSchema.js';
import vacancySchema from "../model/vacancySchema.js"
import appliedVacancySchema from '../model/appliedVacancySchema.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import candidateSchema from '../model/candidateSchema.js';
dotenv.config();

let recruiter_secret_key = process.env.RECRUITER_SECRET_KEY;

export  const recruiterLoginController = async(req,res)=>{
    try{
        const recruiterObj = await recruiterSchema.findOne({email : req.body.email});
        const recruiterPassword = recruiterObj.password;
        const recruiterStatus = recruiterObj.status;
        const adminVerifyStatus = recruiterObj.adminVerify;
        const emailVerifyStatus = recruiterObj.emailVerify;

        const status = await bcrypt.compare( req.body.password,recruiterPassword);

         if( status && recruiterStatus==="true" && adminVerifyStatus==="verified" && emailVerifyStatus==="verified" ){
            const expireTime = {expiresIn :'1d'};
            const token = jwt.sign({email:req.body.email},recruiter_secret_key,expireTime);

            if(!token) {
                // res.render("recruiterLogin.ejs",{message:"Error while setting up the token while recruiter Login"});
                return res.status(401).json({message:"Error while setting up the token while recruiter Login"});
            }
        //     res.cookie('recruiter_jwt_token',token,{maxAge:24*60*60*1000,httpOnly:true});
        //     res.render("recruiterHome.ejs",{email: req.body.email});
        return res.status(201).cookie('recruiter_jwt_token',token,{maxAge:24*60*60*1000,httpOnly:true}).json({email: req.body.email});
    }
        else {
            // res.render("recruiterLogin.ejs",{message :"Email or Password is wrong"});
            return res.status(401).json({message :"Email or Password is wrong"});
        }
    }catch(error){
        console.log("Error in recruiterLogin : " ,error);
        // res.render("recruiterLogin.ejs",{message :"Something went wrong"});
        return res.status(500).json({message :"Something went wrong"});
    } 
}


export const recruiterVerifyEmailController = async (req,res)=>{
    const email = req.query.email;
    const updateStatus = {$set:{emailVerify:"verified"}};
    const updateResult = await recruiterSchema.updateOne({email:email},updateStatus);
    // console.log("Update Result : ",updateResult);
    // res.render("recruiterLogin.ejs",{message : "Email Verified | Admin Verification takes 24 Hours"});
    return res.status(202).json({message : "Email Verified | Admin Verification takes 24 Hours"});

 }
 

export const recruiterRegistrationController = async(req,res)=>{
    const {name,recruiter,email,password,contact,address} = req.body;

    try{
        const obj = {
            name : name,
            recruiter : recruiter,
            email : email,
            password : await bcrypt.hash(password,10),
            contact : contact,
            address : address
        }
        const mailContent = `Hello ${email},<br> This is a Verification mail by Faculty Recruitment System.You need to verify yourself by clicking on the below link.<br> <a href='http://localhost:3000/recruiter/verifyEmail?email=${email}'>Click Here to Verify</a>`;
           
        mailer.mailer(mailContent,email,async (info)=>{
            if(info){
                    const result = await recruiterSchema.create(obj);
                //     console.log("Result of recruiter registration : ",result);
                // res.render("recruiterLogin.ejs",{message :"Email sent | Please verify"});
                return res.status(201).json({message :"Email sent | Please verify"});

            }
            else{
                console.log("Error while sending Email");
                // res.render("recruiterRegistration.ejs",{message : "Error while sending Mail"});
                return res.status(400).json({message : "Error while sending Mail"});
            }
        });
    } catch(error) {
        console.log("Error occured in recruiter registration : ",error);
        // res.render("recruiterRegistration.ejs",{message : "Error occured in recruiter registration"});
        return res.status(500).json({message : "Error occured in recruiter registration"});
    }
 }

 export const recruiterVacancyPostedController = async (req,res)=>{
    try { 
       const vacancyList = await vacancySchema.find({email : req.payload.email});
       
        if(vacancyList.length == 0){
            // res.render("recruiterVacancyList.ejs",{email : req.payload.email, vacancyList:vacancyList,message :"No Record Found !"});
            return res.status(204).json({email : req.payload.email, vacancyList:vacancyList,message :"No Record Found !"});
        }
        else {
            // res.render("recruiterVacancyList.ejs",{email : req.payload.email, vacancyList:vacancyList,message :""});
            return res.status(200).json({email : req.payload.email, vacancyList:vacancyList,message :""});
        }
       
    } catch (error) {
        console.log("Error : ",error);
        const vacancyList = await vacancySchema.find({email : req.payload.email});
        // res.render("recruiterVacancyList.ejs",{email : req.payload.email, vacancyList:vacancyList,message :"Wait Data is loading"});
        return res.status(500).json({email : req.payload.email, vacancyList:vacancyList,message :"Wait Data is loading"});
    }
}


export const recruiterLogoutController = async (req,res)=>{
    // res.clearCookie('recruiter_jwt_token');
    // res.render("recruiterLogin.ejs",{message : "Recruiter Logout Successfully"});
    return res.status(200).clearCookie('recruiter_jwt_token').json({message : "Recruiter Logout Successfully"});

}

export const appliedCandidateListController = async (req,res)=>{
    try { 
        const appliedVacancyList = await appliedVacancySchema.find({recruiterEmail : req.payload.email});
         
        let result = [];
        for(let i=0 ; i<appliedVacancyList.length; i++)
        {
            const candidateObj = await candidateSchema.findOne({email_id :appliedVacancyList[i].candidateEmail});
            const filename = candidateObj.docs;
            result.push(filename);
        }

         if(appliedVacancyList.length == 0){
            //  res.render("appliedCandidateList.ejs",{email : req.payload.email, appliedVacancyList:appliedVacancyList,result:result,message :"No Record Found !"});
            return res.status(204).json({email : req.payload.email, appliedVacancyList:appliedVacancyList,result:result,message :"No Record Found !"});
        }
         else {
            //  res.render("appliedCandidateList.ejs",{email : req.payload.email, appliedVacancyList:appliedVacancyList,result:result,message :""});
            return res.status(200).json({email : req.payload.email, appliedVacancyList:appliedVacancyList,result:result,message :""});
        }
        
     } catch (error) {
         console.log("Error : ",error);
         const appliedVacancyList = await appliedVacancySchema.find({recruiterEmail : req.payload.email});
         let result = [];
        for(let i=0 ; i<appliedVacancyList.length; i++)
        {
            const candidateObj = await candidateSchema.findOne({email_id :appliedVacancyList[i].candidateEmail});
            const filename = candidateObj.docs;
            result.push(filename);
        }
        //  res.render("appliedCandidateList.ejs",{email : req.payload.email, appliedVacancyList:appliedVacancyList,result:result,message :"Wait Data is loading"});
        return res.status(500).json({email : req.payload.email, appliedVacancyList:appliedVacancyList,result:result,message :"Wait Data is loading"});
     }
}

export const recruiterUpdateStatusController = async (req,res)=>{
    try {
        const receivedStatus = req.body.recruiterStatus;
        const vacancyId = req.body.vacancyId;
        const updateStatus = {
            $set : {
                recruiterStatus : receivedStatus
            }
        }
      const status =  await appliedVacancySchema.updateOne({vacancyId : vacancyId},updateStatus);
      // console.log(status);

      const appliedVacancyList = await appliedVacancySchema.find({recruiterEmail : req.payload.email});
      let result = [];
      for(let i=0 ; i<appliedVacancyList.length; i++)
      {
          const candidateObj = await candidateSchema.findOne({email_id :appliedVacancyList[i].candidateEmail});
          const filename = candidateObj.docs;
          result.push(filename);
      }

    //   res.render("appliedCandidateList.ejs",{email : req.payload.email, appliedVacancyList:appliedVacancyList,result:result,message :"Status Updated"});
    return res.status(201).json({email : req.payload.email, appliedVacancyList:appliedVacancyList,result:result,message :"Status Updated"});
} catch (error) {
       console.log("Error in recruiterUpdateStatusController :",error);
       const appliedVacancyList = await appliedVacancySchema.find({recruiterEmail : req.payload.email});
       let result = [];
       for(let i=0 ; i<appliedVacancyList.length; i++)
       {
           const candidateObj = await candidateSchema.findOne({email_id :appliedVacancyList[i].candidateEmail});
           const filename = candidateObj.docs;
           result.push(filename);
       }

    //    res.render("appliedCandidateList.ejs",{email : req.payload.email, appliedVacancyList:appliedVacancyList,result:result,message :"Error while Updating Status"});
    return res.status(500).json({email : req.payload.email, appliedVacancyList:appliedVacancyList,result:result,message :"Error while Updating Status"});
}
}