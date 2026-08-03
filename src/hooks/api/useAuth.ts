/**
 * TanStack Query hooks for authentication
 */

import { getApiErrorMessage } from '@/services/api';
import { authService } from '@/services/auth.service';
import { LoginPayload, RegisterPayload } from '@/types';
import { logger } from '@/utils/logger';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload, remember }: { payload: LoginPayload; remember: boolean }) => 
      authService.login(payload, remember),
    onSuccess: (data) => {
      logger.info('Login successful', { user: data.user });
      toast.success('Đăng nhập thành công!');
    },
    onError: (error) => {
      logger.error('Login failed', error);
      toast.error('Đăng nhập thất bại', {
        description: getApiErrorMessage(error),
      });
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
      toast.success('Đăng ký thành công!');
    },
    onError: (error) => {
      logger.error('Registration failed', error);
      toast.error('Đăng ký thất bại', {
        description: getApiErrorMessage(error),
      });
    },
  });
};

export const useSendRegistrationCode = () => {
  return useMutation({
    mutationFn: (email: string) => authService.sendRegistrationCode(email),
    onSuccess: () => {
      logger.info('Registration code sent');
      toast.success('Mã xác nhận đã được gửi!');
    },
    onError: (error) => {
      logger.error('Failed to send registration code', error);
      toast.error('Gửi mã thất bại', {
        description: getApiErrorMessage(error),
      });
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
      // Clear user from localStorage
      localStorage.removeItem('mixfood.user');
      toast.success('Đăng xuất thành công!');
      window.location.href = '/login';
    },
  });
};