import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMenu } from "@/hooks/api/useMenu";
import { ROUTES } from "@/utils/const";
import { motion } from "framer-motion";
import restaurantImg from "../../../../assets/restaurant-interior.jpg";
import CategorySection from "../CategorySection";
import DropdownCategory from "./DropdownCategory";
import SearchContent from "./SearchContent";

const MenuContent = () => {
  const { lang, t } = useLanguage();
  const { data: categories, isLoading, error } = useMenu();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredCategories = categories?.filter((category) => {
    const matchesCategory = !selectedCategory || selectedCategory === "all" || category.id === selectedCategory;
    const matchesSearch = !searchQuery || category.items.some((item) => 
      item.name.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.vn.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return matchesCategory && matchesSearch;
  }).map((category) => ({
    ...category,
    items: category.items.filter((item) => 
      !searchQuery || 
      item.name.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.vn.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter((category) => category.items.length > 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
              <p className="mt-4 text-muted-foreground">
                {lang === "vn" ? "Đang tải thực đơn..." : "Loading menu..."}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-destructive mb-4">
                {lang === "vn" ? "Có lỗi xảy ra khi tải thực đơn" : "Error loading menu"}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="text-primary hover:underline"
              >
                {lang === "vn" ? "Thử lại" : "Try again"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-[4.5rem]">
        <div className="relative h-[240px] md:h-[280px] lg:h-[360px] overflow-hidden">
          <img
            src={restaurantImg}
            alt="Mix Food Restaurant"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent" />
          <div className="absolute inset-0 flex items-end -translate-y-1/2 top-1/2">
            <div className="container mx-auto px-4 md:px-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-background mb-2 md:mb-3"
              >
                {lang === "vn" ? "Thực Đơn" : "Our Menu"}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-body text-background/70 text-base md:text-lg "
              >
                {lang === "vn"
                  ? "Khám phá hương vị Thái Lan đích thực với nguyên liệu tươi ngon nhất"
                  : "Discover authentic Thai flavors crafted with the freshest ingredients"}
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-3 md:gap-2 p-4 md:p-4">
        <SearchContent onSearchChange={setSearchQuery} />
        <DropdownCategory onSelectCategory={setSelectedCategory} />
      </div>

      {/* Category Sections */}
      <div className="container mx-auto px-6 py-8 space-y-16 md:space-y-20">
        {filteredCategories?.map((category) => (
          <CategorySection key={category.id} category={category} lang={lang} />
        ))}
        {filteredCategories?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {lang === "vn" ? "Không tìm thấy món ăn nào" : "No dishes found"}
            </p>
          </div>
        )}
      </div>

      {/* CTA */}
      <section className="container mx-auto px-4 md:px-6 pb-12 md:pb-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-background p-6 md:p-10 lg:p-14 text-center"
        >
          <h2 className="font-serif text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-3 md:mb-4">
            {lang === "vn" ? "Sẵn sàng thưởng thức?" : "Ready to dine?"}
          </h2>
          <p className="text-muted-foreground mb-6 md:mb-8 max-w-md mx-auto text-sm md:text-base">
            {lang === "vn"
              ? "Đặt bàn ngay để trải nghiệm ẩm thực Thái Lan đích thực tại Mix Food."
              : "Reserve your table now for an authentic Thai dining experience at Mix Food."}
          </p>
          <a
            href={ROUTES.BOOKING}
            className="rounded-xl bg-accent px-6 md:px-8 py-3 md:py-3.5 text-sm md:text-base font-semibold text-accent-foreground hover:-translate-y-0.5 transition-all active:scale-95 min-h-[44px] flex items-center justify-center"
          >
            {t.reserveTable}
          </a>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default MenuContent;
