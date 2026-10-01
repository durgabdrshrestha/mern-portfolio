import API from "./api";

export const recordPageView = async () => {
  const response = await API.post("/analytics/visit");
  return response.data;
};

export const getAnalyticsSummary = async () => {
  const response = await API.get("/analytics/summary");
  return response.data;
};