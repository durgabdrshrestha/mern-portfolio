import API from "./api";

export const getProfile = async () => {
  const response = await API.get("/profile");
  return response.data;
};

const toProfileFormData = (profileData, imageFiles = {}) => {
  const formData = new FormData();
  Object.entries(profileData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });
  Object.entries(imageFiles).forEach(([field, file]) => {
    if (file) formData.append(field, file);
  });
  return formData;
};

export const createProfile = async (profileData, imageFiles) => {
  const response = await API.post("/profile", toProfileFormData(profileData, imageFiles));
  return response.data;
};

export const updateProfile = async (profileData, imageFiles) => {
  const response = await API.put("/profile", toProfileFormData(profileData, imageFiles));
  return response.data;
};