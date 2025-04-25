import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const PrivateRoute = ({ allowedRoles }) => {
  const { user } = useAuth();
  console.log('Auth state:', JSON.stringify(user, null, 2));

  // Si el usuario no existe o no está autenticado, redirigir al login
  if (!user) {
    console.log('Usuario no autenticado, redirigiendo a login');
    return <Navigate to="/login" />;
  }

  // Verificar si el usuario tiene los roles permitidos
  const hasAccess = allowedRoles.some(
    role => user.roles && user.roles.includes(role)
  );

  if (!hasAccess) {
    console.log('Usuario no tiene permisos para esta ruta');
    return <Navigate to="/home" />;
  }

  // Si el usuario está autenticado y tiene permisos, mostrar el contenido
  return <Outlet />;
};

export default PrivateRoute;
