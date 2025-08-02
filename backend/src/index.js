import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import authRoutes from "./routes/auth.js"
import uploadRoutes from "./routes/upload.js";
import userRoutes from "./routes/user.js";
import cookieParser from 'cookie-parser';
import path from 'path';



const app = express();


const __dirname = path.resolve();

// CORS configuration for all environments
const corsOptions = {
  origin: process.env.NODE_ENV === "production" 
    ? ["https://snappy-bio.vercel.app", "https://snappy-bio-frontend.onrender.com", process.env.CLIENT_URL].filter(Boolean)
    : true, // Allow all origins in development
  credentials: true, // Allow cookies to be sent
};

app.use(cors(corsOptions));


app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api", uploadRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
  })
}

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  connectDB();

  console.log(`Example app listening on port ${PORT}`)
})
