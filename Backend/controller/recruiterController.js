import bcrypt from 'bcrypt';
import mailer from '../router/mailer.js';
import recruiterSchema from '../model/recruiterSchema.js';

export const recruiterLoginController = async (req,res)=>{
    try{
        const {email, password} = req.body;
       const recruiterObj = await recruiterSchema.findOne({email : email});
        const recruiterPassword = recruiterObj.password;

    } catch(error){
        console.log("Error while login",error);
        res.render("recruiterLogin.ejs",{message : "Error while Login"});
    }
}

export const recruiterVerifyEmailController = async (req,res)=>{
    const email = req.query.email;
    const updateStatus = {$set:{emailVerify:"Verified"}};
    const updateResult = await recruiterSchema.updateOne({email:email},updateStatus);
    console.log("Update Result : ",updateResult);
    res.render("recruiterLogin.ejs",{message : "Email Verified | Admin Verification takes 24 Hours"});
 }
 

export const recruiterRegistrationController = async(req,res)=>{
    const {name,recruiter,email,password,contact,address} = req.body;

    try{
        const obj = {
            name : name,
            recruiter : recruiter,
            email : email,
            password : await bcrypt.hash(password,10),
            contact : contact,
            address : address
        }
        const mailContent = `Hello ${email},<br> This is a Verification mail by Faculty Recruitment System.You need to verify yourself by clicking on the below link.<br> <a href='http://localhost:3000/recruiter/verifyEmail?email=${email}'>Click Here to Verify</a>`;
           
        mailer.mailer(mailContent,email,async (info)=>{
            if(info){
                    const result = await recruiterSchema.create(obj);
                    console.log("Result of recruiter registration : ",result);
                res.render("recruiterLogin.ejs",{message :"Email sent | Please verify"});
            }
            else{
                console.log("Error while sending Email");
                res.render("recruiterRegistration.ejs",{message : "Error while sending Mail"});
            }
        });
    } catch(error) {
        console.log("Error occured in recruiter registration : ",error);
        res.render("recruiterRegistration.ejs",{message : "Error occured in recruiter registration"});
    }
 }

