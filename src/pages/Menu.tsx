import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Leaf, Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";

import padThaiImg from "@/assets/pad-thai.jpg";
import greenCurryImg from "@/assets/green-curry.jpg";
import somTumImg from "@/assets/som-tum.jpg";
import mangoRiceImg from "@/assets/mango-sticky-rice.jpg";
import heroDishImg from "@/assets/hero-dish.jpg";
import restaurantImg from "@/assets/restaurant-interior.jpg";

interface MenuItem {
  id: string;
  name: { en: string; vi: string };
  desc: { en: string; vi: string };
  price: number;
  image: string;
  category: string;
  tags?: ("spicy" | "veggie" | "popular")[];
}

const categories = [
  { id: "all", en: "All", vi: "Tất cả" },
  { id: "appetizers", en: "Appetizers", vi: "Khai vị" },
  { id: "soups", en: "Soups", vi: "Canh / Súp" },
  { id: "mains", en: "Main Courses", vi: "Món chính" },
  { id: "noodles", en: "Noodles & Rice", vi: "Mì & Cơm" },
  { id: "desserts", en: "Desserts", vi: "Tráng miệng" },
  { id: "drinks", en: "Drinks", vi: "Thức uống" },
];

const menuItems: MenuItem[] = [
  {
    id: "som-tum",
    name: { en: "Som Tum Salad", vi: "Gỏi Som Tum" },
    desc: { en: "Green papaya, dried shrimp, peanuts, chili-lime dressing.", vi: "Đu đủ xanh, tôm khô, đậu phộng, nước trộn chua cay." },
    price: 95000,
    image: somTumImg,
    category: "appetizers",
    tags: ["spicy", "popular"],
  },
  {
    id: "spring-rolls",
    name: { en: "Fresh Spring Rolls", vi: "Gỏi Cuốn Tôm" },
    desc: { en: "Rice paper, shrimp, herbs, vermicelli, peanut sauce.", vi: "Bánh tráng, tôm, rau thơm, bún, nước chấm đậu phộng." },
    price: 85000,
    image: somTumImg,
    category: "appetizers",
  },
  {
    id: "satay",
    name: { en: "Chicken Satay", vi: "Gà Satay" },
    desc: { en: "Grilled chicken skewers, peanut sauce, cucumber relish.", vi: "Xiên gà nướng, sốt đậu phộng, dưa chuột." },
    price: 110000,
    image: padThaiImg,
    category: "appetizers",
    tags: ["popular"],
  },
  {
    id: "tom-yum",
    name: { en: "Tom Yum Goong", vi: "Tom Yum Goong" },
    desc: { en: "Spicy lemongrass broth, tiger prawns, galangal, chili.", vi: "Canh chua cay sả, tôm sú, riềng, ớt." },
    price: 175000,
    image: heroDishImg,
    category: "soups",
    tags: ["spicy", "popular"],
  },
  {
    id: "tom-kha",
    name: { en: "Tom Kha Gai", vi: "Tom Kha Gà" },
    desc: { en: "Coconut soup with chicken, galangal, lemongrass, lime.", vi: "Canh gà nước cốt dừa, riềng, sả, chanh." },
    price: 155000,
    image: heroDishImg,
    category: "soups",
  },
  {
    id: "green-curry",
    name: { en: "Green Curry Chicken", vi: "Cà Ri Xanh Gà" },
    desc: { en: "Coconut milk, Thai basil, bamboo shoots, kaffir lime.", vi: "Nước cốt dừa, húng quế Thái, măng, lá chanh kaffir." },
    price: 165000,
    image: greenCurryImg,
    category: "mains",
    tags: ["spicy", "popular"],
  },
  {
    id: "red-curry",
    name: { en: "Red Curry Shrimp", vi: "Cà Ri Đỏ Tôm" },
    desc: { en: "Red curry paste, coconut cream, shrimp, Thai eggplant.", vi: "Cà ri đỏ, kem dừa, tôm, cà tím Thái." },
    price: 185000,
    image: greenCurryImg,
    category: "mains",
    tags: ["spicy"],
  },
  {
    id: "basil-chicken",
    name: { en: "Thai Basil Chicken", vi: "Gà Xào Húng Quế" },
    desc: { en: "Stir-fried chicken, holy basil, chili, garlic, fried egg.", vi: "Gà xào húng quế, ớt, tỏi, trứng chiên." },
    price: 145000,
    image: padThaiImg,
    category: "mains",
    tags: ["spicy"],
  },
  {
    id: "grilled-fish",
    name: { en: "Grilled Sea Bass", vi: "Cá Chẽm Nướng" },
    desc: { en: "Whole sea bass, lime-chili sauce, fresh herbs.", vi: "Cá chẽm nguyên con, sốt chanh ớt, rau thơm tươi." },
    price: 245000,
    image: heroDishImg,
    category: "mains",
    tags: ["popular"],
  },
  {
    id: "pad-thai",
    name: { en: "Classic Pad Thai", vi: "Pad Thai Truyền Thống" },
    desc: { en: "Rice noodles, fresh prawns, tamarind glaze, crushed peanuts.", vi: "Bún xào, tôm tươi, sốt me, đậu phộng rang." },
    price: 145000,
    image: padThaiImg,
    category: "noodles",
    tags: ["popular"],
  },
  {
    id: "pad-see-ew",
    name: { en: "Pad See Ew", vi: "Pad See Ew" },
    desc: { en: "Wide rice noodles, soy sauce, Chinese broccoli, egg.", vi: "Mì bản lớn, xì dầu, cải làn, trứng." },
    price: 135000,
    image: padThaiImg,
    category: "noodles",
  },
  {
    id: "fried-rice",
    name: { en: "Pineapple Fried Rice", vi: "Cơm Chiên Thơm" },
    desc: { en: "Fried rice in pineapple shell, shrimp, cashews, raisins.", vi: "Cơm chiên trong vỏ thơm, tôm, hạt điều, nho khô." },
    price: 155000,
    image: padThaiImg,
    category: "noodles",
    tags: ["popular"],
  },
  {
    id: "mango-rice",
    name: { en: "Mango Sticky Rice", vi: "Xôi Xoài" },
    desc: { en: "Sweet coconut sticky rice, fresh mango, coconut cream.", vi: "Xôi dừa ngọt, xoài tươi, kem dừa." },
    price: 85000,
    image: mangoRiceImg,
    category: "desserts",
    tags: ["popular"],
  },
  {
    id: "roti",
    name: { en: "Thai Roti with Banana", vi: "Roti Chuối" },
    desc: { en: "Crispy roti, caramelized banana, condensed milk.", vi: "Roti giòn, chuối caramen, sữa đặc." },
    price: 65000,
    image: mangoRiceImg,
    category: "desserts",
  },
  {
    id: "thai-tea",
    name: { en: "Thai Iced Tea", vi: "Trà Thái" },
    desc: { en: "Classic Thai tea with condensed milk and ice.", vi: "Trà Thái truyền thống với sữa đặc và đá." },
    price: 45000,
    image: mangoRiceImg,
    category: "drinks",
    tags: ["popular"],
  },
  {
    id: "coconut-water",
    name: { en: "Fresh Coconut Water", vi: "Nước Dừa Tươi" },
    desc: { en: "Served in a young coconut with ice.", vi: "Dừa tươi nguyên quả với đá." },
    price: 40000,
    image: mangoRiceImg,
    category: "drinks",
  },
  {
    id: "smoothie",
    name: { en: "Tropical Smoothie", vi: "Sinh Tố Nhiệt Đới" },
    desc: { en: "Mango, passion fruit, coconut milk blend.", vi: "Xoài, chanh dây, nước cốt dừa xay." },
    price: 55000,
    image: mangoRiceImg,
    category: "drinks",
    tags: ["veggie"],
  },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN").format(price) + " VND";
};

