import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css"; // Import your CSS file for styling

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header>
      <nav className="navbar">
        <div className="container d-flex justify-content-between align-items-center">
          <a className="navbar-brand fw-bold text-white" href="./">
            <img
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMjU2IDI1NiI+PGNpcmNsZSBjeD0iMTI4IiBjeT0iMTI4IiByPSIxMjgiIGZpbGw9IiNGMDU1MzciLz48cGF0aCBmaWxsPSIjRkZGIiBkPSJNMTE3LjQ3NSA4Mi43MjljMTkuMjk3LTQuMjg4IDM4LjU5NSAzLjU3NCA0OS4zMTUgMTguNTgyTDgxLjUwMiAxMjAuNjFjMi44NTktMTguMzQ1IDE2LjY3Ni0zMy41OTIgMzUuOTczLTM3Ljg4bTQ5Ljc5MiA3MC43NTZjLTYuNjcxIDkuNzY4LTE2LjkxNSAxNi42NzctMjguNTg5IDE5LjI5N2MtMTkuMjk3IDQuMjg4LTM4LjgzMi0zLjU3My00OS41NTMtMTguODJsODUuNTI3LTE5LjI5OGwxMy44MTgtMy4wOTdsMjYuNjgyLTUuOTU2Yy0uMjM4LTUuNzE3LS45NTMtMTEuNDM1LTIuMTQ0LTE2LjkxNGMtMTAuNzItNDUuOTgtNTcuNjUzLTc0LjgwNi0xMDQuNTg2LTY0LjA4NnMtNzYuMjM1IDU2LjQ2Mi02NS4yNzYgMTAyLjY4czU3LjY1MyA3NC44MDYgMTA0LjU4NSA2NC4wODVjMjcuNjM2LTYuMTk0IDQ5LjA3Ny0yNC43NzYgNjAuMDM2LTQ4LjM2MXoiLz48L3N2Zz4="
              className="logoImg me-3"
              alt="Logo"
            />
            <span class="brand-title">Eventos Fabi&Anto</span>
          </a>
          

          {user && (
            <div className="d-flex align-items-center gap-3">
              {user.roles.includes("USUARIO") && (
                <Link
                  to="/home/usuarios"
                  className={`navLink ${isActive("/usuarios") ? "active" : ""}`}
                >
                  Usuario
                </Link>
              )}

              {user.roles.includes("PROPIETARIO_ESPACIOS") && (
                <Link
                  to="/home/espacios"
                  className={`navLink ${isActive("/espacios") ? "active" : ""}`}
                >
                  Espacios
                </Link>
              )}

              {user.roles.includes("GESTOR_EVENTOS") && (
                <Link
                  to="/home/eventos"
                  className={`navLink ${isActive("/eventos") ? "active" : ""}`}
                >
                  Eventos
                </Link>
              )}

              <button className="btn btn-sm btn-danger" onClick={logout}>
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
