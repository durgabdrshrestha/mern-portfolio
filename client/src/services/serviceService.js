import API from "./api";
import { toMultipartFormData } from "./formData";

export const getServices = async () => {
  const response = await API.get("/services");
  return response.data;
};

export const getAllServices = async () => {
  const response = await API.get("/services/all");
  return response.data;
};

export const createService = async (serviceData, imageFile) => {
  const response = await API.post("/services", toMultipartFormData(serviceData, { image: imageFile }));
  return response.data;
};

export const updateService = async (id, serviceData, imageFile) => {
  const response = await API.put(`/services/${id}`, toMultipartFormData(serviceData, { image: imageFile }));
  return response.data;
};

export const deleteService = async (id) => {
  const response = await API.delete(`/services/${id}`);
  return response.data;
};