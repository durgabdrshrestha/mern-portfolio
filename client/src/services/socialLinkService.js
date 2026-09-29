import API from "./api";

export const getSocialLinks = async () => {
  const response = await API.get("/social-links");
  return response.data;
};

export const getAllSocialLinks = async () => {
  const response = await API.get("/social-links/all");
  return response.data;
};

export const createSocialLink = async (linkData) => {
  const response = await API.post("/social-links", linkData);
  return response.data;
};

export const updateSocialLink = async (id, linkData) => {
  const response = await API.put(`/social-links/${id}`, linkData);
  return response.data;
};

export const deleteSocialLink = async (id) => {
  const response = await API.delete(`/social-links/${id}`);
  return response.data;
};