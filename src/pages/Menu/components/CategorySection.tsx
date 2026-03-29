import { motion } from "framer-motion";
import { Category } from "../utils/const";
import MenuItemCard from "./MenuItemCard";

const CategorySection = ({
  category,
  lang,
}: {
  category: Category;
  lang: "en" | "vi";
}) => (
  <section
    id={category.id}
    data-id={category.id}
    className="scroll-mt-[200px] min-h-[18.75rem]"
  >
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-4 mb-8"
    >
      <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground whitespace-nowrap">
        {lang === "vi" ? category.vi : category.en}
      </h2>
      <div className="h-px flex-1 bg-border" />
      <span className="text-sm text-muted-foreground tabular-nums">
        {category.items.length} {lang === "vi" ? "món" : "items"}
      </span>
    </motion.div>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {category.items.map((item, i) => (
        <MenuItemCard key={item.id} item={item} lang={lang} index={i} />
      ))}
    </div>
  </section>
);

export default CategorySection;
