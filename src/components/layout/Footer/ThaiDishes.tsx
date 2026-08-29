import { THAI_DISHES } from "@/utils/const";
import { useLanguage } from "@/contexts/LanguageContext";

const ThaiDishes = () => {
  const { t } = useLanguage();
  const thaiDishes = THAI_DISHES;

  return (
    <div className="space-y-3 md:space-y-4">
      <h4 className="text-base md:text-lg font-semibold">{t.footerSpecialtyDishes}</h4>
      <ul className="space-y-1.5 md:space-y-2">
        {thaiDishes.map((dish) => (
          <li key={dish.href}>
            <a
              href={dish.href}
              className="text-gray-300 hover:text-red-500 transition-colors text-xs md:text-sm py-1 inline-block"
            >
              {dish.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThaiDishes;