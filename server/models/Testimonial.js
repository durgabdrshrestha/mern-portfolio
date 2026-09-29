import mongoose from "mongoose";

// Testimonial schema
const testimonialSchema = new mongoose.Schema(
  {
    // Person's name
    name: {
      type: String,
      required: [true, "Testimonial name is required"],
      trim: true,
    },

    // Person's professional role
    role: {
      type: String,
      default: "",
      trim: true,
    },

    // Company / organization
    company: {
      type: String,
      default: "",
      trim: true,
    },

    // Person's profile image
    image: {
      type: String,
      default: "",
      trim: true,
    },

    // Testimonial message
    message: {
      type: String,
      required: [true, "Testimonial message is required"],
      trim: true,
    },

    // Rating from 1 to 5
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },

    // Type of relationship
    relationship: {
      type: String,
      enum: [
        "Client",
        "Employer",
        "Colleague",
        "Student",
        "Friend",
        "Other",
      ],
      default: "Client",
    },

    // LinkedIn / personal website
    website: {
      type: String,
      default: "",
      trim: true,
    },

    // Show in featured testimonials
    isFeatured: {
      type: Boolean,
      default: false,
    },

    // Display order
    order: {
      type: Number,
      default: 0,
    },

    // Show/hide testimonial
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create Testimonial model
const Testimonial = mongoose.model(
  "Testimonial",
  testimonialSchema
);

export default Testimonial;