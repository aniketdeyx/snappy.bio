// components/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../../store/store";

const ProtectedRoute = () => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
