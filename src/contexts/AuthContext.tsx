import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, remember: boolean) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    try {
      const token = localStorage.getItem('mixfood.access-token') || sessionStorage.getItem('mixfood.access-token');
      if (token) {
        const storedUser = localStorage.getItem('mixfood.user');
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch (error) {
            console.error('Failed to parse stored user:', error);
          }
        }
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string, remember: boolean) => {
    try {
      const { authService } = await import('@/services/auth.service');
      const response = await authService.login({ email, password }, remember);
      
      // Use user data from backend response if available, otherwise fallback to email-based name
      const userData: User = response.user || {
        id: 1,
        email,
        name: email.split('@')[0],
        role: 'USER',
      };
      
      setUser(userData);
      localStorage.setItem('mixfood.user', JSON.stringify(userData));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('mixfood.access-token');
      localStorage.removeItem('mixfood.refresh-token');
      sessionStorage.removeItem('mixfood.access-token');
      sessionStorage.removeItem('mixfood.refresh-token');
      setUser(null);
      localStorage.removeItem('mixfood.user');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
