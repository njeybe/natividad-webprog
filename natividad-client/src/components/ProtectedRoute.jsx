import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedTypes }) => {
  const token = localStorage.getItem("token");
  const type = localStorage.getItem("type");

  if (!token) {
    return <Navigate to="/auth/signin" replace />;
  }

  if (allowedTypes && allowedTypes.length > 0 && !allowedTypes.includes(type)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
