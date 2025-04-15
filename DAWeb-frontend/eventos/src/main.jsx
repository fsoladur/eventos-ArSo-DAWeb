import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Lobby from "./components/Lobby";
import EspaciosPage from "./pages/EspaciosPage";
import EventosPage from "./pages/EventosPage";
import UsuarioPage from "./pages/UsuarioPage";
import NotFoundPage from "./pages/NotFoundPage";
import PrivateRoute from "./routes/PrivateRoute";

import "./styles/main.css";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Lobby />}>
            <Route element={<PrivateRoute allowedRoles={["USUARIO"]} />}>
              <Route path="usuarios" element={<UsuarioPage />} />
            </Route>
            <Route
              element={<PrivateRoute allowedRoles={["PROPIETARIO_ESPACIOS"]} />}
            >
              <Route path="espacios" element={<EspaciosPage />} />
            </Route>
            <Route element={<PrivateRoute allowedRoles={["GESTOR_EVENTOS"]} />}>
              <Route path="eventos" element={<EventosPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
