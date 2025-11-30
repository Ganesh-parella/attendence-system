// src/routes/dashboard.js
import express from "express";
import { employeeDashboard, managerDashboard } from "../controllers/dashboardController.js";
import { authMiddleware } from "../middlewares/auth.js";
import { permit } from "../middlewares/roles.js";

const router = express.Router();

router.get("/employee", authMiddleware, permit("employee", "manager"), employeeDashboard);
router.get("/manager", authMiddleware, permit("manager"), managerDashboard);

export default router;
