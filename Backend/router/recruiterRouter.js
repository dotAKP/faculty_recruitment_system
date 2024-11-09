import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { recruiterRegistrationController, recruiterVerifyEmailController,recruiterLoginController,recruiterVacancyPostedController,recruiterLogoutController,appliedCandidateListController,recruiterUpdateStatusController } from '../controller/recruiterController.js';
import recruiterSchema from '../model/recruiterSchema.js';
let recruiterRouter = express.Router();
recruiterRouter.use(express.static('public'));

dotenv.config();
let recruiter_secret_key = process.env.RECRUITER_SECRET_KEY;

const authenticateJWT = (req,res,next)=>{
   const token = req.cookies.recruiter_jwt_token;
   try{
      jwt.verify(token,recruiter_secret_key,(error,payload)=>{
         if(error){
            res.render("recruiterLogin.ejs",{message:"Please Login First"});
         }
         else {
            req.payload = payload;
            next();
         }
      });
   } catch(error){
      res.render("recruiterLogin.ejs",{message: "something went wrong in JWT"});
   }
}

recruiterRouter.get('/recruiterLogin', (req,res)=>{
   res.render("recruiterLogin.ejs",{message :""});
});
recruiterRouter.get('/recruiterRegistration', (req,res)=>{
    res.render("recruiterRegistration.ejs",{message:""});
 });
 recruiterRouter.post('/recruiterRegistration',recruiterRegistrationController);

 recruiterRouter.get('/verifyEmail',recruiterVerifyEmailController);
 
 recruiterRouter.post('/recruiterLogin',recruiterLoginController);

 recruiterRouter.get('/recruiterHome',authenticateJWT, (req,res)=>{
   res.render("recruiterHome.ejs",{email:req.payload.email});
});
recruiterRouter.get('/addVacancy',authenticateJWT,async (req,res)=>{
   const recruiterObj = await recruiterSchema.findOne({email : req.payload.email,});
   res.render("addVacancy.ejs",{email : req.payload.email, recruiterObj : recruiterObj, message : ""});
});

recruiterRouter.get('/vacancyPosted',authenticateJWT,recruiterVacancyPostedController);

recruiterRouter.get("/recruiterLogout", recruiterLogoutController);

recruiterRouter.get('/appliedCandidateList',authenticateJWT,appliedCandidateListController);

recruiterRouter.post('/recruiterUpdateStatus',authenticateJWT,recruiterUpdateStatusController);

export default recruiterRouter;
