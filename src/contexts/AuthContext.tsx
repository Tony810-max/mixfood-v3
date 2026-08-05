import { User } from '@/types';
import { logger } from '@/utils/logger';
import { authStorage } from '@/utils/storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    try {
      console.log('[AuthContext] Initializing auth...');
      const token = authStorage.getAccessToken();
      console.log('[AuthContext] Token found:', !!token);
      console.log('[AuthContext] Token value:', token ? `${token.substring(0, 20)}...` : 'none');
      if (token) {
        const storedUser = authStorage.getUser();
        console.log('[AuthContext] Stored user:', storedUser);
        if (storedUser) {
          setUser(storedUser);
        }
      }
    } catch (error) {
      console.error('[AuthContext] Auth initialization error:', error);
      logger.error('Auth initialization error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, setUser }}>
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
