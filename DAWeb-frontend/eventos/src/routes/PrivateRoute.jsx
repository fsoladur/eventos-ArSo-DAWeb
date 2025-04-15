import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ allowedRoles }) => {
  const { user } = useAuth();
  console.log("user", user);
  // Si no hay usuario logueado, va a login de fuera
  if (user) {
    // Si tiene al menos uno de los roles permitidos, renderiza el contenido
    const hasAccess = allowedRoles.some((role) => user.roles.includes(role));

    console.log("tengo acceso" + hasAccess);
    return hasAccess ? <Outlet /> : <Navigate to="/home" />;
  }
};

export default PrivateRoute;
