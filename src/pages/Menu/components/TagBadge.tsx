
import { BadgeCheck, ChefHat, Flame, Leaf, Star } from "lucide-react";
import type { MenuItemTag } from "@/types";

const TagBadge = ({ tag, lang }: { tag: MenuItemTag; lang: "en" | "vn" }) => {
  const config: Record<
    MenuItemTag,
    { icon: typeof Star; label: { en: string; vn: string }; className: string }
  > = {
    signature: {
      icon: Star,
      label: { en: "Signature", vn: "Đặc trưng" },
      className: "border border-orange-300 bg-orange-100 text-orange-800 dark:border-orange-500/40 dark:bg-orange-500/15 dark:text-orange-200",
    },
    spicy: {
      icon: Flame,
      label: { en: "Spicy", vn: "Cay" },
      className: "border border-red-300 bg-red-100 text-red-800 dark:border-red-500/40 dark:bg-red-500/15 dark:text-red-200",
    },
    recommended: {
      icon: BadgeCheck,
      label: { en: "Recommended", vn: "Đề xuất" },
      className: "border border-amber-300 bg-amber-100 text-amber-800 dark:border-amber-500/40 dark:bg-amber-500/15 dark:text-amber-200",
    },
    vegetarian: {
      icon: Leaf,
      label: { en: "Vegetarian", vn: "Chay" },
      className: "border border-lime-300 bg-lime-100 text-lime-800 dark:border-lime-500/40 dark:bg-lime-500/15 dark:text-lime-200",
    },
    "gluten-free": {
      icon: Leaf,
      label: { en: "Gluten-free", vn: "Không gluten" },
      className: "border border-teal-300 bg-teal-100 text-teal-800 dark:border-teal-500/40 dark:bg-teal-500/15 dark:text-teal-200",
    },
    "chefs-special": {
      icon: ChefHat,
      label: { en: "Chef's special", vn: "Đặc biệt của bếp trưởng" },
      className: "border border-fuchsia-300 bg-fuchsia-100 text-fuchsia-800 dark:border-fuchsia-500/40 dark:bg-fuchsia-500/15 dark:text-fuchsia-200",
    },
  };
  const c = config[tag];
  const Icon = c.icon;
  return (
    <span
      className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${c.className}`}
    >
      <Icon size={12} className={tag === "signature" ? "fill-current" : ""} />
      {c.label[lang]}
    </span>
  );
};

export default TagBadge;
