export const ROUTES = {
  HOME: "/",
  MENU: "/menu",
  RESERVE: "/reserve",
  BOOKING: "/booking",
  BOOKING_SUCCESS: "/booking/success",
  PROFILE: "/profile",
  RESERVATIONS: "/reservations",
  ABOUT: "/about",
  CONTACT: "/contact",
  PRIVACY: "/privacy",
  TERMS: "/terms",
  MENU_ITEMS: {
    TOM_YUM: "/menu/tom-yum",
    PAD_THAI: "/menu/pad-thai",
    SOM_TAM: "/menu/som-tam",
    DESSERTS: "/menu/desserts",
    DRINKS: "/menu/drinks",
  },
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
    FORGOT_PASSWORD: "/forgot-password",
  },
} as const;

export const THAI_DISHES = [
  { name: "Tom Yum", href: ROUTES.MENU_ITEMS.TOM_YUM },
  { name: "Pad Thai", href: ROUTES.MENU_ITEMS.PAD_THAI },
  { name: "Som Tam", href: ROUTES.MENU_ITEMS.SOM_TAM },
  { name: "Mango Sticky Rice", href: ROUTES.MENU_ITEMS.DESSERTS },
  { name: "Thai Tea", href: ROUTES.MENU_ITEMS.DRINKS },
] as const;

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

export const GUEST_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, "> 8"] as const;
