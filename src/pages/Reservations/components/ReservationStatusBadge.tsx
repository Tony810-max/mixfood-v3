import { RESERVATION_STATUS, STATUS_COLORS } from '@/constants';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';

interface ReservationStatusBadgeProps {
  status: string;
  label: string;
}

export const ReservationStatusBadge = ({ status, label }: ReservationStatusBadgeProps) => {
  const statusConfig = {
    [RESERVATION_STATUS.PENDING]: {
      icon: AlertCircle,
      colors: STATUS_COLORS.PENDING,
    },
    [RESERVATION_STATUS.CONFIRMED]: {
      icon: CheckCircle,
      colors: STATUS_COLORS.CONFIRMED,
    },
    [RESERVATION_STATUS.CANCELLED]: {
      icon: XCircle,
      colors: STATUS_COLORS.CANCELLED,
    },
  };

  const config = statusConfig[status as keyof typeof statusConfig];
  if (!config) return null;

  const Icon = config.icon;
  return (
    <div className={`flex items-center gap-2 px-3 py-1 ${config.colors.bg} ${config.colors.text} rounded-full text-sm font-medium`}>
      <Icon className="h-4 w-4" />
      {label}
    </div>
  );
};
