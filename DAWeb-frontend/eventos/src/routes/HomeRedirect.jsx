import React from 'react';

import { useAuth } from '../context/useAuth';
import { Navigate } from 'react-router-dom';

const ConditionalRedirect = () => {
  const { user } = useAuth();
  return user ? (
    <Navigate to="/home" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ConditionalRedirect;
