import SocialLink from "../models/SocialLink.js";

// =====================================================
// GET ACTIVE SOCIAL LINKS
// Public API
// GET /api/social-links
// =====================================================

export const getSocialLinks = async (req, res) => {
  try {
    const socialLinks = await SocialLink.find({
      isActive: true,
    }).sort({
      order: 1,
      createdAt: 1,
    });

    res.status(200).json({
      success: true,
      count: socialLinks.length,
      socialLinks,
    });
  } catch (error) {
    console.error("Get social links error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while getting social links",
    });
  }
};

// =====================================================
// GET ALL SOCIAL LINKS
// Admin API
// GET /api/social-links/all
// =====================================================

export const getAllSocialLinks = async (req, res) => {
  try {
    const socialLinks = await SocialLink.find().sort({
      order: 1,
      createdAt: 1,
    });

    res.status(200).json({
      success: true,
      count: socialLinks.length,
      socialLinks,
    });
  } catch (error) {
    console.error(
      "Get all social links error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Server error while getting all social links",
    });
  }
};

// =====================================================
// CREATE SOCIAL LINK
// Admin API
// POST /api/social-links
// =====================================================

export const createSocialLink = async (req, res) => {
  try {
    const {
      platform,
      url,
      icon,
      username,
      order,
      isActive,
    } = req.body;

    // Validate required fields
    if (!platform || !url) {
      return res.status(400).json({
        success: false,
        message:
          "Platform name and URL are required",
      });
    }

    // Prevent duplicate platform
    const existingLink = await SocialLink.findOne({
      platform: platform.trim(),
    });

    if (existingLink) {
      return res.status(409).json({
        success: false,
        message:
          "This social platform already exists.",
      });
    }

    const socialLink = await SocialLink.create({
      platform,
      url,
      icon,
      username,
      order,
      isActive,
    });

    res.status(201).json({
      success: true,
      message: "Social link created successfully",
      socialLink,
    });
  } catch (error) {
    console.error(
      "Create social link error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Server error while creating social link",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE SOCIAL LINK
// Admin API
// PUT /api/social-links/:id
// =====================================================

export const updateSocialLink = async (req, res) => {
  try {
    const { id } = req.params;

    // Check duplicate platform during update
    if (req.body.platform) {
      const existingLink = await SocialLink.findOne({
        platform: req.body.platform.trim(),
        _id: { $ne: id },
      });

      if (existingLink) {
        return res.status(409).json({
          success: false,
          message:
            "This social platform already exists.",
        });
      }
    }

    const socialLink =
      await SocialLink.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!socialLink) {
      return res.status(404).json({
        success: false,
        message: "Social link not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Social link updated successfully",
      socialLink,
    });
  } catch (error) {
    console.error(
      "Update social link error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Server error while updating social link",
    });
  }
};

// =====================================================
// DELETE SOCIAL LINK
// Admin API
// DELETE /api/social-links/:id
// =====================================================

export const deleteSocialLink = async (req, res) => {
  try {
    const { id } = req.params;

    const socialLink =
      await SocialLink.findByIdAndDelete(id);

    if (!socialLink) {
      return res.status(404).json({
        success: false,
        message: "Social link not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Social link deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete social link error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Server error while deleting social link",
    });
  }
};