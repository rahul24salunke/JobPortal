import express from 'express';
import { getCompany, getCompanyById, registerCompany, updateCompny } from '../controller/company.controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
import { singleUpload } from '../middleware/multer.js';
const router=express.Router();

router.post("/registerCompany",isAuthenticated,registerCompany);
router.get("/getCompany",isAuthenticated,getCompany);
router.get("/getCompany/:id",isAuthenticated,getCompanyById);
router.put("/update/:id",isAuthenticated,singleUpload,updateCompny);

export default router;