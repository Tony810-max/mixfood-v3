import { BOOKING_TIME_SLOTS, GUEST_OPTIONS } from "@/constants";
import { BookingRule, GuestOption, RestaurantInfo } from "@/types";
import { AlertCircle, Clock, MapPin, Phone } from "lucide-react";

/**
 * Get restaurant information for booking page
 * @param translations - Translation object with booking-related keys
 */
export const getRestaurantInfo = (translations: {
  bookingAddress: string;
  bookingAddressValue: string;
  bookingPhone: string;
  bookingPhoneValue: string;
  bookingHours: string;
  bookingHoursValue: string;
}): RestaurantInfo[] => {
  return [
    {
      title: translations.bookingAddress,
      icon: MapPin,
      description: translations.bookingAddressValue,
    },
    {
      title: translations.bookingPhone,
      icon: Phone,
      description: translations.bookingPhoneValue,
    },
    {
      title: translations.bookingHours,
      icon: Clock,
      description: translations.bookingHoursValue,
    },
  ];
};

/**
 * Get booking rules for booking page
 * @param translations - Translation object with booking rule keys
 */
export const getBookingRules = (translations: {
  bookingRuleAdvance: string;
  bookingRuleAdvanceDesc: string;
  bookingRuleHold: string;
  bookingRuleHoldDesc: string;
  bookingRuleCancel: string;
  bookingRuleCancelDesc: string;
  bookingRuleClosing: string;
  bookingRuleClosingDesc: string;
}): BookingRule[] => {
  return [
    {
      title: translations.bookingRuleAdvance,
      icon: Clock,
      description: translations.bookingRuleAdvanceDesc,
    },
    {
      title: translations.bookingRuleHold,
      icon: AlertCircle,
      description: translations.bookingRuleHoldDesc,
    },
    {
      title: translations.bookingRuleCancel,
      icon: AlertCircle,
      description: translations.bookingRuleCancelDesc,
    },
    {
      title: translations.bookingRuleClosing,
      icon: Clock,
      description: translations.bookingRuleClosingDesc,
    },
  ];
};

/**
 * Get guest options for booking form
 * @param translations - Translation object with guest/guests keys
 */
export const getGuestOptions = (translations: {
  guest: string;
  guests: string;
}): GuestOption[] => {
  return GUEST_OPTIONS.map(n => ({
    value: String(n),
    label: `${n} ${n === 1 ? translations.guest : translations.guests}`
  }));
};

// Re-export BOOKING_TIME_SLOTS from constants for backward compatibility
export { BOOKING_TIME_SLOTS };

