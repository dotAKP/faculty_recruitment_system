 import express from 'express';
 const app = express();

import adminRouter from './router/adminRouter.js';
import candidateRouter from './router/candidateRouter.js';
import recruiterRouter from './router/recruiterRouter.js';
import cookieParser from 'cookie-parser';
 app.use(express.urlencoded({extended:true}));
 app.use(express.json());
 app.use(express.static('public'));
app.use(cookieParser());

 app.set("views","views");
 app.set("view engine","ejs");

app.get('/',(req,res)=>{
      res.render("home.ejs");
});

app.use("/admin", adminRouter); 
app.use("/candidate", candidateRouter); 
app.use("/recruiter", recruiterRouter); 





app.listen(3000,()=>
{
 console.log("Connection Established Successfully");
});
