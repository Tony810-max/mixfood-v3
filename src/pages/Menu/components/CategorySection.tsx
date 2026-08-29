import { Category } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { useState } from "react";
import MenuItemCard from "./Menu";

const ITEMS_PER_PAGE = 10;

const CategorySection = ({
  category,
  lang,
}: {
  category: Category;
  lang: "en" | "vn";
}) => {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(category.items.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = category.items.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
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
        className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8"
      >
        <h2 className="font-serif text-xl md:text-2xl lg:text-3xl font-bold text-foreground whitespace-nowrap">
          {lang === "vn" ? category.vn : category.en}
        </h2>
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs md:text-sm text-muted-foreground tabular-nums shrink-0">
          {category.items.length} {t.menuItems}
        </span>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
        {currentItems.map((item, i) => (
          <MenuItemCard key={item.id} item={item} lang={lang} index={i} />
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-secondary text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary/80 transition-colors"
          >
            {t.menuPrevious}
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentPage === page
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg bg-secondary text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary/80 transition-colors"
          >
            {t.menuNext}
          </button>
        </div>
      )}
    </section>
  );
};

export default CategorySection;
