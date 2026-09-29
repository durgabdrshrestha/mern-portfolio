import Skill from "../models/Skill.js";

// Get all active skills
export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find({ isActive: true })
      .sort({ order: 1, createdAt: 1 });

    res.status(200).json({
      success: true,
      count: skills.length,
      skills,
    });
  } catch (error) {
    console.error("Get skills error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while getting skills",
    });
  }
};

// Get all skills for admin
export const getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find()
      .sort({ order: 1, createdAt: 1 });

    res.status(200).json({
      success: true,
      count: skills.length,
      skills,
    });
  } catch (error) {
    console.error("Get all skills error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while getting all skills",
    });
  }
};

// Create skill
export const createSkill = async (req, res) => {
  try {
    const { name } = req.body;

    // Check for duplicate skill
    const existingSkill = await Skill.findOne({
      name: name.trim(),
    });

    if (existingSkill) {
      return res.status(409).json({
        success: false,
        message: "This skill already exists.",
      });
    }

    const skill = await Skill.create(req.body);

    res.status(201).json({
      success: true,
      message: "Skill created successfully",
      skill,
    });
  } catch (error) {
    console.error("Create skill error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while creating skill",
      error: error.message,
    });
  }
};
// Update skill
export const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const skill = await Skill.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Skill updated successfully",
      skill,
    });
  } catch (error) {
    console.error("Update skill error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while updating skill",
      error: error.message,
    });
  }
};

// Delete skill
export const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const skill = await Skill.findByIdAndDelete(id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Skill deleted successfully",
    });
  } catch (error) {
    console.error("Delete skill error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while deleting skill",
    });
  }
};