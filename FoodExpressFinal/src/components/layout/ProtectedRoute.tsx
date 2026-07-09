import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../store/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (adminOnly && !user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
