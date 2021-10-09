import express from "express";
import { authController, activateController } from "./controllers";
import authMiddleware from "./middlewares/authMiddleware";
const router = express.Router();

router.post("/api/sendOtp", authController.sendOtp);
router.post("/api/verifyOtp", authController.verifyOtp);
router.post("/api/activate", authMiddleware, activateController.activate);

export default router;
