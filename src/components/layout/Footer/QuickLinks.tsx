import { useLanguage } from "@/contexts/LanguageContext";

const QuickLinks = () => {
  const { t } = useLanguage();

  const quickLinks = [
    { label: t.home, href: "/" },
    { label: t.menu, href: "/menu" },
    { label: t.reserveTable, href: "/reserve" },
    { label: "Về chúng tôi", href: "/about" },
    { label: "Liên hệ", href: "/contact" },
  ];

  return (
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
  );
};

export default QuickLinks;