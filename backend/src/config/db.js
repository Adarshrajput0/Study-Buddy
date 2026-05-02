import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV.MONGO_URI);

    console.log("MongoDB Connected Successfully:", conn.connection.host);
  } catch (error) {
    console.error("DB connection error:", error);
    process.exit(1); // app band ho jayega agar DB fail hua
  }
};

export default connectDB;
