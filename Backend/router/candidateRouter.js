import express from 'express';
let candidateRouter = express.Router();

candidateRouter.use(express.static('public'));

candidateRouter.get('/candidateLogin', (req,res)=>{
   res.render("candidateLogin.ejs");
});
candidateRouter.get('/candidateRegistration', (req,res)=>{
    res.render("candidateRegistration.ejs");
 });

export default candidateRouter;
