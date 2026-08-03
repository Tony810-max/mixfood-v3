import { THAI_DISHES } from "@/utils/const";

const ThaiDishes = () => {
  const thaiDishes = THAI_DISHES;

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold">Món ăn đặc sắc</h4>
      <ul className="space-y-2">
        {thaiDishes.map((dish) => (
          <li key={dish.href}>
            <a
              href={dish.href}
              className="text-gray-300 hover:text-red-500 transition-colors text-sm"
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