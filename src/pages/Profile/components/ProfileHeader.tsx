import { motion } from 'framer-motion';
import { Calendar, Shield, User } from 'lucide-react';

interface ProfileHeaderProps {
  user: {
    name?: string;
    email?: string;
  } | null;
}

export const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 dark:from-orange-500/5 dark:via-amber-500/5 dark:to-orange-500/5" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-400/10 dark:bg-orange-400/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-400/10 dark:bg-amber-400/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row items-center gap-8"
        >
          {/* Profile Avatar */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
            <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-950/50 dark:to-amber-950/50 p-1 shadow-2xl border-4 border-white dark:border-orange-900/50">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-orange-200 to-amber-200 dark:from-orange-900/30 dark:to-amber-900/30 flex items-center justify-center overflow-hidden">
                <User className="h-14 w-14 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-slate-900" />
          </motion.div>

          {/* User Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center lg:text-left flex-1"
          >
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
                {user?.name || "User"}
              </h1>
              <div className="px-3 py-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-semibold rounded-full shadow-md">
                PRO
              </div>
            </div>
            <p className="text-lg text-muted-foreground mb-4">{user?.email}</p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-orange-500" />
                <span>Member since 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-orange-500" />
                <span>Verified Account</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex gap-4"
          >
            <div className="text-center px-6 py-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-orange-200 dark:border-orange-900/50">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">12</div>
              <div className="text-xs text-muted-foreground">Orders</div>
            </div>
            <div className="text-center px-6 py-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-orange-200 dark:border-orange-900/50">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">4.8</div>
              <div className="text-xs text-muted-foreground">Rating</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
