import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    // Skill name
    name: {
      type: String,
      required: [true, "Skill name is required"],
      unique: true,
      trim: true,
    },

    // Skill category
    category: {
      type: String,
      required: [true, "Skill category is required"],
      trim: true,
    },

    // Skill proficiency percentage
    proficiency: {
      type: Number,
      required: [true, "Proficiency is required"],
      min: 0,
      max: 100,
    },

    // Optional icon name
    icon: {
      type: String,
      default: "",
      trim: true,
    },

    // Controls display order
    order: {
      type: Number,
      default: 0,
    },

    // Show/hide skill
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Skill = mongoose.model("Skill", skillSchema);

export default Skill;