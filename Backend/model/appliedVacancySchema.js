import mongoose from "mongoose";
const AppliedVacancySchema = mongoose.Schema({
    appliedVacancyId : {
        type : String,
        required : true,
    },
    vacancyId : {
        type : String,
        required : true,
    },
   candidateEmail : {
        type : String,
        required : true,
    },
   recruiterEmail : {
        type : String,
        required : true,
    },
    post : {
        type : String,
        required : true,
    },
    recruiterStatus : {
        type : String,
        required : true,
        default : "Received",
    }
});

export default mongoose.model('appliedVacancySchema', AppliedVacancySchema, 'appliedVacancy');
