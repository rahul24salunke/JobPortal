import mongoose, { Schema } from "mongoose";
const jobSechma=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    requirements:[{
        type:String
    }],
    salary:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        required:true
    },
    position:{
        type:Number,
        required:true
    },
    company:{
        type:Schema.Types.ObjectId,
        ref:'Company'
    },
    experienceLevel:{
        type:Number,
        required:true,
    },
    created_by:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    application:[{
        type:Schema.Types.ObjectId,
        ref:'Application',
    }]
},{timestamps:true});

export const Job=mongoose.model('Job',jobSechma);