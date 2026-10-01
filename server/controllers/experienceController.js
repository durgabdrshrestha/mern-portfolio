import Experience from "../models/Experience.js";
import { uploadedFileUrl } from "../middleware/uploadMiddleware.js";

// Get active experiences for public portfolio
export const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find({
      isActive: true,
    }).sort({
      order: 1,
      startDate: -1,
    });

    res.status(200).json({
      success: true,
      count: experiences.length,
      experiences,
    });
  } catch (error) {
    console.error("Get experiences error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while getting experiences",
    });
  }
};

// Get all experiences for admin
export const getAllExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({
      order: 1,
      startDate: -1,
    });

    res.status(200).json({
      success: true,
      count: experiences.length,
      experiences,
    });
  } catch (error) {
    console.error("Get all experiences error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while getting all experiences",
    });
  }
};

// Create experience
export const createExperience = async (req, res) => {
  try {
    const {
      jobTitle,
      company,
      employmentType,
      location,
      startDate,
      endDate,
      isCurrent,
      description,
      responsibilities,
      technologies,
      companyImage,
      companyWebsite,
      order,
      isActive,
    } = req.body;

    const isCurrentJob = isCurrent === true || isCurrent === "true";

    // Validate required fields
    if (!jobTitle || !company || !startDate || !description) {
      return res.status(400).json({
        success: false,
        message:
          "Job title, company, start date and description are required",
      });
    }

    // If current job, end date should be empty
    if (isCurrentJob && endDate) {
      return res.status(400).json({
        success: false,
        message:
          "Current experience should not have an end date",
      });
    }

    const experience = await Experience.create({
      jobTitle,
      company,
      employmentType,
      location,
      startDate,
      endDate: isCurrentJob ? null : endDate,
      isCurrent: isCurrentJob,
      description,
      responsibilities,
      technologies,
      companyImage: req.file ? uploadedFileUrl(req.file, "experience") : companyImage,
      companyWebsite,
      order,
      isActive,
    });

    res.status(201).json({
      success: true,
      message: "Experience created successfully",
      experience,
    });
  } catch (error) {
    console.error("Create experience error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while creating experience",
      error: error.message,
    });
  }
};

// Update experience
export const updateExperience = async (req, res) => {
  try {
    const { id } = req.params;

    const experience = await Experience.findById(id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    // Prevent current experience from having end date
    const updateData = {
      ...req.body,
      ...(req.file && { companyImage: uploadedFileUrl(req.file, "experience") }),
      ...(req.body.isCurrent !== undefined && {
        isCurrent: req.body.isCurrent === "true" || req.body.isCurrent === true,
      }),
    };
    if (updateData.isCurrent) updateData.endDate = null;

    const updatedExperience =
      await Experience.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );

    res.status(200).json({
      success: true,
      message: "Experience updated successfully",
      experience: updatedExperience,
    });
  } catch (error) {
    console.error("Update experience error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while updating experience",
    });
  }
};

// Delete experience
export const deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;

    const experience =
      await Experience.findByIdAndDelete(id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Experience deleted successfully",
    });
  } catch (error) {
    console.error("Delete experience error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while deleting experience",
    });
  }
};