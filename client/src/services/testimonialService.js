import API from "./api";
import { toMultipartFormData } from "./formData";

export const getTestimonials = async () => {
  const response = await API.get("/testimonials");
  return response.data;
};

export const getFeaturedTestimonials = async () => {
  const response = await API.get("/testimonials/featured");
  return response.data;
};

export const getAllTestimonials = async () => {
  const response = await API.get("/testimonials/all");
  return response.data;
};

export const createTestimonial = async (testimonialData, imageFile) => {
  const response = await API.post("/testimonials", toMultipartFormData(testimonialData, { image: imageFile }));
  return response.data;
};

export const updateTestimonial = async (id, testimonialData, imageFile) => {
  const response = await API.put(`/testimonials/${id}`, toMultipartFormData(testimonialData, { image: imageFile }));
  return response.data;
};

export const deleteTestimonial = async (id) => {
  const response = await API.delete(`/testimonials/${id}`);
  return response.data;
};