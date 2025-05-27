import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Lobby from './components/Lobby';
import EspaciosPage from './pages/EspaciosPage';
import EventosPage from './pages/EventosPage';
import UsuarioPage from './pages/UsuarioPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from './routes/PrivateRoute';
import LoginPage from './pages/LoginPage';
import GestorPage from './pages/GestorPage';
import EventDetailPage from './pages/EventoDetailPage';

import './styles/custom.css';
import AuthProvider from './context/AuthContext';
import ConditionalRedirect from './routes/ConditionalRedirect';
import AuthenticationErrorHandler from './components/AuthenticationErrorHandler/AuthenticationErrorHandler';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <AuthenticationErrorHandler />
        <ToastContainer position="top-right" />
        <Routes>
          <Route path="/" element={<ConditionalRedirect />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/home" element={<Lobby />}>
            <Route index element={<ConditionalRedirect />} />

            <Route element={<PrivateRoute allowedRoles={['USUARIO']} />}>
              <Route path="usuario" element={<UsuarioPage />} />
              <Route path="usuario/eventos/:id" element={<EventDetailPage />} />
            </Route>

            <Route
              element={
                <PrivateRoute
                  allowedRoles={['GESTOR_EVENTOS', 'PROPIETARIO_ESPACIOS']}
                />
              }
            >
              <Route path="gestor" element={<GestorPage />} />
              <Route path="espacios" element={<EspaciosPage />} />
              <Route path="eventos" element={<EventosPage />} />
              <Route path="eventos/:id" element={<EventDetailPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
