import mongoose from "mongoose";

// Project schema
const projectSchema = new mongoose.Schema(
  {
    // Project name
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },

    // SEO-friendly project URL
    slug: {
      type: String,
      required: [true, "Project slug is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },

    // Short project summary
    shortDescription: {
      type: String,
      required: [true, "Short description is required"],
      trim: true,
    },

    // Full project description
    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
    },

    // Main project image
    image: {
      type: String,
      default: "",
      trim: true,
    },

    // Additional project images
    images: [
      {
        type: String,
        trim: true,
      },
    ],

    // Technologies used in the project
    technologies: [
      {
        type: String,
        trim: true,
      },
    ],

    // Project category
    category: {
      type: String,
      default: "Web Development",
      trim: true,
    },

    // GitHub repository URL
    githubUrl: {
      type: String,
      default: "",
      trim: true,
    },

    // Live project URL
    liveUrl: {
      type: String,
      default: "",
      trim: true,
    },

    // Client, personal, blog, freelance, or other project
    projectType: {
      type: String,
      enum: [
        "Personal",
        "Client",
        "Freelance",
        "Practice",
        "Open Source",
        "Blog",
        "Other",
      ],
      default: "Personal",
    },

    // Project completion date
    completionDate: {
      type: Date,
      default: null,
    },

    // Project features
    features: [
      {
        type: String,
        trim: true,
      },
    ],

    // Development challenges
    challenges: [
      {
        type: String,
        trim: true,
      },
    ],

    // Project status
    status: {
      type: String,
      enum: [
        "Completed",
        "In Progress",
        "Planned",
        "Maintenance",
      ],
      default: "Completed",
    },

    // Show this project in featured section
    isFeatured: {
      type: Boolean,
      default: false,
    },

    // Display order
    order: {
      type: Number,
      default: 0,
    },

    // Show/hide project publicly
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create Project model
const Project = mongoose.model("Project", projectSchema);

export default Project;