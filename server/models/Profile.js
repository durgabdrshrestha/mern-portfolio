import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    // Personal information
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    // Professional title
    title: {
      type: String,
      required: [true, "Professional title is required"],
      trim: true,
    },

    // Short introduction
    shortBio: {
      type: String,
      required: [true, "Short bio is required"],
      trim: true,
    },

    // Detailed About section
    about: {
      type: String,
      required: [true, "About information is required"],
      trim: true,
    },

    // Profile image
    profileImage: {
      type: String,
      default: "",
      trim: true,
    },

    // Resume URL
    resumeUrl: {
      type: String,
      default: "",
      trim: true,
    },

    // Contact email
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },

    // Contact phone
    phone: {
      type: String,
      default: "",
      trim: true,
    },

    // Current location
    location: {
      type: String,
      default: "",
      trim: true,
    },

    // Availability status
    availableForWork: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;