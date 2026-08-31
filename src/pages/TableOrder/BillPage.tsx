/**
 * BillPage
 *
 * Shows the full bill summary and allows the customer to request payment.
 */

import { CheckCircle2, CreditCard, LoaderCircle, Receipt } from 'lucide-react';
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
                  {item.productNameSnapshot.vn || item.productNameSnapshot.en}
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
          <CreditCard />
          Yêu cầu thanh toán
        </Button>
      )}
      {paymentRequested && !paymentPaid && (
        <div className="rounded-2xl border border-warning/30 bg-warning/10 px-4 py-6 text-center" role="status">
          <LoaderCircle className="mx-auto mb-3 h-10 w-10 animate-spin text-warning" />
          <p className="text-sm font-medium text-warning-foreground">
            Đang chờ nhân viên xác nhận…
          </p>
        </div>
      )}
      {paymentPaid && (
        <div className="rounded-2xl border border-success/25 bg-success/10 p-6 text-center" role="status">
          <CheckCircle2 className="mx-auto mb-2 h-10 w-10 text-success" />
          <p className="font-bold text-success">Đã thanh toán!</p>
          <p className="mt-1 text-sm text-success">
            Cảm ơn bạn đã đến Mix Food.
          </p>
        </div>
      )}
    </div>
  );
}
