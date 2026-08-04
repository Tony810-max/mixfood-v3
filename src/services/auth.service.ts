import { STORAGE_KEYS } from "@/constants";
import axios from "@/lib/axios";
import {
    AuthResponse,
    LoginPayload,
    RegisterPayload
} from "@/types";
import { authStorage, storage } from "@/utils/storage";

const clearStoredTokens = () => {
  authStorage.clearAuth();
};

const storeTokens = ({ accessToken, refreshToken }: AuthResponse, remember: boolean) => {
  clearStoredTokens();

  const location: 'local' | 'session' = remember ? 'local' : 'session';
  storage.set(STORAGE_KEYS.ACCESS_TOKEN, accessToken, location);
  storage.set(STORAGE_KEYS.REFRESH_TOKEN, refreshToken, location);
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
    const location: 'local' | 'session' = storage.has(STORAGE_KEYS.REFRESH_TOKEN, 'local') ? 'local' : 'session';
    storage.set(STORAGE_KEYS.ACCESS_TOKEN, response.data.accessToken, location);
    storage.set(STORAGE_KEYS.REFRESH_TOKEN, response.data.refreshToken, location);

    return response.data.accessToken;
  },

  clearSession(): void {
    clearStoredTokens();
  },
};

