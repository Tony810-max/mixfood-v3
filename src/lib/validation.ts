import { z } from "zod";

// Login form schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Register form schema
export const registerSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must not exceed 100 characters"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^(0|\+84)(3|5|7|8|9)[0-9]{8}$/, "Invalid phone number format"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: z
    .string()
    .min(1, "Please confirm your password"),
  verifyCode: z
    .string()
    .min(1, "Verification code is required")
    .length(6, "Verification code must be exactly 6 digits")
    .regex(/^\d+$/, "Verification code must contain only numbers"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type RegisterFormData = z.infer<typeof registerSchema>;

// Register step 1 - account details
export const registerStep1Schema = registerSchema.omit({ verifyCode: true });

// Register step 2 - email verification code
export const registerStep2Schema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  verifyCode: z
    .string()
    .min(1, "Verification code is required")
    .length(6, "Verification code must be exactly 6 digits")
    .regex(/^\d+$/, "Verification code must contain only numbers"),
});

export type RegisterStep1FormData = z.infer<typeof registerStep1Schema>;
export type RegisterStep2FormData = z.infer<typeof registerStep2Schema>;

// Change password form schema
export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(1, "Current password is required")
    .min(6, "Password must be at least 6 characters"),
  newPassword: z
    .string()
    .min(1, "New password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: z
    .string()
    .min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

// Forgot password form schema
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  otp: z
    .string()
    .min(1, "OTP is required")
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
  newPassword: z
    .string()
    .min(1, "New password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: z
    .string()
    .min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
