import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {connectDB} from './config/db.js';
import authRoutes from "./routes/auth.js"
import uploadRoutes from "./routes/upload.js";
import userRoutes from "./routes/user.js";
import cookieParser from 'cookie-parser';


dotenv.config();

connectDB();

const app = express()
app.use(cors({
  origin: "http://localhost:5173", // Replace with your frontend URL
  credentials: true, // Required if you're using cookies or Clerk tokens
}));
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api", uploadRoutes); // ← register upload route


const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
