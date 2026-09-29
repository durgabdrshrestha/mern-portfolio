import API from "./api";

export const sendContactMessage = async (contactData) => {
  const response = await API.post("/contact", contactData);
  return response.data;
};

export const getMessages = async () => {
  const response = await API.get("/contact");
  return response.data;
};

export const getUnreadMessages = async () => {
  const response = await API.get("/contact/unread");
  return response.data;
};

export const updateMessage = async (id, updateData) => {
  const response = await API.put(`/contact/${id}`, updateData);
  return response.data;
};

export const deleteMessage = async (id) => {
  const response = await API.delete(`/contact/${id}`);
  return response.data;
};

export const sendMessageReply = async (id, body) => {
  const response = await API.post(`/contact/${id}/reply`, { body });
  return response.data;
};