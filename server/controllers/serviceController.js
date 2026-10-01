import Service from "../models/Service.js";
import { uploadedFileUrl } from "../middleware/uploadMiddleware.js";

// Get active services for public portfolio
export const getServices = async (req, res) => {
  try {
    const services = await Service.find({
      isActive: true,
    }).sort({
      order: 1,
      createdAt: 1,
    });

    res.status(200).json({
      success: true,
      count: services.length,
      services,
    });
  } catch (error) {
    console.error("Get services error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while getting services",
    });
  }
};

// Get all services for admin
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({
      order: 1,
      createdAt: 1,
    });

    res.status(200).json({
      success: true,
      count: services.length,
      services,
    });
  } catch (error) {
    console.error("Get all services error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while getting all services",
    });
  }
};

// Create service
export const createService = async (req, res) => {
  try {
    const {
      title,
      shortDescription,
      description,
      icon,
      image,
      features,
      order,
      isActive,
    } = req.body;

    // Check required fields
    if (!title || !shortDescription || !description) {
      return res.status(400).json({
        success: false,
        message:
          "Title, short description and description are required",
      });
    }

    // Prevent duplicate service titles
    const existingService = await Service.findOne({
      title: title.trim(),
    });

    if (existingService) {
      return res.status(409).json({
        success: false,
        message: "This service already exists.",
      });
    }

    const service = await Service.create({
      title,
      shortDescription,
      description,
      icon,
      image: req.file ? uploadedFileUrl(req.file, "services") : image,
      features,
      order,
      isActive,
    });

    res.status(201).json({
      success: true,
      message: "Service created successfully",
      service,
    });
  } catch (error) {
    console.error("Create service error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while creating service",
      error: error.message,
    });
  }
};

// Update service
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findByIdAndUpdate(
      id,
      {
        ...req.body,
        ...(req.file && { image: uploadedFileUrl(req.file, "services") }),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service updated successfully",
      service,
    });
  } catch (error) {
    console.error("Update service error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while updating service",
    });
  }
};

// Delete service
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error("Delete service error:", error);

    res.status(500).json({
      success: false,
      message: "Service deleted successfully",
    });
  }
};