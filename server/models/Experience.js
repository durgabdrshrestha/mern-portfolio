import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    // Job position / title
    jobTitle: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },

    // Company or organization
    company: {
      type: String,
      required: [true, "Company or organization is required"],
      trim: true,
    },

    // Employment type
    employmentType: {
      type: String,
      enum: [
        "Full-time",
        "Part-time",
        "Contract",
        "Freelance",
        "Internship",
        "Volunteer",
      ],
      default: "Full-time",
    },

    // Work location
    location: {
      type: String,
      default: "",
      trim: true,
    },

    // Start date
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },

    // End date
    endDate: {
      type: Date,
      default: null,
    },

    // Whether this is the current job
    isCurrent: {
      type: Boolean,
      default: false,
    },

    // Job description
    description: {
      type: String,
      required: [true, "Job description is required"],
      trim: true,
    },

    // Responsibilities
    responsibilities: [
      {
        type: String,
        trim: true,
      },
    ],

    // Technologies / skills used
    technologies: [
      {
        type: String,
        trim: true,
      },
    ],

    // Company logo/image
    companyImage: {
      type: String,
      default: "",
      trim: true,
    },

    // Company website
    companyWebsite: {
      type: String,
      default: "",
      trim: true,
    },

    // Display order
    order: {
      type: Number,
      default: 0,
    },

    // Show/hide experience
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Experience = mongoose.model(
  "Experience",
  experienceSchema
);

export default Experience;