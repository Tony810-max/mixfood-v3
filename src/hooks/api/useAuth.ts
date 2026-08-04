/**
 * TanStack Query hooks for authentication
 */

import { authService } from '@/services/auth.service';
import { LoginPayload, RegisterPayload } from '@/types';
import { logger } from '@/utils/logger';
import { authStorage } from '@/utils/storage';
import { showApiErrorToast, showOperationSuccess, showSuccessToast } from '@/utils/toastHelpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload, remember }: { payload: LoginPayload; remember: boolean }) => 
      authService.login(payload, remember),
    onSuccess: (data) => {
      logger.info('Login successful', { user: data.user });
      showOperationSuccess('login');
    },
    onError: (error) => {
      logger.error('Login failed', error);
      showApiErrorToast(error, 'Đăng nhập thất bại');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });
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
    mutationFn: () => authService.clearSession(),
    onSuccess: () => {
      logger.info('Logout successful');
      queryClient.clear();
      authStorage.removeUser();
      showOperationSuccess('logout');
      window.location.href = '/login';
    },
  });
};