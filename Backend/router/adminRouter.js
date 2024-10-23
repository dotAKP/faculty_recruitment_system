import express from 'express';
let adminRouter = express.Router();

adminRouter.get('/', (req,res)=>{
   res.render("adminLogin.ejs");
});

export default adminRouter;
