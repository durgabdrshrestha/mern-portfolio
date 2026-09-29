import API from "./api";
import { toMultipartFormData } from "./formData";

// =====================================================
// GET ALL ACTIVE PROJECTS
// Public API
// GET /api/projects
// =====================================================

export const getProjects = async () => {
  const response = await API.get("/projects");

  return response.data;
};


// =====================================================
// GET FEATURED PROJECTS
// Public API
// GET /api/projects/featured
// =====================================================

export const getFeaturedProjects = async () => {
  const response = await API.get("/projects/featured");

  return response.data;
};

// =====================================================
// GET SINGLE PROJECT BY SLUG
// Public API
// GET /api/projects/slug/:slug
// =====================================================

export const getProjectBySlug = async (slug) => {
  const response = await API.get(`/projects/slug/${slug}`);

  return response.data;
};

// =====================================================
// GET SINGLE PROJECT
// Public API
// GET /api/projects/:id
// =====================================================

export const getProjectById = async (id) => {
  const response = await API.get(`/projects/${id}`);

  return response.data;
};

// =====================================================
// GET ALL PROJECTS
// Admin API 
// GET /api/projects/all
// =====================================================

export const getAllProjects = async () => {
  const response = await API.get("/projects/all");

  return response.data;
};

// =====================================================
// CREATE PROJECT
// Admin API
// POST /api/projects
// =====================================================

export const createProject = async (projectData, mainImage, galleryImages = []) => {
  const response = await API.post(
    "/projects",
    toMultipartFormData(projectData, { image: mainImage, images: galleryImages })
  );

  return response.data;
};

// =====================================================
// UPDATE PROJECT
// Admin API
// PUT /api/projects/:id
// =====================================================

export const updateProject = async (id, projectData, mainImage, galleryImages = []) => {
  const response = await API.put(
    `/projects/${id}`,
    toMultipartFormData(projectData, { image: mainImage, images: galleryImages })
  );

  return response.data;
};

// =====================================================
// DELETE PROJECT
// Admin API
// DELETE /api/projects/:id
// =====================================================

export const deleteProject = async (id) => {
  const response = await API.delete(
    `/projects/${id}`
  );

  return response.data;
};

// =====================================================
// REPLACE PROJECT MAIN IMAGE
// Admin API
// PUT /api/projects/:id/main-image
// =====================================================

export const replaceProjectMainImage = async (
  id,
  imageFile
) => {
  const formData = new FormData();

  formData.append("image", imageFile);

  const response = await API.put(
    `/projects/${id}/main-image`,
    formData
  );

  return response.data;
};

// =====================================================
// UPLOAD PROJECT GALLERY IMAGES
// Admin API
// POST /api/projects/:id/gallery
// =====================================================

export const uploadProjectGalleryImages = async (
  id,
  imageFiles
) => {
  const formData = new FormData();

  imageFiles.forEach((file) => {
    formData.append("images", file);
  });

  const response = await API.post(
    `/projects/${id}/gallery`,
    formData
  );

  return response.data;
};

// =====================================================
// DELETE PROJECT GALLERY IMAGE
// Admin API
// DELETE /api/projects/:id/gallery
// =====================================================

export const deleteProjectGalleryImage = async (
  id,
  imageUrl
) => {
  const response = await API.delete(
    `/projects/${id}/gallery`,
    {
      data: {
        imageUrl,
      },
    }
  );

  return response.data;
};

