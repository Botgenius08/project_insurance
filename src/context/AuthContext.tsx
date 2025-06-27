import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserType } from '../types';
import { getUserPermissions } from '../utils/rolePermissions';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string, userType: UserType) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
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

  const login = async (username: string, password: string, userType: UserType): Promise<boolean> => {
    // Simple validation - just need something in username field
    if (!username.trim()) {
      return false;
    }
    
    // Simulate login - works with any credentials
    const newUser: User = {
      id: 1,
      name: username || 'Demo User',
      type: userType,
      permissions: getUserPermissions(userType),
    };
    
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = user !== null;

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};