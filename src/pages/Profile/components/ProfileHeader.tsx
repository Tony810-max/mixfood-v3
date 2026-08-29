import { motion } from 'framer-motion';
import { Calendar, Shield, User } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProfileHeaderProps {
  user: {
    name?: string;
    email?: string;
    createdAt?: string;
  } | null;
}

export const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  const { t } = useLanguage();

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).getFullYear()
    : new Date().getFullYear();

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 dark:from-orange-500/5 dark:via-amber-500/5 dark:to-orange-500/5" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-400/10 dark:bg-orange-400/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-400/10 dark:bg-amber-400/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center sm:items-start gap-6"
        >
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
            className="relative shrink-0"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full blur-xl opacity-25" />
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-950/50 dark:to-amber-950/50 p-1 shadow-2xl border-4 border-white dark:border-orange-900/50">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-orange-200 to-amber-200 dark:from-orange-900/30 dark:to-amber-900/30 flex items-center justify-center">
                <User className="h-12 w-12 sm:h-14 sm:w-14 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-white dark:border-slate-900" />
          </motion.div>

          {/* User Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="text-center sm:text-left flex-1 min-w-0"
          >
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 bg-clip-text text-transparent truncate mb-1">
              {user?.name || t.headerUser}
            </h1>
            <p className="text-base text-muted-foreground mb-4 truncate">{user?.email}</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-orange-500 shrink-0" />
                <span>{t.profileMemberSince} {memberSince}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-orange-500 shrink-0" />
                <span>{t.profileVerifiedAccount}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
