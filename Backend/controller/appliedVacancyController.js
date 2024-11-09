import uuid4 from 'uuid4';
import vacancySchema from '../model/vacancySchema.js';
import appliedVacancySchema from '../model/appliedVacancySchema.js';


export const candidateAppliedVacancyController = async (req,res)=>{
    try {
        const appliedVacancyId = uuid4();
        const candidateData = JSON.parse(req.query.data);
        candidateData.appliedVacancyId = appliedVacancyId;
        // console.log("candidateData : ",candidateData);
        
        const vacancyList = await vacancySchema.find();
        const status = await appliedVacancySchema.create(candidateData);
        // console.log(status);
        const candidateVacancyRecord = await appliedVacancySchema.find({candidateEmail : req.payload.email});
        //  res.render("candidateVacancyList.ejs",{email : req.payload.email, vacancyList:vacancyList,message :"Successfully Applied", status :candidateVacancyRecord});
         return res.status(202).json({email : req.payload.email, vacancyList:vacancyList,message :"Successfully Applied", status :candidateVacancyRecord});  
    } catch (error) {
        console.log("Error", error);  
    }
}

