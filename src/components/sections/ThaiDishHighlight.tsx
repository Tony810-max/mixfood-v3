import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";
import DishCard from "./ThaiDishHighlight/DishCard";
import TabNavigation from "./ThaiDishHighlight/TabNavigation";

const ThaiDishHighlight = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("tom-yum");
  const [loadedImage, setLoadedImage] = useState<string | null>(null);

  const dishes = {
    "tom-yum": {
      name: t.specialtyTomYumName,
      vietnamese: t.specialtyTomYumVietnamese,
      description: t.specialtyTomYumDesc,
      price: "90.000đ",
      rating: 4.9,
      time: "20 phút",
      spicy: 3,
      image: "/images/tomyum-hs.webp",
    },
    "pad-thai": {
      name: t.specialtyPadThaiName,
      vietnamese: t.specialtyPadThaiVietnamese,
      description: t.specialtyPadThaiDesc,
      price: "90.000đ",
      rating: 4.8,
      time: "15 phút",
      spicy: 1,
      image: "/images/pad-thai.webp",
    },
    "som-tam": {
      name: t.specialtySomTamName,
      vietnamese: t.specialtySomTamVietnamese,
      description: t.specialtySomTamDesc,
      price: "45.000đ",
      rating: 4.7,
      time: "5 phút",
      spicy: 4,
      image: "/images/son-tam.webp",
    },
    "mango-sticky-rice": {
      name: t.specialtyMangoStickyRiceName,
      vietnamese: t.specialtyMangoStickyRiceVietnamese,
      description: t.specialtyMangoStickyRiceDesc,
      price: "50.000đ",
      rating: 4.9,
      time: "5 phút",
      spicy: 0,
      image: "/images/xoi-xoai.webp",
    },
  };

  const currentDish = dishes[activeTab as keyof typeof dishes];

  useEffect(() => {
    let cancelled = false;
    const image = new Image();
    const finishLoading = () => {
      if (!cancelled) setLoadedImage(currentDish.image);
    };

    image.addEventListener("load", finishLoading);
    image.addEventListener("error", finishLoading);
    image.src = currentDish.image;
    if (image.complete) finishLoading();

    return () => {
      cancelled = true;
      image.removeEventListener("load", finishLoading);
      image.removeEventListener("error", finishLoading);
    };
  }, [currentDish.image]);

  const isImageLoading = loadedImage !== currentDish.image;

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
            {t.thaiSpecialties}
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            {t.thaiSpecialtiesDesc}
          </p>
        </div>

        <TabNavigation
          dishes={dishes}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Dish Content */}
        <div className="grid grid-cols-1 gap-8 md:gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center max-w-6xl mx-auto">
          <DishCard dish={currentDish} />

          {/* Right Content - Image */}
          <div
            className="relative order-first mx-auto w-full max-w-md aspect-[3/4] overflow-hidden rounded-2xl bg-[#fff7ed] shadow-sm lg:order-last"
            aria-busy={isImageLoading}
          >
            {isImageLoading ? (
              <div className="dish-image-skeleton absolute inset-0" aria-label="Loading dish image">
                <div className="dish-image-skeleton-content">
                  <div className="dish-image-skeleton-icon" />
                  <div className="dish-image-skeleton-line w-28" />
                  <div className="dish-image-skeleton-line w-20" />
                </div>
              </div>
            ) : (
              <img
                key={currentDish.image}
                src={currentDish.image}
                alt={currentDish.name}
                className="h-full w-full object-contain"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThaiDishHighlight;
