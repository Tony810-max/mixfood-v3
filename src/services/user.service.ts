import { apiRequest } from "./api";
import { authService } from "./auth.service";

export interface UpdateProfilePayload {
  name?: string;
  email?: string;
  phone?: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export const userService = {
  async updateProfile(payload: UpdateProfilePayload) {
    const token = authService.getAccessToken();
    console.log('Token for update profile:', token ? 'exists' : 'missing');
    return apiRequest<{ message: string; user: { id: number; name: string; email: string; phone: string; role: string } }>("/users/profile", {
      method: "PUT",
      body: payload,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  async changePassword(payload: ChangePasswordPayload) {
    const token = authService.getAccessToken();
    console.log('Token for change password:', token ? 'exists' : 'missing');
    return apiRequest<{ message: string }>("/auth/change-password", {
      method: "POST",
      body: payload,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
