import { createContext, useContext, useEffect, useState } from "react";
import {
  getAdminProfile,
  logoutAdmin,
} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // CHECK AUTHENTICATION
  // =====================================================

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      // No token = not authenticated
      if (!token) {
        setAdmin(null);
        setLoading(false);
        return;
      }

      try {
        // Ask backend to verify the JWT
        const response = await getAdminProfile();

        if (response.success && response.admin) {
          // Backend confirmed the admin
          setAdmin(response.admin);
        } else {
          // Invalid authentication
          logoutAdmin();
          setAdmin(null);
        }
      } catch (error) {
        console.error(
          "Authentication check failed:",
          error
        );

        // Token is invalid/expired
        logoutAdmin();
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // =====================================================
  // LOGIN
  // =====================================================

  const login = (adminData, token) => {
    // Save JWT
    localStorage.setItem("token", token);

    // Save admin information
    localStorage.setItem(
      "admin",
      JSON.stringify(adminData)
    );

    // Update React authentication state
    setAdmin(adminData);
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const logout = () => {
    // Remove authentication data
    logoutAdmin();

    // Clear React authentication state
    setAdmin(null);
  };

  // =====================================================
  // AUTH CONTEXT
  // =====================================================

  return (
    <AuthContext.Provider
      value={{
        admin,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// =====================================================
// CUSTOM HOOK
// =====================================================

export const useAuth = () => {
  return useContext(AuthContext);
};