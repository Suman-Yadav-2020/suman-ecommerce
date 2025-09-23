import { users } from "../data/seed.js";
import { v4 as uuidv4 } from "uuid";

export const getAllUsers = async (req, res) => {
  res.json({ count: users.length, data: users });
};

export const getUserById = async (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.json(user);
};

export const createUser = async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    res.status(400);
    throw new Error("name and email are required");
  }
  const newUser = { id: uuidv4(), name, email, createdAt: new Date().toISOString() };
  users.push(newUser);
  res.status(201).json(newUser);
};
