import { motion } from 'framer-motion';
import { Calendar, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

interface ReservationsStatsProps {
  stats: {
    total: number;
    pending: number;
    confirmed: number;
    arrived: number;
    cancelled: number;
  };
  labels: {
    total: string;
    pending: string;
    confirmed: string;
    arrived: string;
    cancelled: string;
  };
}

const StatCard = ({ 
  icon: Icon, 
  label, 
  value, 
  color, 
  bgColor 
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  color: string;
  bgColor: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-orange-200 dark:border-orange-900/50 p-6"
  >
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-xl ${bgColor}`}>
        <Icon className={`h-6 w-6 ${color}`} />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold text-foreground">{value}</p>
      </div>
    </div>
  </motion.div>
);

export const ReservationsStats = ({ stats, labels }: ReservationsStatsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
      <StatCard
        icon={Calendar}
        label={labels.total}
        value={stats.total}
        color="text-orange-600 dark:text-orange-400"
        bgColor="bg-orange-100 dark:bg-orange-900/30"
      />
      <StatCard
        icon={AlertCircle}
        label={labels.pending}
        value={stats.pending}
        color="text-yellow-600 dark:text-yellow-400"
        bgColor="bg-yellow-100 dark:bg-yellow-900/30"
      />
      <StatCard
        icon={CheckCircle}
        label={labels.confirmed}
        value={stats.confirmed}
        color="text-green-600 dark:text-green-400"
        bgColor="bg-green-100 dark:bg-green-900/30"
      />
      <StatCard icon={CheckCircle} label={labels.arrived} value={stats.arrived} color="text-blue-600 dark:text-blue-400" bgColor="bg-blue-100 dark:bg-blue-900/30" />
      <StatCard
        icon={XCircle}
        label={labels.cancelled}
        value={stats.cancelled}
        color="text-red-600 dark:text-red-400"
        bgColor="bg-red-100 dark:bg-red-900/30"
      />
    </div>
  );
};
