import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "vi";

const translations = {
  en: {
    home: "Home",
    menu: "Menu",
    reserveTable: "Reserve Table (Comming Soon)",
    heroHeadline: "Authentic Thai Soul in the Heart of Da Nang",
    heroSub:
      "From the streets of Bangkok to the shores of Da Nang. Experience authentic spices, fresh local seafood, and traditional Thai hospitality.",
    viewMenu: "View Menu",
    aboutTitle: "The Balance of Four",
    aboutText:
      "At Mix Food, we honor the ancient Thai philosophy of balancing four essential flavors — Salt, Sweet, Spicy, and Sour. Every dish is a symphony of fresh herbs, aromatic spices, and locally sourced seafood, prepared by our chefs who trained in Bangkok's finest kitchens. Step into our warm, inviting space and let us transport you to Thailand.",
    bestSellers: "Our Best Sellers",
    bestSellersSub: "Taste the dishes our guests return for, again and again.",
    reviews: "What Our Guests Say",
    location: "Find Us",
    address:
      "K38/37 Nguyen Duy Hieu (K49 Nguyen Van Thoai), Son Tra District, Da Nang City, Vietnam",
    hours: "Opening Hours",
    hoursValue: "9:00 AM – 10:00 PM Daily",
    phone: "(+84) 905 473 728",
    copyright: "© 2026 Mix Food Da Nang. All rights reserved.",
    padThai: "Classic Pad Thai",
    padThaiDesc: "Rice noodles, fresh prawns, tamarind glaze, crushed peanuts.",
    greenCurry: "Green Curry Chicken",
    greenCurryDesc: "Coconut milk, Thai basil, bamboo shoots, kaffir lime.",
    tomYum: "Tom Yum Goong",
    tomYumDesc: "Spicy lemongrass broth, tiger prawns, galangal, chili.",
    somTum: "Som Tum Salad",
    somTumDesc: "Green papaya, dried shrimp, peanuts, chili-lime dressing.",
    mangoRice: "Mango Sticky Rice",
    mangoRiceDesc: "Sweet coconut sticky rice, fresh mango, coconut cream.",
    heroTomYum: "Tom Yum Goong",
    heroTomYumDesc: "Our signature spicy & sour soup with tiger prawns.",
    // Reservation page
    reservePageTitle: "Reserve Your Table",
    reservePageSub:
      "Book your dining experience at Mix Food. We look forward to welcoming you.",
    fullName: "Full Name",
    fullNamePlaceholder: "Enter your full name",
    phoneNumber: "Phone Number",
    phonePlaceholder: "+84 xxx xxx xxx",
    email: "Email",
    emailPlaceholder: "your@email.com",
    dateTime: "Date & Time",
    datePlaceholder: "Select date",
    timePlaceholder: "Select time",
    numberOfGuests: "Number of Guests",
    guestsPlaceholder: "Select guests",
    specialRequests: "Special Requests / Notes",
    specialRequestsPlaceholder: "Any dietary requirements or special occasion?",
    reserveButton: "Reserve Table",
    openingHours: "Opening Hours",
    openingHoursValue: "Monday – Sunday: 9:00 – 22:00",
    policy: "Restaurant Policy",
    policy1: "Reservations must be made at least 2 hours in advance",
    policy2:
      "Tables are held for a maximum of 15 minutes after reservation time",
    policy3:
      "Groups of 8 or more guests should contact the restaurant directly",
    policy4: "Cancellations must be made at least 1 hour in advance",
    contact: "Contact",
    contactPhone: "(+84) 905 473 728",
    contactEmail: "mixfood1708@gmail.com",
    contactNote: "Call us directly for quick consultation and reservations.",
    guest: "guest",
    guests: "guests",
    reservationSuccess: "Reservation submitted successfully!",
    reservationSuccessDesc: "We'll confirm your booking shortly.",
  },
  vi: {
    home: "Trang Chủ",
    menu: "Thực Đơn",
    reserveTable: "Đặt Bàn (Sắp Ra Mắt)",
    heroHeadline: "Tinh Hoa Ẩm Thực Thái Giữa Lòng Đà Nẵng",
    heroSub:
      "Từ đường phố Bangkok đến bờ biển Đà Nẵng. Trải nghiệm gia vị đích thực, hải sản tươi sống và lòng hiếu khách truyền thống Thái Lan.",
    viewMenu: "Xem Thực Đơn",
    aboutTitle: "Sự Cân Bằng Bốn Vị",
    aboutText:
      "Tại Mix Food, chúng tôi tôn vinh triết lý ẩm thực Thái cổ xưa về sự cân bằng bốn hương vị cơ bản — Mặn, Ngọt, Cay và Chua. Mỗi món ăn là một bản giao hưởng của thảo mộc tươi, gia vị thơm lừng và hải sản địa phương, được chế biến bởi các đầu bếp đào tạo tại những nhà hàng danh tiếng nhất Bangkok.",
    bestSellers: "Món Bán Chạy Nhất",
    bestSellersSub: "Thưởng thức những món ăn mà khách hàng luôn quay lại.",
    reviews: "Khách Hàng Nói Gì",
    location: "Tìm Chúng Tôi",
    address:
      "K38/37 Nguyen Duy Hieu (K49 Nguyen Van Thoai), Quận Sơn Trà, Thành phố Đà Nẵng, Việt Nam",
    hours: "Giờ Mở Cửa",
    hoursValue: "9:00 SA – 10:00 CH Hàng ngày",
    phone: "(+84) 905 473 728",
    copyright: "© 2026 Mix Food Đà Nẵng. Bảo lưu mọi quyền.",
    padThai: "Pad Thai Truyền Thống",
    padThaiDesc: "Bún xào, tôm tươi, sốt me, đậu phộng rang.",
    greenCurry: "Cà Ri Xanh Gà",
    greenCurryDesc: "Nước cốt dừa, húng quế Thái, măng, lá chanh kaffir.",
    tomYum: "Tom Yum Goong",
    tomYumDesc: "Canh chua cay sả, tôm sú, riềng, ớt.",
    somTum: "Gỏi Som Tum",
    somTumDesc: "Đu đủ xanh, tôm khô, đậu phộng, nước trộn chua cay.",
    mangoRice: "Xôi Xoài",
    mangoRiceDesc: "Xôi dừa ngọt, xoài tươi, kem dừa.",
    heroTomYum: "Tom Yum Goong",
    heroTomYumDesc: "Canh chua cay đặc trưng với tôm sú.",
    // Reservation page
    reservePageTitle: "Đặt Bàn",
    reservePageSub:
      "Đặt trải nghiệm ẩm thực tại Mix Food. Chúng tôi mong được chào đón bạn.",
    fullName: "Họ và Tên",
    fullNamePlaceholder: "Nhập họ và tên",
    phoneNumber: "Số Điện Thoại",
    phonePlaceholder: "+84 xxx xxx xxx",
    email: "Email",
    emailPlaceholder: "email@cuaban.com",
    dateTime: "Ngày & Giờ",
    datePlaceholder: "Chọn ngày",
    timePlaceholder: "Chọn giờ",
    numberOfGuests: "Số Lượng Khách",
    guestsPlaceholder: "Chọn số khách",
    specialRequests: "Yêu Cầu Đặc Biệt / Ghi Chú",
    specialRequestsPlaceholder: "Yêu cầu về chế độ ăn hoặc dịp đặc biệt?",
    reserveButton: "Đặt Bàn",
    openingHours: "Giờ Mở Cửa",
    openingHoursValue: "Thứ Hai – Chủ Nhật: 9:00 – 22:00",
    policy: "Chính Sách Nhà Hàng",
    policy1: "Đặt bàn phải được thực hiện ít nhất 2 giờ trước",
    policy2: "Bàn được giữ tối đa 15 phút sau giờ đặt",
    policy3: "Nhóm từ 8 khách trở lên vui lòng liên hệ trực tiếp nhà hàng",
    policy4: "Hủy đặt bàn phải thực hiện ít nhất 1 giờ trước",
    contact: "Liên Hệ",
    contactPhone: "(+84) 905 473 728",
    contactEmail: "mixfood1708@gmail.com",
    contactNote: "Gọi trực tiếp để được tư vấn và đặt bàn nhanh chóng.",
    guest: "khách",
    guests: "khách",
    reservationSuccess: "Đặt bàn thành công!",
    reservationSuccessDesc: "Chúng tôi sẽ xác nhận đặt chỗ của bạn sớm.",
  },
};

const LanguageContext = createContext<{
  lang: Language;
  setLang: (l: Language) => void;
  t: (typeof translations)["en"];
}>({
  lang: "en",
  setLang: () => {},
  t: translations.en,
});

export const useLanguage = () => useContext(LanguageContext);

const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
};

const setCookie = (name: string, value: string, days = 365) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value};expires=${expires};path=/;SameSite=Lax`;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = getCookie("lang");
    return saved === "vi" ? "vi" : "en";
  });

  const setLang = (l: Language) => {
    setLangState(l);
    setCookie("lang", l);
  };

  const t = translations[lang];
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
