import express from "express";
import { changePassword, deleteAccount, login, logout, signup, updateProfile } from "../controllers/auth.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.post('/logout',protectRoute,logout);
router.post('/change-password',protectRoute,changePassword);
router.delete('/delete-account',protectRoute,deleteAccount);
router.put('/update-profile',protectRoute,updateProfile);

export default router