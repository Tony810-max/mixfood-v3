import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Clock, Lock, LogOut, Shield, User } from 'lucide-react';

interface ProfileSidebarProps {
  activeSection: 'info' | 'password';
  onSectionChange: (section: 'info' | 'password') => void;
  onNavigateToReservations: () => void;
  onLogout: () => void;
  labels: {
    accountSettings: string;
    profileUpdateInfo: string;
    profileChangePassword: string;
    reservationsTitle: string;
    headerLogout: string;
  };
}

export const ProfileSidebar = ({
  activeSection,
  onSectionChange,
  onNavigateToReservations,
  onLogout,
  labels,
}: ProfileSidebarProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full lg:w-64 shrink-0"
    >
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-orange-200 dark:border-orange-900/50 p-5 lg:sticky lg:top-24">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-orange-500" />
          {labels.accountSettings}
        </h3>        <nav className="space-y-2">
          <Button
            variant={activeSection === "info" ? "default" : "ghost"}
            className={`w-full justify-start h-12 transition-all duration-300 ${
              activeSection === "info"
                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25"
                : "hover:bg-orange-100 dark:hover:bg-orange-900/30 text-foreground"
            }`}
            onClick={() => onSectionChange("info")}
          >
            <User className="mr-3 h-5 w-5" />
            <span className="font-medium">{labels.profileUpdateInfo}</span>
          </Button>
          <Button
            variant={activeSection === "password" ? "default" : "ghost"}
            className={`w-full justify-start h-12 transition-all duration-300 ${
              activeSection === "password"
                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25"
                : "hover:bg-orange-100 dark:hover:bg-orange-900/30 text-foreground"
            }`}
            onClick={() => onSectionChange("password")}
          >
            <Lock className="mr-3 h-5 w-5" />
            <span className="font-medium">{labels.profileChangePassword}</span>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start h-12 hover:bg-orange-100 dark:hover:bg-orange-900/30 text-foreground transition-all duration-300"
            onClick={onNavigateToReservations}
          >
            <Clock className="mr-3 h-5 w-5" />
            <span className="font-medium">{labels.reservationsTitle}</span>
          </Button>
          <div className="border-t border-orange-200 dark:border-orange-900/50 my-4" />
          <Button
            variant="ghost"
            className="w-full justify-start h-12 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 hover:text-red-700 dark:text-red-400 transition-all duration-300"
            onClick={onLogout}
          >
            <LogOut className="mr-3 h-5 w-5" />
            <span className="font-medium">{labels.headerLogout}</span>
          </Button>
        </nav>
      </div>
    </motion.div>
  );
};
