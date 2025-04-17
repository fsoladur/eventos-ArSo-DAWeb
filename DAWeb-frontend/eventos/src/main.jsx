import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Lobby from "./components/Lobby";
import EspaciosPage from "./pages/EspaciosPage";
import EventosPage from "./pages/EventosPage";
import UsuarioPage from "./pages/UsuarioPage";
import NotFoundPage from "./pages/NotFoundPage";
import PrivateRoute from "./routes/PrivateRoute";
import LoginPage from "./pages/LoginPage";

import "./styles/custom.css";
import {AuthProvider} from "./context/AuthContext";
import HomeRedirect from "./routes/HomeRedirect";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeRedirect />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<Lobby />}>
            <Route element={<PrivateRoute allowedRoles={["USUARIO"]} />}>
              <Route path="/home/usuarios" element={<UsuarioPage />} />
            </Route>
            <Route
              element={<PrivateRoute allowedRoles={["PROPIETARIO_ESPACIOS"]} />}
            >
              <Route path="/home/espacios" element={<EspaciosPage />} />
            </Route>
            <Route element={<PrivateRoute allowedRoles={["GESTOR_EVENTOS"]} />}>
              <Route path="/home/eventos" element={<EventosPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
