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
const profileImageFields = imageUpload("profile").fields([
  { name: "profileImage", maxCount: 1 },
  { name: "homeImage", maxCount: 1 },
  { name: "aboutImage", maxCount: 1 },
]);

router.post("/", protect, profileImageFields, createProfile);
router.put("/", protect, profileImageFields, updateProfile);

export default router;