import React, { useState, useMemo } from 'react';
import { AuthContext } from './useAuth';
import PropTypes from 'prop-types';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser;
  });

  const authLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const authLogin = ({ newUser }) => {
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const contextValue = useMemo(() => ({ user, authLogout, authLogin }), [user]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthProvider;
