import express from 'express';
import { adminLoginController,adminLogoutController,adminRecruiterListController,adminCandidateListController,adminVerifyRecruiterController,adminVerifyCandidateController,adminVacancyListController } from '../controller/adminController.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
let adminRouter = express.Router();
adminRouter.use(express.static('public'));

dotenv.config();

let admin_secret_key = process.env.ADMIN_SECRET_KEY;

const authenticateJWT = (req,res,next)=>{
   const token = req.cookies.admin_jwt_token;
   try{
      jwt.verify(token,admin_secret_key,(error,payload)=>{
         if(error){
            res.render("adminLogin.ejs",{message:"Please Login First"});
         }
         else {
            req.payload = payload;
            next();
         }
      });
   } catch(error){
      res.render("adminLogin.ejs",{message: "something went wrong in JWT"});
   }
}

adminRouter.get('/', (req,res)=>{
   res.render("adminLogin.ejs",{message:""});
});
adminRouter.post("/adminLogin", adminLoginController);
adminRouter.get("/adminLogout", adminLogoutController);

adminRouter.get('/adminHome',authenticateJWT, (req,res)=>{
   res.render("adminHome.ejs",{email:req.payload.email});
});
adminRouter.get('/adminRecruiterList',authenticateJWT,adminRecruiterListController);
adminRouter.get('/adminCandidateList',authenticateJWT,adminCandidateListController);
adminRouter.get('/adminVerifyRecruiter',authenticateJWT,adminVerifyRecruiterController);
adminRouter.get('/adminVerifyCandidate',authenticateJWT,adminVerifyCandidateController);
adminRouter.get('/adminVacancyList',authenticateJWT,adminVacancyListController);


export default adminRouter;
