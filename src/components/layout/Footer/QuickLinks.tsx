import { useLanguage } from "@/contexts/LanguageContext";
import { ROUTES } from "@/utils/const";

const QuickLinks = () => {
  const { t } = useLanguage();

  const quickLinks = [
    { label: t.home, href: ROUTES.HOME },
    { label: t.menu, href: ROUTES.MENU },
    { label: t.reserveTable, href: ROUTES.RESERVE },
    { label: "Về chúng tôi", href: ROUTES.ABOUT },
    { label: "Liên hệ", href: ROUTES.CONTACT },
  ];

  return (
    <div className="space-y-3 md:space-y-4">
      <h4 className="text-base md:text-lg font-semibold">Liên kết nhanh</h4>
      <ul className="space-y-1.5 md:space-y-2">
        {quickLinks.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="text-gray-300 hover:text-red-500 transition-colors text-xs md:text-sm py-1 inline-block"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuickLinks;