import API from "./api";

export const getPrivacyPolicy = async () => {
  const response = await API.get("/privacy");
  return response.data;
};

export const getAllPrivacyPolicies = async () => {
  const response = await API.get("/privacy/all");
  return response.data;
};

export const createPrivacyPolicy = async (policyData) => {
  const response = await API.post("/privacy", policyData);
  return response.data;
};

export const updatePrivacyPolicy = async (id, policyData) => {
  const response = await API.put(`/privacy/${id}`, policyData);
  return response.data;
};

export const deletePrivacyPolicy = async (id) => {
  const response = await API.delete(`/privacy/${id}`);
  return response.data;
};