 import express from 'express';
 const app = express();
import mongoose, { connect } from 'mongoose';
import adminRouter from './router/adminRouter.js';
import candidateRouter from './router/candidateRouter.js';
import recruiterRouter from './router/recruiterRouter.js';
import vacancyRouter from './router/vacancyRouter.js';
import appliedVacancyRouter from './router/appliedVacancyRouter.js';
import cookieParser from 'cookie-parser';
import expressFileUpload from 'express-fileupload';
import dotenv from 'dotenv';
dotenv.config();
async function mongoDB_connect (){
      await  mongoose.connect(process.env.MONGO_URL).then(()=>{
            console.log("MongoDB Connection Established");
      }).catch((error)=>{
            console.log(" Mongo Error :",error);
      });
}
 app.use(express.urlencoded({extended:true}));
 app.use(express.json());
 app.use(express.static('public'));
 app.use(expressFileUpload());
app.use(cookieParser());

 app.set("views","views");
 app.set("view engine","ejs");

app.get('/',(req,res)=>{
      // res.render("home.ejs");
      return res.status(200).json({msg : "API is Live"});
});

app.use("/admin", adminRouter); 
app.use("/candidate", candidateRouter); 
app.use("/recruiter", recruiterRouter);
app.use("/vacancy", vacancyRouter);
app.use("/appliedVacancy",appliedVacancyRouter);



app.listen(process.env.PORT,()=>
{ 
 mongoDB_connect();
 console.log("Connection Established Successfully");
});
