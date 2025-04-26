// routes/PrivateRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import ConditionalRedirect from './ConditionalRedirect';

export default function PrivateRoute({ allowedRoles }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const hasAccess = allowedRoles.some(role => user.roles.includes(role));

  if (!hasAccess) {
    return <ConditionalRedirect />;
  }

  return <Outlet />;
}
