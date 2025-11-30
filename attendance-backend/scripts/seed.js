// scripts/seed.js
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../src/models/User.js";
import Attendance from "../src/models/Attendance.js";

// sample users (passwords will be hashed)
const users = [
  { name: "John Employee", email: "john@company.com", password: "123456", role: "employee", department: "HR" },
  { name: "Alice Employee", email: "alice@company.com", password: "123456", role: "employee", department: "Sales" },
  { name: "Manager Jane", email: "manager@company.com", password: "123456", role: "manager", department: "Admin" }
];

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await User.deleteMany({});
    await Attendance.deleteMany({});

    for (const u of users) {
      const hashed = await bcrypt.hash(u.password, 10);
      const emp = await User.create({ ...u, password: hashed, employeeId: "EMP" + Math.floor(1000 + Math.random() * 9000) });
      console.log("Created", emp.email);
    }

    console.log("Seeding done.");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
