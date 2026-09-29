import express from "express";

import {
  getProjects,
  getFeaturedProjects,
  getProjectById,
  getProjectBySlug,
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
  deleteProjectGalleryImage,
  replaceProjectMainImage,
} from "../controllers/projectController.js";

import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// =====================================================
// PUBLIC ROUTES
// =====================================================

// GET /api/projects
router.get("/", getProjects);

// GET /api/projects/featured
router.get("/featured", getFeaturedProjects);

// GET /api/projects/slug/:slug
router.get("/slug/:slug", getProjectBySlug);

// =====================================================
// ADMIN ROUTES
// =====================================================

// GET /api/projects/all
// IMPORTANT:
// This MUST come before /:id
router.get("/all", protect, getAllProjects);

// =====================================================
// CREATE PROJECT
// POST /api/projects
// =====================================================

router.post(
  "/",
  protect,
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "images",
      maxCount: 10,
    },
  ]),
  createProject
);

// =====================================================
// REPLACE PROJECT MAIN IMAGE
// PUT /api/projects/:id/main-image
// =====================================================

router.put(
  "/:id/main-image",
  protect,
  upload.single("image"),
  replaceProjectMainImage
);

// =====================================================
// DELETE PROJECT GALLERY IMAGE
// DELETE /api/projects/:id/gallery
// =====================================================

router.delete(
  "/:id/gallery",
  protect,
  deleteProjectGalleryImage
);

// =====================================================
// UPDATE PROJECT
// PUT /api/projects/:id
// =====================================================

router.put(
  "/:id",
  protect,
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "images",
      maxCount: 10,
    },
  ]),
  updateProject
);

// =====================================================
// DELETE PROJECT
// DELETE /api/projects/:id
// =====================================================

router.delete(
  "/:id",
  protect,
  deleteProject
);

// =====================================================
// GET SINGLE PROJECT BY ID
// GET /api/projects/:id
//
// IMPORTANT:
// Keep this AFTER /all and the special /:id/... routes.
// =====================================================

router.get("/:id", getProjectById);

export default router;