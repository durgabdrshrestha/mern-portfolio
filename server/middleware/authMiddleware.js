import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

// Protect admin routes using JWT
export const protect = async (req, res, next) => {
  try {
    // Get Authorization header
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. No token provided.",
      });
    }

    // Extract token from:
    // Authorization: Bearer TOKEN
    const token = authHeader.split(" ")[1];

    // Verify JWT token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Find admin using ID stored inside JWT
    const admin = await Admin.findById(decoded.id);

    // Check if admin still exists
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Admin account not found.",
      });
    }

    // Attach admin information to request
    req.admin = admin;

    // Continue to protected route
    next();
  } catch (error) {
    console.error("JWT authentication error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Not authorized. Invalid or expired token.",
    });
  }
};