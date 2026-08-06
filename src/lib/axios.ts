/**
 * Axios instance configuration with interceptors
 * Centralized HTTP client for all API requests
 */

import { API_CONFIG, ERROR_MESSAGES } from '@/constants';
import { ApiError } from '@/types';
import { logger } from '@/utils/logger';
import { authStorage } from '@/utils/storage';
import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

const subscribeTokenRefresh = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

const onTokenRefreshed = (token: string) => {
  refreshSubscribers.forEach(callback => callback(token));
  refreshSubscribers = [];
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add auth token if available
    const token = authStorage.getAccessToken();
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log('[Axios Request]', {
      method: config.method?.toUpperCase(),
      url: config.url,
      hasToken: !!token,
      tokenPreview: token ? `${token.substring(0, 20)}...` : 'none',
    });

    logger.debug('API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      data: config.data,
    });

    return config;
  },
  (error: AxiosError) => {
    console.error('[Axios Request Error]', error);
    logger.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('[Axios Response]', {
      status: response.status,
      url: response.config.url,
    });
    logger.debug('API Response:', {
      status: response.status,
      url: response.config.url,
      data: response.data,
    });
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    console.error('[Axios Error]', {
      status: error.response?.status,
      url: error.config?.url,
      message: error.message,
    });

    logger.error('API Error:', {
      status: error.response?.status,
      url: error.config?.url,
      message: error.message,
    });

    // Handle 401 Unauthorized - try to refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Skip refresh token for auth endpoints (login, register, etc.) to avoid redirecting on invalid credentials
      if (originalRequest.url?.includes('/auth/')) {
        console.log('[Axios] 401 error on auth endpoint, skipping token refresh:', originalRequest.url);
        const errorMessage = error.response?.data 
          ? (error.response.data as { message?: string | string[] }).message
          : error.message;
        const apiError = new ApiError(
          typeof errorMessage === 'string' ? errorMessage : ERROR_MESSAGES.GENERIC_ERROR,
          401
        );
        return Promise.reject(apiError);
      }

      // Skip refresh token for refresh token endpoint itself to avoid infinite loop
      if (originalRequest.url === '/auth/refresh-token') {
        console.error('[Axios] Refresh token endpoint returned 401, clearing session');
        authStorage.clearAuth();

        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(new ApiError(ERROR_MESSAGES.SESSION_EXPIRED, 401));
      }

      console.log('[Axios] 401 error, attempting token refresh for:', originalRequest.url);
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        console.log('[Axios] Starting token refresh...');

        try {
          const refreshToken = authStorage.getRefreshToken();
          if (!refreshToken) {
            throw new Error("No refresh token available");
          }

          const response = await axios.post<{ accessToken: string; refreshToken: string }>("/auth/refresh-token", { refreshToken });
          console.log('[Axios] Token refresh successful');

          // Update stored tokens
          const location: 'local' | 'session' = localStorage.getItem('mixfood.refresh-token') ? 'local' : 'session';
          authStorage.setAccessToken(response.data.accessToken, location);
          authStorage.setRefreshToken(response.data.refreshToken, location);

          isRefreshing = false;
          onTokenRefreshed(response.data.accessToken);

          if (response.data.accessToken && originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
          }

          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error('[Axios] Token refresh failed:', refreshError);
          logger.error('Token refresh failed:', refreshError);

          isRefreshing = false;
          refreshSubscribers = [];

          // Clear session and redirect to login
          authStorage.clearAuth();

          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }

          return Promise.reject(new ApiError(ERROR_MESSAGES.SESSION_EXPIRED, 401));
        }
      } else {
        // Wait for the ongoing refresh to complete
        console.log('[Axios] Waiting for token refresh to complete...');
        return new Promise((resolve, reject) => {
          subscribeTokenRefresh((token: string) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            resolve(axiosInstance(originalRequest));
          });
        });
      }
    }

    // Handle other errors
    const errorMessage = error.response?.data 
      ? (error.response.data as { message?: string | string[] }).message
      : error.message;

    const apiError = new ApiError(
      typeof errorMessage === 'string' ? errorMessage : ERROR_MESSAGES.GENERIC_ERROR,
      error.response?.status || 500
    );

    return Promise.reject(apiError);
  }
);

export default axiosInstance;