
import { Flame, Leaf, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const TagBadge = ({ tag }: { tag: string }) => {
  const { t } = useLanguage();
  const config: Record<
    string,
    { icon: typeof Star; label: string; className: string }
  > = {
    popular: {
      icon: Star,
      label: t.tagPopular,
      className: "bg-primary/90 text-primary-foreground",
    },
    spicy: {
      icon: Flame,
      label: t.tagSpicy,
      className: "bg-accent/90 text-accent-foreground",
    },
    veggie: {
      icon: Leaf,
      label: t.tagVeggie,
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
      {c.label}
    </span>
  );
};

export default TagBadge;
