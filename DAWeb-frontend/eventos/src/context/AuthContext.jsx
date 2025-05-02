import React, { useState, useMemo } from 'react';
import { AuthContext } from './useAuth';
import PropTypes from 'prop-types';
import { generateAvatarURL, generateRandomName } from '../utils/utils';



const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error('Error retrieving user from localStorage:', error);
      localStorage.removeItem('user');
      return null;
    }
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
