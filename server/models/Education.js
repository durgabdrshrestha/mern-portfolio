import mongoose from "mongoose";

// Education schema
const educationSchema = new mongoose.Schema(
  {
    // Degree or qualification name
    degree: {
      type: String,
      required: [true, "Degree or qualification is required"],
      trim: true,
    },

    // Institution / college / university
    institution: {
      type: String,
      required: [true, "Institution is required"],
      trim: true,
    },

    // Field of study
    fieldOfStudy: {
      type: String,
      default: "",
      trim: true,
    },

    // Institution location
    location: {
      type: String,
      default: "",
      trim: true,
    },

    // Education start date
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },

    // Education completion date
    endDate: {
      type: Date,
      default: null,
    },

    // True if currently studying
    isCurrent: {
      type: Boolean,
      default: false,
    },

    // Description of education
    description: {
      type: String,
      default: "",
      trim: true,
    },

    // Achievements / certifications / highlights
    achievements: [
      {
        type: String,
        trim: true,
      },
    ],

    // Institution logo or image URL
    institutionImage: {
      type: String,
      default: "",
      trim: true,
    },

    // Institution website
    institutionWebsite: {
      type: String,
      default: "",
      trim: true,
    },

    // Display order
    order: {
      type: Number,
      default: 0,
    },

    // Show/hide education
    isActive: {
      type: Boolean,
      default: true,
    },
  },

  {
    // Automatically creates createdAt and updatedAt
    timestamps: true,
  }
);

// Create Education model
const Education = mongoose.model("Education", educationSchema);

export default Education;