import API from "./api";

export const getSkills = async () => {
  const response = await API.get("/skills");
  return response.data;
};

export const getAllSkills = async () => {
  const response = await API.get("/skills/all");
  return response.data;
};

export const createSkill = async (skillData) => {
  const response = await API.post("/skills", skillData);
  return response.data;
};

export const updateSkill = async (id, skillData) => {
  const response = await API.put(`/skills/${id}`, skillData);
  return response.data;
};

export const deleteSkill = async (id) => {
  const response = await API.delete(`/skills/${id}`);
  return response.data;
};