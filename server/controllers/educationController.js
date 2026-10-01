import Education from "../models/Education.js";
import { uploadedFileUrl } from "../middleware/uploadMiddleware.js";

// =====================================================
// GET ACTIVE EDUCATION
// Public API
// GET /api/education
// =====================================================

export const getEducations = async (req, res) => {
  try {
    const educations = await Education.find({
      isActive: true,
    }).sort({
      order: 1,
      startDate: -1,
    });

    res.status(200).json({
      success: true,
      count: educations.length,
      educations,
    });
  } catch (error) {
    console.error("Get education error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while getting education",
    });
  }
};

// =====================================================
// GET ALL EDUCATION
// Admin API
// GET /api/education/all
// =====================================================

export const getAllEducations = async (req, res) => {
  try {
    const educations = await Education.find().sort({
      order: 1,
      startDate: -1,
    });

    res.status(200).json({
      success: true,
      count: educations.length,
      educations,
    });
  } catch (error) {
    console.error("Get all education error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while getting all education",
    });
  }
};

// =====================================================
// CREATE EDUCATION
// Admin API
// POST /api/education
// =====================================================

export const createEducation = async (req, res) => {
  try {
    const {
      degree,
      institution,
      fieldOfStudy,
      location,
      startDate,
      endDate,
      isCurrent,
      description,
      achievements,
      institutionImage,
      institutionWebsite,
      order,
      isActive,
    } = req.body;

    const isCurrentStudy = isCurrent === true || isCurrent === "true";

    // Validate required fields
    if (!degree || !institution || !startDate) {
      return res.status(400).json({
        success: false,
        message:
          "Degree, institution and start date are required",
      });
    }

    // Check if the same education already exists
    const existingEducation = await Education.findOne({
      degree: degree.trim(),
      institution: institution.trim(),
    });

    if (existingEducation) {
      return res.status(409).json({
        success: false,
        message: "This education record already exists.",
      });
    }

    // Current education should not have an end date
    if (isCurrentStudy && endDate) {
      return res.status(400).json({
        success: false,
        message:
          "Current education cannot have an end date.",
      });
    }

    // Create education
    const education = await Education.create({
      degree,
      institution,
      fieldOfStudy,
      location,
      startDate,
      endDate: isCurrentStudy ? null : endDate,
      isCurrent: isCurrentStudy,
      description,
      achievements,
      institutionImage: req.file ? uploadedFileUrl(req.file, "education") : institutionImage,
      institutionWebsite,
      order,
      isActive,
    });

    res.status(201).json({
      success: true,
      message: "Education created successfully",
      education,
    });
  } catch (error) {
    console.error("Create education error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while creating education",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE EDUCATION
// Admin API
// PUT /api/education/:id
// =====================================================

export const updateEducation = async (req, res) => {
  try {
    const { id } = req.params;

    // If education is current, remove end date
    const updateData = {
      ...req.body,
      ...(req.file && { institutionImage: uploadedFileUrl(req.file, "education") }),
      ...(req.body.isCurrent !== undefined && {
        isCurrent: req.body.isCurrent === "true" || req.body.isCurrent === true,
      }),
    };
    if (updateData.isCurrent) updateData.endDate = null;

    const education = await Education.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    // Education not found
    if (!education) {
      return res.status(404).json({
        success: false,
        message: "Education record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Education updated successfully",
      education,
    });
  } catch (error) {
    console.error("Update education error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while updating education",
    });
  }
};

// =====================================================
// DELETE EDUCATION
// Admin API
// DELETE /api/education/:id
// =====================================================

export const deleteEducation = async (req, res) => {
  try {
    const { id } = req.params;

    const education = await Education.findByIdAndDelete(id);

    // Education not found
    if (!education) {
      return res.status(404).json({
        success: false,
        message: "Education record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Education deleted successfully",
    });
  } catch (error) {
    console.error("Delete education error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while deleting education",
    });
  }
};