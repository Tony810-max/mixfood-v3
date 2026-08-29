import { LucideIcon } from "lucide-react";
import { z } from "zod";
import { VALIDATION } from "@/constants";

export const bookingSchema = z.object({
  name: z.string().min(2, "Tên phải có ít nhất 2 ký tự").max(50, "Tên không được quá 50 ký tự"),
  phone: z.string().regex(/^(0|\+84)[3-9][0-9]{8}$/, "Số điện thoại không hợp lệ"),
  email: z.string().email("Email không hợp lệ"),
  date: z.date({
    required_error: "Vui lòng chọn ngày đặt bàn",
  }),
  time: z.string().min(1, "Vui lòng chọn giờ"),
  guests: z.string().min(1, "Vui lòng nhập số lượng khách").transform((val) => {
    const num = parseInt(val);
    if (isNaN(num) || num < 1) {
      throw new Error("Số lượng khách phải ít nhất 1");
    }
    if (num > 50) {
      throw new Error("Số lượng khách tối đa 50");
    }
    return num;
  }),
  specialRequests: z.string().max(500, "Yêu cầu đặc biệt không được quá 500 ký tự").optional(),
}).refine((data) => {
  // Combine date and time to create full datetime
  const [hours, minutes] = data.time.split(':').map(Number);
  const reservationDateTime = new Date(data.date);
  reservationDateTime.setHours(hours, minutes, 0, 0);
  
  // Check if reservation is at least 30 minutes in the future
  const now = new Date();
  const minTime = new Date(now.getTime() + VALIDATION.MIN_ADVANCE_BOOKING_MINUTES * 60 * 1000);
  
  if (reservationDateTime < minTime) {
    return false;
  }
  
  // Check if reservation is before closing time (21:50)
  const closingTime = new Date(reservationDateTime);
  closingTime.setHours(21, 50, 0, 0);
  
  if (reservationDateTime > closingTime) {
    return false;
  }
  
  return true;
}, {
  message: `Đặt bàn phải trước ít nhất ${VALIDATION.MIN_ADVANCE_BOOKING_MINUTES} phút và trước 21:50 (giờ đóng cửa)`,
  path: ["date"]
})

export interface IBookingInfo{
  title: string;
  desription: string;
  icon: LucideIcon ;
}

export type BookingFormValues = z.infer<typeof bookingSchema>



