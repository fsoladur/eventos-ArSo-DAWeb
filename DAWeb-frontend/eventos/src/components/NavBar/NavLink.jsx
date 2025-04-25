import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import './Navbar.css';

const NavbarLinks = () => {
  const { user } = useAuth();
  const location = useLocation();

  const isActive = path => location.pathname.includes(path);

  const roleLinks = [
    {
      role: 'USUARIO',
      path: '/home/usuarios',
      label: 'Usuario'
    },
    {
      role: 'PROPIETARIO_ESPACIOS',
      path: '/home/espacios',
      label: 'Espacios'
    },
    {
      role: 'GESTOR_EVENTOS',
      path: '/home/eventos',
      label: 'Eventos'
    }
  ];

  return (
    <div className="d-flex align-items-center gap-3 ms-5">
      {roleLinks.map(
        link =>
          user?.roles?.includes(link.role) && (
            <Link
              key={link.role}
              to={link.path}
              className={`navLink ${isActive(link.path) ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          )
      )}
    </div>
  );
};

export default NavbarLinks;
