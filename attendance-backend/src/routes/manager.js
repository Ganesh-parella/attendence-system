// src/routes/manager.js
import express from "express";
import { getAll, getEmployee, exportCSV, todayStatus } from "../controllers/managerController.js";
import { authMiddleware } from "../middlewares/auth.js";
import { permit } from "../middlewares/roles.js";

const router = express.Router();

router.get("/all", authMiddleware, permit("manager"), getAll);
router.get("/employee/:id", authMiddleware, permit("manager"), getEmployee);
router.get("/export", authMiddleware, permit("manager"), exportCSV);
router.get("/today-status", authMiddleware, permit("manager"), todayStatus);

export default router;
