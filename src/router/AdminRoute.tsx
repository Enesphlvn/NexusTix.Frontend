import { Navigate, Outlet } from "react-router-dom";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import { useAuth } from "../hooks/Auth/useAuth";

const AdminRoute = () => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user && !user.roles.includes("Admin")) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
