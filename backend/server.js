import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import jobRoutes from "./routes/jobRoutes.js";

dotenv.config();

const start = async () => {
  await connectDB();

  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use("/api/jobs", jobRoutes);

  app.listen(5000, () => console.log("Server running on 5000"));
};

start();