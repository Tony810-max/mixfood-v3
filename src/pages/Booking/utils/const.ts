import { useLanguage } from "@/contexts/LanguageContext";
import { GUEST_OPTIONS } from "@/utils/const";
import { Clock, MapPin, Phone } from "lucide-react";

export const getRestaurantInfo = () => {
  const { t } = useLanguage();
  
  return [
    {
      title: t.bookingAddress,
      icon: MapPin,
      desription: t.bookingAddressValue,
    },
    {
      title: t.bookingPhone,
      icon: Phone,
      desription: t.bookingPhoneValue,
    },
    {
      title: t.bookingHours,
      icon: Clock,
      desription: t.bookingHoursValue,
    },
  ] as const;
};

export const getGuestOptions = () => {
  const { t } = useLanguage();
  
  return GUEST_OPTIONS.map(n => ({
    value: String(n),
    label: `${n} ${n === 1 ? t.guest : t.guests}`
  }));
};

// Booking-specific time slots (lunch and dinner service only)
export const BOOKING_TIME_SLOTS = [
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"
] as const;
