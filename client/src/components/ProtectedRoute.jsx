import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { admin, loading } = useAuth();

  // =====================================================
  // WAIT FOR AUTH CHECK
  // =====================================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 dark:bg-slate-950">
        <div className="text-sm text-slate-600 dark:text-slate-300">
          Checking authentication...
        </div>
      </div>
    );
  }

  // =====================================================
  // NOT LOGGED IN
  // =====================================================

  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  // =====================================================
  // LOGGED IN
  // =====================================================

  return <Outlet />;
};

export default ProtectedRoute;