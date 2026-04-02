import { useLanguage } from "../../../contexts/LanguageContext";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { motion } from "framer-motion";
import restaurantImg from "../../../assets/restaurant-interior.jpg";
import { menuData } from "../utils/const";
import CategorySection from "./CategorySection";
import { cn } from "@/lib/utils";
import { useState } from "react";

const HERO_OFFSET = 72;

// Tab styling logic
const getTabStyles = (isActive: boolean) => {
  if (!isActive) {
    return "bg-secondary text-muted-foreground hover:bg-primary hover:text-primary-foreground";
  }
  return "bg-primary/90 text-secondary";
};

const MenuContent = () => {
  const { lang, t } = useLanguage();
  const [hash, setHash] = useState("#appetizers");

  const handleHashChange = (newHash: string) => {
    setHash(newHash);
    window.location.hash = newHash;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-[4.5rem]">
        <div className="relative h-[280px] md:h-[360px] overflow-hidden">
          <img
            src={restaurantImg}
            alt="Mix Food Restaurant"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent" />
          <div className="absolute inset-0 flex items-end pb-12 md:pb-16">
            <div className="container mx-auto px-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="font-serif  text-4xl md:text-5xl font-bold text-background mb-3"
              >
                {lang === "vi" ? "Thực Đơn" : "Our Menu"}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-body text-background/70 text-lg max-w-lg"
              >
                {lang === "vi"
                  ? "Khám phá hương vị Thái Lan đích thực với nguyên liệu tươi ngon nhất"
                  : "Discover authentic Thai flavors crafted with the freshest ingredients"}
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Nav */}
      <section className="sticky top-[4.5rem] z-30 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto py-4 scrollbar-hide -mx-6 px-6">
            {menuData.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                onClick={(e) => {
                  handleHashChange(`#${cat.id}`);
                }}
                className={cn(
                  "shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-all",
                  getTabStyles(hash === `#${cat.id}`),
                )}
              >
                {lang === "vi" ? cat.vi : cat.en}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Category Sections */}
      <div className="container mx-auto px-6 py-12 md:py-16 space-y-16 md:space-y-20">
        {menuData.map((category) => (
          <CategorySection key={category.id} category={category} lang={lang} />
        ))}
      </div>

      {/* CTA */}
      <section className="container mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-background p-10 md:p-14 text-center"
        >
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
            {lang === "vi" ? "Sẵn sàng thưởng thức?" : "Ready to dine?"}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            {lang === "vi"
              ? "Đặt bàn ngay để trải nghiệm ẩm thực Thái Lan đích thực tại Mix Food."
              : "Reserve your table now for an authentic Thai dining experience at Mix Food."}
          </p>
          <a
            href="/reserve"
            className="inline-block rounded-xl bg-accent px-8 py-3.5 text-base font-semibold text-accent-foreground hover:-translate-y-0.5 transition-all active:scale-95"
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
