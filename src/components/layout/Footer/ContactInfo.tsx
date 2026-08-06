import { useLanguage } from "@/contexts/LanguageContext";
import { INFORMATION_RESTAURANT } from "@/utils/const";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

const ContactInfo = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-3 md:space-y-4">
      <h4 className="text-base md:text-lg font-semibold">Liên hệ</h4>
      <div className="space-y-2 md:space-y-3">
        <div className="flex items-start space-x-2 md:space-x-3 text-gray-300 text-xs md:text-sm">
          <MapPin className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
          <span className="break-words">{INFORMATION_RESTAURANT.address}</span>
        </div>
        <div className="flex items-center space-x-2 md:space-x-3 text-gray-300 text-xs md:text-sm">
          <Phone className="h-4 w-4 text-red-500 shrink-0" />
          <span className="break-words">{INFORMATION_RESTAURANT.phone}</span>
        </div>
        <div className="flex items-center space-x-2 md:space-x-3 text-gray-300 text-xs md:text-sm">
          <Mail className="h-4 w-4 text-red-500 shrink-0" />
          <span className="break-words">{INFORMATION_RESTAURANT.email}</span>
        </div>
        <div className="flex items-center space-x-2 md:space-x-3 text-gray-300 text-xs md:text-sm">
          <Clock className="h-4 w-4 text-red-500 shrink-0" />
          <span className="break-words">{t.hoursValue}</span>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;