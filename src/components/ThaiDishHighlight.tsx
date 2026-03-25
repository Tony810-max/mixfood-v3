import React, { useState } from "react";
import { Star, Clock, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SocialShare from "@/components/SocialShare";
import { useLanguage } from "@/contexts/LanguageContext";

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
    <section className="py-16 bg-gradient-to-br from-red-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.thaiSpecialties}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.thaiSpecialtiesDesc}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {Object.entries(dishes).map(([key, dish]) => (
            <Button
              key={key}
              variant={activeTab === key ? "default" : "outline"}
              onClick={() => setActiveTab(key)}
              className={`px-4 py-2 rounded-full transition-all ${
                activeTab === key
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "hover:bg-red-50 hover:text-red-600"
              }`}
            >
              {dish.name}
            </Button>
          ))}
        </div>

        {/* Dish Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Content */}
          <div className="space-y-6">
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
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

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {currentDish.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="flex justify-center mb-1">
                      {renderStars(currentDish.rating)}
                    </div>
                    <p className="text-sm text-gray-600">{t.rating}</p>
                    <p className="font-semibold">{currentDish.rating}</p>
                  </div>
                  <div className="text-center">
                    <Clock className="h-5 w-5 mx-auto mb-1 text-red-600" />
                    <p className="text-sm text-gray-600">{t.time}</p>
                    <p className="font-semibold">{currentDish.time}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center gap-1 mb-1">
                      {renderSpicyLevel(currentDish.spicy)}
                    </div>
                    <p className="text-sm text-gray-600">{t.spicyLevel}</p>
                    <p className="font-semibold">{currentDish.spicy}/5</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button className="flex-1 bg-red-600 hover:bg-red-700">
                    {t.orderDishNow}
                  </Button>
                  <SocialShare
                    title={`${currentDish.name} - Mix Food Đà Nẵng`}
                    description={`${currentDish.vietnamese} - ${currentDish.description}`}
                  />
                </div>
              </CardContent>
            </Card>

            {/* SEO Info Box */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {t.whyChooseMixFood}
                </h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>{t.whyChooseMixFood1}</li>
                  <li>{t.whyChooseMixFood2}</li>
                  <li>{t.whyChooseMixFood3}</li>
                  <li>{t.whyChooseMixFood4}</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Right Content - Image Placeholder */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-red-100 to-orange-100 rounded-2xl flex items-center justify-center">
              <div className="w-32 h-32 bg-red-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">🍜</span>
              </div>
              <p className="text-gray-600 font-medium">
                {t.dishImage} {currentDish.name}
              </p>
              <p className="text-sm text-gray-500">{t.dishImageCaption}</p>
            </div>

            {/* Floating Badge */}
            <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              {t.dishSpecialty}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThaiDishHighlight;
