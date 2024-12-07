import { Navigate } from "react-router";

type ProtectedRouteProps = {
  isAuthenticated: boolean;
  children: React.ReactNode;
};

const ProtectedRoute = ({ isAuthenticated, children }: ProtectedRouteProps) => {
  return isAuthenticated ? children : <Navigate to="/auth/signin" replace />;
};

export default ProtectedRoute;
