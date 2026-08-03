import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import DishCard from "./ThaiDishHighlight/DishCard";
import TabNavigation from "./ThaiDishHighlight/TabNavigation";

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

        <TabNavigation dishes={dishes} activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Dish Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
          <DishCard dish={currentDish} />

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
