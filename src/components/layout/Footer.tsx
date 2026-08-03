import ContactInfo from "./Footer/ContactInfo";
import QuickLinks from "./Footer/QuickLinks";
import RestaurantInfo from "./Footer/RestaurantInfo";
import ThaiDishes from "./Footer/ThaiDishes";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <RestaurantInfo />
          <QuickLinks />
          <ThaiDishes />
          <ContactInfo />
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
