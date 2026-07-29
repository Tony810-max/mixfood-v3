import { useLanguage } from "@/contexts/LanguageContext";
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
  
  return [
    { value: "1", label: t.guest1 },
    { value: "2", label: t.guest2 },
    { value: "3", label: t.guest3 },
    { value: "4", label: t.guest4 },
    { value: "5", label: t.guest5 },
    { value: "6", label: t.guest6 },
    { value: "7", label: t.guest7 },
    { value: "8", label: t.guest8 },
    { value: "9", label: t.guest9 },
    { value: "10", label: t.guest10 },
    { value: "10+", label: t.guest10Plus },
  ] as const;
};

export const timeSlots = [
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"
] as const;
