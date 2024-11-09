import mongoose from "mongoose";
const AdminSchema = mongoose.Schema({
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    }
});

export default mongoose.model('adminSchema', AdminSchema, 'admin');
