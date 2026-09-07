import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

interface LanguageToggleProps {
  variant?: "desktop" | "mobile";
}

const LanguageToggle = ({ variant = "desktop" }: LanguageToggleProps) => {
  const { lang, setLang } = useLanguage();

  if (variant === "desktop") {
    return (
      <div className="flex items-center rounded-full bg-secondary p-1 gap-0.5 relative overflow-hidden">
        <motion.div
          className="absolute top-1 bottom-1 w-[calc(50%-2px)] bg-card rounded-full shadow-layered"
          initial={false}
          animate={{
            x: lang === "en" ? 2 : "calc(100% - 4px)"
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
        <motion.button
          onClick={() => setLang("en")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative z-10 rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
            lang === "en" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          EN
        </motion.button>
        <motion.button
          onClick={() => setLang("vn")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative z-10 rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
            lang === "vn" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          VI
        </motion.button>
      </div>
    );
  }

  // Mobile variant with smooth animations
  return (
    <div className="flex items-center rounded-full bg-secondary p-1.5 gap-1 relative overflow-hidden">
      <motion.div
        className="absolute top-1.5 bottom-1.5 w-[calc(50%-4px)] bg-card rounded-full shadow-layered"
        initial={false}
        animate={{
          x: lang === "en" ? 3 : "calc(100% - 6px)"
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      />
      <motion.button
        onClick={() => setLang("en")}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className={`relative z-10 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
          lang === "en" ? "text-primary" : "text-muted-foreground"
        }`}
      >
        EN
      </motion.button>
      <motion.button
        onClick={() => setLang("vn")}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className={`relative z-10 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
          lang === "vn" ? "text-primary" : "text-muted-foreground"
        }`}
      >
        VI
      </motion.button>
    </div>
  );
};

export default LanguageToggle;
