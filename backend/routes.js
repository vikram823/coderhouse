import express from "express";
import {authController} from "./controllers";
const router = express.Router();

router.post("/api/sendOtp", authController.sendOtp);
router.post("/api/verifyOtp", authController.verifyOtp);

export default router;
