import { INFORMATION_RESTAURANT, SOCIAL_LINKS } from "@/utils/const";
import { Facebook, Instagram, Twitter } from "lucide-react";

const RestaurantInfo = () => {
  const socialLinks = SOCIAL_LINKS.map(link => ({
    ...link,
    icon: link.name === "Facebook" ? Facebook : 
            link.name === "Instagram" ? Instagram : 
            Twitter
  }));

  return (
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
  );
};

export default RestaurantInfo;