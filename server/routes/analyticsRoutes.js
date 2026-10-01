import express from "express";

import { getAnalyticsSummary, recordPageView } from "../controllers/analyticsController.js";
import { protect } from "../middleware/authMiddleware.js";
import { pageViewLimiter } from "../middleware/rateLimiters.js";

const router = express.Router();

router.post("/visit", pageViewLimiter, recordPageView);
router.get("/summary", protect, getAnalyticsSummary);

export default router;