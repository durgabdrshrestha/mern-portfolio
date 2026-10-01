import Testimonial from "../models/Testimonial.js";
import { uploadedFileUrl } from "../middleware/uploadMiddleware.js";

// =====================================================
// GET ACTIVE TESTIMONIALS
// Public API
// GET /api/testimonials
// =====================================================

export const getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find({
            isActive: true,
        }).sort({
            order: 1,
            createdAt: -1,
        });

        res.status(200).json({
            success: true,
            count: testimonials.length,
            testimonials,
        });
    } catch (error) {
        console.error("Get testimonials error:", error);

        res.status(500).json({
            success: false,
            message: "Server error while getting testimonials",
        });
    }
};

// =====================================================
// GET FEATURED TESTIMONIALS
// Public API
// GET /api/testimonials/featured
// =====================================================

export const getFeaturedTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find({
            isActive: true,
            isFeatured: true,
        }).sort({
            order: 1,
            createdAt: -1,
        });

        res.status(200).json({
            success: true,
            count: testimonials.length,
            testimonials,
        });
    } catch (error) {
        console.error(
            "Get featured testimonials error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Server error while getting featured testimonials",
        });
    }
};

// =====================================================
// GET ALL TESTIMONIALS
// Admin API
// GET /api/testimonials/all
// =====================================================

export const getAllTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find().sort({
            order: 1,
            createdAt: -1,
        });

        res.status(200).json({
            success: true,
            count: testimonials.length,
            testimonials,
        });
    } catch (error) {
        console.error(
            "Get all testimonials error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Server error while getting all testimonials",
        });
    }
};

// =====================================================
// CREATE TESTIMONIAL
// Admin API
// POST /api/testimonials
// =====================================================

export const createTestimonial = async (req, res) => {
    try {
        const {
            name,
            role,
            company,
            image,
            message,
            rating,
            relationship,
            website,
            isFeatured,
            order,
            isActive,
        } = req.body;

        // Validate required fields
        if (!name || !message) {
            return res.status(400).json({
                success: false,
                message: "Name and testimonial message are required",
            });
        }

        // Check for duplicate testimonial
        const existingTestimonial = await Testimonial.findOne({
            name: name.trim(),
            company: company ? company.trim() : "",
            message: message.trim(),
        });

        if (existingTestimonial) {
            return res.status(409).json({
                success: false,
                message: "This testimonial already exists.",
            });
        }

        // Create testimonial
        const testimonial = await Testimonial.create({
            name,
            role,
            company,
            image: req.file ? uploadedFileUrl(req.file, "testimonials") : image,
            message,
            rating,
            relationship,
            website,
            isFeatured,
            order,
            isActive,
        });

        res.status(201).json({
            success: true,
            message: "Testimonial created successfully",
            testimonial,
        });
    } catch (error) {
        console.error("Create testimonial error:", error);

        res.status(500).json({
            success: false,
            message: "Server error while creating testimonial",
            error: error.message,
        });
    }
};
// =====================================================
// UPDATE TESTIMONIAL
// Admin API
// PUT /api/testimonials/:id
// =====================================================

export const updateTestimonial = async (req, res) => {
    try {
        const { id } = req.params;

        const testimonial =
            await Testimonial.findByIdAndUpdate(
                id,
                {
                    ...req.body,
                    ...(req.file && { image: uploadedFileUrl(req.file, "testimonials") }),
                },
                {
                    new: true,
                    runValidators: true,
                }
            );

        if (!testimonial) {
            return res.status(404).json({
                success: false,
                message: "Testimonial not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Testimonial updated successfully",
            testimonial,
        });
    } catch (error) {
        console.error(
            "Update testimonial error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Server error while updating testimonial",
        });
    }
};

// =====================================================
// DELETE TESTIMONIAL
// Admin API
// DELETE /api/testimonials/:id
// =====================================================

export const deleteTestimonial = async (req, res) => {
    try {
        const { id } = req.params;

        const testimonial =
            await Testimonial.findByIdAndDelete(id);

        if (!testimonial) {
            return res.status(404).json({
                success: false,
                message: "Testimonial not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Testimonial deleted successfully",
        });
    } catch (error) {
        console.error(
            "Delete testimonial error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Server error while deleting testimonial",
        });
    }
};