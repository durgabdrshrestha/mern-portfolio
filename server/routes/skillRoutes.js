import express from "express";

import {
  getSkills,
  getAllSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../controllers/skillController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route
router.get("/", getSkills);

// Admin routes
router.get("/all", protect, getAllSkills);

router.post("/", protect, createSkill);

router.put("/:id", protect, updateSkill);

router.delete("/:id", protect, deleteSkill);

export default router;