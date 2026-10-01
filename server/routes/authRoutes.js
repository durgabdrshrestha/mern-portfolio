import express from "express";
import { loginAdmin } from "../controllers/authController.js";
import { loginLimiter } from "../middleware/rateLimiters.js";

const router = express.Router();

// Admin login
router.post("/login", loginLimiter, loginAdmin);

export default router;