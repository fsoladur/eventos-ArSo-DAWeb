import React from "react";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";
import PropTypes from "prop-types";
import NavbarLinks from "./NavLink";

const Navbar = ({ session }) => {
  const { user, logout } = useAuth();

  return (
    <header className="custom-header">
      <nav className="navbar">
        <div className="container d-flex justify-content-between align-items-center">
          <a
            href="http://localhost:3000"
            className="brand d-flex align-items-center text-decoration-none"
          >
            <img
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMjU2IDI1NiI+PGNpcmNsZSBjeD0iMTI4IiBjeT0iMTI4IiByPSIxMjgiIGZpbGw9IiNGMDU1MzciLz48cGF0aCBmaWxsPSIjRkZGIiBkPSJNMTE3LjQ3NSA4Mi43MjljMTkuMjk3LTQuMjg4IDM4LjU5NSAzLjU3NCA0OS4zMTUgMTguNTgyTDgxLjUwMiAxMjAuNjFjMi44NTktMTguMzQ1IDE2LjY3Ni0zMy41OTIgMzUuOTczLTM3Ljg4bTQ5Ljc5MiA3MC43NTZjLTYuNjcxIDkuNzY4LTE2LjkxNSAxNi42NzctMjguNTg5IDE5LjI5N2MtMTkuMjk3IDQuMjg4LTM4LjgzMi0zLjU3My00OS41NTMtMTguODJsODUuNTI3LTE5LjI5OGwxMy44MTgtMy4wOTdsMjYuNjgyLTUuOTU2Yy0uMjM4LTUuNzE3LS45NTMtMTEuNDM1LTIuMTQ0LTE2LjkxNGMtMTAuNzItNDUuOTgtNTcuNjUzLTc0LjgwNi0xMDQuNTg2LTY0LjA4NnMtNzYuMjM1IDU2LjQ2Mi02NS4yNzYgMTAyLjY4czU3LjY1MyA3NC44MDYgMTA0LjU4NSA2NC4wODVjMjcuNjM2LTYuMTk0IDQ5LjA3Ny0yNC43NzYgNjAuMDM2LTQ4LjM2MXoiLz48L3N2Zz4="
              className="logoImg me-3"
              alt="Logo"
            />
            <span className="brand-title">Eventos Fabi&Anto</span>
          </a>

          {user && <NavbarLinks/>}

          <button
            type="button"
            className="custom-btn"
            onClick={(e) => {
              e.preventDefault();
              logout();
              window.location.href = "http://localhost:3000"; // redirige donde necesites
            }}
          >
            {session ? "Cerrar Sesión" : "Volver a inicio"}
          </button>
        </div>
      </nav>
    </header>
  );
};

Navbar.propTypes = {
  session: PropTypes.bool.isRequired,
};

export default Navbar;
