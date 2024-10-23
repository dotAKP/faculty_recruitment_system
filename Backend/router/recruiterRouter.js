import express from 'express';
let recruiterRouter = express.Router();

recruiterRouter.use(express.static('public'));

recruiterRouter.get('/recruiterLogin', (req,res)=>{
   res.render("recruiterLogin.ejs");
});
recruiterRouter.get('/recruiterRegistration', (req,res)=>{
    res.render("recruiterRegistration.ejs");
 });

export default recruiterRouter;
