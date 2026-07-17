import { z } from "zod"

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

export type BookingFormValues = z.infer<typeof bookingSchema>

export const timeSlots = [
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"
]

export const guestOptions = [
  { value: "1", label: "1 người" },
  { value: "2", label: "2 người" },
  { value: "3", label: "3 người" },
  { value: "4", label: "4 người" },
  { value: "5", label: "5 người" },
  { value: "6", label: "6 người" },
  { value: "7", label: "7 người" },
  { value: "8", label: "8 người" },
  { value: "9", label: "9 người" },
  { value: "10", label: "10 người" },
  { value: "10+", label: "Trên 10 người" },
]
