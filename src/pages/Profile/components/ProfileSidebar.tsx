import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Clock, Lock, LogOut, Shield, User } from 'lucide-react';

interface ProfileSidebarProps {
  activeSection: 'info' | 'password' | 'reservations';
  onSectionChange: (section: 'info' | 'password' | 'reservations') => void;
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
      <div className="rounded-2xl border border-primary/25 bg-card/95 p-5 shadow-layered backdrop-blur-sm lg:sticky lg:top-24">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          {labels.accountSettings}
        </h3>        <nav className="space-y-2">
          <Button
            variant={activeSection === "info" ? "default" : "ghost"}
            className={`w-full justify-start h-12 transition-all duration-300 ${
              activeSection === "info"
                ? "bg-primary-gradient text-primary-foreground shadow-lg shadow-primary/25"
                : "text-foreground hover:bg-primary/10"
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
                ? "bg-primary-gradient text-primary-foreground shadow-lg shadow-primary/25"
                : "text-foreground hover:bg-primary/10"
            }`}
            onClick={() => onSectionChange("password")}
          >
            <Lock className="mr-3 h-5 w-5" />
            <span className="font-medium">{labels.profileChangePassword}</span>
          </Button>
          <Button
            variant={activeSection === "reservations" ? "default" : "ghost"}
            className={`w-full justify-start h-12 transition-all duration-300 ${
              activeSection === "reservations"
                ? "bg-primary-gradient text-primary-foreground shadow-lg shadow-primary/25"
                : "text-foreground hover:bg-primary/10"
            }`}
            onClick={() => onSectionChange("reservations")}
          >
            <Clock className="mr-3 h-5 w-5" />
            <span className="font-medium">{labels.reservationsTitle}</span>
          </Button>
          <div className="my-4 border-t border-primary/20" />
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
