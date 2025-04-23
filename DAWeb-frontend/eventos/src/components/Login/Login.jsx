import React, { useEffect, useState } from 'react';
import '../../styles/custom.css';
import './Login.css';
import PropTypes from 'prop-types';

const LoginForm = ({ onHandleSubmit }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [isLoading]);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    setIsLoading(true);
    const username = form.email.value.trim();
    const password = form.password.value;
    const dto = { username, password };
    onHandleSubmit(dto);
  };

  const handleGithubLogin = () => {
    window.open('http://localhost:8090/auth/github', '_blank');
  };

  return (
    <article className="container d-flex flex-column justify-content-center align-items-center mt-5">
      <section className="col-lg-4 custom-container">
        <h2 className="text-center mb-4 fw-bold">Iniciar sesión</h2>
        <form className="needs-validation" noValidate onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="form-label">
              Correo electrónico o nombre de usuario
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              required
              pattern="^([a-zA-Z0-9._%+\-]{3,}@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}|[a-zA-Z0-9]{3,})$"
              placeholder="Correo o nombre de usuario"
            />
            <div className="invalid-feedback">
              Introduce un correo válido o nombre de usuario de al menos 3
              caracteres.
            </div>
          </div>
          <div className="mb-4 mt-1">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              required
              pattern=".{4,}"
              placeholder="Contraseña asociada"
            />
            <div className="invalid-feedback">
              La contraseña debe tener al menos 4 caracteres.
            </div>
          </div>
          <button
            type="submit"
            className="btn custom-btn w-100 rounded-pill mb-0"
            disabled={isLoading}
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
          <div className="separator my-3 text-center">
            <span>o</span>
          </div>
          <div className="text-center">
            <button
              type="button"
              className="btn w-100 rounded-pill btn-github fw-bold"
              onClick={handleGithubLogin}
            >
              <i className="bi bi-github me-2"></i> Iniciar sesión con GitHub
            </button>
          </div>
        </form>
      </section>
    </article>
  );
};

LoginForm.propTypes = {
  onHandleSubmit: PropTypes.func.isRequired
};

export default LoginForm;
