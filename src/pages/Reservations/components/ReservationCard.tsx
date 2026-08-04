import { RESERVATION_STATUS } from '@/constants';
import { useDateFormat } from '@/hooks/useDateFormat';
import { Reservation } from '@/types';
import { motion } from 'framer-motion';
import { Calendar, Clock, Phone, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ReservationStatusBadge } from './ReservationStatusBadge';

interface ReservationCardProps {
  reservation: Reservation;
  index: number;
  getStatusLabel: (status: string) => string;
  labels: {
    date: string;
    time: string;
    guests: string;
    guest: string;
    phone: string;
    note: string;
    cancel: string;
  };
}

export const ReservationCard = ({ reservation, index, getStatusLabel, labels }: ReservationCardProps) => {
  const { formatDate } = useDateFormat();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-orange-200 dark:border-orange-900/50 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-start gap-4">
          {/* Status Badge - Mobile Top, Desktop Right */}
          <div className="lg:hidden flex justify-between items-start mb-2">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground">
                {reservation.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {reservation.phone}
              </p>
            </div>
            <ReservationStatusBadge status={reservation.status} label={getStatusLabel(reservation.status)} />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="hidden lg:flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-1">
                  {reservation.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {reservation.phone}
                </p>
              </div>
              <ReservationStatusBadge status={reservation.status} label={getStatusLabel(reservation.status)} />
            </div>
            
            {/* Reservation Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <Calendar className="h-4 w-4 text-orange-500 flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">{labels.date}</p>
                  <p className="font-medium text-foreground">{formatDate(reservation.reservationDate)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <Clock className="h-4 w-4 text-orange-500 flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">{labels.time}</p>
                  <p className="font-medium text-foreground">{reservation.reservationTime}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <Users className="h-4 w-4 text-orange-500 flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">{labels.guests}</p>
                  <p className="font-medium text-foreground">{reservation.numberOfGuests} {labels.guest}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <Phone className="h-4 w-4 text-orange-500 flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">{labels.phone}</p>
                  <p className="font-medium text-foreground">{reservation.phone}</p>
                </div>
              </div>
            </div>
            
            {reservation.note && (
              <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-900/50">
                <p className="text-sm text-amber-700 dark:text-amber-400">
                  <span className="font-medium">{labels.note}:</span> {reservation.note}
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex lg:flex-col gap-2 lg:w-auto w-full">
            {reservation.status === RESERVATION_STATUS.PENDING && (
              <Button
                variant="outline"
                size="sm"
                className="flex-1 lg:flex-none text-red-600 hover:text-white hover:bg-red-500 dark:hover:bg-red-900/20"
                onClick={() => {
                  toast.info("Tính năng hủy đặt bàn đang được phát triển");
                }}
              >
                {labels.cancel}
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
