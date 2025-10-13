// controllers/usersController.js
import User from "../models/Users.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json({ count: users.length, data: users });
};

export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.json(user);
};
