import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

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
          onClick={() => setLang("vi")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative z-10 rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
            lang === "vi" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          VI
        </motion.button>
      </div>
    );
  }

  // Mobile variant
  return (
    <div className="flex items-center rounded-full bg-secondary p-1 gap-0.5">
      <button
        onClick={() => setLang("en")}
        className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
          lang === "en"
            ? "bg-card text-primary shadow-layered"
            : "text-muted-foreground"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLang("vi")}
        className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
          lang === "vi"
            ? "bg-card text-primary shadow-layered"
            : "text-muted-foreground"
        }`}
      >
        VI
      </button>
    </div>
  );
};

export default LanguageToggle;
