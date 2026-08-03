import SocialShare from "@/components/seo/SocialShare";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

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
    <div className="space-y-6">
      {/* Main Card */}
      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {dish.name}
              </h3>
              <p className="text-lg text-red-600 font-medium">
                {dish.vietnamese}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-red-600">
                {dish.price}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-6 leading-relaxed">
            {dish.description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-center mb-1">
                {renderStars(dish.rating)}
              </div>
              <p className="text-sm text-gray-600">{t.rating}</p>
              <p className="font-semibold">{dish.rating}</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <Clock className="h-5 w-5 mx-auto mb-1 text-red-600" />
              <p className="text-sm text-gray-600">{t.time}</p>
              <p className="font-semibold">{dish.time}</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-center gap-1 mb-1">
                {renderSpicyLevel(dish.spicy)}
              </div>
              <p className="text-sm text-gray-600">{t.spicyLevel}</p>
              <p className="font-semibold">{dish.spicy}/5</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button className="flex-1 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white">
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
        <CardContent className="p-5">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {t.whyChooseMixFood}
          </h4>
          <ul className="text-sm text-gray-700 space-y-2">
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