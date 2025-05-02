import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from '../types';
import { users } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulating API call
    try {
      setLoading(true);
      // This is a mock implementation - in a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user by email (mock authentication)
      const foundUser = users.find(u => u.email === email);
      
      if (foundUser && password === 'password') { // In a real app, you'd verify the password hash
        setUser(foundUser);
        localStorage.setItem('user', JSON.stringify(foundUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulating API call
    try {
      setLoading(true);
      // This is a mock implementation - in a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email already exists
      const emailExists = users.some(u => u.email === email);
      if (emailExists) {
        return false;
      }
      
      // In a real app, you'd create a new user in the database
      const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        addresses: [],
        role: 'user'
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isAdmin,
      login, 
      register, 
      logout,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};