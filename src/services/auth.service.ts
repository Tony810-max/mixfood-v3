import { apiRequest } from "./api";

const ACCESS_TOKEN_KEY = "mixfood.access-token";
const REFRESH_TOKEN_KEY = "mixfood.refresh-token";

type StorageLocation = "local" | "session";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  phone: string;
  email: string;
  code: string;
  password: string;
}

interface AuthResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
}

const clearStoredTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);
};

const storeTokens = ({ accessToken, refreshToken }: AuthResponse, remember: boolean) => {
  clearStoredTokens();

  const storage = remember ? localStorage : sessionStorage;
  storage.setItem(ACCESS_TOKEN_KEY, accessToken);
  storage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const authService = {
  async login(payload: LoginPayload, remember: boolean) {
    const response = await apiRequest<AuthResponse>("/auth/login", {
      method: "POST",
      body: payload,
    });

    storeTokens(response, remember);
    return response;
  },

  register(payload: RegisterPayload) {
    return apiRequest<{ message: string }>("/auth/register", {
      method: "POST",
      body: payload,
    });
  },

  sendRegistrationCode(email: string) {
    return apiRequest<{ message: string }>("/auth/otp", {
      method: "POST",
      body: { email, type: "REGISTER" },
    });
  },

  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY) ?? sessionStorage.getItem(ACCESS_TOKEN_KEY);
  },

  clearSession() {
    clearStoredTokens();
  },
};

export type { StorageLocation };

