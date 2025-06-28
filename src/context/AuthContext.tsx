import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserType } from '../types';
import { getUserPermissions } from '../utils/rolePermissions';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string, userType: UserType) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (username: string, password: string, userType: UserType): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any username/password combination
      if (username.trim()) {
        const newUser: User = {
          id: Date.now(),
          name: username,
          type: userType,
          permissions: getUserPermissions(userType),
        };
        
        setUser(newUser);
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

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};