import mongoose from "mongoose";

// Social link schema
const socialLinkSchema = new mongoose.Schema(
  {
    // Platform name
    platform: {
      type: String,
      required: [true, "Platform name is required"],
      trim: true,
    },

    // URL of social profile
    url: {
      type: String,
      required: [true, "Social link URL is required"],
      trim: true,
    },

    // React Icons icon name
    icon: {
      type: String,
      default: "",
      trim: true,
    },

    // Optional username
    username: {
      type: String,
      default: "",
      trim: true,
    },

    // Display order
    order: {
      type: Number,
      default: 0,
    },

    // Show/hide social link
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create SocialLink model
const SocialLink = mongoose.model(
  "SocialLink",
  socialLinkSchema
);

export default SocialLink;