import adminSchema from "../model/adminSchema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import recruiterSchema from "../model/recruiterSchema.js";
import candidateSchema from "../model/candidateSchema.js";
import vacancySchema from "../model/vacancySchema.js";
import dotenv from 'dotenv';

dotenv.config();

let admin_secret_key = process.env.ADMIN_SECRET_KEY;


export  const adminLoginController = async(req,res)=>{
    try{
        const adminObj = await adminSchema.findOne({email : req.body.email});
        const adminPassword = adminObj.password;
        const status = await bcrypt.compare( req.body.password,adminPassword);

        if(status){
            const expireTime = {expiresIn :'1d'};
            const token = jwt.sign({email:req.body.email},admin_secret_key,expireTime);

            if(!token) {
                // res.render("adminLoogin.ejs",{message:"Error while setting up the token while admin Login"});
                return res.status(401).json({message:"Error while setting up the token while admin Login"});
            }
            //   res.cookie('admin_jwt_token',token,{maxAge:24*60*60*1000,httpOnly:true});
            // res.render("adminHome.ejs",{email: req.body.email});
             return res.status(201).cookie('admin_jwt_token',token,{maxAge:24*60*60*1000,httpOnly:true}).json({email: req.body.email});
        }
        else {
            // res.render("adminLogin.ejs",{message :"Email or Password is wrong"});
            return res.status(401).json({message :"Email or Password is wrong"});
        }
    }catch(error){
        console.log("Error in adminLogin : " ,error);
        // res.render("adminLogin.ejs",{message :"Something went wrong"});
        return res.status(500).json({message :"Something went wrong"});
 
    } 
}

export const adminLogoutController = async (req,res)=>{
        res.clearCookie('admin_jwt_token');
        // res.render("adminLogin.ejs",{message : "Admin Logout Successfully"});
        return res.status(200).json({message : "Admin Logout Successfully"});
}

export const adminRecruiterListController = async (req,res)=>{
    try {
       const recruiterList = await recruiterSchema.find();
    //    res.render("adminRecruiterList.ejs",{email : req.payload.email ,recruiterList : recruiterList,message :""});
          return res.status(200).json({email : req.payload.email ,recruiterList : recruiterList,message :""});

    } catch (error) {
        console.log("Error at AdminRecruiterListController");
        // res.render("adminHome.ejs",{email : req.payload.email});
        return res.status(500).json({email : req.payload.email});

    }
}

export const adminCandidateListController = async (req,res)=>{
    try {
       const candidateList = await candidateSchema.find();
    //    res.render("adminCandidateList.ejs",{email : req.payload.email ,candidateList : candidateList,message :""});
         return res.status(200).json({email : req.payload.email ,candidateList : candidateList,message :""});

    } catch (error) {
        console.log("Error at AdminCandidateListController");
        // res.render("adminHome.ejs",{email : req.payload.email});
        return res.status(500).json({email : req.payload.email});

    }
}

export const adminVerifyRecruiterController = async (req,res)=>{
    try {
        const recruiterEmail = req.query.recruiterEmail;
        const updateStatus = {
            $set : {
                adminVerify : "verified"
            }
        }
        const updateResult = await recruiterSchema.updateOne({email : recruiterEmail},updateStatus);
        // console.log("UpdateResult : ",updateResult);

        
        const recruiterList = await recruiterSchema.find();
        // res.render("adminRecruiterList.ejs",{email : req.payload.email ,recruiterList : recruiterList,message : recruiterEmail+" Verified Successfully"});
        return res.status(202).json({email : req.payload.email ,recruiterList : recruiterList,message : recruiterEmail+" Verified Successfully"});

    } catch (error) {
        console.log("Error at AdminVerifyRecruiterController");
        const recruiterList = await recruiterSchema.find();
        // res.render("adminRecruiterList.ejs",{email : req.payload.email ,recruiterList : recruiterList,message :"Error while updating Recruiter"});
        return res.status(500).json({email : req.payload.email ,recruiterList : recruiterList,message :"Error while updating Recruiter"});

    }
}

export const adminVerifyCandidateController = async (req,res)=>{
    try {
        const candidateEmail = req.query.candidateEmail;
        const updateStatus = {
            $set : {
                adminVerify : "verified"
            }
        }
        const updateResult = await candidateSchema.updateOne({email_id : candidateEmail},updateStatus);
        // console.log("UpdateResult : ",updateResult);
        // console.log("candidateEmail :",candidateEmail);
        
        const candidateList = await candidateSchema.find();
        // res.render("adminCandidateList.ejs",{email : req.payload.email ,candidateList : candidateList,message : candidateEmail +" Verified Successfully"});
        return res.status(202).json({email : req.payload.email ,candidateList : candidateList,message : candidateEmail +" Verified Successfully"});

    } catch (error) {
        console.log("Error at AdminVerifyCandidateController");
        const candidateList = await candidateSchema.find();
        // res.render("adminCandidateList.ejs",{email : req.payload.email ,candidateList : candidateList,message :"Error while updating Candidate"});
        return res.status(500).json({email : req.payload.email ,candidateList : candidateList,message :"Error while updating Candidate"});
    }
}

export const adminVacancyListController = async (req,res)=>{
    try { 
       const vacancyList = await vacancySchema.find();
       
        if(vacancyList.length == 0){
            // res.render("adminVacancyList.ejs",{email : req.payload.email, vacancyList:vacancyList,message :"No Record Found !"});
            return res.status(204).json({email : req.payload.email, vacancyList:vacancyList,message :"No Record Found !"});
        }
        else {
            // res.render("adminVacancyList.ejs",{email : req.payload.email, vacancyList:vacancyList,message :""});
            return res.status(200).json({email : req.payload.email, vacancyList:vacancyList,message :""});
        }
       
    } catch (error) {
        console.log("Error : ",error);
        const vacancyList = await vacancySchema.find();
        // res.render("adminVacancyList.ejs",{email : req.payload.email, vacancyList:vacancyList,message :"Wait Data is loading"});
        return res.status(500).json({email : req.payload.email, vacancyList:vacancyList,message :"Wait Data is loading"});
    }
}

