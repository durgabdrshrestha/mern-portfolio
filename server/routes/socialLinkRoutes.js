import express from "express";

import {
  getSocialLinks,
  getAllSocialLinks,
  createSocialLink,
  updateSocialLink,
  deleteSocialLink,
} from "../controllers/socialLinkController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", getSocialLinks);

// Admin
router.get("/all", protect, getAllSocialLinks);

router.post("/", protect, createSocialLink);

router.put("/:id", protect, updateSocialLink);

router.delete("/:id", protect, deleteSocialLink);

export default router;