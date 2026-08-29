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

interface CancelReservationDialogProps {
  isOpen: boolean;
  reservationName?: string;
  onCancel: () => void;
  onConfirm: () => void;
  isPending?: boolean;
  labels: {
    title: string;
    description: string;
    cancel: string;
    confirm: string;
    confirming: string;
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
  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <XCircle className="h-5 w-5 flex-shrink-0" />
            {labels.title}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {reservationName
              ? labels.description.replace('{name}', reservationName)
              : labels.description.replace(' "{name}"', '')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col-reverse sm:flex-row gap-2">
          <AlertDialogCancel
            onClick={onCancel}
            disabled={isPending}
            className="w-full sm:w-auto"
          >
            {labels.cancel}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isPending}
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white focus:ring-red-600"
          >
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {isPending ? labels.confirming : labels.confirm}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
