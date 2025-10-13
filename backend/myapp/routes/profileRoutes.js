// routes/profileRoutes.js
import express from "express";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, (req, res) => {
  // req.user is set by protect middleware
  res.json({ profile: req.user });
});

export default router;
