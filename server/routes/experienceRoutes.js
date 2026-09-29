import express from "express";

import {
  getExperiences,
  getAllExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../controllers/experienceController.js";

import { protect } from "../middleware/authMiddleware.js";
import { imageUpload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Public
router.get("/", getExperiences);

// Admin
router.get("/all", protect, getAllExperiences);

router.post("/", protect, imageUpload("experience").single("companyImage"), createExperience);

router.put("/:id", protect, imageUpload("experience").single("companyImage"), updateExperience);

router.delete("/:id", protect, deleteExperience);

export default router;