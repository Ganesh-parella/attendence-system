// src/routes/attendance.js
import express from "express";
import { checkIn, checkOut, myHistory, mySummary } from "../controllers/attendanceController.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();
router.post("/checkin", authMiddleware, checkIn);
router.post("/checkout", authMiddleware, checkOut);
router.get("/my-history", authMiddleware, myHistory);
router.get("/my-summary", authMiddleware, mySummary);

export default router;
