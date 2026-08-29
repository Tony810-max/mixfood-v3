/**
 * BillPage
 *
 * Shows the full bill summary and allows the customer to request payment.
 */

import { Button } from '@/components/ui/button';
import { useTableOrder } from './TableOrderContext';
import { formatVND } from './helpers';

export default function BillPage() {
  const { orders, paymentRequested, paymentPaid, handleRequestPayment } =
    useTableOrder();

  const nonCancelledOrders = orders.filter((o) => o.status !== 'CANCELLED');
  const sessionTotal = nonCancelledOrders.reduce((sum, o) => sum + o.total, 0);

  // requestingPayment is managed internally by handleRequestPayment — derive from
  // the fact that we grey out the button while it runs by using a local flag
  // exposed via the handler itself. Since the original code used a local state
  // inside the handler we replicate the disabled-during-submit UX with the
  // paymentRequested flag (once sent the button disappears anyway).

  return (
    <div className="p-4 space-y-4">
      <div className="rounded-xl bg-muted p-5 space-y-3">
        <h2 className="font-bold text-foreground text-lg">Tổng kết bàn</h2>
        {nonCancelledOrders.map((order) =>
          order.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {item.quantity}×{' '}
                {(item.productNameSnapshot as any)?.vn ||
                  (item.productNameSnapshot as any)?.en}
              </span>
              <span>{formatVND(item.subtotal)}</span>
            </div>
          )),
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
        <div className="text-center py-4">
          <div className="w-10 h-10 rounded-full border-2 border-yellow-400 border-t-transparent animate-spin mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Đang chờ nhân viên xác nhận…</p>
        </div>
      )}
      {paymentPaid && (
        <div className="rounded-xl bg-green-50 dark:bg-green-900/20 p-5 text-center">
          <p className="text-3xl mb-2">✅</p>
          <p className="font-bold text-green-800 dark:text-green-300">Đã thanh toán!</p>
          <p className="text-sm text-green-700 dark:text-green-400 mt-1">
            Cảm ơn bạn đã đến Mix Food.
          </p>
        </div>
      )}
    </div>
  );
}
