import API from "./api";
import { toMultipartFormData } from "./formData";

export const getResume = async () => {
  const response = await API.get("/resume");
  return response.data;
};

export const getAllResumes = async () => {
  const response = await API.get("/resume/all");
  return response.data;
};

export const createResume = async (resumeData, file) => {
  const response = await API.post("/resume", toMultipartFormData(resumeData, { file }));
  return response.data;
};

export const updateResume = async (id, resumeData, file) => {
  const response = await API.put(`/resume/${id}`, toMultipartFormData(resumeData, { file }));
  return response.data;
};

export const deleteResume = async (id) => {
  const response = await API.delete(`/resume/${id}`);
  return response.data;
};