
import { Flame, Leaf, Star } from "lucide-react";

const TagBadge = ({ tag, lang }: { tag: string; lang: "en" | "vi" }) => {
  const config: Record<
    string,
    { icon: typeof Star; label: { en: string; vi: string }; className: string }
  > = {
    popular: {
      icon: Star,
      label: { en: "Popular", vi: "Phổ biến" },
      className: "bg-primary/90 text-primary-foreground",
    },
    spicy: {
      icon: Flame,
      label: { en: "Spicy", vi: "Cay" },
      className: "bg-accent/90 text-accent-foreground",
    },
    veggie: {
      icon: Leaf,
      label: { en: "Veggie", vi: "Chay" },
      className: "bg-primary/90 text-primary-foreground",
    },
  };
  const c = config[tag];
  if (!c) return null;
  const Icon = c.icon;
  return (
    <span
      className={`flex items-center gap-1 backdrop-blur-sm text-xs font-semibold px-2.5 py-1 rounded-full ${c.className}`}
    >
      <Icon size={12} className={tag === "popular" ? "fill-current" : ""} />
      {c.label[lang]}
    </span>
  );
};

export default TagBadge;
