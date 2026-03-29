import { motion } from "framer-motion";
import TagBadge from "./TagBadge";
import { formatPrice, MenuItem } from "../utils/const";

const MenuItemCard = ({
  item,
  lang,
  index,
}: {
  item: MenuItem;
  lang: "en" | "vi";
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
    className="group bg-card rounded-2xl shadow-layered hover:shadow-layered-hover transition-all duration-300 overflow-hidden flex flex-col"
  >
    <div className="relative overflow-hidden aspect-[16/10]">
      <img
        src={item.image ?? "/image-blank.png"}
        alt={item.name[lang]}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
      {item.tags && item.tags.length > 0 && (
        <div className="absolute top-3 left-3 flex gap-1.5">
          {item.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} lang={lang} />
          ))}
        </div>
      )}
    </div>
    <div className="p-5 flex flex-col">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-serif text-lg font-bold text-foreground leading-tight">
          {item.name[lang]}
        </h3>
        <span className="text-primary font-bold tabular-nums whitespace-nowrap text-base">
          {formatPrice(item.price)}
        </span>
      </div>
    </div>
  </motion.div>
);

export default MenuItemCard;
