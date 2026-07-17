import { LucideIcon } from "lucide-react";
import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string().min(2, "Tên phải có ít nhất 2 ký tự").max(50, "Tên không được quá 50 ký tự"),
  phone: z.string().regex(/^(0[3-9][0-9]{8}|84[3-9][0-9]{8})$/, "Số điện thoại không hợp lệ"),
  email: z.string().email("Email không hợp lệ"),
  date: z.date({
    required_error: "Vui lòng chọn ngày đặt bàn",
  }),
  time: z.string().min(1, "Vui lòng chọn giờ"),
  guests: z.string().min(1, "Vui lòng chọn số lượng khách"),
  specialRequests: z.string().max(500, "Yêu cầu đặc biệt không được quá 500 ký tự").optional(),
})

export interface IBookingInfo{
  title: string;
  desription: string;
  icon: LucideIcon ;
}

export type BookingFormValues = z.infer<typeof bookingSchema>



