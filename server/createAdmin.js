import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "./models/Admin.js";

dotenv.config();

const createAdmin = async () => {
  const { MONGODB_URI, ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME } = process.env;

  if (!MONGODB_URI || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error("Set MONGODB_URI, ADMIN_EMAIL, and ADMIN_PASSWORD in server/.env before creating the admin.");
    process.exitCode = 1;
    return;
  }

  if (ADMIN_PASSWORD.length < 12) {
    console.error("ADMIN_PASSWORD must be at least 12 characters long.");
    process.exitCode = 1;
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);

    console.log("MongoDB connected");

    const existingAdmin = await Admin.findOne();

    if (existingAdmin) {
      console.log("Admin already exists.");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);

    const admin = await Admin.create({
      name: ADMIN_NAME || "Portfolio Admin",
      email: ADMIN_EMAIL,
      password: hashedPassword,
    });

    console.log("Admin created successfully.");
    console.log("Email:", admin.email);
  } catch (error) {
    console.error("Failed to create admin:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

createAdmin();