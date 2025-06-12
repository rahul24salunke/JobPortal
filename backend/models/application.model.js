import mongoose,{ Schema } from "mongoose";
const ApplicationSechma=new Schema({
    job:{
        type:Schema.Types.ObjectId,
        ref:'Job',
        required:true
    },
    applicant:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    status:{
        type:String,
        enum:['pending','accepted','rejected'],
        default:'pending'
    }
},{timeseries:true});

export const Application=mongoose.model('Application',ApplicationSechma);