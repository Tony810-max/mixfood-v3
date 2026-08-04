import { useLanguage } from "@/contexts/LanguageContext";
import { ROUTES } from "@/utils/const";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import DesktopNav from "./Header/DesktopNav";
import MobileNav from "./Header/MobileNav";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [mobileOpen]);

  const navItems = [
    { label: t.home, href: ROUTES.HOME },
    { label: t.menu, href: ROUTES.MENU },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-md bg-card/80 shadow-layered"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex h-[72px] items-center justify-between px-4 md:px-6">
          <a href={ROUTES.HOME} className="font-serif text-xl md:text-2xl font-bold text-foreground">
            Mix Food
          </a>

          <DesktopNav navItems={navItems} />
          <MobileNav navItems={navItems} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        </div>
      </motion.header>
    </>
  );
};

export default Header;
