import React from 'react';

import { useAuth } from '../context/useAuth';
import { Navigate } from 'react-router-dom';

const ConditionalRedirect = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.roles.includes('USUARIO')) {
    return <Navigate to="/home/usuario" replace />;
  }

  return <Navigate to="/home/gestor" replace />;
};

export default ConditionalRedirect;
