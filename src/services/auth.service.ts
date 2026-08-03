import { STORAGE_KEYS } from "@/constants";
import axios from "@/lib/axios";
import {
    AuthResponse,
    LoginPayload,
    RegisterPayload
} from "@/types";

const clearStoredTokens = () => {
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
  sessionStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  sessionStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  sessionStorage.removeItem(STORAGE_KEYS.USER);
};

const storeTokens = ({ accessToken, refreshToken }: AuthResponse, remember: boolean) => {
  clearStoredTokens();

  const storage = remember ? localStorage : sessionStorage;
  storage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
  storage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
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
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN) ?? sessionStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  },

  getRefreshToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN) ?? sessionStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  },

  async refreshAccessToken(): Promise<string> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await axios.post<{ accessToken: string; refreshToken: string }>("/auth/refresh-token", { refreshToken });

    // Update stored tokens
    const storage = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN) ? localStorage : sessionStorage;
    storage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.data.accessToken);
    storage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.data.refreshToken);

    return response.data.accessToken;
  },

  clearSession(): void {
    clearStoredTokens();
  },
};

