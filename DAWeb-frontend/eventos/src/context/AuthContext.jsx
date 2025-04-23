import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Intentar recuperar usuario desde localStorage al iniciar
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  // Actualizar localStorage cuando cambia el usuario
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const logout = async () => {
    try {
      // Llamar a la API de logout
      await fetch("http://localhost:8090/auth/logout", {
        method: "POST",
        credentials: "include"
      });
    } catch (error) {
      console.error("Error durante logout:", error);
    } finally {
      // Siempre limpiar el estado local
      localStorage.removeItem('user');
      setUser(null);
    }
  };
  
  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
  
export const useAuth = () => useContext(AuthContext);