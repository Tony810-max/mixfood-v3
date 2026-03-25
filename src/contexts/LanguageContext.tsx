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
    heroTitle: "Thai Culinary Specialties",
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
    hoursValue: "9:00  – 21:50 Daily",
    phone: "(+84) 905 473 728",
    copyright: "© 2026 Mix Food Da Nang. All rights reserved.",
    greenCurry: "Green Curry Chicken",
    greenCurryDesc: "Coconut milk, Thai basil, bamboo shoots, kaffir lime.",
    tomYum: "Tom Yum Goong",
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
    openingHoursValue: "Monday – Sunday: 10:00 – 21:50",
    policy: "Restaurant Policy",
    policy1: "Reservations must be made at least 2 hours in advance",
    policy2:
      "Tables are held for a maximum of 10 minutes after reservation time",
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

    // Thai Dish Highlight Component
    thaiSpecialties: "Specialties of Thai Cuisine",
    thaiSpecialtiesDesc:
      "Discover authentic Thai dishes with distinctive flavors, prepared by professional chefs",
    orderNow: "Order Now",
    dishSpecialty: "Specialty Dish",
    whyChooseMixFood: "Why Choose Mix Food?",
    whyChooseMixFood1: "• Fresh ingredients imported from Thailand",
    whyChooseMixFood2: "• Professional chefs with 10+ years experience",
    whyChooseMixFood3: "• Authentic Thai flavors",
    whyChooseMixFood4: "• Elegant, modern space",
    dishImage: "Dish Image",
    dishImageCaption: "Photographed at Mix Food Da Nang",
    keywords: "Keywords",
    tomYumGoong: "Tom Yum Goong",
    tomYumVietnamese: "Spicy Lemongrass Soup with Prawns",
    tomYumDesc:
      "Signature Thai soup with spicy & sour flavor, fresh prawns, mushrooms and special herbs.",
    padThai: "Pad Thai",
    padThaiVietnamese: "Stir-Fried Thai Noodles",
    padThaiDesc:
      "Classic stir-fried noodles with shrimp, peanuts, bean sprouts and special sauce creating perfect balance.",
    somTam: "Som Tam",
    somTamVietnamese: "Green Papaya Salad",
    somTamDesc:
      "Green papaya salad mixed with tomatoes, peanuts, chili and fish sauce creating refreshing, flavorful Thai dish.",
    mangoStickyRice: "Mango Sticky Rice",
    mangoStickyRiceVietnamese: "Sweet Mango Rice",
    mangoStickyRiceDesc:
      "Sweet dessert with ripe mango combined with sticky coconut rice and fresh shredded coconut.",
    rating: "Rating",
    time: "Time",
    spicyLevel: "Spicy Level",
    minutes: "minutes",
    price: "Price",
    orderDishNow: "Order Dish Now",
    shareDish: "Share Dish",
  },
  vi: {
    home: "Trang Chủ",
    menu: "Thực Đơn",
    reserveTable: "Đặt Bàn (Sắp Ra Mắt)",
    heroHeadline: "Tinh Hoa Ẩm Thực Thái Giữa Lòng Đà Nẵng",
    heroSub:
      "Từ đường phố Bangkok đến bờ biển Đà Nẵng. Trải nghiệm gia vị đích thực, hải sản tươi sống và lòng hiếu khách truyền thống Thái Lan.",
    heroTitle: "Đặc Sắc Ẩm Thực Thái",
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
    hoursValue: "9:00 – 21:50 Hàng ngày",
    phone: "(+84) 905 473 728",
    copyright: "© 2026 Mix Food Đà Nẵng. Bảo lưu mọi quyền.",
    greenCurry: "Cà Ri Xanh Gà",
    greenCurryDesc: "Nước cốt dừa, húng quế Thái, măng, lá chanh kaffir.",
    tomYum: "Tom Yum Goong",
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
    openingHoursValue: "Thứ Hai – Chủ Nhật: 9:00 – 21:50",
    policy: "Chính Sách Nhà Hàng",
    policy1: "Đặt bàn phải được thực hiện ít nhất 2 giờ trước",
    policy2: "Bàn được giữ tối đa 10 phút sau giờ đặt",
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
    // Thai Dish Highlight Component
    thaiSpecialties: "Tinh hoa ẩm thực Thái",
    thaiSpecialtiesDesc:
      "Khám phá các món ăn Thái chính gốc với hương vị đặc trưng, được chế biến bởi đầu bếp chuyên nghiệp",
    orderNow: "Đặt ngay",
    dishSpecialty: "Món đặc trưng",
    whyChooseMixFood: "Vì sao chọn Mix Food?",
    whyChooseMixFood1: "• Nguyên liệu tươi nhập khẩu từ Thái Lan",
    whyChooseMixFood2: "• Đầu bếp chuyên nghiệp với hơn 10 năm kinh nghiệm",
    whyChooseMixFood3: "• Hương vị Thái chuẩn gốc",
    whyChooseMixFood4: "• Không gian hiện đại, sang trọng",
    dishImage: "Hình ảnh món ăn",
    dishImageCaption: "Chụp tại Mix Food Đà Nẵng",
    keywords: "Từ khóa",

    tomYumGoong: "Tom Yum Goong",
    tomYumVietnamese: "Canh chua cay tôm",
    tomYumDesc:
      "Món canh đặc trưng Thái Lan với vị chua cay, tôm tươi, nấm và các loại thảo mộc đặc biệt.",

    padThai: "Pad Thai",
    padThaiVietnamese: "Phở xào kiểu Thái",
    padThaiDesc:
      "Mì xào truyền thống với tôm, đậu phộng, giá đỗ và nước sốt đặc biệt tạo nên hương vị cân bằng hoàn hảo.",

    somTam: "Som Tam",
    somTamVietnamese: "Gỏi đu đủ",
    somTamDesc:
      "Gỏi đu đủ xanh trộn với cà chua, đậu phộng, ớt và nước mắm tạo nên món ăn tươi mát, đậm đà.",

    mangoStickyRice: "Xôi xoài",
    mangoStickyRiceVietnamese: "Xôi xoài ngọt",
    mangoStickyRiceDesc:
      "Món tráng miệng ngọt với xoài chín kết hợp cùng xôi dừa và dừa nạo tươi.",

    rating: "Đánh giá",
    time: "Thời gian",
    spicyLevel: "Độ cay",
    minutes: "phút",
    price: "Giá",
    orderDishNow: "Đặt món ngay",
    shareDish: "Chia sẻ món ăn",
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
