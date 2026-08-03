import LanguageToggle from "@/components/navigation/LanguageToggle";
import ReserveButton from "@/components/navigation/ReserveButton";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLogout } from "@/hooks/api/useAuth";
import { ROUTES } from "@/utils/const";
import { motion } from "framer-motion";
import { Calendar, LogOut, Menu, User, X } from "lucide-react";
import { Link } from "react-router-dom";

interface MobileNavProps {
  navItems: Array<{ label: string; href: string }>;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const MobileNav = ({ navItems, mobileOpen, setMobileOpen }: MobileNavProps) => {
  const { t } = useLanguage();
  const { user, isAuthenticated, setUser } = useAuth();
  const logoutMutation = useLogout();

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-foreground"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

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
              <Link to={ROUTES.RESERVATIONS} onClick={() => setMobileOpen(false)}>
                <button className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                  <Calendar className="w-4 h-4" />
                  <span>{t.reservationsTitle}</span>
                </button>
              </Link>
              <button
                onClick={() => {
                  setUser(null);
                  logoutMutation.mutate();
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
    </>
  );
};

export default MobileNav;