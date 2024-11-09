import express from 'express';
let vacancyRouter = express.Router();
import { recruiterAddVacancyController} from '../controller/vacancyController.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
let recruiter_secret_key = process.env.RECRUITER_SECRET_KEY;

vacancyRouter.use(express.static('public'));

const authenticateJWT = (req,res,next)=>{
    const token = req.cookies.recruiter_jwt_token;
    try{
       jwt.verify(token,recruiter_secret_key,(error,payload)=>{
          if(error){
            //  res.render("recruiterLogin.ejs",{message:"Please Login First"});
             return res.status(200).json({message:"Please Login First"});
          }
          else {
             req.payload = payload;
             next();
          }
       });
    } catch(error){
      //  res.render("recruiterLogin.ejs",{message: "something went wrong in JWT"});
       return res.status(200).json({message: "something went wrong in JWT"});
    }
 }


vacancyRouter.post('/addVacancy',authenticateJWT,recruiterAddVacancyController);

export default vacancyRouter;
