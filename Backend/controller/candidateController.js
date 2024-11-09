
import bcrypt from 'bcrypt';
import mailer from '../router/mailer.js';
import candidateSchema from '../model/candidateSchema.js';
import vacancySchema from '../model/vacancySchema.js';
import appliedVacancySchema from '../model/appliedVacancySchema.js';
import jwt from 'jsonwebtoken';
import path from 'path';
import {fileURLToPath} from 'url';
import dotenv from 'dotenv';
dotenv.config();

let candidate_secret_key = process.env.CANDIDATE_SECRET_KEY;


export const candidateRegistrationController = async (req,res)=>{
    try{ 
        const __filename = fileURLToPath(import.meta.url);
        // console.log("__filename : ",__filename);
        
        const __dirname = path.dirname(__filename).replace("\\controller","");
        // console.log("__dirname : ",__dirname);

        const filename = req.files.docs;
        const fileName = new Date().getTime() + filename.name;
        const pathName = path.join(__dirname,"/public/documents/",fileName);
        filename.mv(pathName,async (error)=>{
            if(error) {
                console.log("Error occured while uploading file");    
            }
            else {
                console.log("File Uploaded Successfully");

                const {name,email_id,password,gender,dob,address,contact,qualification,percentage,experience,docs} = req.body;
                const obj = {
                    name : name,
                    email_id : email_id,
                    password : await bcrypt.hash(password,10),
                    gender : gender,
                    dob : dob,
                    address : address,
                    contact : contact,
                    qualification : qualification,
                    percentage : percentage,
                    experience : experience,
                    docs : fileName
                }
                const mailContent = `Hello ${email_id},<br> This is a Verification mail by Faculty Recruitment System.You need to verify yourself by clicking on the below link.<br> <a href='http://localhost:3000/candidate/verifyEmail?email=${email_id}'>Click Here to Verify</a>`;
            
                mailer.mailer(mailContent,email_id,async (info)=>{
                    if(info){
                            const result = await candidateSchema.create(obj);
                            console.log("Result of candidate registration : ",result);
                        res.render("candidateLogin.ejs",{message :"Email sent | Please verify"});
                    }
                    else{
                        console.log("Error while sending Email");
                        res.render("candidateRegistration.ejs",{message : "Error while sending Mail"});
                    }
            });
         }
      });
    } catch(error) {
        console.log("Error occured in candidate registration while uploading : ",error);
        res.render("candidateRegistration.ejs",{message : "Error occured in candidate registration"});
    }
 }

 export const candidateVerifyEmailController = async (req,res)=>{
    const email = req.query.email;
    const updateStatus = {$set:{emailVerify:"verified"}};
    const updateResult = await candidateSchema.updateOne({ email_id : email},updateStatus);
    console.log("Update Result : ",updateResult);
    res.render("candidateLogin.ejs",{message : "Email Verified | Admin Verification takes 24 Hours"});
 }

 export  const candidateLoginController = async(req,res)=>{
    try{ 
        const candidateObj = await candidateSchema.findOne({email_id : req.body.email});
        const candidatePassword = candidateObj.password;
        const candidateStatus = candidateObj.status;
        const adminVerifyStatus = candidateObj.adminVerify;
        const emailVerifyStatus = candidateObj.emailVerify;

        const status = await bcrypt.compare( req.body.password,candidatePassword);

         if( status && candidateStatus && adminVerifyStatus==="verified" && emailVerifyStatus==="verified" ){
            const expireTime = {expiresIn :'1d'};
            const token = jwt.sign({email:req.body.email},candidate_secret_key,expireTime);

            if(!token) {
                res.render("candidateLogin.ejs",{message:"Error while setting up the token while candidate Login"});
            }
            res.cookie('candidate_jwt_token',token,{maxAge:24*60*60*1000,httpOnly:true});
            res.render("candidateHome.ejs",{email: req.body.email});
        }
        else {
            res.render("candidateLogin.ejs",{message :"Email or Password is wrong"});
        }
    }catch(error){
        console.log("Error in candidateLogin : " ,error);
        res.render("candidateLogin.ejs",{message :"Something went wrong"});
 
    } 
}

export const candidateLogoutController = async (req,res)=>{
    res.clearCookie('candidate_jwt_token');
    res.render("candidateLogin.ejs",{message : "Candidate Logout Successfully"});
}

export const candidateVacancyListController = async (req,res)=>{
    try { 
       const vacancyList = await vacancySchema.find();
       
        if(vacancyList.length == 0){
            res.render("candidateVacancyList.ejs",{email : req.payload.email, vacancyList:vacancyList,message :"No Record Found !",status :[]});
        }
        else {
            const candidateVacancyRecord = await appliedVacancySchema.find({candidateEmail : req.payload.email});
            if(candidateVacancyRecord.length == 0)
            {
                res.render("candidateVacancyList.ejs",{email : req.payload.email, vacancyList:vacancyList,message :"",status :[]});
            }
            else {
            res.render("candidateVacancyList.ejs",{email : req.payload.email, vacancyList:vacancyList,message :"",status :candidateVacancyRecord});
            }
        }
       
    } catch (error) {
        console.log("Error : ",error);
        const vacancyList = await vacancySchema.find();
        res.render("candidateVacancyList.ejs",{email : req.payload.email, vacancyList:vacancyList,message :"Wait Data is loading",status :[]});
    }
}

export const myStatusController = async (req,res)=>{
    try { 
        const appliedVacancyList = await appliedVacancySchema.find({candidateEmail : req.payload.email});
        
         if(appliedVacancyList.length == 0){
             res.render("myStatusList.ejs",{email : req.payload.email, appliedVacancyList:appliedVacancyList,message :"No Record Found !"});
         }
         else {
             res.render("myStatusList.ejs",{email : req.payload.email, appliedVacancyList:appliedVacancyList,message :""});
         }
        
     } catch (error) {
         console.log("Error in myStatusController : ",error);
         const appliedVacancyList = await appliedVacancySchema.find({candidateEmail : req.payload.email});
         res.render("myStatusList.ejs",{email : req.payload.email, appliedVacancyList:appliedVacancyList,message :"Wait Data is loading"});
     }
}