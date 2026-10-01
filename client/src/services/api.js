import axios from "axios";

const fallbackApiUrl = "http://localhost:5000/api";
export const API_BASE_URL = import.meta.env.VITE_API_URL || fallbackApiUrl;
export const SERVER_BASE_URL = API_BASE_URL.replace("/api", "");
export const resolveAssetUrl = (assetPath) => {
  if (!assetPath) return "";
  if (assetPath.startsWith("data:")) return assetPath;
  if (/^(?:https?:)?\/\//i.test(assetPath)) {
    try {
      const parsedUrl = new URL(assetPath, window.location.origin);
      if (["localhost", "127.0.0.1", "::1"].includes(parsedUrl.hostname)) {
        return `${SERVER_BASE_URL.replace(/\/$/, "")}${parsedUrl.pathname}${parsedUrl.search}${parsedUrl.hash}`;
      }
    } catch {
      return assetPath;
    }
    return assetPath;
  }
  return `${SERVER_BASE_URL.replace(/\/$/, "")}/${assetPath.replace(/^\/+/, "")}`;
};

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    if (typeof FormData !== "undefined" && config.data instanceof FormData) {
      config.headers.delete("Content-Type");
    }

    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;