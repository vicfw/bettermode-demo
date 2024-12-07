import { Routes, Route } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import FullHeightWrapper from "../components/FullHeightWrapper";
import { routes } from "./routes";

type RouteRendererProps = {
  routes: typeof routes;
  isAuthenticated: boolean;
};

const RouteRenderer = ({ routes, isAuthenticated }: RouteRendererProps) => {
  return (
    <Routes>
      {routes.public.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
      {routes.private.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              {route.element}
            </ProtectedRoute>
          }
        />
      ))}
      <Route path="*" element={<FullHeightWrapper text="404 - Not Found" />} />
    </Routes>
  );
};

export default RouteRenderer;
