import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import "express-async-errors"; // patch to allow throwing from async handlers

import productsRoutes from "./routes/productsRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// API routes
app.use("/api/products", productsRoutes);
app.use("/api/users", usersRoutes);

// Health check
app.get("/health", (req, res) => res.json({ ok: true, ts: new Date().toISOString() }));

// 404 and error handlers (should be after routes)
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} on http://localhost:${PORT}`);
});
