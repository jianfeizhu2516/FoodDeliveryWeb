import express from "express";
import { userLogin,signup,getUserInfo } from "../controllers/authController.js";

const router = express.Router();

router.post("/login",userLogin)

router.post("/signup",signup)

router.get('/getUserInfo',getUserInfo)

export default router;