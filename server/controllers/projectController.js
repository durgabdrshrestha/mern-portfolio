import Project from "../models/Project.js";
import { deleteUploadedFile } from "../utils/deleteFile.js";
import { uploadedFileUrl } from "../middleware/uploadMiddleware.js";
// =====================================================
// GET ACTIVE PROJECTS
// Public API
// GET /api/projects
// =====================================================

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      isActive: true,
    }).sort({
      order: 1,
      completionDate: -1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    console.error("Get projects error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while getting projects",
    });
  }
};

// =====================================================
// GET FEATURED PROJECTS
// Public API
// GET /api/projects/featured
// =====================================================

export const getFeaturedProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      isActive: true,
      isFeatured: true,
    }).sort({
      order: 1,
      completionDate: -1,
    });

    res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    console.error("Get featured projects error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while getting featured projects",
    });
  }
};

// =====================================================
// GET SINGLE PROJECT BY ID
// Public API
// GET /api/projects/:id
// =====================================================

export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findOne({
      _id: id,
      isActive: true,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error("Get project by ID error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while getting project",
    });
  }
};

// =====================================================
// GET SINGLE PROJECT BY SLUG
// Public API
// GET /api/projects/slug/:slug
// =====================================================

export const getProjectBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const project = await Project.findOne({
      slug: slug.trim().toLowerCase(),
      isActive: true,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error("Get project by slug error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while getting project",
    });
  }
};

// =====================================================
// GET ALL PROJECTS
// Admin API
// GET /api/projects/all
// =====================================================

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({
      order: 1,
      completionDate: -1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    console.error("Get all projects error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while getting all projects",
    });
  }
};

// =====================================================
// CREATE PROJECT
// Admin API
// POST /api/projects
// =====================================================

export const createProject = async (req, res) => {
  try {
    const {
      title,
      slug,
      shortDescription,
      description,
      images,
      technologies,
      category,
      githubUrl,
      liveUrl,
      projectType,
      completionDate,
      features,
      challenges,
      status,
      isFeatured,
      order,
      isActive,
    } = req.body;

    // =====================================================
    // REQUIRED FIELDS
    // =====================================================

    if (
      !title ||
      !slug ||
      !shortDescription ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Title, slug, short description and description are required",
      });
    }

    // =====================================================
    // CHECK DUPLICATE SLUG
    // =====================================================

    const existingSlug = await Project.findOne({
      slug: slug.trim().toLowerCase(),
    });

    if (existingSlug) {
      return res.status(409).json({
        success: false,
        message: "This project slug already exists.",
      });
    }

    // =====================================================
    // MAIN PROJECT IMAGE
    // =====================================================

    let image = "";

    if (req.files?.image?.length > 0) {
      image = uploadedFileUrl(req.files.image[0], "projects");
    }

    // =====================================================
    // PROJECT GALLERY IMAGES
    // =====================================================

    const galleryImages = [];

    if (req.files?.images?.length > 0) {
      req.files.images.forEach((file) => {
        galleryImages.push(uploadedFileUrl(file, "projects"));
      });
    }
    // =====================================================
    // CREATE PROJECT
    // =====================================================

    const project = await Project.create({
      title,
      slug: slug.trim().toLowerCase(),
      shortDescription,
      description,

      // Uploaded main image
      image,

      // Additional images - gallery later
      images: galleryImages,

      technologies,
      category,
      githubUrl,
      liveUrl,
      projectType,
      completionDate,
      features,
      challenges,
      status,
      isFeatured,
      order,
      isActive,
    });

    // =====================================================
    // RESPONSE
    // =====================================================

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    console.error("Create project error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while creating project",
      error: error.message,
    });
  }
};
// =====================================================
// UPDATE PROJECT
// Admin API
// PUT /api/projects/:id
// =====================================================

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    // =====================================================
    // FIND EXISTING PROJECT
    // =====================================================

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // =====================================================
    // CHECK DUPLICATE SLUG
    // =====================================================

    if (req.body.slug) {
      const newSlug = req.body.slug.trim().toLowerCase();

      const existingProject = await Project.findOne({
        slug: newSlug,
        _id: { $ne: id },
      });

      if (existingProject) {
        return res.status(409).json({
          success: false,
          message: "This project slug already exists.",
        });
      }

      req.body.slug = newSlug;
    }

    // =====================================================
    // HANDLE NEW IMAGE
    // =====================================================

    const mainImage = req.files?.image?.[0];
    if (mainImage) {
      await deleteUploadedFile(project.image);

      req.body.image = uploadedFileUrl(mainImage, "projects");
    }

    if (req.files?.images?.length) {
      req.body.images = [
        ...project.images,
        ...req.files.images.map((file) => uploadedFileUrl(file, "projects")),
      ];
    }

    // =====================================================
    // UPDATE PROJECT
    // =====================================================

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (error) {
    console.error("Update project error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while updating project",
      error: error.message,
    });
  }
};

// =====================================================
// DELETE PROJECT
// Admin API
// DELETE /api/projects/:id
// =====================================================

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    await Promise.all([
      deleteUploadedFile(project.image),
      ...project.images.map((image) => deleteUploadedFile(image)),
    ]);

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Delete project error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while deleting project",
      error: error.message,
    });
  }
};

// =====================================================
// DELETE PROJECT GALLERY IMAGE
// Admin API
// DELETE /api/projects/:id/gallery
// =====================================================

export const deleteProjectGalleryImage = async (
  req,
  res
) => {
  try {
    const { id } = req.params;
    const { imageUrl } = req.body;

    // Validate image URL
    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Gallery image URL is required",
      });
    }

    // Find project
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Check whether image exists in gallery
    const imageExists = project.images.includes(
      imageUrl
    );

    if (!imageExists) {
      return res.status(404).json({
        success: false,
        message: "Gallery image not found",
      });
    }

    // Remove image URL from MongoDB array
    project.images = project.images.filter(
      (image) => image !== imageUrl
    );

    await project.save();

    // Delete physical file
    await deleteUploadedFile(imageUrl);

    res.status(200).json({
      success: true,
      message: "Gallery image deleted successfully",
      images: project.images,
    });
  } catch (error) {
    console.error(
      "Delete project gallery image error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Server error while deleting gallery image",
    });
  }
};

// =====================================================
// REPLACE PROJECT MAIN IMAGE
// Admin API
// PUT /api/projects/:id/main-image
// =====================================================

export const replaceProjectMainImage = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    // Make sure a new image was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "New main image is required",
      });
    }

    // Find project
    const project = await Project.findById(id);

    if (!project) {
      // If project does not exist, remove the newly uploaded file
      await deleteUploadedFile(uploadedFileUrl(req.file, "projects"));

      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Store old image
    const oldImage = project.image;

    // Create new image URL
    const newImage = uploadedFileUrl(req.file, "projects");

    // Update project
    project.image = newImage;

    await project.save();

    // Delete old physical image
    if (oldImage) {
      await deleteUploadedFile(oldImage);
    }

    res.status(200).json({
      success: true,
      message: "Project main image replaced successfully",
      image: project.image,
    });
  } catch (error) {
    console.error(
      "Replace project main image error:",
      error
    );

    // Remove newly uploaded file if database update fails
    if (req.file) {
      await deleteUploadedFile(uploadedFileUrl(req.file, "projects"));
    }

    res.status(500).json({
      success: false,
      message:
        "Server error while replacing project main image",
    });
  }
};