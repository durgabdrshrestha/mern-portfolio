import API from "./api";
import { toMultipartFormData } from "./formData";

export const getExperiences = async () => {
  const response = await API.get("/experience");
  return response.data;
};

export const getAllExperiences = async () => {
  const response = await API.get("/experience/all");
  return response.data;
};

export const createExperience = async (experienceData, imageFile) => {
  const response = await API.post("/experience", toMultipartFormData(experienceData, { companyImage: imageFile }));
  return response.data;
};

export const updateExperience = async (id, experienceData, imageFile) => {
  const response = await API.put(`/experience/${id}`, toMultipartFormData(experienceData, { companyImage: imageFile }));
  return response.data;
};

export const deleteExperience = async (id) => {
  const response = await API.delete(`/experience/${id}`);
  return response.data;
};