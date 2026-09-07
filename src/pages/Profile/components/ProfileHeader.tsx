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
    <div className="relative overflow-hidden primary-action">
      <div className="absolute inset-0 bg-black/5" />
      <div className="absolute top-0 right-0 h-96 w-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-white/15 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-80 w-80 -translate-x-1/2 translate-y-1/2 rounded-full bg-white/10 blur-3xl" />

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
            <div className="absolute inset-0 rounded-full bg-white blur-xl opacity-25" />
            <div className="relative h-24 w-24 rounded-full border-4 border-white/85 bg-white/15 p-1 shadow-2xl sm:h-28 sm:w-28">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-white/15">
                <User className="h-12 w-12 text-primary-foreground sm:h-14 sm:w-14" />
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
            <h1 className="mb-1 truncate text-3xl font-bold text-primary-foreground sm:text-4xl">
              {user?.name || t.headerUser}
            </h1>
            <p className="mb-4 truncate text-base text-primary-foreground/85">{user?.email}</p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-primary-foreground/85 sm:justify-start">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 shrink-0 text-primary-foreground" />
                <span>{t.profileMemberSince} {memberSince}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 shrink-0 text-primary-foreground" />
                <span>{t.profileVerifiedAccount}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
