import SocialShare from "@/components/SocialShare";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Clock, MapPin, Star } from "lucide-react";
import { useState } from "react";

const ThaiDishHighlight = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("tom-yum");

  const dishes = {
    "tom-yum": {
      name: t.tomYumGoong,
      vietnamese: t.tomYumVietnamese,
      description: t.tomYumDesc,
      price: "250.000đ",
      rating: 4.9,
      time: "20 phút",
      spicy: 3,
    },
    "pad-thai": {
      name: t.padThai,
      vietnamese: t.padThai,
      description: t.padThaiDesc,
      price: "70.000đ",
      rating: 4.8,
      time: "15 phút",
      spicy: 1,
    },
    "som-tam": {
      name: t.somTam,
      vietnamese: t.somTamVietnamese,
      description: t.somTamDesc,
      price: "40.000đ",
      rating: 4.7,
      time: "5 phút",
      spicy: 4,
    },
    "mango-sticky-rice": {
      name: t.mangoStickyRice,
      vietnamese: t.mangoStickyRiceVietnamese,
      description: t.mangoStickyRiceDesc,
      price: "60.000đ",
      rating: 4.9,
      time: "5 phút",
      spicy: 0,
    },
  };

  const currentDish = dishes[activeTab as keyof typeof dishes];

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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.thaiSpecialties}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.thaiSpecialtiesDesc}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {Object.entries(dishes).map(([key, dish]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${activeTab === key
                ? "bg-primary-gradient text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              {dish.name}
            </button>
          ))}
        </div>

        {/* Dish Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
          {/* Left Content */}
          <div className="space-y-6">
            {/* Main Card */}
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {currentDish.name}
                    </h3>
                    <p className="text-lg text-red-600 font-medium">
                      {currentDish.vietnamese}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-red-600">
                      {currentDish.price}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {currentDish.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-center mb-1">
                      {renderStars(currentDish.rating)}
                    </div>
                    <p className="text-sm text-gray-600">{t.rating}</p>
                    <p className="font-semibold">{currentDish.rating}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Clock className="h-5 w-5 mx-auto mb-1 text-red-600" />
                    <p className="text-sm text-gray-600">{t.time}</p>
                    <p className="font-semibold">{currentDish.time}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-center gap-1 mb-1">
                      {renderSpicyLevel(currentDish.spicy)}
                    </div>
                    <p className="text-sm text-gray-600">{t.spicyLevel}</p>
                    <p className="font-semibold">{currentDish.spicy}/5</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button className="flex-1 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white">
                    {t.orderDishNow}
                  </Button>
                  <SocialShare
                    title={`${currentDish.name} - Mix Food Đà Nẵng`}
                    description={`${currentDish.vietnamese} - ${currentDish.description}`}
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

          {/* Right Content - Image */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-red-100 to-orange-100 rounded-2xl flex flex-col items-center justify-center p-8">
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg mb-4">
                <span className="text-6xl">🍜</span>
              </div>
              <p className="text-xl font-semibold text-gray-800 mb-1">
                {currentDish.name}
              </p>
              <p className="text-sm text-gray-600">
                {t.dishImageCaption}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThaiDishHighlight;
