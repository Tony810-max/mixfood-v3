/**
 * TanStack Query hooks for authentication
 */

import { authService } from '@/services/auth.service';
import { LoginPayload, RegisterPayload } from '@/types';
import { logger } from '@/utils/logger';
import { authStorage } from '@/utils/storage';
import { showApiErrorToast, showErrorToast, showOperationSuccess, showSuccessToast } from '@/utils/toastHelpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload, remember }: { payload: LoginPayload; remember: boolean }) => {
      console.log('[useLogin] mutationFn called with:', { email: payload.email, remember });
      return authService.login(payload, remember);
    },
    onSuccess: (data) => {
      console.log('[useLogin] onSuccess called');
      logger.info('Login successful', { user: data.user });
      showOperationSuccess('login');
      // Only invalidate queries on success
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
    onError: (error) => {
      console.log('[useLogin] onError called with error:', error);
      logger.error('Login failed', error);
      const errorMessage = getLoginErrorMessage(error);
      console.log('[useLogin] Error message:', errorMessage);
      
      // Only show toast for non-blocked errors - blocked errors are handled by BlockedUserToast component
      if (!errorMessage.toLowerCase().includes('blocked')) {
        showErrorToast(errorMessage);
      }
      
      // Don't invalidate queries on error to prevent unnecessary reloads
      console.log('[useLogin] Skipping query invalidation on error');
    },
  });
};

/**
 * Get specific error message for login failures
 */
export const getLoginErrorMessage = (error: unknown): string => {
  const apiError = error as { message?: string; response?: { data?: { message?: string } } };

  // Try to get error message from different sources
  const message = apiError.message ||
                  apiError.response?.data?.message ||
                  'Đăng nhập thất bại';

  // Check for blocked user
  if (message.toLowerCase().includes('blocked')) {
    localStorage.setItem('mixfood.showBlockedToast', 'true');
    return 'Tài khoản của bạn đã bị khóa. Vui lòng liên hệ hỗ trợ để được trợ giúp.';
  }

  // Provide user-friendly messages based on common errors
  // For security reasons, use generic message for both invalid email and password
  if (message.includes('User not found') || message.includes('NotFoundException') ||
      message.includes('Invalid password') || message.includes('UnauthorizedException')) {
    return 'Sai tên tài khoản hoặc mật khẩu. Vui lòng kiểm tra lại.';
  }

  if (message.includes('Network') || message.includes('fetch')) {
    return 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối internet và thử lại.';
  }

  // Return original message if it's not a common error
  return message;
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => authService.register(payload),
    onSuccess: () => {
      logger.info('Registration successful');
      showOperationSuccess('register');
    },
    onError: (error) => {
      logger.error('Registration failed', error);
      showApiErrorToast(error, 'Đăng ký thất bại');
    },
  });
};

export const useSendRegistrationCode = () => {
  return useMutation({
    mutationFn: (email: string) => authService.sendRegistrationCode(email),
    onSuccess: () => {
      logger.info('Registration code sent');
      showSuccessToast('Mã xác nhận đã được gửi!');
    },
    onError: (error) => {
      logger.error('Failed to send registration code', error);
      showApiErrorToast(error, 'Gửi mã thất bại');
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      authService.clearSession();
      return Promise.resolve();
    },
    onSuccess: () => {
      logger.info('Logout successful');
      queryClient.clear();
      authStorage.removeUser();
      showOperationSuccess('logout');
      window.location.href = '/login';
    },
  });
};