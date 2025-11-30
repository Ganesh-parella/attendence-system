// src/controllers/dashboardController.js
import Attendance from "../models/Attendance.js";
import User from "../models/User.js";

export const employeeDashboard = async (req, res) => {
  const userId = req.user._id;
  const today = new Date().toISOString().slice(0,10);
  const todays = await Attendance.findOne({ userId, date: today });
  const month = new Date().toISOString().slice(0,7);
  const rows = await Attendance.find({ userId, date: { $regex: `^${month}` } }).sort({ date: -1 });

  const present = rows.filter(r => r.status === "present").length;
  const late = rows.filter(r => r.status === "late").length;
  const totalHours = rows.reduce((s, r) => s + (r.totalHours || 0), 0);
  const recent = rows.slice(0,7);

  res.json({
    todayStatus: todays ? { status: todays.status, checkIn: todays.checkInTime, checkOut: todays.checkOutTime } : { status: "not-checked-in" },
    month: { present, late, totalHours },
    recent
  });
};

export const managerDashboard = async (req, res) => {
  const totalEmployees = await User.countDocuments({ role: "employee" });
  const today = new Date().toISOString().slice(0,10);
  const todays = await Attendance.find({ date: today }).populate("userId", "name employeeId department");
  const present = todays.length;
  const absent = totalEmployees - present;
  const lateArrivals = todays.filter(t => t.status === "late").length;

  // Basic weekly trend (last 7 days)
  const trend = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0,10);
    const count = await Attendance.countDocuments({ date: key });
    trend.push({ date: key, present: count });
  }

  res.json({
    totalEmployees,
    today: { present, absent, late: lateArrivals },
    trend
  });
};
