import express from "express";

import {
  getPrivacyPolicy,
  getAllPrivacyPolicies,
  createPrivacyPolicy,
  updatePrivacyPolicy,
  deletePrivacyPolicy,
} from "../controllers/privacyController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getPrivacyPolicy);
router.get("/all", protect, getAllPrivacyPolicies);
router.post("/", protect, createPrivacyPolicy);
router.put("/:id", protect, updatePrivacyPolicy);
router.delete("/:id", protect, deletePrivacyPolicy);

export default router;