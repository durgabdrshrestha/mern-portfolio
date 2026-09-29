import API from "./api";
import { toMultipartFormData } from "./formData";

export const getEducations = async () => {
  const response = await API.get("/education");
  return response.data;
};

export const getAllEducations = async () => {
  const response = await API.get("/education/all");
  return response.data;
};

export const createEducation = async (educationData, imageFile) => {
  const response = await API.post("/education", toMultipartFormData(educationData, { institutionImage: imageFile }));
  return response.data;
};

export const updateEducation = async (id, educationData, imageFile) => {
  const response = await API.put(`/education/${id}`, toMultipartFormData(educationData, { institutionImage: imageFile }));
  return response.data;
};

export const deleteEducation = async (id) => {
  const response = await API.delete(`/education/${id}`);
  return response.data;
};