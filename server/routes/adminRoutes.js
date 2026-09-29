import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createAdminUser, deleteAdminUser, getAdminUsers, updateAdminUser } from "../controllers/adminUserController.js";

const router = express.Router();

// Protected admin test route
router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Protected admin route accessed successfully.",
    admin: {
      id: req.admin._id,
      name: req.admin.name,
      email: req.admin.email,
    },
  });
});

router.get("/users", protect, getAdminUsers);
router.post("/users", protect, createAdminUser);
router.put("/users/:id", protect, updateAdminUser);
router.delete("/users/:id", protect, deleteAdminUser);

export default router;