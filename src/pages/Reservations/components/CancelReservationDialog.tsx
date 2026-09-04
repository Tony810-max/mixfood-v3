import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Loader2, XCircle } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState } from 'react';

interface CancelReservationDialogProps {
  isOpen: boolean;
  reservationName?: string;
  onCancel: () => void;
  onConfirm: (reason: string) => void;
  isPending?: boolean;
  labels: {
    title: string;
    description: string;
    cancel: string;
    confirm: string;
    confirming: string;
    reasonLabel: string;
    reasonPlaceholder: string;
    reasonHint: string;
  };
}

export const CancelReservationDialog = ({
  isOpen,
  reservationName,
  onCancel,
  onConfirm,
  isPending = false,
  labels,
}: CancelReservationDialogProps) => {
  const [reason, setReason] = useState('');

  useEffect(() => {
    if (isOpen) setReason('');
  }, [isOpen]);

  const handleConfirm = () => {
    const trimmedReason = reason.trim();
    if (trimmedReason) onConfirm(trimmedReason);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-destructive">
            <XCircle className="h-5 w-5 flex-shrink-0" />
            {labels.title}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {reservationName
              ? labels.description.replace('{name}', reservationName)
              : labels.description.replace(' "{name}"', '')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-2">
          <label htmlFor="reservation-cancellation-reason" className="text-sm font-medium">
            {labels.reasonLabel} <span className="text-destructive">*</span>
          </label>
          <Textarea
            id="reservation-cancellation-reason"
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            placeholder={labels.reasonPlaceholder}
            maxLength={500}
            disabled={isPending}
          />
          <p className="text-xs text-muted-foreground">{labels.reasonHint}</p>
        </div>
        <AlertDialogFooter className="flex-col-reverse sm:flex-row gap-2">
          <AlertDialogCancel
            onClick={onCancel}
            disabled={isPending}
            className="w-full sm:w-auto"
          >
            {labels.cancel}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isPending || !reason.trim()}
            className="w-full sm:w-auto bg-destructive text-destructive-foreground hover:bg-destructive/90 focus:ring-destructive"
          >
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {isPending ? labels.confirming : labels.confirm}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
