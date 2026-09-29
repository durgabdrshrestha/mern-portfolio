import mongoose from "mongoose";

const privacyPolicySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Privacy Policy",
      trim: true,
    },
    slug: {
      type: String,
      default: "privacy-policy",
      trim: true,
      lowercase: true,
    },
    summary: {
      type: String,
      default: "",
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Privacy policy content is required"],
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const PrivacyPolicy = mongoose.model("PrivacyPolicy", privacyPolicySchema);

export default PrivacyPolicy;
