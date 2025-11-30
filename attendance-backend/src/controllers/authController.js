// src/controllers/authController.js
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });

export const register = async (req, res) => {
  try {
    const { name, email, password, department, role } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });

    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const employeeId = "EMP" + Math.floor(1000 + Math.random() * 9000);

    const user = await User.create({ name, email, password: hashed, department, role, employeeId });
    const token = signToken(user._id);
    res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role, employeeId: user.employeeId }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Missing fields" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) return res.status(400).json({ message: "Invalid credentials" });

    const token = signToken(user._id);
    res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role, employeeId: user.employeeId }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const me = async (req, res) => {
  res.json({ user: req.user });
};
