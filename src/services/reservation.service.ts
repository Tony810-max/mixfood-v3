import axios from "@/lib/axios";
import {
    CreateReservationPayload,
    Reservation,
    ReservationResponse
} from "@/types";

export const reservationService = {
  async create(payload: CreateReservationPayload): Promise<ReservationResponse> {
    const response = await axios.post<ReservationResponse>("/reservations", payload);
    return response.data;
  },

  async getMyReservations(): Promise<Reservation[]> {
    const response = await axios.get<Reservation[]>("/reservations/my-reservations");
    return response.data;
  },
};
