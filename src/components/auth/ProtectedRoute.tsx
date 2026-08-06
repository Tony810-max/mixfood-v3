import { useAuth } from "@/contexts/AuthContext";
import { ROUTES } from "@/utils/const";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export const ProtectedRoute = ({ children, requireAuth = true }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  console.log('[ProtectedRoute] State:', { requireAuth, isAuthenticated, isLoading, currentPath: window.location.pathname });

  if (isLoading) {
    console.log('[ProtectedRoute] Showing loading state');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    console.log('[ProtectedRoute] Redirecting to login (requireAuth=true, not authenticated)');
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
  }

  if (!requireAuth && isAuthenticated) {
    console.log('[ProtectedRoute] Redirecting to home (requireAuth=false, already authenticated)');
    return <Navigate to={ROUTES.HOME} replace />;
  }

  console.log('[ProtectedRoute] Rendering children');
  return <>{children}</>;
};
