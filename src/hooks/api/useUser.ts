/**
 * TanStack Query hooks for user management
 */

import { userService } from '@/services/user.service';
import { ChangePasswordPayload, UpdateProfilePayload } from '@/types';
import { logger } from '@/utils/logger';
import { showApiErrorToast, showOperationSuccess } from '@/utils/toastHelpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => userService.updateProfile(payload),
    onSuccess: (data) => {
      logger.info('Profile updated successfully', { user: data.user });
      showOperationSuccess('updateProfile');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      logger.error('Profile update failed', error);
      showApiErrorToast(error, 'Cập nhật thông tin thất bại');
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) => userService.changePassword(payload),
    onSuccess: () => {
      logger.info('Password changed successfully');
      showOperationSuccess('changePassword');
    },
    onError: (error) => {
      logger.error('Password change failed', error);
      showApiErrorToast(error, 'Đổi mật khẩu thất bại');
    },
  });
};