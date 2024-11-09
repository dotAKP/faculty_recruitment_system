 import express from 'express';
 const app = express();

import adminRouter from './router/adminRouter.js';
import candidateRouter from './router/candidateRouter.js';
import recruiterRouter from './router/recruiterRouter.js';
import vacancyRouter from './router/vacancyRouter.js';
import appliedVacancyRouter from './router/appliedVacancyRouter.js';
import cookieParser from 'cookie-parser';
import expressFileUpload from 'express-fileupload';
 app.use(express.urlencoded({extended:true}));
 app.use(express.json());
 app.use(express.static('public'));
 app.use(expressFileUpload());
app.use(cookieParser());

 app.set("views","views");
 app.set("view engine","ejs");

app.get('/',(req,res)=>{
      res.render("home.ejs");
});

app.use("/admin", adminRouter); 
app.use("/candidate", candidateRouter); 
app.use("/recruiter", recruiterRouter);
app.use("/vacancy", vacancyRouter);
app.use("/appliedVacancy",appliedVacancyRouter);



app.listen(3000,()=>
{
 console.log("Connection Established Successfully");
});
