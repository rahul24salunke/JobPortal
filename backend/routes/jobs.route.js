import express from "express";
import { getAdminJob, getAllJobs, getJobById, postJob } from "../controller/job.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
const router=express.Router();

router.post("/post",isAuthenticated,postJob);
router.get("/get",isAuthenticated,getAllJobs);
router.get("/getadminJobs",isAuthenticated,getAdminJob);
router.get("/get/:id",isAuthenticated,getJobById);

export default router;