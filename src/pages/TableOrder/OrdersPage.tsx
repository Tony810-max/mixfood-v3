/**
 * OrdersPage
 *
 * Lists all non-cancelled orders for the current session.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ban } from 'lucide-react';
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
import { useTableOrder } from './TableOrderContext';
import { formatVND, ORDER_STATUS_LABEL, ORDER_STATUS_STYLE } from './helpers';

export default function OrdersPage() {
  const { orders, cancelOrder } = useTableOrder();
  const navigate = useNavigate();
  const [cancelTarget, setCancelTarget] = useState<number | null>(null);
  const [cancelling, setCancelling] = useState(false);

  const nonCancelledOrders = orders.filter((o) => o.status !== 'CANCELLED');
  const sessionTotal = nonCancelledOrders.reduce((sum, o) => sum + o.total, 0);

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
          <p className="text-4xl mb-3">🍽️</p>
          <p className="text-sm">Chưa có món nào được gọi</p>
          <Button className="mt-4" size="sm" onClick={() => navigate('../menu', { relative: 'path' })}>
            Xem thực đơn
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
              <span className="text-sm font-bold text-foreground">Đơn #{order.id}</span>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${style.badge}`}>
                  {ORDER_STATUS_LABEL[order.status] ?? order.status}
                </span>
                {order.status === 'PENDING' && (
                  <button
                    onClick={() => setCancelTarget(order.id)}
                    className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 font-medium"
                  >
                    <Ban className="w-3.5 h-3.5" />
                    Hủy
                  </button>
                )}
              </div>
            </div>
            {order.items.map((item) => {
              const cancelled = item.status === 'CANCELLED';
              return (
                <div
                  key={item.id}
                  className={`flex justify-between text-sm ${cancelled ? 'text-muted-foreground/50 line-through' : 'text-muted-foreground'}`}
                >
                  <span>
                    {item.quantity}×{' '}
                    {(item.productNameSnapshot as any)?.vn ||
                      (item.productNameSnapshot as any)?.en}
                    {item.notes && (
                      <span className="italic ml-1 text-xs">({item.notes})</span>
                    )}
                  </span>
                  <span>{formatVND(item.subtotal)}</span>
                </div>
              );
            })}
            <div className="flex justify-between text-sm font-semibold pt-1 border-t border-border">
              <span>Tổng đơn</span>
              <span className="text-primary">{formatVND(order.total)}</span>
            </div>
          </div>
        );
      })}
      {nonCancelledOrders.length > 0 && (
        <div className="rounded-2xl bg-muted p-4 flex justify-between font-bold sticky bottom-0">
          <span>Tổng cộng</span>
          <span className="text-primary">{formatVND(sessionTotal)}</span>
        </div>
      )}

      <AlertDialog open={cancelTarget !== null} onOpenChange={(open) => !open && setCancelTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hủy đơn hàng?</AlertDialogTitle>
            <AlertDialogDescription>
              Đơn hàng này sẽ bị hủy hoàn toàn. Nếu gọi nhầm món, bạn có thể đặt lại ngay sau đó.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={cancelling}>Không</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleConfirmCancel();
              }}
              disabled={cancelling}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              {cancelling ? 'Đang hủy…' : 'Hủy đơn'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
