// controllers/authController.js
import User from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });

export const register = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("name, email and password are required");
  }
  const existing = await User.findOne({ email });
  if (existing) {
    res.status(400);
    throw new Error("User already exists with this email");
  }
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  const user = new User({ name, email, password: hashed, isAdmin: Boolean(isAdmin) });
  const saved = await user.save();
  const token = createToken({ id: saved._id, isAdmin: saved.isAdmin });
  res.status(201).json({ user: { id: saved._id, name: saved.name, email: saved.email, isAdmin: saved.isAdmin }, token });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("email and password are required");
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("Invalid credentials");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    res.status(401);
    throw new Error("Invalid credentials");
  }
  const token = createToken({ id: user._id, isAdmin: user.isAdmin });
  res.json({ user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin }, token });
};
