import express from "express";
import { getProfile, getProfileByUsername, updateProfile } from "../controllers/userController.js";
import { requireAuth } from "../middlewares/requireAuth.js";

const router = express.Router();

router.put("/profile", requireAuth ,updateProfile);
router.get("/profile", requireAuth, getProfile);
router.get("/profile/:username", getProfileByUsername); // Assuming you have this function defined

export default router;
