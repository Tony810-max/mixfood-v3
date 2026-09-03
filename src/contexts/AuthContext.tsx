import axios from '@/lib/axios';
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
    // Check if user is logged in on mount by validating token with server
    const verifyAuth = async () => {
      try {
        console.log('[AuthContext] Initializing auth...');
        const token = authStorage.getAccessToken();
        console.log('[AuthContext] Token found:', !!token);
        console.log('[AuthContext] Token value:', token ? `${token.substring(0, 20)}...` : 'none');
        
        if (token) {
          console.log('[AuthContext] Validating token with server...');
          const response = await axios.get<User>('/auth/me');
          console.log('[AuthContext] User validated:', response.data);
          
          // Update user data from server
          setUser(response.data);
          
          // Update stored user with fresh data
          const location: 'local' | 'session' = localStorage.getItem('mixfood.access-token') ? 'local' : 'session';
          authStorage.setUser(response.data, location);
        }
      } catch (error) {
        console.error('[AuthContext] Auth validation error:', error);
        logger.error('Auth validation error:', error);
        
        // Check if user is blocked
        const apiError = error as { response?: { data?: { message?: string | string[] } } };
        const errorMessage = apiError.response?.data?.message || 
                             (error as Error).message || 
                             'Authentication failed';
        
        console.log('[AuthContext] Error message:', errorMessage);
        console.log('[AuthContext] Error message type:', typeof errorMessage);
        
        // Handle both string and array message formats
        const messageString = Array.isArray(errorMessage) ? errorMessage.join(' ') : String(errorMessage);
        
        if (messageString.toLowerCase().includes('blocked') || messageString.toLowerCase().includes('deactivated')) {
          console.log('[AuthContext] User is blocked, setting flag for toast');
          // Set localStorage flag to show toast after app is fully loaded
          localStorage.setItem('mixfood.showBlockedToast', 'true');
        }
        
        // Token invalid or user blocked - clear session
        console.log('[AuthContext] Clearing invalid session');
        authStorage.clearAuth();
        setUser(null);
      } finally {
        console.log('[AuthContext] Setting isLoading to false');
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, []);

  // Add effect to monitor auth state changes
  useEffect(() => {
    console.log('[AuthContext] Auth state changed:', { user: !!user, isAuthenticated: !!user, isLoading });
  }, [user, isLoading]);

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
  console.log('[useAuth] Returning context:', { isAuthenticated: context.isAuthenticated, isLoading: context.isLoading });
  return context;
};
