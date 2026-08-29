import LanguageToggle from "@/components/navigation/LanguageToggle";
import ReserveButton from "@/components/navigation/ReserveButton";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLogout } from "@/hooks/api/useAuth";
import { INFORMATION_RESTAURANT, ROUTES } from "@/utils/const";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Home, LogOut, Menu, Phone, User, X } from "lucide-react";
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

  const menuItems = [
    { icon: Home, label: t.home, href: ROUTES.HOME },
    { icon: Menu, label: t.menu, href: ROUTES.MENU },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-foreground p-2 -mr-2 rounded-lg hover:bg-secondary/80 transition-colors active:scale-95"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? t.ariaMenuClose : t.ariaMenuOpen}
      >
        {mobileOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60] md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Full Screen Menu */}
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 bg-gradient-to-b from-background via-background to-secondary/20 z-[60] md:hidden flex flex-col"
            >
              {/* Safe Area Top */}
              <div className="safe-area-top" />

              {/* Header */}
              <div className="flex items-center justify-between p-4 pt-6 border-b border-border/50 bg-background/80 backdrop-blur-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-gradient flex items-center justify-center">
                    <span className="text-white font-bold text-lg">M</span>
                  </div>
                  <h2 className="font-serif text-xl font-bold text-foreground">Mix Food</h2>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors active:scale-95"
                  aria-label={t.ariaMenuClose}
                >
                  <X size={24} />
                </button>
              </div>

              {/* Language Toggle */}
              <div className="flex justify-center py-4 border-b border-border/50 bg-background/50">
                <LanguageToggle variant="mobile" />
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto pb-24">
                {/* Main Navigation */}
                <div className="p-4 space-y-3">
                  {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.a
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/50 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all active:scale-[0.98] group"
                      >
                        <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 group-hover:from-primary/30 group-hover:to-primary/10 transition-all">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-base font-medium text-foreground group-hover:text-primary transition-colors">{item.label}</span>
                      </motion.a>
                    );
                  })}
                </div>

                {/* Reserve Button */}
                <div className="px-4 py-3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <ReserveButton
                      className="w-full min-h-[56px] text-base font-semibold shadow-lg shadow-primary/20"
                      content={t.reserveTable}
                      onClick={() => setMobileOpen(false)}
                    />
                  </motion.div>
                </div>

                {/* Auth Section */}
                <div className="px-4 pb-4 pt-2">
                  <div className="border-t border-border/40 mb-5" />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {isAuthenticated ? (
                      <div className="flex flex-col gap-4">
                        {/* User Profile Card */}
                        <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-primary/10 to-secondary/50 rounded-2xl border border-primary/20">
                          <div className="p-3 rounded-xl bg-primary-gradient">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-base font-semibold text-foreground">{user?.name || t.headerUser}</p>
                            <p className="text-sm text-muted-foreground truncate">{user?.email}</p>
                          </div>
                        </div>

                        <Link to={ROUTES.PROFILE} onClick={() => setMobileOpen(false)}>
                          <button className="w-full flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:bg-secondary/50 transition-all active:scale-[0.98]">
                            <User className="w-5 h-5 text-foreground/70" />
                            <span className="text-base font-medium text-foreground/80">{t.profileTitle}</span>
                          </button>
                        </Link>

                        <Link to={ROUTES.RESERVATIONS} onClick={() => setMobileOpen(false)}>
                          <button className="w-full flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:bg-secondary/50 transition-all active:scale-[0.98]">
                            <Calendar className="w-5 h-5 text-foreground/70" />
                            <span className="text-base font-medium text-foreground/80">{t.reservationsTitle}</span>
                          </button>
                        </Link>

                        <button
                          onClick={() => {
                            setUser(null);
                            logoutMutation.mutate();
                            setMobileOpen(false);
                          }}
                          className="w-full flex items-center gap-4 p-4 rounded-2xl bg-red-50 border border-red-200 hover:bg-red-100 transition-all active:scale-[0.98]"
                        >
                          <LogOut className="w-5 h-5 text-red-500" />
                          <span className="text-base font-medium text-red-500">{t.headerLogout}</span>
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-4">
                        <Link to={ROUTES.AUTH.LOGIN} onClick={() => setMobileOpen(false)}>
                          <button className="w-full flex items-center gap-4 p-4 rounded-2xl bg-card border border-orange-200 dark:border-orange-800/60 hover:border-orange-300 dark:hover:border-orange-700 hover:bg-orange-50/50 dark:hover:bg-orange-950/30 transition-all active:scale-[0.98]">
                            <User className="w-5 h-5 text-orange-500" />
                            <span className="text-base font-medium text-foreground/80">{t.headerSignIn}</span>
                          </button>
                        </Link>

                        <Link to={ROUTES.AUTH.REGISTER} onClick={() => setMobileOpen(false)}>
                          <button className="w-full flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:opacity-90 transition-all active:scale-[0.98]">
                            <User className="w-5 h-5" />
                            <span className="text-base font-medium">{t.headerSignUp}</span>
                          </button>
                        </Link>
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>

              {/* Footer Contact */}
              <div className="fixed bottom-0 left-0 right-0 p-4 border-t border-border/50 bg-background/95 backdrop-blur-lg">
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  href={`tel:${INFORMATION_RESTAURANT.phone.replace(/\s/g, "")}`}
                  className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 hover:from-primary/20 hover:to-primary/10 transition-all active:scale-[0.98]"
                >
                  <div className="p-2 rounded-full bg-primary-gradient">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-muted-foreground">Hotline</p>
                    <p className="font-semibold text-primary">{INFORMATION_RESTAURANT.phone}</p>
                  </div>
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNav;