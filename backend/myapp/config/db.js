// config/db.js
import mongoose from "mongoose";

const connectDB = async (uri) => {
  try {
    const conn = await mongoose.connect(uri, {
      // these options are defaults on modern mongoose but left here for clarity
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

export default connectDB;
