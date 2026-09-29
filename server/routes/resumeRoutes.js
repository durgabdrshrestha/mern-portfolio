import express from "express";

import {
  getResume,
  getAllResumes,
  createResume,
  updateResume,
  deleteResume,
} from "../controllers/resumeController.js";

import { protect } from "../middleware/authMiddleware.js";
import { resumeUpload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Public
router.get("/", getResume);

// Admin
router.get("/all", protect, getAllResumes);

router.post("/", protect, resumeUpload.single("file"), createResume);

router.put("/:id", protect, resumeUpload.single("file"), updateResume);

router.delete("/:id", protect, deleteResume);

export default router;