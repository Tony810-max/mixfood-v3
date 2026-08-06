import SocialShare from "@/components/seo/SocialShare";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Clock, MapPin, Star } from "lucide-react";

interface DishCardProps {
  dish: {
    name: string;
    vietnamese: string;
    description: string;
    price: string;
    rating: number;
    time: string;
    spicy: number;
  };
}

const DishCard = ({ dish }: DishCardProps) => {
  const { t } = useLanguage();

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  const renderSpicyLevel = (level: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <div
        key={i}
        className={`h-2 w-2 rounded-full ${i < level ? "bg-red-500" : "bg-gray-300"}`}
      />
    ));
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Main Card */}
      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-4 md:p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-3 md:mb-4">
            <div className="flex-1 pr-4">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                {dish.name}
              </h3>
              <p className="text-base md:text-lg text-red-600 font-medium">
                {dish.vietnamese}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xl md:text-2xl font-bold text-red-600">
                {dish.price}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
            {dish.description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-6">
            <div className="text-center p-2 md:p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-center mb-1">
                {renderStars(dish.rating)}
              </div>
              <p className="text-xs md:text-sm text-gray-600">{t.rating}</p>
              <p className="font-semibold text-sm md:text-base">{dish.rating}</p>
            </div>
            <div className="text-center p-2 md:p-3 bg-gray-50 rounded-lg">
              <Clock className="h-4 w-4 md:h-5 md:w-5 mx-auto mb-1 text-red-600" />
              <p className="text-xs md:text-sm text-gray-600">{t.time}</p>
              <p className="font-semibold text-sm md:text-base">{dish.time}</p>
            </div>
            <div className="text-center p-2 md:p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-center gap-0.5 md:gap-1 mb-1">
                {renderSpicyLevel(dish.spicy)}
              </div>
              <p className="text-xs md:text-sm text-gray-600">{t.spicyLevel}</p>
              <p className="font-semibold text-sm md:text-base">{dish.spicy}/5</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 md:gap-3">
            <Button className="flex-1 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white min-h-[44px]">
              {t.orderDishNow}
            </Button>
            <SocialShare
              title={`${dish.name} - Mix Food Đà Nẵng`}
              description={`${dish.vietnamese} - ${dish.description}`}
            />
          </div>
        </CardContent>
      </Card>

      {/* Why Choose Box */}
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="p-4 md:p-5">
          <h4 className="font-semibold text-gray-900 mb-2 md:mb-3 flex items-center gap-2 text-sm md:text-base">
            <MapPin className="h-4 w-4" />
            {t.whyChooseMixFood}
          </h4>
          <ul className="text-xs md:text-sm text-gray-700 space-y-1.5 md:space-y-2">
            <li>• {t.whyChooseMixFood1}</li>
            <li>• {t.whyChooseMixFood2}</li>
            <li>• {t.whyChooseMixFood3}</li>
            <li>• {t.whyChooseMixFood4}</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default DishCard;