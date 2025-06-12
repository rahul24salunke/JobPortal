import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register=async(req,res)=>{
    try {
        const {fullName,email,password,phonenumber,role}=req.body;
        if(!fullName || !phonenumber || !password || !role || !email){
            return res.status(400).json({
                message:"something is wrong",
                success:false
            });
        }
        const file=req.file;
        const fileuri=getDataUri(file);
        const cloudeResponce=await cloudinary.uploader.upload(fileuri.content);
        const user=await User.findOne({email});
        if(user){
            return res.status(400).json({
                message:"user already exists with this email",
                success:false
            });
        }
        const hashpassword=await bcrypt.hash(password,10);
        await User.create({
            fullName,email,password:hashpassword,phonenumber,role,profile:{
                profilePhoto:cloudeResponce.secure_url
            }
        });
        res.status(200).json({
            message:`user reistered successfully`,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const login=async(req,res)=>{
    try {
        const {email,password,role}=req.body;
        if(!password || !role || !email){
            return res.status(400).json({
                message:"something is wrong",
                success:false
            });
        }
        let user=await User.findOne({email});
        if (!user) {
            return res.status(400).json({
                message:"Incorrect email or password",
                success:false
            });
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if (!isMatch) {
            return res.status(400).json({
                message:"Incorrect email or password",
                success:false
            });
        };
        if (role !== user.role) {
            return res.status(400).json({
                message:"Account does not exist",
                success:false
            });
        }
        const tokendata={
            UserId:user._id
        }
        const token=await jwt.sign(tokendata,process.env.SECRET_KEY,{expiresIn:'1d'});
        user={
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            phonenumber:user.phonenumber,
            role:user.role,
            profile:user.profile
        }
        res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpsOnly:true,sameSite:'strict'}).json({
            message:`Welcome back ${user.fullName}`,
            user,
            success:true
        });
    } catch (error) {
        console.log("error has occured",error);
    }
}

export const logout=async (req,res)=>{
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"logout successful",
            success:true
        })
    } catch (error) {
        console.log("logout failed",error);
    }
}

export const updateProfile=async(req,res)=>{
    try {
        const {fullName,email,phonenumber,bio,skills}=req.body;
        const file=req.file;
        //cloudanary
        const fileuri=getDataUri(file);
        const cloudeResponce=await cloudinary.uploader.upload(fileuri.content);


        let skillsArray;
        if (skills) {
            skillsArray=skills.split(",");
        }
        const userId=req.id;
        
        let user=await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message:"user not found",
                success:false
            })
        }
        if (fullName) user.fullName=fullName;
        if (email)user.email=email;
        if (phonenumber) user.phonenumber=phonenumber;
        if (bio) user.profile.bio=bio;
        if (skills) user.profile.skills=skillsArray;

        if (cloudeResponce) {
            user.profile.resume=cloudeResponce.secure_url;
            user.profile.resumeOriginalName=file.originalname;
        }
        await user.save();

        user={
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            phonenumber:user.phonenumber,
            role:user.role,
            profile:user.profile
        }
        res.status(200).json({
            message:"profile updated successfully",
            success:true
        });
    } catch (error) {
        console.log("something is wrong",error);   
    }
}