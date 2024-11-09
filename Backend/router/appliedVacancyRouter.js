import express from 'express';
let appliedVacancyRouter = express.Router();
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { candidateAppliedVacancyController } from '../controller/appliedVacancyController.js';
dotenv.config();
appliedVacancyRouter.use(express.static('public'));

let candidate_secret_key = process.env.CANDIDATE_SECRET_KEY;

const authenticateJWT = (req,res,next)=>{
    const token = req.cookies.candidate_jwt_token;
    try{
       jwt.verify(token,candidate_secret_key,(error,payload)=>{
          if(error){
            //  res.render("candidateLogin.ejs",{message:"Please Login First"});
             return res.status(200).json({message:"Please Login First"});
          }
          else {
             req.payload = payload;
             next();
          }
       });
    } catch(error){
      //  res.render("candidateLogin.ejs",{message: "something went wrong in JWT"});
       return res.status(200).json({message: "something went wrong in JWT"});
    }
 }
 
appliedVacancyRouter.get("/candidateAppliedVacancy",authenticateJWT,candidateAppliedVacancyController);



export default appliedVacancyRouter;