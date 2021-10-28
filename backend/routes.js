import express from "express";
import { authController, activateController, roomsController } from "./controllers";
import authMiddleware from "./middlewares/authMiddleware";
const router = express.Router();

router.post("/api/sendOtp", authController.sendOtp);
router.post("/api/verifyOtp", authController.verifyOtp);
router.post("/api/activate", authMiddleware, activateController.activate);
router.get("/api/refresh", authController.refresh);
router.post("/api/logout", authMiddleware, authController.logout);

router.post("/api/rooms", authMiddleware, roomsController.create);
router.get("/api/rooms", authMiddleware, roomsController.index);

export default router;
