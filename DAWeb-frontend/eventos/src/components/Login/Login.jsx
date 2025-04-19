import React, { useState } from "react";
import "../../styles/custom.css";
import "./Login.css";
import { useAuth } from "../../context/AuthContext";

const LoginForm = () => {
  const { setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const validateInputs = (username, password) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const usernameRegex = /^[a-zA-Z0-9]{3,}$/;

    const isEmail = emailRegex.test(username);
    const isUsername = usernameRegex.test(username);
    const isValidPassword = password.length >= 4;

    if (!isEmail && !isUsername) {
      return "El correo electrónico o nombre de usuario no es válido.";
    }
    if (!isValidPassword) {
      return "La contraseña debe tener al menos 8 caracteres.";
    }
    return null;
  };

  const loginUser = async (username, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8090/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: new URLSearchParams({
          username: username,
          password: password,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(response.statusText || "Error en la autenticación");
      }

      const data = await response.json();
      console.log("Login data:", data);
      setUser(data);
      window.location.href = "/home"; 
    } catch (error) {
      console.error("Error en login:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = e.target.email.value;
    const password = e.target.password.value;

    const validationError = validateInputs(username, password);
    if (validationError) {
      alert(validationError);
      return;
    }

    await loginUser(username, password);
    if (error) {
      alert(error);
    }
  };

  const handleGithubLogin = () => {
    //TODO: hay que averiguar como manejar el callback de github
    // y redirigir al usuario a la página de inicio después de iniciar sesión

    window.open("http://localhost:8090/auth/github", "_blank");
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
            disabled={isLoading}
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
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
      <script src="./DisableLoginFeedback.js"></script>
    </article>
  );
};
export default LoginForm;
