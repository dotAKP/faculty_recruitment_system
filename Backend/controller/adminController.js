import adminSchema from "../model/adminSchema.js";

export  const adminLoginController = async(req,res)=>{
    try{
        const adminCredential = req.body;
        console.log("adminCredential : ", adminCredential);
        const checkAdminLogin =  {
            $and : [
                {
                    email : req.body.email
                },
                {
                    password : req.body.password
                }
            ]
        }
        const result = await adminSchema.findOne(checkAdminLogin);
        console.log("result :", result);
        if(result) 
            res.render("adminHome.ejs");
        else 
            res.render("adminLogin.ejs",{msg:"Email or Password is wrong"});
    }catch(error){
        console.log("Error in adminLogin : " ,error);
        res.render("adminLogin.ejs",{msg:"Something went wrong"});
 
    } 
}