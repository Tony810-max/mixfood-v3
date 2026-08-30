/**
 * BillPage
 *
 * Shows the full bill summary and allows the customer to request payment.
 */

import { CheckCircle2, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTableOrder } from './TableOrderContext';
import { formatVND } from './helpers';

export default function BillPage() {
  const { orders, paymentRequested, paymentPaid, handleRequestPayment } =
    useTableOrder();

  const nonCancelledOrders = orders.filter((o) => o.status !== 'CANCELLED');
  const sessionTotal = nonCancelledOrders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="p-4 space-y-4">
      <div className="rounded-2xl border border-border bg-card shadow-layered p-5 space-y-3">
        <div className="flex items-center gap-2 text-foreground">
          <Receipt className="w-4 h-4 text-primary" />
          <h2 className="font-bold text-lg">Tổng kết bàn</h2>
        </div>
        {nonCancelledOrders.length === 0 ? (
          <p className="text-sm text-muted-foreground py-2">Chưa có món nào được gọi.</p>
        ) : (
          nonCancelledOrders.map((order) =>
            order.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {item.quantity}×{' '}
                  {(item.productNameSnapshot as any)?.vn ||
                    (item.productNameSnapshot as any)?.en}
                </span>
                <span className="text-foreground">{formatVND(item.subtotal)}</span>
              </div>
            )),
          )
        )}
        <div className="border-t border-border pt-3 flex justify-between font-bold text-lg">
          <span>Tổng</span>
          <span className="text-primary">{formatVND(sessionTotal)}</span>
        </div>
      </div>

      {!paymentRequested && !paymentPaid && (
        <Button
          className="w-full"
          size="lg"
          onClick={handleRequestPayment}
          disabled={nonCancelledOrders.length === 0}
        >
          💰 Gọi nhân viên thanh toán
        </Button>
      )}
      {paymentRequested && !paymentPaid && (
        <div className="rounded-2xl border border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20 text-center py-6 px-4">
          <div className="w-10 h-10 rounded-full border-2 border-yellow-400 border-t-transparent animate-spin mx-auto mb-3" />
          <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
            Đang chờ nhân viên xác nhận…
          </p>
        </div>
      )}
      {paymentPaid && (
        <div className="rounded-2xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 p-6 text-center">
          <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400 mx-auto mb-2" />
          <p className="font-bold text-green-800 dark:text-green-300">Đã thanh toán!</p>
          <p className="text-sm text-green-700 dark:text-green-400 mt-1">
            Cảm ơn bạn đã đến Mix Food.
          </p>
        </div>
      )}
    </div>
  );
}
