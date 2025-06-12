import express from 'express';
import { login, logout, register, updateProfile } from '../controller/user.controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
import { singleUpload } from '../middleware/multer.js';
const router=express.Router();

router.post("/register",singleUpload,register);
router.post("/login",login);
router.post("/profile/update",isAuthenticated,singleUpload, updateProfile);
router.get("/logout",logout)
export default router;