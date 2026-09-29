import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import Admin from "../models/Admin.js";

const toPublicAdmin = (admin) => ({
  id: admin._id,
  name: admin.name,
  email: admin.email,
  createdAt: admin.createdAt,
});

export const getAdminUsers = async (req, res) => {
  const admins = await Admin.find().sort({ createdAt: 1 });
  res.json({ success: true, users: admins.map(toPublicAdmin) });
};

export const createAdminUser = async (req, res) => {
  try {
    const name = req.body.name?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Name, email, and password are required." });
    }
    if (password.length < 12) {
      return res.status(400).json({ success: false, message: "Use a password with at least 12 characters." });
    }

    const admin = await Admin.create({ name, email, password: await bcrypt.hash(password, 10) });
    return res.status(201).json({ success: true, user: toPublicAdmin(admin) });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: "An admin with this email already exists." });
    }
    return res.status(500).json({ success: false, message: "Unable to create admin account." });
  }
};

export const updateAdminUser = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ success: false, message: "Admin account not found." });
    }

    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(404).json({ success: false, message: "Admin account not found." });

    const name = req.body.name?.trim();
    const email = req.body.email?.trim().toLowerCase();
    if (!name || !email) {
      return res.status(400).json({ success: false, message: "Name and email are required." });
    }
    if (req.body.password && req.body.password.length < 12) {
      return res.status(400).json({ success: false, message: "Use a password with at least 12 characters." });
    }

    admin.name = name;
    admin.email = email;
    if (req.body.password) admin.password = await bcrypt.hash(req.body.password, 10);
    await admin.save();
    return res.json({ success: true, user: toPublicAdmin(admin) });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: "An admin with this email already exists." });
    }
    return res.status(500).json({ success: false, message: "Unable to update admin account." });
  }
};

export const deleteAdminUser = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ success: false, message: "Admin account not found." });
    }
    if (String(req.admin._id) === req.params.id) {
      return res.status(400).json({ success: false, message: "You cannot delete the account you are using." });
    }
    if (await Admin.countDocuments() <= 1) {
      return res.status(400).json({ success: false, message: "The last admin account cannot be deleted." });
    }

    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) return res.status(404).json({ success: false, message: "Admin account not found." });
    return res.json({ success: true, message: "Admin account deleted." });
  } catch {
    return res.status(500).json({ success: false, message: "Unable to delete admin account." });
  }
};