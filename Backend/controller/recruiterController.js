import bcrypt from 'bcrypt';
import mailer from '../router/mailer.js';
import recruiterSchema from '../model/recruiterSchema.js';
import vacancySchema from "../model/vacancySchema.js"
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
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
                res.render("recruiterLogin.ejs",{message:"Error while setting up the token while recruiter Login"});
            }
            res.cookie('recruiter_jwt_token',token,{maxAge:24*60*60*1000,httpOnly:true});
            res.render("recruiterHome.ejs",{email: req.body.email});
        }
        else {
            res.render("recruiterLogin.ejs",{message :"Email or Password is wrong"});
        }
    }catch(error){
        console.log("Error in recruiterLogin : " ,error);
        res.render("recruiterLogin.ejs",{message :"Something went wrong"});
 
    } 
}


export const recruiterVerifyEmailController = async (req,res)=>{
    const email = req.query.email;
    const updateStatus = {$set:{emailVerify:"verified"}};
    const updateResult = await recruiterSchema.updateOne({email:email},updateStatus);
    console.log("Update Result : ",updateResult);
    res.render("recruiterLogin.ejs",{message : "Email Verified | Admin Verification takes 24 Hours"});
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
                    console.log("Result of recruiter registration : ",result);
                res.render("recruiterLogin.ejs",{message :"Email sent | Please verify"});
            }
            else{
                console.log("Error while sending Email");
                res.render("recruiterRegistration.ejs",{message : "Error while sending Mail"});
            }
        });
    } catch(error) {
        console.log("Error occured in recruiter registration : ",error);
        res.render("recruiterRegistration.ejs",{message : "Error occured in recruiter registration"});
    }
 }

 export const recruiterVacancyPostedController = async (req,res)=>{
    try { 
       const vacancyList = await vacancySchema.find({email : req.payload.email});
       
        if(vacancyList.length == 0){
            res.render("recruiterVacancyList",{email : req.payload.email, vacancyList:vacancyList,message :"No Record Found !"});
        }
        else {
            res.render("recruiterVacancyList",{email : req.payload.email, vacancyList:vacancyList,message :""});
        }
       
    } catch (error) {
        console.log("Error : ",error);
        const vacancyList = await vacancySchema.find({email : req.payload.email});
        res.render("recruiterVacancyList",{email : req.payload.email, vacancyList:vacancyList,message :"Wait Data is loading"});
    }
}


export const recruiterLogoutController = async (req,res)=>{
    res.clearCookie('recruiter_jwt_token');
    res.render("recruiterLogin.ejs",{message : "Recruiter Logout Successfully"});
}

