import express from "express";
import { login,signup,getUserInfo } from "../controllers/authController.js";

const router = express.Router();

router.post("/login",login)

router.post("/signup",signup)

router.get('/getUserInfo',getUserInfo)

export default router;