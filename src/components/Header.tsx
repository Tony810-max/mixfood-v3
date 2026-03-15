import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: t.home, href: "/" },
    { label: t.menu, href: "/#menu" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-card/80 shadow-layered"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-[72px] items-center justify-between px-6">
        <a href="/" className="font-serif text-2xl font-bold text-foreground">
          Mix Food
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-body text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {item.label}
            </a>
          ))}

          {/* Language Toggle */}
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

          <a
            href="/reserve"
            className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:-translate-y-0.5 transition-all active:scale-95"
          >
            {t.reserveTable}
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-card/95 backdrop-blur-md border-t border-border px-6 py-6 space-y-4"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block font-body text-base text-foreground/80 hover:text-primary"
            >
              {item.label}
            </a>
          ))}
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-full bg-secondary p-1 gap-0.5">
              <button
                onClick={() => setLang("en")}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                  lang === "en" ? "bg-card text-primary shadow-layered" : "text-muted-foreground"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("vi")}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                  lang === "vi" ? "bg-card text-primary shadow-layered" : "text-muted-foreground"
                }`}
              >
                VI
              </button>
            </div>
          </div>
          <a
            href="/reserve"
            onClick={() => setMobileOpen(false)}
            className="block rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground text-center"
          >
            {t.reserveTable}
          </a>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;
