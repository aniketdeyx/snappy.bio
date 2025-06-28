// components/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../../store/store";

const ProtectedRoute = () => {
  const { user, isLoading } = useAuthStore();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7f5539]"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
