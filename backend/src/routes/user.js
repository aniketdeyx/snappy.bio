import express from "express";
import { updateProfile } from "../controllers/userController.js";
import { requireAuth } from "../middlewares/requireAuth.js";

const router = express.Router();

router.put("/profile", requireAuth ,updateProfile);

export default router;
