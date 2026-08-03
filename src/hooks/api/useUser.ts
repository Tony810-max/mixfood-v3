/**
 * TanStack Query hooks for user management
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '@/services/user.service';
import { UpdateProfilePayload, ChangePasswordPayload } from '@/types';
import { toast } from 'sonner';
import { getApiErrorMessage } from '@/services/api';
import { logger } from '@/utils/logger';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => userService.updateProfile(payload),
    onSuccess: (data) => {
      logger.info('Profile updated successfully', { user: data.user });
      toast.success('Cập nhật thông tin thành công!');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      logger.error('Profile update failed', error);
      toast.error('Cập nhật thông tin thất bại', {
        description: getApiErrorMessage(error),
      });
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) => userService.changePassword(payload),
    onSuccess: () => {
      logger.info('Password changed successfully');
      toast.success('Đổi mật khẩu thành công!');
    },
    onError: (error) => {
      logger.error('Password change failed', error);
      toast.error('Đổi mật khẩu thất bại', {
        description: getApiErrorMessage(error),
      });
    },
  });
};