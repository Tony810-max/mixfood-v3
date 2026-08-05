import axios from "@/lib/axios";
import {
  AuthResponse,
  LoginPayload,
  RegisterPayload
} from "@/types";
import { authStorage } from "@/utils/storage";

const clearStoredTokens = () => {
  authStorage.clearAuth();
};

const storeTokens = ({ accessToken, refreshToken }: AuthResponse, remember: boolean) => {
  console.log('[storeTokens] Storing tokens:', {
    accessToken: accessToken ? 'exists' : 'missing',
    refreshToken: refreshToken ? 'exists' : 'missing',
    remember,
  });

  clearStoredTokens();

  const location: 'local' | 'session' = remember ? 'local' : 'session';
  console.log('[storeTokens] Location:', location);

  const result1 = authStorage.setAccessToken(accessToken, location);
  const result2 = authStorage.setRefreshToken(refreshToken, location);

  console.log('[storeTokens] Storage results:', { result1, result2 });
  console.log('[storeTokens] After storage:', {
    accessToken_local: localStorage.getItem('mixfood.access-token'),
    accessToken_session: sessionStorage.getItem('mixfood.access-token'),
    refreshToken_local: localStorage.getItem('mixfood.refresh-token'),
    refreshToken_session: sessionStorage.getItem('mixfood.refresh-token'),
  });
};

export const authService = {
  async login(payload: LoginPayload, remember: boolean): Promise<AuthResponse> {
    const response = await axios.post<AuthResponse>("/auth/login", payload);
    storeTokens(response.data, remember);
    return response.data;
  },

  async register(payload: RegisterPayload): Promise<{ message: string }> {
    const response = await axios.post<{ message: string }>("/auth/register", payload);
    return response.data;
  },

  async sendRegistrationCode(email: string): Promise<{ message: string }> {
    const response = await axios.post<{ message: string }>("/auth/otp", { email, type: "REGISTER" });
    return response.data;
  },

  async sendForgotPasswordOTP(email: string): Promise<{ message: string }> {
    const response = await axios.post<{ message: string }>("/auth/otp", { email, type: "FORGOT_PASSWORD" });
    return response.data;
  },

  async verifyOTP(email: string, otp: string, type: string): Promise<{ message: string; valid: boolean }> {
    const response = await axios.post<{ message: string; valid: boolean }>("/auth/verify-otp", { email, otp, type });
    return response.data;
  },

  async resetPassword(email: string, otp: string, newPassword: string): Promise<{ message: string }> {
    const response = await axios.post<{ message: string }>("/auth/reset-password", { email, otp, newPassword });
    return response.data;
  },

  getAccessToken(): string | null {
    return authStorage.getAccessToken();
  },

  getRefreshToken(): string | null {
    return authStorage.getRefreshToken();
  },

  async refreshAccessToken(): Promise<string> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await axios.post<{ accessToken: string; refreshToken: string }>("/auth/refresh-token", { refreshToken });

    // Update stored tokens
    const location: 'local' | 'session' = localStorage.getItem('mixfood.refresh-token') ? 'local' : 'session';
    authStorage.setAccessToken(response.data.accessToken, location);
    authStorage.setRefreshToken(response.data.refreshToken, location);

    return response.data.accessToken;
  },

  clearSession(): void {
    clearStoredTokens();
  },
};

