import {Company} from '../models/company.model.js';
import cloudinary from '../utils/cloudinary.js';
import getDataUri from '../utils/datauri.js';
export const registerCompany=async(req,res)=>{
    try {
        const {companyName}=req.body;
        if (!companyName) {
            return res.status(400).json({
                message:"company name required",
                success:false
            });
        };
        let company=await Company.findOne({companyName});
        if(company){
            return res.status(400).json({
                message:"you can't register same company",
                success:false
            });
        }
        company=await Company.create({
            name:companyName,
            userId:req.id
        });
        return res.status(200).json({
                message:"company registerd successfully",
                company,
                success:true
        });
    } catch (error) {
        console.log("errror: ",error);
    }
}

export const getCompany=async(req,res)=>{
    try {
        const userId=req.id;
        const companies=await Company.find({userId});
        if (!companies) {
            return res.status(404).json({
                message:"company not found",
                success:false
            });
        }
        res.status(200).json({
            companies,
            success:true
        })
    } catch (error) {
        console.log("error: ",error);
    }
}

export const getCompanyById=async(req,res)=>{
    try {
        const companyId=req.params.id;
        const company=await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message:"company not found",
                success:false
            });
        }
        return res.status(200).json({
                company,
                success:true
            });

    } catch (error) {
        console.log("error:",error);
    } 
}

export const updateCompny=async(req,res)=>{
    try {
        const {name,description,website,location}=req.body;
        const file=req.file;

        //cloudinary
        const fileuri=getDataUri(file);
        const cloudeResponse=await cloudinary.uploader.upload(fileuri.content);
        const logo=cloudeResponse.secure_url;

        const updateData={name,description,location,website,logo};
        const company=await Company.findByIdAndUpdate(req.params.id,updateData,{new:true});

        if (!company) {
            return res.status(404).json({
                message:"company not found",
                success:false
            });
        }
        res.status(200).json({
                message:"company info updated",
                success:true
        });
    } catch (error) {
        console.log("error",error);
    }
}