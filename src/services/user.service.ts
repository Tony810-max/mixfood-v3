import axios from "@/lib/axios";
import { ChangePasswordPayload, UpdateProfilePayload, User } from "@/types";
import { logger } from "@/utils/logger";

export const userService = {
  async updateProfile(payload: UpdateProfilePayload): Promise<{ message: string; user: User }> {
    logger.debug('Updating user profile');
    const response = await axios.put<{ message: string; user: User }>("/users/profile", payload);
    return response.data;
  },

  async changePassword(payload: ChangePasswordPayload): Promise<{ message: string }> {
    logger.debug('Changing user password');
    const response = await axios.post<{ message: string }>("/auth/change-password", payload);
    return response.data;
  },
};
