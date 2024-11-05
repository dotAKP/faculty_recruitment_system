import express from 'express';
import { recruiterRegistrationController, recruiterVerifyEmailController,recruiterLoginController } from '../controller/recruiterController.js';
let recruiterRouter = express.Router();
recruiterRouter.use(express.static('public'));

recruiterRouter.get('/recruiterLogin', (req,res)=>{
   res.render("recruiterLogin.ejs",{message :""});
});
recruiterRouter.get('/recruiterRegistration', (req,res)=>{
    res.render("recruiterRegistration.ejs",{message:""});
 });
 recruiterRouter.post('/recruiterRegistration',recruiterRegistrationController);

 recruiterRouter.get('/verifyEmail',recruiterVerifyEmailController);
 
 recruiterRouter.post('/recruiterLogin',recruiterLoginController);
export default recruiterRouter;
