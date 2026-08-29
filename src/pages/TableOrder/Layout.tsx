/**
 * TableOrderLayout
 *
 * Wraps all tab pages. Renders the shared header, payment banners, floating cart
 * button, cart sheet, bottom nav (with staff-call row), and the chat input.
 *
 * <Outlet /> renders whichever tab route is active.
 */

import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTableSession } from '@/contexts/TableSessionContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTableOrder } from './TableOrderContext';
import { formatVND } from './helpers';

export default function TableOrderLayout() {
  const { table } = useTableSession();
  const {
    orders,
    messages,
    staffCalls,
    paymentRequested,
    paymentPaid,
    cart,
    setCart,
    cartOpen,
    setCartOpen,
    cartTotal,
    cartCount,
    orderNotes,
    setOrderNotes,
    submitting,
    updateQty,
    submitOrder,
    handleCallStaff,
    sendChat,
  } = useTableOrder();

  const location = useLocation();
  const navigate = useNavigate();

  // Derive active tab from the last path segment
  const activeTab = location.pathname.split('/').pop() as
    | 'menu'
    | 'orders'
    | 'chat'
    | 'bill';

  // Local chat input state — lives here because the input is in the bottom nav
  const [chatInput, setChatInput] = useState('');

  const nonCancelledOrders = orders.filter((o) => o.status !== 'CANCELLED');
  const sessionTotal = nonCancelledOrders.reduce((sum, o) => sum + o.total, 0);
  const pendingCallTypes = new Set(
    staffCalls
      .filter((c) => c.status === 'PENDING' || c.status === 'ACKNOWLEDGED')
      .map((c) => c.type),
  );

  const handleSendChat = async () => {
    if (!chatInput.trim()) return;
    const text = chatInput;
    setChatInput('');
    await sendChat(text);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-lg mx-auto relative">
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <header className="bg-primary text-white px-4 pt-safe-top pb-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs opacity-80">Mix Food</p>
            <h1 className="text-base font-bold">
              Bàn {table?.tableNumber}
              {table?.name ? ` · ${table.name}` : ''}
            </h1>
          </div>
          <div className="text-right">
            <p className="text-xs opacity-80">Tổng</p>
            <p className="text-sm font-bold">{formatVND(sessionTotal)}</p>
          </div>
        </div>
      </header>

      {/* ── Payment status banners ───────────────────────────────────────────── */}
      {paymentRequested && !paymentPaid && (
        <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-2 text-sm text-yellow-800 font-medium">
          💰 Đang chờ nhân viên xác nhận thanh toán…
        </div>
      )}
      {paymentPaid && (
        <div className="bg-green-50 border-b border-green-200 px-4 py-2 text-sm text-green-800 font-medium">
          ✅ Đã thanh toán! Cảm ơn bạn.
        </div>
      )}

      {/* ── Tab content ─────────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto pb-32">
        <Outlet />
      </div>

      {/* ── Floating Cart Button ─────────────────────────────────────────────── */}
      {cart.length > 0 && !cartOpen && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-24 right-4 flex items-center gap-2 bg-primary text-white rounded-full px-4 py-3 shadow-lg text-sm font-semibold z-20"
        >
          🛒 {cartCount} món · {formatVND(cartTotal)}
        </button>
      )}

      {/* ── Cart Sheet ───────────────────────────────────────────────────────── */}
      {cartOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50"
          onClick={() => setCartOpen(false)}
        >
          <div
            className="absolute bottom-0 left-0 right-0 max-w-lg mx-auto bg-background rounded-t-2xl p-5 space-y-4 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-foreground">Giỏ hàng</h3>
              <button
                onClick={() => setCartOpen(false)}
                className="text-muted-foreground text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.productId} className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {item.name.vn || item.name.en}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatVND(item.price)} / món
                    </p>
                    <input
                      className="mt-1 w-full text-xs border border-border rounded px-2 py-1 bg-background text-foreground"
                      placeholder="Ghi chú (không bắt buộc)"
                      value={item.notes}
                      onChange={(e) =>
                        setCart((prev) =>
                          prev.map((c) =>
                            c.productId === item.productId
                              ? { ...c, notes: e.target.value }
                              : c,
                          ),
                        )
                      }
                    />
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      className="w-7 h-7 rounded-full border border-border flex items-center justify-center"
                      onClick={() => updateQty(item.productId, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span className="w-5 text-center text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center"
                      onClick={() => updateQty(item.productId, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <input
                className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-background text-foreground"
                placeholder="Ghi chú cho đơn hàng…"
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
              />
            </div>

            <div className="flex justify-between font-bold text-base">
              <span>Tổng</span>
              <span className="text-primary">{formatVND(cartTotal)}</span>
            </div>

            <Button
              className="w-full"
              size="lg"
              onClick={submitOrder}
              disabled={submitting || cart.length === 0}
            >
              {submitting ? 'Đang đặt món…' : `Đặt món (${formatVND(cartTotal)})`}
            </Button>
          </div>
        </div>
      )}

      {/* ── Bottom Nav ───────────────────────────────────────────────────────── */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-background border-t border-border z-10">
        <div className="grid grid-cols-4">
          {[
            { id: 'menu', label: 'Thực đơn', emoji: '🍜' },
            {
              id: 'orders',
              label: 'Đơn hàng',
              emoji: '📋',
              badge: nonCancelledOrders.filter((o) => o.status === 'PENDING').length,
            },
            {
              id: 'chat',
              label: 'Nhắn tin',
              emoji: '💬',
              badge: messages.filter((m) => m.senderType !== 'CUSTOMER').length,
            },
            { id: 'bill', label: 'Thanh toán', emoji: '💰' },
          ].map(({ id, label, emoji, badge }) => (
            <button
              key={id}
              onClick={() => navigate(id)}
              className={`flex flex-col items-center gap-0.5 py-3 relative transition-colors ${
                activeTab === id ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <span className="text-xl leading-none">{emoji}</span>
              <span className="text-[10px] font-medium">{label}</span>
              {badge !== undefined && badge > 0 && (
                <span className="absolute top-2 right-6 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Staff call buttons */}
        <div className="border-t border-border flex">
          <button
            className={`flex-1 py-2 text-xs font-medium flex items-center justify-center gap-1.5 ${
              pendingCallTypes.has('CALL_STAFF') ? 'text-orange-500' : 'text-muted-foreground'
            }`}
            onClick={() => handleCallStaff('CALL_STAFF')}
          >
            🔔 {pendingCallTypes.has('CALL_STAFF') ? 'Đã gọi' : 'Gọi nhân viên'}
          </button>
          <div className="w-px bg-border" />
          <button
            className={`flex-1 py-2 text-xs font-medium flex items-center justify-center gap-1.5 ${
              pendingCallTypes.has('REQUEST_BILL') ? 'text-yellow-600' : 'text-muted-foreground'
            }`}
            onClick={() => {
              handleCallStaff('REQUEST_BILL');
              navigate('bill');
            }}
          >
            🧾 {pendingCallTypes.has('REQUEST_BILL') ? 'Đang xử lý' : 'Xin hóa đơn'}
          </button>
        </div>

        {/* Chat input (shown only on chat tab) */}
        {activeTab === 'chat' && (
          <div className="border-t border-border flex items-center gap-2 px-3 py-2">
            <Input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Nhắn tin cho nhân viên…"
              className="h-8 text-sm"
              onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
            />
            <Button
              size="sm"
              className="h-8 px-3 shrink-0"
              onClick={handleSendChat}
              disabled={!chatInput.trim()}
            >
              Gửi
            </Button>
          </div>
        )}
      </nav>
    </div>
  );
}
