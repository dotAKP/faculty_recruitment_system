import express from 'express';
import { adminLoginController } from '../controller/adminController.js';
let adminRouter = express.Router();
adminRouter.use(express.static('public'));

adminRouter.get('/', (req,res)=>{
   res.render("adminLogin.ejs",{msg:""});
});
adminRouter.post("/adminLogin", adminLoginController);

export default adminRouter;
