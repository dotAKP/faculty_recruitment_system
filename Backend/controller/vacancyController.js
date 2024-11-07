import vacancySchema from "../model/vacancySchema.js"
import recruiterSchema from "../model/recruiterSchema.js";
import uuid4 from "uuid4";

export const recruiterAddVacancyController = async (req,res)=>{
    try {
        const vacancyId = uuid4();
        const vacancyObj = req.body;
        vacancyObj.vacancyId = vacancyId;
        const recruiterObj = await recruiterSchema.findOne({email : req.payload.email});
        const result = await vacancySchema.create(vacancyObj);
        console.log(result); 
        
        console.log(recruiterObj);
        
        if(result)
        {
            res.render("addVacancy.ejs",{email : req.payload.email, recruiterObj : recruiterObj,message : "Vacancy added Successfully"}); 
        }
        else {
            res.render("addVacancy.ejs",{email : req.payload.email, recruiterObj : recruiterObj, message : "Error while adding Vacancy"});
        }
    } catch (error) {
        console.log("Error while recruiterAddVacancy : ", error);
        const recruiterObj = await recruiterSchema.findOne({email : req.payload.email,});
        res.render("addVacancy.ejs",{email : req.payload.email, recruiterObj : recruiterObj, message : "Error while adding Vacancy"});
    }
}
