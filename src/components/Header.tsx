import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { ROUTES } from "@/utils/const";
import { motion } from "framer-motion";
import { ChevronDown, LogOut, Menu, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LanguageToggle from "./LanguageToggle";
import ReserveButton from "./ReserveButton";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();

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

          <LanguageToggle variant="desktop" />
          <ReserveButton content={t.reserveTable} />
          
          {/* Auth Section */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-500 hover:text-white hover:opacity-80 transition-colors">
                  <User className="w-4 h-4" />
                  <span>{user?.name || t.headerUser}</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 ">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name || t.headerUser}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to={ROUTES.PROFILE} className="cursor-pointer hover:bg-primary-gradient">
                    <User className="mr-2 h-4 w-4" />
                    <span>{t.profileTitle}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600 focus:text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{t.headerLogout}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-4">
              <Link to={ROUTES.AUTH.LOGIN}>
                <button className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                  {t.headerSignIn}
                </button>
              </Link>
              <Link to={ROUTES.AUTH.REGISTER}>
                <button className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                  {t.headerSignUp}
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
                <span className="font-medium">{user?.name || t.headerUser}</span>
              </div>
              <Link to={ROUTES.PROFILE} onClick={() => setMobileOpen(false)}>
                <button className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                  <User className="w-4 h-4" />
                  <span>{t.profileTitle}</span>
                </button>
              </Link>
              <button
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>{t.headerLogout}</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3 pt-4 border-t border-border">
              <Link to={ROUTES.AUTH.LOGIN} onClick={() => setMobileOpen(false)}>
                <button className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                  {t.headerSignIn}
                </button>
              </Link>
              <Link to={ROUTES.AUTH.REGISTER} onClick={() => setMobileOpen(false)}>
                <button className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                  {t.headerSignUp}
                </button>
              </Link>
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <LanguageToggle variant="mobile" />
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;
