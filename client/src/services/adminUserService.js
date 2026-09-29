import API from "./api";

export const getAdminUsers = async () => (await API.get("/admin/users")).data;
export const createAdminUser = async (userData) => (await API.post("/admin/users", userData)).data;
export const updateAdminUser = async (id, userData) => (await API.put(`/admin/users/${id}`, userData)).data;
export const deleteAdminUser = async (id) => (await API.delete(`/admin/users/${id}`)).data;