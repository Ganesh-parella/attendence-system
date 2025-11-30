// src/controllers/attendanceController.js
import Attendance from "../models/Attendance.js";

// CONFIG: Set your specific timezone here
const TIMEZONE = "Asia/Kolkata"; 

// Helper: Get current time as a Date object adjusted to the specific Timezone
const getLocalTime = () => {
  const now = new Date();
  const localString = now.toLocaleString("en-US", { timeZone: TIMEZONE });
  return new Date(localString);
};

// Helper: Generate YYYY-MM-DD string based on LOCAL time
const getLocalDateKey = (localDate) => {
  const year = localDate.getFullYear();
  const month = String(localDate.getMonth() + 1).padStart(2, '0');
  const day = String(localDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const checkIn = async (req, res) => {
  try {
    const user = req.user;
    
    // 1. Get accurate Local Time
    const localNow = getLocalTime();
    const dateKey = getLocalDateKey(localNow);
    
    // 2. Store ISO (UTC) for the database record, but use Local for logic
    const checkInTime = new Date().toISOString(); 

    // 3. Late Logic Calculation (Using Local Hours/Minutes)
    const lateThreshold = process.env.LATE_THRESHOLD || "09:30";
    const [thH, thM] = lateThreshold.split(":").map(Number);
    const thresholdMinutes = thH * 60 + thM;

    const currentMinutes = localNow.getHours() * 60 + localNow.getMinutes();
    
    const status = (currentMinutes > thresholdMinutes) ? "late" : "present";

    // 4. Update Database
    const update = { userId: user._id, date: dateKey, checkInTime, status };
    const opts = { upsert: true, new: true, setDefaultsOnInsert: true };

    const record = await Attendance.findOneAndUpdate({ userId: user._id, date: dateKey }, update, opts);
    res.json({ message: "Checked in", record });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const checkOut = async (req, res) => {
  try {
    const user = req.user;
    
    // 1. Get accurate Local Time for the Date Key
    const localNow = getLocalTime();
    const dateKey = getLocalDateKey(localNow);
    const checkOutTime = new Date().toISOString();

    // 2. Find today's record
    const rec = await Attendance.findOne({ userId: user._id, date: dateKey });
    if (!rec || !rec.checkInTime) return res.status(400).json({ message: "No check-in found for today" });

    // 3. Calculate hours worked
    const inDate = new Date(rec.checkInTime);
    const now = new Date(); // Use absolute time for diff calculation
    const diffMs = now - inDate;
    const totalHours = Math.round((diffMs / 1000 / 3600) * 100) / 100;

    rec.checkOutTime = checkOutTime;
    rec.totalHours = totalHours;
    
    // Update status to half-day if hours are low (overwrites 'late' or 'present')
    if (totalHours < 4) rec.status = "half-day";
    
    await rec.save();

    res.json({ message: "Checked out", record: rec });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const myHistory = async (req, res) => {
  const userId = req.user._id;
  const { month } = req.query; // optional YYYY-MM
  const filter = { userId };
  if (month) filter.date = { $regex: `^${month}` };
  const rows = await Attendance.find(filter).sort({ date: -1 });
  res.json({ data: rows });
};

export const mySummary = async (req, res) => {
  const userId = req.user._id;
  // Default to current LOCAL month
  const localNow = getLocalTime();
  const defaultMonth = getLocalDateKey(localNow).slice(0, 7);
  
  const month = req.query.month || defaultMonth;
  const rows = await Attendance.find({ userId, date: { $regex: `^${month}` } });

  const present = rows.filter(r => r.status === "present").length;
  const late = rows.filter(r => r.status === "late").length;
  const half = rows.filter(r => r.status === "half-day").length;

  res.json({ month, present, late, half, totalRecords: rows.length });
};