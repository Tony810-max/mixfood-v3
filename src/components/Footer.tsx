import {
  Facebook,
  Instagram,
  Twitter,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://www.facebook.com/mixfoodamthucthai",
      color: "hover:text-blue-600",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/mixfooddanang",
      color: "hover:text-pink-600",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://twitter.com/mixfooddanang",
      color: "hover:text-sky-600",
    },
  ];

  const quickLinks = [
    { label: t.home, href: "/" },
    { label: t.menu, href: "/menu" },
    { label: t.reserveTable, href: "/reserve" },
    { label: "Về chúng tôi", href: "/about" },
    { label: "Liên hệ", href: "/contact" },
  ];

  const thaiDishes = [
    { name: "Tom Yum", href: "/menu/tom-yum" },
    { name: "Pad Thai", href: "/menu/pad-thai" },
    { name: "Som Tam", href: "/menu/som-tam" },
    { name: "Mango Sticky Rice", href: "/menu/desserts" },
    { name: "Thai Tea", href: "/menu/drinks" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Restaurant Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-red-500">Mix Food</h3>
            <p className="text-gray-300 text-sm">
              Ẩm thực Thái chính thống tại Đà Nẵng. Thưởng thức hương vị đích
              thực từ Thái Lan với các món ăn đặc sắc.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-400 transition-colors ${social.color}`}
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Liên kết nhanh</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-red-500 transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Thai Dishes */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Món ăn đặc sắc</h4>
            <ul className="space-y-2">
              {thaiDishes.map((dish) => (
                <li key={dish.href}>
                  <a
                    href={dish.href}
                    className="text-gray-300 hover:text-red-500 transition-colors text-sm"
                  >
                    {dish.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Liên hệ</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300 text-sm">
                <MapPin className="h-4 w-4 text-red-500" />
                <span>{t.address}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 text-sm">
                <Phone className="h-4 w-4 text-red-500" />
                <span>{t.phone}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 text-sm">
                <Mail className="h-4 w-4 text-red-500" />
                <span>info@mixfood.vn</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 text-sm">
                <Clock className="h-4 w-4 text-red-500" />
                <span>{t.hoursValue}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Mix Food. Tất cả quyền được bảo lưu.
            </div>
            <div className="flex space-x-6 text-gray-400 text-sm">
              <a
                href="/privacy"
                className="hover:text-red-500 transition-colors"
              >
                Chính sách bảo mật
              </a>
              <a href="/terms" className="hover:text-red-500 transition-colors">
                Điều khoản sử dụng
              </a>
            </div>
          </div>
        </div>

        {/* SEO Keywords */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="text-center">
            <p className="text-gray-500 text-xs">
              Keywords: ẩm thực thái lan, nhà hàng thái lan đà nẵng, món ăn
              thái, tom yum, pad thai, som tam, đồ thái, nhà hàng thái, ẩm thực
              thái, mix food đà nẵng, nhà hàng thái chính thống, món thái chuẩn
              vị, ẩm thực thái đà nẵng
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
