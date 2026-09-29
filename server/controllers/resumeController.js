import Resume from "../models/Resume.js";

// =====================================================
// GET ACTIVE RESUME
// Public API
// GET /api/resume
// =====================================================

export const getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      isActive: true,
    }).sort({
      createdAt: -1,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    res.status(200).json({
      success: true,
      resume,
    });
  } catch (error) {
    console.error("Get resume error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while getting resume",
    });
  }
};

// =====================================================
// GET ALL RESUMES
// Admin API
// GET /api/resume/all
// =====================================================

export const getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: resumes.length,
      resumes,
    });
  } catch (error) {
    console.error("Get all resumes error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while getting resumes",
    });
  }
};

// =====================================================
// CREATE RESUME
// Admin API
// POST /api/resume
// =====================================================
export const createResume = async (req, res) => {
  try {
    const {
      title,
      url,
      version,
      downloadEnabled,
      isActive,
    } = req.body;

    // 1. Required field validation
    if (!title || (!req.file && !url)) {
      return res.status(400).json({
        success: false,
        message: "Resume title and URL are required",
      });
    }

    // 2. Check for duplicate resume
    const existingResume = await Resume.findOne({
      title: title.trim(),
      url: req.file ? `/uploads/resumes/${req.file.filename}` : url.trim(),
    });

    if (existingResume) {
      return res.status(409).json({
        success: false,
        message: "This resume already exists.",
      });
    }

    // 3. If this resume is active,
    // deactivate any previously active resume
    if (isActive !== false) {
      await Resume.updateMany(
        { isActive: true },
        { $set: { isActive: false } }
      );
    }

    // 4. Create new resume
    const resume = await Resume.create({
      title: title.trim(),
      url: url.trim(),
      version,
      downloadEnabled,
      isActive,
    });

    // 5. Success response
    res.status(201).json({
      success: true,
      message: "Resume created successfully",
      resume,
    });
  } catch (error) {
    console.error("Create resume error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while creating resume",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE RESUME
// Admin API
// PUT /api/resume/:id
// =====================================================

export const updateResume = async (req, res) => {
  try {
    const { id } = req.params;

    // If this resume becomes active,
    // deactivate other resumes
    if (req.body.isActive === true) {
      await Resume.updateMany(
        { _id: { $ne: id }, isActive: true },
        { $set: { isActive: false } }
      );
    }

    const resume = await Resume.findByIdAndUpdate(
      id,
      {
        ...req.body,
        ...(req.file && { url: `/uploads/resumes/${req.file.filename}` }),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Resume updated successfully",
      resume,
    });
  } catch (error) {
    console.error("Update resume error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while updating resume",
    });
  }
};

// =====================================================
// DELETE RESUME
// Admin API
// DELETE /api/resume/:id
// =====================================================

export const deleteResume = async (req, res) => {
  try {
    const { id } = req.params;

    const resume = await Resume.findByIdAndDelete(id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (error) {
    console.error("Delete resume error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while deleting resume",
    });
  }
};