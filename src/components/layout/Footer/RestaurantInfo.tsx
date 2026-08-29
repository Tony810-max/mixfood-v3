import { SOCIAL_LINKS } from "@/utils/const";
import { useLanguage } from "@/contexts/LanguageContext";
import { Facebook, Instagram, Twitter } from "lucide-react";

const RestaurantInfo = () => {
  const { t } = useLanguage();
  const socialLinks = SOCIAL_LINKS.map(link => ({
    ...link,
    icon: link.name === "Facebook" ? Facebook : 
            link.name === "Instagram" ? Instagram : 
            Twitter
  }));

  return (
    <div className="space-y-3 md:space-y-4">
      <h3 className="text-lg md:text-xl font-bold text-red-500">Mix Food</h3>
      <p className="text-gray-300 text-xs md:text-sm">
        {t.footerAboutText}
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
  );
};

export default RestaurantInfo;