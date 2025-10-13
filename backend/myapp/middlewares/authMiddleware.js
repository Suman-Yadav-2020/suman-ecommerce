// middlewares/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/Users.js";

export const protect = async (req, res, next) => {
  let token = null;

  // support header: Authorization: Bearer <token>
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token; // if you later use cookies
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, token missing");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      res.status(401);
      throw new Error("Not authorized");
    }
    next();
  } catch (err) {
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
};
