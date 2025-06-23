import express from "express";
import { upload } from "../middlewares/imageUpload.js";

const router = express.Router();

router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  res.json({ url: req.file.path }); // Cloudinary URL
});

export default router;
