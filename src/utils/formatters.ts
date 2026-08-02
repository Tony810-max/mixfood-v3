/**
 * Format phone number by removing all non-digit characters
 */
export const formatPhoneNumber = (value: string): string => {
  return value.replace(/\D/g, '');
};

/**
 * Format verification code by removing all non-digit characters
 */
export const formatVerificationCode = (value: string): string => {
  return value.replace(/\D/g, '');
};
