import { forgotPasswordSchema, type ForgotPasswordFormData } from '@/lib/validation';
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
  errors: Partial<Record<keyof ForgotPasswordFormData, string>>;
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

export interface ForgotPasswordMessages {
  sendSuccess: string;
  sendError: string;
  resendSuccess: string;
  resendError: string;
  otpLengthError: string;
  otpVerifySuccess: string;
  otpVerifyError: string;
  resetSuccess: string;
  resetError: string;
}

export const useForgotPassword = (messages: ForgotPasswordMessages): UseForgotPasswordReturn => {
  const [step, setStep] = useState<ForgotPasswordStep>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState<Partial<Record<keyof ForgotPasswordFormData, string>>>({});

  const handleSendOTP = async () => {
    // Validate email using zod
    const emailValidation = forgotPasswordSchema.safeParse({ email, otp: '123456', newPassword: 'Test123', confirmPassword: 'Test123' });

    if (!emailValidation.success) {
      const emailError = emailValidation.error.errors.find(e => e.path[0] === 'email');
      if (emailError) {
        setError(emailError.message);
        showErrorToast(emailError.message);
        return;
      }
    }

    setIsLoading(true);
    setError('');

    try {
      await authService.sendForgotPasswordOTP(email);
      setStep('otp');
      showSuccessToast(messages.sendSuccess);
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      const errorMessage = error.response?.data?.message || messages.sendError;
      setError(errorMessage);
      showErrorToast(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      setError(messages.otpLengthError);
      showErrorToast(messages.otpLengthError);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await authService.verifyOTP(email, otp, 'FORGOT_PASSWORD');
      
      if (response.valid) {
        setStep('newPassword');
        showSuccessToast(messages.otpVerifySuccess);
      } else {
        const errorMessage = response.message || messages.otpVerifyError;
        setError(errorMessage);
        showErrorToast(errorMessage);
      }
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      const errorMessage = error.response?.data?.message || messages.otpVerifyError;
      setError(errorMessage);
      showErrorToast(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    // Validate form using zod
    const formData: ForgotPasswordFormData = {
      email,
      otp,
      newPassword,
      confirmPassword,
    };

    const result = forgotPasswordSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ForgotPasswordFormData, string>> = {};
      result.error.errors.forEach((error) => {
        const field = error.path[0] as keyof ForgotPasswordFormData;
        fieldErrors[field] = error.message;
      });
      setErrors(fieldErrors);
      const firstError = result.error.errors[0];
      const errorMessage = firstError?.message || 'Validation failed';
      setError(errorMessage);
      showErrorToast(errorMessage);
      return;
    }

    setIsLoading(true);
    setError('');
    setErrors({});

    try {
      await authService.resetPassword(email, otp, newPassword);
      setStep('success');
      showSuccessToast(messages.resetSuccess);
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      const errorMessage = error.response?.data?.message || messages.resetError;
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
      showSuccessToast(messages.resendSuccess);
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      const errorMessage = error.response?.data?.message || messages.resendError;
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
    if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
  };

  const handleSetOtp = (newOtp: string) => {
    setOtp(newOtp);
    if (error) setError('');
    if (errors.otp) setErrors(prev => ({ ...prev, otp: '' }));
  };

  const handleSetNewPassword = (newPassword: string) => {
    setNewPassword(newPassword);
    if (error) setError('');
    if (errors.newPassword) setErrors(prev => ({ ...prev, newPassword: '' }));
  };

  const handleSetConfirmPassword = (confirmPassword: string) => {
    setConfirmPassword(confirmPassword);
    if (error) setError('');
    if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: '' }));
  };

  const reset = () => {
    setStep('email');
    setEmail('');
    setOtp('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setErrors({});
  };

  return {
    step,
    email,
    otp,
    newPassword,
    confirmPassword,
    isLoading,
    error,
    errors,
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
