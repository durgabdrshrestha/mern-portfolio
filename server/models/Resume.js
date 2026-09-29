import mongoose from "mongoose";

// Resume schema
const resumeSchema = new mongoose.Schema(
  {
    // Resume title
    title: {
      type: String,
      required: [true, "Resume title is required"],
      trim: true,
    },

    // Resume file URL/path
    url: {
      type: String,
      required: [true, "Resume URL is required"],
      trim: true,
    },

    // Version label
    version: {
      type: String,
      default: "1.0",
      trim: true,
    },

    // Allow visitors to download
    downloadEnabled: {
      type: Boolean,
      default: true,
    },

    // Active resume
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create Resume model
const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;