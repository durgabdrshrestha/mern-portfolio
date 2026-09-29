import express from "express";

import {
  getProfile,
  createProfile,
  updateProfile,
} from "../controllers/profileController.js";

import { protect } from "../middleware/authMiddleware.js";
import { imageUpload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Public route
router.get("/", getProfile);

// Protected admin routes
router.post("/", protect, imageUpload("profile").single("profileImage"), createProfile);
router.put("/", protect, imageUpload("profile").single("profileImage"), updateProfile);

export default router;