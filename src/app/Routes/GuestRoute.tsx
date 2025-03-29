import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../context/useAuth";
import { paths } from "../../config/paths";


interface GuestRouteProps {
  children: React.ReactNode;
}

const GuestRoute: React.FC<GuestRouteProps> = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to={paths.app.home.path} replace />;
  }

  return <>{children}</>;
};

export default GuestRoute;