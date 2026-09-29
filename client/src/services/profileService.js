import API from "./api";

export const getProfile = async () => {
  const response = await API.get("/profile");
  return response.data;
};

const toProfileFormData = (profileData, imageFile) => {
  const formData = new FormData();
  Object.entries(profileData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });
  if (imageFile) formData.append("profileImage", imageFile);
  return formData;
};

export const createProfile = async (profileData, imageFile) => {
  const response = await API.post("/profile", toProfileFormData(profileData, imageFile));
  return response.data;
};

export const updateProfile = async (profileData, imageFile) => {
  const response = await API.put("/profile", toProfileFormData(profileData, imageFile));
  return response.data;
};