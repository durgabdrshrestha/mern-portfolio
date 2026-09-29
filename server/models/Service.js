import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    // Service title
    title: {
      type: String,
      required: [true, "Service title is required"],
      trim: true,
    },

    // Short description
    shortDescription: {
      type: String,
      required: [true, "Short description is required"],
      trim: true,
    },

    // Full service description
    description: {
      type: String,
      required: [true, "Service description is required"],
      trim: true,
    },

    // Icon name
    // Example: FaCode, FaTools, FaRobot
    icon: {
      type: String,
      default: "",
      trim: true,
    },

    // Service image URL/path
    image: {
      type: String,
      default: "",
      trim: true,
    },

    // Service features
    features: [
      {
        type: String,
        trim: true,
      },
    ],

    // Display order
    order: {
      type: Number,
      default: 0,
    },

    // Show/hide service
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model("Service", serviceSchema);

export default Service;