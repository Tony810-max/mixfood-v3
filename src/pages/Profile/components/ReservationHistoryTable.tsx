import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { RESERVATION_STATUS } from '@/constants';
import { Reservation } from '@/types';
import { Calendar, Loader2, RefreshCw, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { CancelReservationDialog } from '../../Reservations/components/CancelReservationDialog';
import { ReservationsStats } from '../../Reservations/components/ReservationsStats';

interface ReservationHistoryTableProps {
  reservations: Reservation[];
  isLoading: boolean;
  stats: { total: number; pending: number; confirmed: number; arrived: number; cancelled: number };
  onRefresh: () => Promise<unknown> | void;
  onCancel: (id: number) => void;
  isCancelling: boolean;
  labels: Record<string, string>;
}

export function ReservationHistoryTable({ reservations, isLoading, stats, onRefresh, onCancel, isCancelling, labels }: ReservationHistoryTableProps) {
  const [status, setStatus] = useState('ALL');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('date-desc');
  const [selected, setSelected] = useState<Reservation | null>(null);
  const rows = useMemo(() => reservations
    .filter((reservation) => status === 'ALL' || reservation.status === status)
    .filter((reservation) => `${reservation.name} ${reservation.phone} ${reservation.note ?? ''}`.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const first = new Date(`${a.reservationDate.slice(0, 10)}T${a.reservationTime}`).getTime();
      const second = new Date(`${b.reservationDate.slice(0, 10)}T${b.reservationTime}`).getTime();
      return sort === 'date-asc' ? first - second : sort === 'status' ? a.status.localeCompare(b.status) : second - first;
    }), [reservations, search, sort, status]);
  const statusLabel = (value: string) => ({
    PENDING: labels.pending,
    CONFIRMED: labels.confirmed,
    ARRIVED: labels.arrived,
    CANCELLED: labels.cancelled,
  }[value] ?? value);
  const handleRefresh = async () => {
    try {
      await onRefresh();
      toast.success(labels.refreshSuccess || 'Đã làm mới lịch sử đặt bàn', { duration: 2000 });
    } catch {
      toast.error(labels.refreshError || 'Không thể làm mới lịch sử đặt bàn', { duration: 2000 });
    }
  };

  return (
    <section className="space-y-5" aria-label={labels.title}>
      <div className="rounded-2xl border border-orange-200 bg-white/80 p-5 shadow-xl backdrop-blur-sm dark:border-orange-900/50 dark:bg-slate-800/80">
        <h2 className="text-xl font-semibold text-foreground">{labels.title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{labels.subtitle}</p>
      </div>
      <ReservationsStats stats={stats} labels={{ total: labels.total, pending: labels.pending, confirmed: labels.confirmed, arrived: labels.arrived, cancelled: labels.cancelled }} />
      <div className="rounded-2xl border border-orange-200 bg-white/80 p-4 shadow-xl backdrop-blur-sm dark:border-orange-900/50 dark:bg-slate-800/80">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input value={search} onChange={(event) => setSearch(event.target.value)} className="pl-10" placeholder={labels.search} /></div>
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="h-10 rounded-md border border-input bg-background px-3 text-sm"><option value="ALL">{labels.all}</option><option value="PENDING">{labels.pending}</option><option value="CONFIRMED">{labels.confirmed}</option><option value="ARRIVED">{labels.arrived}</option><option value="CANCELLED">{labels.cancelled}</option></select>
          <select value={sort} onChange={(event) => setSort(event.target.value)} className="h-10 rounded-md border border-input bg-background px-3 text-sm"><option value="date-desc">{labels.newest}</option><option value="date-asc">{labels.oldest}</option><option value="status">{labels.byStatus}</option></select>
          <Button size="icon" onClick={handleRefresh} title={labels.refresh} className="shrink-0 bg-orange-500 text-white hover:bg-orange-600 dark:bg-orange-500 dark:hover:bg-orange-600"><RefreshCw className="h-4 w-4" /></Button>
        </div>
      </div>
      <div className="overflow-hidden rounded-2xl border border-orange-200 bg-white/80 shadow-xl dark:border-orange-900/50 dark:bg-slate-800/80">
        {isLoading ? <div className="flex justify-center py-12"><Loader2 className="h-7 w-7 animate-spin text-orange-500" /></div> : (
          <Table>
            <TableHeader><TableRow><TableHead>{labels.customer}</TableHead><TableHead>{labels.date}</TableHead><TableHead>{labels.guests}</TableHead><TableHead>{labels.status}</TableHead><TableHead className="text-right">{labels.actions}</TableHead></TableRow></TableHeader>
            <TableBody>{rows.length ? rows.map((reservation) => <TableRow key={reservation.id}><TableCell><p className="font-medium">{reservation.name}</p><p className="text-xs text-muted-foreground">{reservation.phone}</p></TableCell><TableCell>{new Date(reservation.reservationDate).toLocaleDateString()}<br /><span className="text-xs text-muted-foreground">{reservation.reservationTime}</span></TableCell><TableCell>{reservation.numberOfGuests}</TableCell><TableCell><span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium">{statusLabel(reservation.status)}</span>{reservation.status === RESERVATION_STATUS.CANCELLED && reservation.cancelledBy && <p className="mt-1 max-w-48 text-xs text-muted-foreground">{labels.cancelledBy}: {reservation.cancelledBy.name} ({reservation.cancelledBy.role === 'ADMIN' ? labels.cancelledByAdmin : labels.cancelledByUser}){reservation.rejectionReason && <><br />{labels.reason}: {reservation.rejectionReason}</>}</p>}</TableCell><TableCell className="text-right">{reservation.status === RESERVATION_STATUS.PENDING && <Button variant="outline" size="sm" onClick={() => setSelected(reservation)}>{labels.cancel}</Button>}</TableCell></TableRow>) : <TableRow><TableCell colSpan={5} className="py-12 text-center text-muted-foreground"><Calendar className="mx-auto mb-3 h-8 w-8" />{labels.empty}</TableCell></TableRow>}</TableBody>
          </Table>
        )}
      </div>
      <CancelReservationDialog isOpen={Boolean(selected)} reservationName={selected?.name} onCancel={() => setSelected(null)} onConfirm={() => { if (selected) { onCancel(selected.id); setSelected(null); } }} isPending={isCancelling} labels={{ title: labels.cancelTitle, description: labels.cancelDescription, cancel: labels.keep, confirm: labels.cancel, confirming: labels.cancelling }} />
    </section>
  );
}
