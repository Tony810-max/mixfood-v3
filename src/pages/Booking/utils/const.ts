import { Clock, MapPin, Phone } from "lucide-react";
import { IBookingInfo } from "./bookingSchema";

export const RESTAURANT_INFO: IBookingInfo[] = [
  {
    title: "Địa chỉ",
    icon: MapPin,
    desription: "K49 Nguyễn Văn Thoại, Hòa Thuận Tây, Hải Châu, Đà Nẵng",
  },
  {
    title: "Số điện thoại",
    icon: Phone,
    desription: "0905 473 728",
  },
  {
    title: "Giờ mở cửa",
    icon: Clock,
    desription: "09:00 - 21:50",
  },
] as const;


export const timeSlots = [
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"
] as const;

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
] as const;
