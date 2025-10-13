// routes/usersRoutes.js
import express from "express";
import { getAllUsers, getUserById } from "../controllers/usersController.js";

const router = express.Router();

router.route("/").get(getAllUsers);      // no POST here anymore
router.route("/:id").get(getUserById);

export default router;

