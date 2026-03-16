import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import heroDish from "@/assets/hero-dish.jpg";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-[72px]"
    >
      {/* Background decorative circle */}
      <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            className="space-y-6"
          >
            <h1
              className="font-serif font-bold text-foreground leading-[1.1] text-balance"
              style={{ fontSize: "clamp(2.5rem, 8vw, 4.5rem)" }}
            >
              {t.heroHeadline}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-[55ch]">
              {t.heroSub}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="/menu"
                className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:-translate-y-0.5 transition-all active:scale-95 shadow-layered"
              >
                {t.viewMenu}
              </a>
              {/* <a
                href="/reserve"
                className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground hover:-translate-y-0.5 transition-all active:scale-95"
              >
                {t.reserveTable}
              </a> */}
              <button
                className="rounded-lg bg-slate-400 px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:-translate-y-0.5 transition-all active:scale-95"
                disabled
              >
                {t.reserveTable}
              </button>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative flex justify-center"
          >
            <div className="relative w-full max-w-[480px]">
              {/* Gold circle decoration */}
              <div className="absolute inset-4 rounded-full bg-primary/15" />
              <img
                src={heroDish}
                alt={t.heroTomYum}
                className="relative z-10 w-full aspect-square object-cover rounded-2xl shadow-layered"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
