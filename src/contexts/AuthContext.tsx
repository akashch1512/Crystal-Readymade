import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void; // <-- Add this line
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  loading: boolean;
}


const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  isAuthenticated: false,
  isAdmin: false,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  refreshUser: async () => {},
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get the token and user data from localStorage
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      // Attach the token to axios default headers
      axios.defaults.headers.Authorization = `Bearer ${storedToken}`;
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await axios.post('/api/auth/login', { email, password });
      const { user: loggedInUser, token } = response.data;

      // Save user and token to localStorage
      setUser(loggedInUser);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      localStorage.setItem('token', token);

      // Set the token in the Axios default headers for future requests
      axios.defaults.headers.Authorization = `Bearer ${token}`;

      return true;
    } catch (error: any) {
      console.error('Login failed:', error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await axios.post('/api/auth/register', { name, email, password });
      const { user: newUser, token } = response.data;

      // Save user and token to localStorage
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('token', token);

      // Set the token in the Axios default headers for future requests
      axios.defaults.headers.Authorization = `Bearer ${token}`;

      return true;
    } catch (error: any) {
      console.error('Registration failed:', error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    delete axios.defaults.headers.Authorization; // Remove token from headers
  };

  const refreshUser = async (): Promise<void> => {
    try {
      const res = await axios.get('/api/user/me');
      const updatedUser: User = res.data.user;
  
      // Sanity check: Ensure addresses is always an array
      updatedUser.addresses = updatedUser.addresses || [];
  
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Failed to refresh user:', error);
    }
  };
  
  
  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser, // <-- Add this here
        isAuthenticated,
        isAdmin,
        login,
        register,
        logout,
        refreshUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
