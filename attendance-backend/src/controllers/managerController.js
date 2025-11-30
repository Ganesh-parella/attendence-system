// src/controllers/managerController.js
import Attendance from "../models/Attendance.js";
import User from "../models/User.js";
import { toCSV } from "../utils/csv.js";

export const getAll = async (req, res) => {
  const { employeeId, from, to, status } = req.query;
  const filter = {};
  if (employeeId) {
    const user = await User.findOne({ employeeId });
    if (user) filter.userId = user._id;
    else return res.json({ data: [] });
  }
  if (status) filter.status = status;
  if (from || to) {
    filter.date = {};
    if (from) filter.date.$gte = from;
    if (to) filter.date.$lte = to;
  }
  const rows = await Attendance.find(filter).populate("userId", "name email employeeId department").sort({ date: -1 });
  res.json({ data: rows });
};

export const getEmployee = async (req, res) => {
  const id = req.params.id; // user id
  const rows = await Attendance.find({ userId: id }).sort({ date: -1 });
  res.json({ data: rows });
};

export const exportCSV = async (req, res) => {
  const { from, to } = req.query;
  const filter = {};
  if (from || to) {
    filter.date = {};
    if (from) filter.date.$gte = from;
    if (to) filter.date.$lte = to;
  }
  const rows = await Attendance.find(filter).populate("userId", "name email employeeId");
  const csvRows = rows.map(r => ({
    employeeId: r.userId?.employeeId || "",
    name: r.userId?.name || "",
    email: r.userId?.email || "",
    date: r.date,
    checkIn: r.checkInTime || "",
    checkOut: r.checkOutTime || "",
    status: r.status,
    totalHours: r.totalHours || 0
  }));
  const header = ["employeeId","name","email","date","checkIn","checkOut","status","totalHours"];
  const csv = toCSV(csvRows, header);
  res.header("Content-Type", "text/csv");
  res.attachment("attendance_export.csv");
  return res.send(csv);
};

export const todayStatus = async (req, res) => {
  const today = new Date().toISOString().slice(0,10);
  const rows = await Attendance.find({ date: today }).populate("userId", "name email employeeId department");
  res.json({ data: rows });
};
