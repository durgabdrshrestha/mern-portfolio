import express from "express";

import {
  createContactMessage,
  getContactMessages,
  getUnreadMessages,
  getContactMessageById,
  updateContactMessage,
  deleteContactMessage,
  replyToContactMessage,
} from "../controllers/contactController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// =====================================================
// PUBLIC ROUTE
// =====================================================

// Visitor sends contact message
router.post("/", createContactMessage);

// =====================================================
// ADMIN ROUTES
// =====================================================

// Get all messages
router.get("/", protect, getContactMessages);

// Get unread messages
router.get("/unread", protect, getUnreadMessages);

// Get single message
router.get("/:id", protect, getContactMessageById);

// Update message
router.put("/:id", protect, updateContactMessage);
router.post("/:id/reply", protect, replyToContactMessage);

// Delete message
router.delete("/:id", protect, deleteContactMessage);

export default router;