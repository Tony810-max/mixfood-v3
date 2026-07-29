import { apiRequest } from "./api";

export interface CreateReservationPayload {
  name: string;
  phone: string;
  email?: string;
  reservationDate: string;
  reservationTime: string;
  numberOfGuests: number;
  note?: string;
}

export interface ReservationResponse {
  message: string;
  reservation: {
    id: number;
    status: "PENDING" | "CONFIRMED" | "CANCELLED";
  };
}

export const reservationService = {
  create(payload: CreateReservationPayload) {
    return apiRequest<ReservationResponse>("/reservations", {
      method: "POST",
      body: payload,
    });
  },
};
