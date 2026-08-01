export const ROUTES = {
  HOME: "/",
  MENU: "/menu",
  RESERVE: "/reserve",
  BOOKING: "/booking",
  BOOKING_SUCCESS: "/booking/success",
  PROFILE: "/profile",
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
  },
} as const;

export const INFORMATION_RESTAURANT = {
  address: "K49 Nguyễn Văn Thoại, Hòa Thuận Tây, Hải Châu, Đà Nẵng",
  phone: "0905 473 728",
  email: "mixfood1708@gmail.com",
  openHours: "09:00 - 21:50",
} as const;

export const TIME_SLOTS = [
  "9:00",
  "9:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
] as const;

export const SOCIAL_LINKS = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/mixfoodamthucthai",
    color: "hover:text-blue-600",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/mixfooddanang",
    color: "hover:text-pink-600",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/mixfooddanang",
    color: "hover:text-sky-600",
  },
] as const;

export const THAI_DISHES = [
  { name: "Tom Yum", href: "/menu/tom-yum" },
  { name: "Pad Thai", href: "/menu/pad-thai" },
  { name: "Som Tam", href: "/menu/som-tam" },
  { name: "Mango Sticky Rice", href: "/menu/desserts" },
  { name: "Thai Tea", href: "/menu/drinks" },
] as const;

export const GUEST_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, "> 8"] as const;
