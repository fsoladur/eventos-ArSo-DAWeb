import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser)); 
      }
    }, []);
  
    const logout = () => {
      localStorage.removeItem('user');
      setUser(null);
      window.location.href = '/login.html'; // Redirige al login externo
    };
  
    return (
      <AuthContext.Provider value={{ user, setUser, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export const useAuth = () => useContext(AuthContext);