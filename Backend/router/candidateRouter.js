import express from 'express';
let candidateRouter = express.Router();
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { candidateRegistrationController,candidateVerifyEmailController,candidateLoginController,candidateLogoutController,candidateVacancyListController,myStatusController } from '../controller/candidateController.js';

candidateRouter.use(express.static('public'));
dotenv.config();
let candidate_secret_key = process.env.CANDIDATE_SECRET_KEY;


const authenticateJWT = (req,res,next)=>{
   const token = req.cookies.candidate_jwt_token;
   try{
      jwt.verify(token,candidate_secret_key,(error,payload)=>{
         if(error){
            res.render("candidateLogin.ejs",{message:"Please Login First"});
         }
         else {
            req.payload = payload;
            next();
         }
      });
   } catch(error){
      res.render("candidateLogin.ejs",{message: "something went wrong in JWT"});
   }
}

candidateRouter.get('/candidateLogin', (req,res)=>{
   res.render("candidateLogin.ejs",{message :""});
});
candidateRouter.get('/candidateRegistration', (req,res)=>{
    res.render("candidateRegistration.ejs");
 });

 candidateRouter.post('/candidateRegistration', candidateRegistrationController);

candidateRouter.get('/verifyEmail',candidateVerifyEmailController);
candidateRouter.post('/candidateLogin', candidateLoginController);
candidateRouter.get("/candidateLogout", candidateLogoutController);

candidateRouter.get('/candidateHome',authenticateJWT, (req,res)=>{
   res.render("candidateHome.ejs",{email:req.payload.email});
});
candidateRouter.get('/candidateVacancyList',authenticateJWT,candidateVacancyListController);
candidateRouter.get('/myStatus',authenticateJWT,myStatusController);
export default candidateRouter;
