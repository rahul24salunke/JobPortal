import { Job } from "../models/job.model.js";

export const postJob=async(req,res)=>{
    try {
        const {title,description,requirements,experience,position,salary,location,jobType,companyId}=req.body;
        const userId=req.id;

        if (!title || !description || !requirements || !position || !experience || !salary || !location || !jobType || !companyId) {
            return res.status(400).json({
                message:"something is missing",
                success:false
            });
        }
        const job=await Job.create({
            title,description,requirements:requirements.split(","),
            salary:Number(salary),location,jobType,experienceLevel:experience,
            position,company:companyId,created_by:userId
        });
        return res.status(200).json({
            message:"new job created successfully",
            job,
            success:true
        });
    } catch (error) {
        console.log(error);
    }
}

export const getAllJobs=async(req,res)=>{
    try {
        const keyword=req.query.keyword || "";
        const query={
            $or:[
                {title:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}}
            ]
        }
        const jobs=await Job.find(query).populate({path:"company"}).sort({createdAt:-1});
        if (!jobs) {
            res.status(404).json({
                message:"JOb not found",
                success:false
            });
        };
        res.status(200).json({
            jobs,
            success:true
        })
    } catch (error) {
        console.log("error",error);
    }
}

export const getJobById=async(req,res)=>{
    try {
        const jobId=req.params.id;
        const job=await Job.findById(jobId);
        if(!job){
            return res.status(400).json({
                message:"job not found",
                success:false
            });
        }
        return res.status(200).json({
                job,
                success:true
        });
    } catch (error) {
        console.log(error);
    }
}

export const getAdminJob=async(req,res)=>{
    try {
        const adminid=req.id;
        const jobs=await Job.find({created_by:adminid}).populate({
            path:"company",
            createdAt:-1
        });
        if(!jobs){
             return res.status(400).json({
                message:"job not found",
                success:false
            });
        }
         return res.status(200).json({
                jobs,
                success:false
            });
    } catch (error) {
        console.log(error);
    }
}
