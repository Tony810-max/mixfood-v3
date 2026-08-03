import { INFORMATION_RESTAURANT } from "@/utils/const";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactInfo = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold">Liên hệ</h4>
      <div className="space-y-3">
        <div className="flex items-center space-x-3 text-gray-300 text-sm">
          <MapPin className="h-4 w-4 text-red-500" />
          <span>{INFORMATION_RESTAURANT.address}</span>
        </div>
        <div className="flex items-center space-x-3 text-gray-300 text-sm">
          <Phone className="h-4 w-4 text-red-500" />
          <span>{INFORMATION_RESTAURANT.phone}</span>
        </div>
        <div className="flex items-center space-x-3 text-gray-300 text-sm">
          <Mail className="h-4 w-4 text-red-500" />
          <span>{INFORMATION_RESTAURANT.email}</span>
        </div>
        <div className="flex items-center space-x-3 text-gray-300 text-sm">
          <Clock className="h-4 w-4 text-red-500" />
          <span>{t.hoursValue}</span>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;