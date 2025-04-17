import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ allowedRoles }) => {
  const { user } = useAuth();

  if (user) {
    const hasAccess = allowedRoles.some((role) => user.roles.includes(role));
    return hasAccess ? <Outlet /> : <Navigate to="/home" />;
  }
};

export default PrivateRoute;
