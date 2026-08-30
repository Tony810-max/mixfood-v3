/**
 * OrdersPage
 *
 * Lists all non-cancelled orders for the current session.
 */

import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTableOrder } from './TableOrderContext';
import { formatVND, ORDER_STATUS_LABEL, ORDER_STATUS_STYLE } from './helpers';

export default function OrdersPage() {
  const { orders } = useTableOrder();
  const navigate = useNavigate();

  const nonCancelledOrders = orders.filter((o) => o.status !== 'CANCELLED');
  const sessionTotal = nonCancelledOrders.reduce((sum, o) => sum + o.total, 0);

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
              <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${style.badge}`}>
                {ORDER_STATUS_LABEL[order.status] ?? order.status}
              </span>
            </div>
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-sm text-muted-foreground"
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
            ))}
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
    </div>
  );
}
