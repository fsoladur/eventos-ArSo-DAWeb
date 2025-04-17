import React from "react";
import "../../styles/custom.css";
import "./Login.css";


const LoginForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO
    // Lógica para iniciar sesión
    // Por ejemplo: login({ url: 'http://localhost:8090/auth/login', isCallingGithub: false });
  };

  const handleGithubLogin = () => {
    // TODO
    // Lógica para iniciar sesión con GitHub
    // Por ejemplo: login({ url: 'http://localhost:8090/oauth2/authorization/github', isCallingGithub: true });
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
              placeholder="Correo o nombre de usuario"
              required
            />
            <div className="invalid-feedback">
              Por favor introduce un correo válido.
            </div>
          </div>

          <div className="mb-4 mt-1">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control form-lm"
              id="password"
              name="password"
              placeholder="Contraseña asociada"
              required
            />
            <div className="invalid-feedback">
              La contraseña es obligatoria.
            </div>
          </div>

          <button
            type="submit"
            className="btn custom-btn w-100 rounded-pill mb-0"
          >
            Iniciar sesión
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

export default LoginForm;
