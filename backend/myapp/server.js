// server.js
import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import "express-async-errors";

import connectDB from "./config/db.js";
import productsRoutes from "./routes/productRoutes.js";
import usersRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandlers.js";

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// connect to MongoDB
await connectDB(process.env.MONGO_URI);

// routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/profile", profileRoutes);

app.get("/health", (req, res) => res.json({ ok: true, ts: new Date().toISOString() }));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
