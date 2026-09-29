import API from "./api";

// =====================================================
// ADMIN LOGIN
// POST /api/auth/login
// =====================================================

export const loginAdmin = async (email, password) => {
  const response = await API.post("/auth/login", {
    email,
    password,
  });

  return response.data;
};

// =====================================================
// GET ADMIN PROFILE
// GET /api/admin/profile
// Protected API
// =====================================================

export const getAdminProfile = async () => {
  const response = await API.get("/admin/profile");

  return response.data;
};

// =====================================================
// LOGOUT ADMIN
// =====================================================

export const logoutAdmin = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("admin");
};