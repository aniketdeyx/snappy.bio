import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import authRoutes from "./routes/auth.js"
import uploadRoutes from "./routes/upload.js";
import userRoutes from "./routes/user.js";
import cookieParser from 'cookie-parser';


const app = express();

const corsOptions = {
  origin: [
    "https://snappy-bio.vercel.app",
    "https://snappy-bio-frontend.onrender.com",
    "http://localhost:5173"
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200
};


app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api", uploadRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running', timestamp: new Date().toISOString() });
});


const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  connectDB();

  console.log(`Example app listening on port ${PORT}`)
})
