import { MenuItem } from "@/types";
import { motion } from "framer-motion";
import { formatPrice } from "../../utils/const";
import TagBadge from "../TagBadge";

const MenuItemCard = ({
  item,
  lang,
  index,
}: {
  item: MenuItem;
  lang: "en" | "vn";
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
    className="group bg-card rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col border border-border/60 hover:border-primary/20"
  >
    {/* Image */}
    <div className="relative overflow-hidden aspect-[4/3]">
      <img
        src={item.image ?? "/image-blank.png"}
        alt={item.name[lang]}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
      {/* Gradient overlay bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      {/* Tags */}
      {item.tags && item.tags.length > 0 && (
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} lang={lang} />
          ))}
        </div>
      )}
      {/* Price badge on hover */}
      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
        <span className="bg-primary text-primary-foreground text-sm font-bold px-3 py-1 rounded-full shadow-lg">
          {formatPrice(item.price)}
        </span>
      </div>
    </div>

    {/* Content */}
    <div className="p-4 flex items-center justify-between gap-3 flex-1">
      <h3 className="font-serif text-base font-bold text-foreground leading-snug line-clamp-2 flex-1">
        {item.name[lang]}
      </h3>
      <span className="text-primary font-bold tabular-nums whitespace-nowrap text-base shrink-0 group-hover:opacity-0 transition-opacity duration-200">
        {formatPrice(item.price)}
      </span>
    </div>
  </motion.div>
);

export default MenuItemCard;
