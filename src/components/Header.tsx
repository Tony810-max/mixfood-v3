import { useLanguage } from "@/contexts/LanguageContext";
import { ROUTES } from "@/utils/const";
import { motion } from "framer-motion";
import { LogOut, Menu, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReserveButton from "./ReserveButton";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  // const { user, isAuthenticated, logout } = useAuth();
  const isAuthenticated = false; // Temporarily disabled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: t.home, href: ROUTES.HOME },
    { label: t.menu, href: ROUTES.MENU },
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
          <ReserveButton content={t.reserveTable} />
          
          {/* Auth Section */}
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4" />
                <span className="font-medium">User</span>
              </div>
              <button
                // onClick={logout}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to={ROUTES.AUTH.LOGIN}>
                <button className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                  Sign In
                </button>
              </Link>
              <Link to={ROUTES.AUTH.REGISTER}>
                <button className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
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
          <ReserveButton className="min-w-60" content={t.reserveTable} onClick={() => setMobileOpen(false)} />
          
          {/* Mobile Auth Section */}
          {isAuthenticated ? (
            <div className="flex flex-col gap-3 pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4" />
                <span className="font-medium">User</span>
              </div>
              <button
                onClick={() => {
                  // logout();
                  setMobileOpen(false);
                }}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3 pt-4 border-t border-border">
              <Link to={ROUTES.AUTH.LOGIN} onClick={() => setMobileOpen(false)}>
                <button className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                  Sign In
                </button>
              </Link>
              <Link to={ROUTES.AUTH.REGISTER} onClick={() => setMobileOpen(false)}>
                <button className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
          
          <div className="flex items-center gap-2">
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
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;
