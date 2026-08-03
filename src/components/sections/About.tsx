import interiorImg from "@/assets/restaurant-interior.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

const About = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-secondary/50 relative overflow-hidden">
      {/* Subtle decorative pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="kranok" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M30 0 L60 30 L30 60 L0 30Z" fill="currentColor" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#kranok)" />
        </svg>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <img
              src={interiorImg}
              alt="Mix Food restaurant interior"
              className="w-full rounded-2xl shadow-layered object-cover aspect-[4/3]"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
            className="space-y-6"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-balance">
              {t.aboutTitle}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-[65ch]">
              {t.aboutText}
            </p>
            <div className="flex gap-8 pt-4">
              {[t.aboutSalt, t.aboutSweet, t.aboutSpicy, t.aboutSour].map((flavor) => (
                <span key={flavor} className="text-sm font-medium text-foreground/70">
                  {flavor}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
