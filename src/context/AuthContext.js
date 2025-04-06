import React, { createContext, useState, useEffect, useContext } from 'react';
import { userService } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in from localStorage
    const user = userService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      console.log('AuthContext: Attempting login for user:', username);
      const response = await userService.login(username, password);
      console.log('AuthContext: Login response:', response);
      
      if (response.status === 'success') {
        console.log('AuthContext: Login successful, setting current user');
        setCurrentUser(response.user);
        return response;
      }
      throw new Error(response.error || 'Login failed');
    } catch (error) {
      console.error('AuthContext: Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    userService.logout();
    setCurrentUser(null);
  };

  const register = async (userData) => {
    const response = await userService.createUser(userData);
    return response;
  };

  const value = {
    currentUser,
    loading,
    login,
    logout,
    register,
    isLoggedIn: !!currentUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 