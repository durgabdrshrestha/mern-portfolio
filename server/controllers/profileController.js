import Profile from "../models/Profile.js";
import { uploadedFileUrl } from "../middleware/uploadMiddleware.js";

// Get portfolio profile
export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    console.error("Get profile error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while getting profile",
    });
  }
};

// Create portfolio profile
export const createProfile = async (req, res) => {
  try {
    // Check whether profile already exists
    const existingProfile = await Profile.findOne();

    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: "Profile already exists. Use update instead.",
      });
    }

    const uploadedFiles = req.files || {};
    const profile = await Profile.create({
      ...req.body,
      profileImage: uploadedFiles.profileImage?.[0]
        ? uploadedFileUrl(uploadedFiles.profileImage[0], "profile")
        : req.body.profileImage,
      homeImage: uploadedFiles.homeImage?.[0]
        ? uploadedFileUrl(uploadedFiles.homeImage[0], "profile")
        : req.body.homeImage,
      aboutImage: uploadedFiles.aboutImage?.[0]
        ? uploadedFileUrl(uploadedFiles.aboutImage[0], "profile")
        : req.body.aboutImage,
      availableForWork: req.body.availableForWork === "true" || req.body.availableForWork === true,
    });

    res.status(201).json({
      success: true,
      message: "Profile created successfully",
      profile,
    });
  } catch (error) {
    console.error("Create profile error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while creating profile",
      error: error.message,
    });
  }
};

// Update portfolio profile
export const updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    const uploadedFiles = req.files || {};
    const updateData = {
      ...req.body,
      ...(uploadedFiles.profileImage?.[0] && {
        profileImage: uploadedFileUrl(uploadedFiles.profileImage[0], "profile"),
      }),
      ...(uploadedFiles.homeImage?.[0] && {
        homeImage: uploadedFileUrl(uploadedFiles.homeImage[0], "profile"),
      }),
      ...(uploadedFiles.aboutImage?.[0] && {
        aboutImage: uploadedFileUrl(uploadedFiles.aboutImage[0], "profile"),
      }),
      ...(req.body.availableForWork !== undefined && {
        availableForWork: req.body.availableForWork === "true" || req.body.availableForWork === true,
      }),
    };

    const updatedProfile = await Profile.findByIdAndUpdate(
      profile._id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profile: updatedProfile,
    });
  } catch (error) {
    console.error("Update profile error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while updating profile",
      error: error.message,
    });
  }
};