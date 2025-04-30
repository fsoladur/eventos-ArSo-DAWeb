import React, { useEffect } from 'react';
import { useAuth } from '../context/useAuth';
import { Navigate, useSearchParams, useNavigate } from 'react-router-dom';

const ConditionalRedirect = () => {
  const { user, authLogin } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Mover la lógica de autenticación a un useEffect
  useEffect(() => {
    const data = searchParams.get('data');

    if (data) {
      const userData = atob(data);
      const parsedData = JSON.parse(userData);
      authLogin({ newUser: parsedData });
      navigate(user ? '/home/usuario' : '/login', { replace: true });
    }
  }, []);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.roles?.includes('USUARIO')) {
    return <Navigate to="/home/usuario" replace />;
  }

  return <Navigate to="/home/gestor" replace />;
};

export default ConditionalRedirect;
