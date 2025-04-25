import React, { useState, useEffect, useMemo } from 'react';
import { AuthContext } from './useAuth';
import PropTypes from 'prop-types';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    localStorage.getItem('user');
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', user);
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const authLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const authLogin = ({ newUser }) => {
    setUser(newUser);
    localStorage.setItem('user', newUser);
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
