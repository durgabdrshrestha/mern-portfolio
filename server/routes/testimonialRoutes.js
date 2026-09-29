import express from "express";

import {
  getTestimonials,
  getFeaturedTestimonials,
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../controllers/testimonialController.js";

import { protect } from "../middleware/authMiddleware.js";
import { imageUpload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// =====================================================
// PUBLIC ROUTES
// =====================================================

// Get active testimonials
router.get("/", getTestimonials);

// Get featured testimonials
router.get("/featured", getFeaturedTestimonials);

// =====================================================
// ADMIN ROUTES
// =====================================================

// Get all testimonials
router.get("/all", protect, getAllTestimonials);

// Create testimonial
router.post("/", protect, imageUpload("testimonials").single("image"), createTestimonial);

// Update testimonial
router.put("/:id", protect, imageUpload("testimonials").single("image"), updateTestimonial);

// Delete testimonial
router.delete("/:id", protect, deleteTestimonial);

export default router;