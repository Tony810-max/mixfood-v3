/**
 * BillPage
 *
 * Shows the full bill summary and allows the customer to request payment.
 */

import { CheckCircle2, CreditCard, LoaderCircle, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTableOrder } from './TableOrderContext';
import { formatVND } from './helpers';

export default function BillPage() {
  const { t, lang } = useLanguage();
  const { orders, paymentRequested, paymentPaid, handleRequestPayment } =
    useTableOrder();

  const nonCancelledOrders = orders.filter((o) => o.status !== 'CANCELLED');
  const sessionTotal = nonCancelledOrders.reduce((sum, o) => sum + o.total, 0);
  const itemName = (item: { productNameSnapshot: { vn?: string; en?: string } }) => lang === 'vn' ? item.productNameSnapshot.vn || item.productNameSnapshot.en : item.productNameSnapshot.en || item.productNameSnapshot.vn;

  return (
    <div className="p-4 space-y-4">
      <div className="rounded-2xl border border-border bg-card shadow-layered p-5 space-y-3">
        <div className="flex items-center gap-2 text-foreground">
          <Receipt className="w-4 h-4 text-primary" />
          <h2 className="font-bold text-lg">{t.billSummary}</h2>
        </div>
        {nonCancelledOrders.length === 0 ? (
          <p className="text-sm text-muted-foreground py-2">{t.noOrdersYet}</p>
        ) : (
          nonCancelledOrders.map((order) =>
            order.items.map((item) => (
              <div key={item.id} className="flex gap-3 text-sm">
                <span className="min-w-0 flex-1 truncate text-muted-foreground" title={`${item.quantity}× ${itemName(item)}`}>
                  {item.quantity}×{' '}
                  {itemName(item)}
                </span>
                <span className="shrink-0 text-foreground">{formatVND(item.subtotal)}</span>
              </div>
            )),
          )
        )}
        <div className="border-t border-border pt-3 flex justify-between font-bold text-lg">
          <span>{t.total}</span>
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
          {t.requestPayment}
        </Button>
      )}
      {paymentRequested && !paymentPaid && (
        <div className="rounded-2xl border border-warning/30 bg-warning/10 px-4 py-6 text-center" role="status">
          <LoaderCircle className="mx-auto mb-3 h-10 w-10 animate-spin text-warning" />
          <p className="text-sm font-medium text-warning-foreground">
            {t.paymentWaiting}
          </p>
        </div>
      )}
      {paymentPaid && (
        <div className="rounded-2xl border border-success/25 bg-success/10 p-6 text-center" role="status">
          <CheckCircle2 className="mx-auto mb-2 h-10 w-10 text-success" />
          <p className="font-bold text-success">{t.paid}</p>
          <p className="mt-1 text-sm text-success">
            {t.thanksForDining}
          </p>
        </div>
      )}
    </div>
  );
}
