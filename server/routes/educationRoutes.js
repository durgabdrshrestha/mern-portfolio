import express from "express";

import {
  getEducations,
  getAllEducations,
  createEducation,
  updateEducation,
  deleteEducation,
} from "../controllers/educationController.js";

import { protect } from "../middleware/authMiddleware.js";
import { imageUpload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// =====================================================
// PUBLIC ROUTES
// =====================================================

// Get active education
router.get("/", getEducations);

// =====================================================
// ADMIN ROUTES
// =====================================================

// Get all education
router.get("/all", protect, getAllEducations);

// Create education
router.post("/", protect, imageUpload("education").single("institutionImage"), createEducation);

// Update education
router.put("/:id", protect, imageUpload("education").single("institutionImage"), updateEducation);

// Delete education
router.delete("/:id", protect, deleteEducation);

export default router;