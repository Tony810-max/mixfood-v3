/**
 * OrdersPage
 *
 * Lists all non-cancelled orders for the current session.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ban, ClipboardList } from 'lucide-react';
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
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTableOrder } from './TableOrderContext';
import { formatVND, ORDER_STATUS_STYLE } from './helpers';

export default function OrdersPage() {
  const { t, lang } = useLanguage();
  const { orders, cancelOrder } = useTableOrder();
  const navigate = useNavigate();
  const [cancelTarget, setCancelTarget] = useState<number | null>(null);
  const [cancelling, setCancelling] = useState(false);

  const nonCancelledOrders = orders.filter((o) => o.status !== 'CANCELLED');
  const sessionTotal = nonCancelledOrders.reduce((sum, o) => sum + o.total, 0);
  const itemName = (item: { productNameSnapshot: { vn?: string; en?: string } }) => lang === 'vn' ? item.productNameSnapshot.vn || item.productNameSnapshot.en : item.productNameSnapshot.en || item.productNameSnapshot.vn;
  const orderStatusLabels: Record<string, string> = { PENDING: t.orderPending, CONFIRMED: t.orderConfirmed, PREPARING: t.orderPreparing, READY: t.orderReady, SERVED: t.orderServed, COMPLETED: t.orderCompleted, CANCELLED: t.orderCancelled };

  const handleConfirmCancel = async () => {
    if (cancelTarget == null) return;
    setCancelling(true);
    await cancelOrder(cancelTarget);
    setCancelling(false);
    setCancelTarget(null);
  };

  return (
    <div className="p-4 space-y-3">
      {nonCancelledOrders.length === 0 && (
        <div className="text-center py-14 text-muted-foreground">
          <ClipboardList className="mx-auto mb-3 h-10 w-10 opacity-40" />
          <p className="text-sm">{t.noOrdersYet}</p>
          <Button className="mt-4" size="sm" onClick={() => navigate('../menu', { relative: 'path' })}>
            {t.viewMenu}
          </Button>
        </div>
      )}
      {nonCancelledOrders.map((order) => {
        const style = ORDER_STATUS_STYLE[order.status] ?? ORDER_STATUS_STYLE.PENDING;
        return (
          <div
            key={order.id}
            className={`rounded-2xl border border-l-4 ${style.border} border-border bg-card shadow-layered p-4 space-y-2`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-foreground">{t.orderNumber.replace('{number}', String(order.id))}</span>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${style.badge}`}>
                  {orderStatusLabels[order.status] ?? order.status}
                </span>
                {order.status === 'PENDING' && (
                  <button
                    onClick={() => setCancelTarget(order.id)}
                    className="flex min-h-9 items-center gap-1 rounded-lg px-2 text-xs font-medium text-destructive hover:bg-destructive/10"
                  >
                    <Ban className="w-3.5 h-3.5" />
                    {t.cancel}
                  </button>
                )}
              </div>
            </div>
            {order.items.map((item) => {
              const cancelled = item.status === 'CANCELLED';
              return (
                <div
                  key={item.id}
                  className={`flex gap-3 text-sm ${cancelled ? 'text-muted-foreground/50 line-through' : 'text-muted-foreground'}`}
                >
                  <span className="min-w-0 flex-1 truncate" title={`${item.quantity}× ${itemName(item)}${item.notes ? ` (${item.notes})` : ''}`}>
                    {item.quantity}×{' '}
                    {itemName(item)}
                    {item.notes && (
                      <span className="italic ml-1 text-xs">({item.notes})</span>
                    )}
                  </span>
                  <span className="shrink-0">{formatVND(item.subtotal)}</span>
                </div>
              );
            })}
            <div className="flex justify-between text-sm font-semibold pt-1 border-t border-border">
              <span>{t.orderTotal}</span>
              <span className="text-primary">{formatVND(order.total)}</span>
            </div>
          </div>
        );
      })}
      {nonCancelledOrders.length > 0 && (
        <div className="rounded-2xl bg-muted p-4 flex justify-between font-bold sticky bottom-0">
          <span>{t.total}</span>
          <span className="text-primary">{formatVND(sessionTotal)}</span>
        </div>
      )}

      <AlertDialog open={cancelTarget !== null} onOpenChange={(open) => !open && setCancelTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.cancelOrderTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.cancelOrderDescription}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={cancelling}>{t.no}</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleConfirmCancel();
              }}
              disabled={cancelling}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {cancelling ? t.cancelling : t.cancelOrder}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
