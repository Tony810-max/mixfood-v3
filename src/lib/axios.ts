/**
 * Axios instance configuration with interceptors
 * Centralized HTTP client for all API requests
 */

import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { API_CONFIG, STORAGE_KEYS, ERROR_MESSAGES } from '@/constants';
import { ApiError } from '@/types';
import { logger } from '@/utils/logger';

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
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN) || 
                  sessionStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    logger.debug('API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      data: config.data,
    });

    return config;
  },
  (error: AxiosError) => {
    logger.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    logger.debug('API Response:', {
      status: response.status,
      url: response.config.url,
      data: response.data,
    });
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    logger.error('API Error:', {
      status: error.response?.status,
      url: error.config?.url,
      message: error.message,
    });

    // Handle 401 Unauthorized - try to refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { authService } = await import('@/services/auth.service');
        const newToken = await authService.refreshAccessToken();

        if (newToken && originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        logger.error('Token refresh failed:', refreshError);
        
        // Clear session and redirect to login
        const { authService } = await import('@/services/auth.service');
        authService.clearSession();
        
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }

        return Promise.reject(new ApiError(ERROR_MESSAGES.SESSION_EXPIRED, 401));
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