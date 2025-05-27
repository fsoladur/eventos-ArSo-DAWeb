import { useEffect } from 'react';
import { useAuth } from '../../context/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthenticationErrorHandler = () => {
  const navigate = useNavigate();
  const { authLogout } = useAuth();

  useEffect(() => {
    const originalFetch = window.fetch;

    window.fetch = async (...args) => {
      try {
        const response = await originalFetch(...args);

        if (response.status === 401) {
          console.log('Sesión expirada. Redirigiendo al login...');
          toast.error(
            'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
            {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true
            }
          );
          authLogout();
          navigate('/login', { replace: true });
        }

        return response;
      } catch (error) {
        console.error('Error en fetch:', error);
        throw error;
      }
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, [navigate, authLogout]);

  return null;
};

export default AuthenticationErrorHandler;
