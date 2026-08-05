import { authService } from '@/services/auth.service';
import { showErrorToast, showSuccessToast } from '@/utils/toastHelpers';
import { useState } from 'react';

type ForgotPasswordStep = 'email' | 'otp' | 'newPassword' | 'success';

interface UseForgotPasswordReturn {
  step: ForgotPasswordStep;
  email: string;
  otp: string;
  newPassword: string;
  confirmPassword: string;
  isLoading: boolean;
  error: string;
  setEmail: (email: string) => void;
  setOtp: (otp: string) => void;
  setNewPassword: (password: string) => void;
  setConfirmPassword: (password: string) => void;
  setStep: (step: ForgotPasswordStep) => void;
  handleSendOTP: () => Promise<void>;
  handleVerifyOTP: () => Promise<void>;
  handleResetPassword: () => Promise<void>;
  handleResendOTP: () => Promise<void>;
  reset: () => void;
}

export const useForgotPassword = (): UseForgotPasswordReturn => {
  const [step, setStep] = useState<ForgotPasswordStep>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOTP = async () => {
    if (!email) {
      setError('Vui lòng nhập email');
      showErrorToast('Vui lòng nhập email');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await authService.sendForgotPasswordOTP(email);
      setStep('otp');
      showSuccessToast('Đã gửi mã OTP đến email của bạn');
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      const errorMessage = error.response?.data?.message || 'Không thể gửi OTP. Vui lòng thử lại.';
      setError(errorMessage);
      showErrorToast(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      setError('Vui lòng nhập mã OTP 6 số');
      showErrorToast('Vui lòng nhập mã OTP 6 số');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await authService.verifyOTP(email, otp, 'FORGOT_PASSWORD');
      
      if (response.valid) {
        setStep('newPassword');
        showSuccessToast('Xác thực OTP thành công');
      } else {
        const errorMessage = response.message || 'Mã OTP không hợp lệ hoặc đã hết hạn';
        setError(errorMessage);
        showErrorToast(errorMessage);
      }
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      const errorMessage = error.response?.data?.message || 'Mã OTP không hợp lệ. Vui lòng thử lại.';
      setError(errorMessage);
      showErrorToast(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      setError('Vui lòng nhập mật khẩu mới');
      showErrorToast('Vui lòng nhập mật khẩu mới');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Mật khẩu không khớp');
      showErrorToast('Mật khẩu không khớp');
      return;
    }

    if (newPassword.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      showErrorToast('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await authService.resetPassword(email, otp, newPassword);
      setStep('success');
      showSuccessToast('Đặt lại mật khẩu thành công');
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      const errorMessage = error.response?.data?.message || 'Không thể đặt lại mật khẩu. Vui lòng thử lại.';
      setError(errorMessage);
      showErrorToast(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    setError('');

    try {
      await authService.sendForgotPasswordOTP(email);
      setOtp('');
      showSuccessToast('Đã gửi lại mã OTP');
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      const errorMessage = error.response?.data?.message || 'Không thể gửi lại OTP. Vui lòng thử lại.';
      setError(errorMessage);
      showErrorToast(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Wrapper functions to clear errors when user starts typing
  const handleSetEmail = (newEmail: string) => {
    setEmail(newEmail);
    if (error) setError('');
  };

  const handleSetOtp = (newOtp: string) => {
    setOtp(newOtp);
    if (error) setError('');
  };

  const handleSetNewPassword = (newPassword: string) => {
    setNewPassword(newPassword);
    if (error) setError('');
  };

  const handleSetConfirmPassword = (confirmPassword: string) => {
    setConfirmPassword(confirmPassword);
    if (error) setError('');
  };

  const reset = () => {
    setStep('email');
    setEmail('');
    setOtp('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
  };

  return {
    step,
    email,
    otp,
    newPassword,
    confirmPassword,
    isLoading,
    error,
    setEmail: handleSetEmail,
    setOtp: handleSetOtp,
    setNewPassword: handleSetNewPassword,
    setConfirmPassword: handleSetConfirmPassword,
    setStep,
    handleSendOTP,
    handleVerifyOTP,
    handleResetPassword,
    handleResendOTP,
    reset,
  };
};
