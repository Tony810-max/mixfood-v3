import heroDish from "@/assets/hero-dish.jpg";
import ReserveButton from "@/components/navigation/ReserveButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { ROUTES } from "@/utils/const";
import { motion } from "framer-motion";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-[72px]"
    >
      {/* Background decorative circle */}
      <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl pointer-events-none md:block hidden" />

      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            className="space-y-6"
          >
            <h1
              className="font-serif font-bold text-foreground leading-[1.1] text-balance text-start"
              style={{ fontSize: "clamp(2.5rem, 8vw, 4.5rem)" }}
            >
              {t.heroHeadline}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-[55ch] text-start">
              {t.heroSub}
            </p>

            {/* Thai Cuisine Highlights */}
            <div className="space-y-3">
              <h2 className="text-lg md:text-xl font-semibold text-red-600">
                {t.heroTitle}
              </h2>
              <div className="flex flex-wrap gap-2">
                {[
                  t.heroTomYum,
                  t.padThai,
                  t.somTamVietnamese,
                  t.mangoRice,
                ].map((dish) => (
                  <span
                    key={dish}
                    className="px-3 py-1.5 bg-red-100 text-red-700 rounded-full text-sm font-medium"
                  >
                    {dish}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2 items-center">
              <a
                href={ROUTES.MENU}
                className="rounded-lg border border-black min-w-[120px] min-h-[44px] px-5 py-3 text-sm font-semibold text-primary-foreground hover:-translate-y-0.5 transition-all active:scale-95 shadow-layered flex items-center justify-center"
              >
                {t.viewMenu}
              </a>
             <ReserveButton content={t.reserveTable} className="min-h-[44px]" />
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative flex justify-center order-first lg:order-last"
          >
            <div className="relative w-full max-w-[400px] md:max-w-[480px]">
              {/* Gold circle decoration */}
              <div className="absolute inset-4 rounded-full bg-primary/15" />
              <img
                src={heroDish}
                alt={t.heroTomYum}
                className="relative z-10 w-full aspect-square object-cover rounded-2xl shadow-layered"
              />
              {/* SEO Badge */}
              <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-red-600 text-white px-2.5 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-bold">
                Ẩm Thực Thái Chính Thống
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
