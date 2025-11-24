import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/Auth/useAuth";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