const MenuContent = () => {
  const { lang, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all"
    ? menuItems
    : menuItems.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-[72px]">
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
                className="font-serif text-4xl md:text-5xl font-bold text-background mb-3"
              >
                {lang === "vi" ? "Thực Đơn" : "Our Menu"}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
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

      {/* Category Filter */}
      <section className="sticky top-[72px] z-30 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto py-4 scrollbar-hide -mx-6 px-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                }`}
              >
                {lang === "vi" ? cat.vi : cat.en}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Grid */}
      <section className="container mx-auto px-6 py-12 md:py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group bg-card rounded-2xl shadow-layered hover:shadow-layered-hover transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-[16/10]">
                  <img
                    src={item.image}
                    alt={item.name[lang]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Tags */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      {item.tags.includes("popular") && (
                        <span className="flex items-center gap-1 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-semibold px-2.5 py-1 rounded-full">
                          <Star size={12} className="fill-current" />
                          {lang === "vi" ? "Phổ biến" : "Popular"}
                        </span>
                      )}
                      {item.tags.includes("spicy") && (
                        <span className="flex items-center gap-1 bg-accent/90 backdrop-blur-sm text-accent-foreground text-xs font-semibold px-2.5 py-1 rounded-full">
                          <Flame size={12} />
                          {lang === "vi" ? "Cay" : "Spicy"}
                        </span>
                      )}
                      {item.tags.includes("veggie") && (
                        <span className="flex items-center gap-1 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-semibold px-2.5 py-1 rounded-full">
                          <Leaf size={12} />
                          {lang === "vi" ? "Chay" : "Veggie"}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-serif text-lg font-bold text-foreground leading-tight">
                      {item.name[lang]}
                    </h3>
                    <span className="text-primary font-bold tabular-nums whitespace-nowrap text-base">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {item.desc[lang]}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            {lang === "vi" ? "Chưa có món nào trong danh mục này." : "No items in this category yet."}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
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

const MenuPage = () => (
  <LanguageProvider>
    <MenuContent />
  </LanguageProvider>
);

export default MenuPage;
