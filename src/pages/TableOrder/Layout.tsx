import { FormEvent, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  BellRing,
  CheckCircle2,
  ClipboardList,
  ConciergeBell,
  LoaderCircle,
  MessageCircle,
  ReceiptText,
  Send,
  ShoppingBag,
  UtensilsCrossed,
} from "lucide-react";
import { useTableSession } from "@/contexts/TableSessionContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useTableOrder } from "./TableOrderContext";
import { formatVND } from "./helpers";

export default function TableOrderLayout() {
  const { t, lang } = useLanguage();
  const { table } = useTableSession();
  const {
    orders, staffCalls, paymentRequested, paymentPaid, cart, setCart, cartOpen,
    setCartOpen, cartTotal, cartCount, orderNotes, setOrderNotes, submitting,
    updateQty, submitOrder, handleCallStaff, sendChat,
  } = useTableOrder();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [chatInput, setChatInput] = useState("");
  const tabs = [
    { id: "menu", label: t.menu, icon: UtensilsCrossed },
    { id: "orders", label: t.orders, icon: ClipboardList },
    { id: "chat", label: t.messageStaff, icon: MessageCircle },
    { id: "bill", label: t.payment, icon: ReceiptText },
  ] as const;
  const itemName = (item: { name: { vn?: string; en?: string } }) => lang === 'vn' ? item.name.vn || item.name.en : item.name.en || item.name.vn;

  const activeTab = pathname.split("/").pop() ?? "menu";
  const activeOrders = orders.filter((order) => order.status !== "CANCELLED");
  const sessionTotal = activeOrders.reduce((sum, order) => sum + order.total, 0);
  const pendingCallTypes = new Set(
    staffCalls
      .filter((call) => call.status === "PENDING" || call.status === "ACKNOWLEDGED")
      .map((call) => call.type),
  );

  const handleSendChat = async (event?: FormEvent) => {
    event?.preventDefault();
    const message = chatInput.trim();
    if (!message) return;
    setChatInput("");
    await sendChat(message);
  };

  return (
    <div className="relative mx-auto flex h-dvh max-w-lg flex-col overflow-hidden bg-background shadow-2xl">
      <header className="z-20 shrink-0 border-b border-white/15 bg-primary-gradient px-4 pb-4 text-primary-foreground pt-safe-top">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/15 text-sm font-bold ring-1 ring-white/25">
              {table?.tableNumber}
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">Mix Food · {t.tableOrder}</p>
              <h1 className="truncate text-base font-bold text-white">
                {t.tableLabel.replace('{number}', table?.tableNumber ?? '')}{table?.name ? ` · ${table.name}` : ""}
              </h1>
            </div>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-[11px] text-white/70">{t.subtotal}</p>
            <p className="text-sm font-bold tabular-nums text-white">{formatVND(sessionTotal)}</p>
          </div>
        </div>
      </header>

      {paymentRequested && (
        <div
          className={cn(
            "mx-4 mt-3 flex shrink-0 items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-sm font-medium",
            paymentPaid
              ? "border-success/25 bg-success/10 text-success"
              : "border-warning/30 bg-warning/10 text-warning-foreground",
          )}
          role="status"
          aria-live="polite"
        >
          {paymentPaid ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <LoaderCircle className="h-4 w-4 shrink-0 animate-spin" />}
          {paymentPaid ? t.paidThankYou : t.waitingPayment}
        </div>
      )}

      <main className="min-h-0 flex-1 overflow-y-auto overscroll-contain pb-40" id="table-order-content">
        <Outlet />
      </main>

      {cartCount > 0 && !cartOpen && (
        <div className="pointer-events-none fixed inset-x-0 bottom-36 z-30 mx-auto flex max-w-lg justify-end px-4">
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="pointer-events-auto flex min-h-12 items-center gap-2 rounded-full bg-primary-gradient px-4 text-sm font-semibold text-primary-foreground shadow-layered-hover transition-transform hover:-translate-y-0.5"
            aria-label={t.cartOpen.replace('{count}', String(cartCount)).replace('{total}', formatVND(cartTotal))}
          >
            <span className="grid h-7 min-w-7 place-items-center rounded-full bg-primary px-1 text-xs text-white">{cartCount}</span>
            <ShoppingBag className="h-4 w-4" />
            {formatVND(cartTotal)}
          </button>
        </div>
      )}

      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent side="bottom" className="inset-x-0 mx-auto max-h-[88dvh] max-w-lg overflow-y-auto rounded-t-3xl border-x p-5 pb-safe-bottom">
          <SheetHeader className="pr-10 text-left">
            <SheetTitle className="text-xl">{t.yourCart}</SheetTitle>
            <SheetDescription>{t.cartDescription}</SheetDescription>
          </SheetHeader>

          <div className="my-5 space-y-3">
            {cart.map((item) => (
              <div key={item.productId} className="rounded-2xl border border-border/80 bg-card p-3.5">
                <div className="flex items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold" title={itemName(item)}>{itemName(item)}</p>
                    <p className="mt-0.5 text-sm font-semibold text-primary">{formatVND(item.price)}</p>
                  </div>
                  <QuantityStepper value={item.quantity} onChange={(quantity) => updateQty(item.productId, quantity)} max={99} />
                </div>
                <Input
                  className="mt-3 min-h-10 bg-background text-sm"
                  aria-label={t.itemNote.replace('{item}', itemName(item) ?? '')}
                  placeholder={t.itemNotePlaceholder}
                  value={item.notes}
                  onChange={(event) => setCart((current) => current.map((cartItem) => cartItem.productId === item.productId ? { ...cartItem, notes: event.target.value } : cartItem))}
                />
              </div>
            ))}
          </div>

          <Input
            aria-label={t.orderNote}
            placeholder={t.orderNotePlaceholder}
            value={orderNotes}
            onChange={(event) => setOrderNotes(event.target.value)}
          />
          <div className="my-4 flex items-center justify-between rounded-2xl bg-primary/10 px-4 py-3.5 font-bold">
            <span>{t.total}</span>
            <span className="tabular-nums text-primary">{formatVND(cartTotal)}</span>
          </div>
          <Button className="w-full" size="lg" onClick={submitOrder} disabled={submitting || cart.length === 0}>
            {submitting && <LoaderCircle className="animate-spin" />}
            {submitting ? t.sendingKitchen : t.confirmOrder.replace('{total}', formatVND(cartTotal))}
          </Button>
        </SheetContent>
      </Sheet>

      <nav className="absolute inset-x-0 bottom-0 z-20 border-t border-border/80 bg-card/95 pb-safe-bottom shadow-[0_-12px_32px_-24px_rgba(0,0,0,.45)] backdrop-blur-xl" aria-label={t.orderNavigation}>
        {activeTab === "chat" && (
          <form className="flex items-center gap-2 border-b border-border/70 px-3 py-2" onSubmit={handleSendChat}>
            <Input value={chatInput} onChange={(event) => setChatInput(event.target.value)} placeholder={t.messageStaffPlaceholder} aria-label={t.messageStaffLabel} className="min-h-10" />
            <Button type="submit" size="icon" className="h-10 min-h-10 w-10 shrink-0" disabled={!chatInput.trim()} aria-label={t.sendMessage}>
              <Send />
            </Button>
          </form>
        )}

        <div className="flex gap-2 border-b border-border/60 px-3 py-2">
          <button
            type="button"
            onClick={() => handleCallStaff("CALL_STAFF")}
            className={cn("flex min-h-9 flex-1 items-center justify-center gap-1.5 rounded-xl text-xs font-semibold", pendingCallTypes.has("CALL_STAFF") ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground")}
          >
            <ConciergeBell className="h-3.5 w-3.5" />
            {pendingCallTypes.has("CALL_STAFF") ? t.staffCalled : t.callStaff}
          </button>
          <button
            type="button"
            onClick={() => { handleCallStaff("REQUEST_BILL"); navigate("bill"); }}
            className={cn("flex min-h-9 flex-1 items-center justify-center gap-1.5 rounded-xl text-xs font-semibold", pendingCallTypes.has("REQUEST_BILL") ? "bg-warning/15 text-warning-foreground" : "bg-muted text-muted-foreground")}
          >
            <BellRing className="h-3.5 w-3.5" />
            {pendingCallTypes.has("REQUEST_BILL") ? t.processing : t.requestBill}
          </button>
        </div>

        <div className="grid grid-cols-4 px-1.5 pt-1.5">
          {tabs.map(({ id, label, icon: Icon }) => {
            const badge = id === "orders" ? activeOrders.filter((order) => order.status === "PENDING").length : 0;
            return (
              <button
                type="button"
                key={id}
                onClick={() => navigate(id)}
                aria-current={activeTab === id ? "page" : undefined}
                className={cn("relative flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-semibold transition-colors", activeTab === id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted")}
              >
                <Icon className="h-5 w-5" />
                {label}
                {badge > 0 && <span className="absolute right-3 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-destructive px-1 text-[9px] text-white">{badge}</span>}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
