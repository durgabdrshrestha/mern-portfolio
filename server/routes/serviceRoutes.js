import express from "express";

import {
  getServices,
  getAllServices,
  createService,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";

import { protect } from "../middleware/authMiddleware.js";
import { imageUpload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Public
router.get("/", getServices);

// Admin
router.get("/all", protect, getAllServices);

router.post("/", protect, imageUpload("services").single("image"), createService);

router.put("/:id", protect, imageUpload("services").single("image"), updateService);

router.delete("/:id", protect, deleteService);

export default router;