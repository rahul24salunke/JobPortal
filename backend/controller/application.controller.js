import { Job } from "../models/job.model.js";
import {Application} from "../models/application.model.js";
import { populate } from "dotenv";

export const applyJobs=async(req,res)=>{
    try {
        const userId=req.id;   
        const jobId=req.params.id;  
        if(!jobId){
             return res.status(400).json({
                message:"job id is required",
                success:false
            });
        };
        const existingjobs=await Application.findOne({job:jobId,applicant:userId});
        if (existingjobs) {
             return res.status(400).json({
                message:"you have already applied for this job",
                success:false
            });
        }
        const job=await Job.findById(jobId).populate({
            path:"application"
        });
        if (!job) {
             return res.status(404).json({
                message:"job not found",
                success:false
            });
        }
        const newApplication=await Application.create({
            job:jobId,
            applicant:userId,
        });
        job.application.push(newApplication._id);
        await job.save();
         return res.status(201).json({
                message:"job applied successfully",
                success:true
        });
    } catch (error) {
        console.log("error:",error);
    }
}

export const getAppliedJobs=async(req,res)=>{
    try {
        const userId=req.id;
        const application=await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}}
            }
        });
        if (!application) {
             return res.status(404).json({
                message:"no Applications",
                success:false
            });
        }
         return res.status(200).json({
                application,
                success:true
            });
    } catch (error) {
        console.log("error:",error);
    }
}

export const getApplicants=async(req,res)=>{
    try {
        const jobId=req.params.id;
        const job=await Job.findById(jobId).populate({
            path:'application',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        })
        if (!job) {
             return res.status(404).json({
                message:"job not found",
                success:false
            });
        }
         return res.status(200).json({
                job,
                success:true
            });
    } catch (error) {
        console.log("error:",error)
    }
}

export const updateStatus=async(req,res)=>{
    try {
        const {status} =req.body;
        const applicationId=req.params.id;
        if (!status) {
             return res.status(400).json({
                message:"status is required",
                success:false
            });
        }
        const application=await Application.findOne({_id:applicationId});
        if(!application){
             return res.status(400).json({
                message:"application not found",
                success:false
            });
        }
        application.status=status.toLowerCase();
        await application.save();
        
         return res.status(200).json({
                message:"status is updated",
                success:true
        });
    } catch (error) {
        console.log(error);
    }
}