/**
 * QR Table Ordering Page
 *
 * Entry point: /q/:token
 *
 * Flow:
 *   1. Read :token from URL.
 *   2. GET /q/:token → receive sessionToken + table info + menu + current orders.
 *   3. Store sessionToken in sessionStorage via TableSessionContext.
 *   4. Render <TableOrderProvider> wrapping <Outlet /> (nested routes handle tabs).
 *
 * On page refresh:
 *   - If sessionToken exists in sessionStorage, call GET /customer/session to
 *     recover current state without a new scan.
 *
 * Session closed / expired:
 *   - Show "Your session has ended" screen.
 *   - Clear stored token.
 */

import { useEffect, useState } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { useTableSession } from '@/contexts/TableSessionContext';
import {
  scanQrCode,
  getSessionState,
  getMenu,
  type ScanResponse,
  type OrderResponse,
  type MessageResponse,
  type StaffCallResponse,
} from '@/services/table-session.service';
import { TableOrderProvider } from './TableOrderContext';

// ─── Session init state (kept local — not in context) ─────────────────────────

interface SessionInitData {
  menu: ScanResponse['menu'];
  orders: OrderResponse[];
  messages: MessageResponse[];
  staffCalls: StaffCallResponse[];
  paymentRequested: boolean;
  paymentPaid: boolean;
}

export default function TableOrderPage() {
  const { token } = useParams<{ token: string }>();
  const { sessionToken, session, table, setSessionData, clearSession } = useTableSession();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sessionEnded, setSessionEnded] = useState(false);
  const [paymentPaidOnEnd, setPaymentPaidOnEnd] = useState(false);

  // Initial data hydrated from the scan/recovery response — passed into the provider
  const [initData, setInitData] = useState<SessionInitData | null>(null);

  // ─── Load session ──────────────────────────────────────────────────────────

  useEffect(() => {
    async function init() {
      setLoading(true);
      setError(null);
      try {
        let tok = sessionToken;

        // If we have a stored session token, try to recover state first.
        if (tok) {
          try {
            const state = await getSessionState(tok);

            const recoveredSession = state.session;
            const recoveredTable = recoveredSession?.table ?? null;

            if (recoveredSession && recoveredTable) {
              setSessionData(
                tok,
                {
                  id: recoveredSession.id,
                  status: recoveredSession.status,
                  openedAt: recoveredSession.openedAt,
                  expiresAt: recoveredSession.expiresAt,
                },
                {
                  id: recoveredTable.id ?? 0,
                  tableNumber: recoveredTable.tableNumber ?? '',
                  name: recoveredTable.name,
                  capacity: recoveredTable.capacity ?? 4,
                  status: recoveredTable.status ?? 'OCCUPIED',
                },
              );
            }

            const menuData = await getMenu(tok);

            const pr = state.paymentRequest;
            const paid = pr?.status === 'PAID';

            // Check session closure state
            if (
              recoveredSession?.status === 'CLOSED' ||
              recoveredSession?.status === 'PAID'
            ) {
              setPaymentPaidOnEnd(recoveredSession.status === 'PAID');
              setSessionEnded(true);
              clearSession();
              setLoading(false);
              return;
            }

            setInitData({
              menu: menuData,
              orders: state.orders ?? [],
              messages: state.messages ?? [],
              staffCalls: state.staffCalls ?? [],
              paymentRequested: !!pr,
              paymentPaid: paid,
            });
            setLoading(false);
            return;
          } catch {
            // Token expired, session closed, or server error — clear and fall through to re-scan
            clearSession();
            tok = null;
          }
        }

        // Fresh scan (no stored token, or recovery failed)
        if (!token) {
          setError('Invalid QR code.');
          setLoading(false);
          return;
        }

        const scanData = await scanQrCode(token);
        setSessionData(scanData.sessionToken, scanData.session, scanData.table);

        setInitData({
          menu: scanData.menu,
          orders: scanData.currentOrders ?? [],
          messages: [],
          staffCalls: [],
          paymentRequested: false,
          paymentPaid: false,
        });
      } catch (err: any) {
        const code =
          err?.response?.data?.error?.code || err?.response?.data?.code;
        const msg =
          err?.response?.data?.message ||
          err?.message ||
          'Could not connect to the restaurant.';
        if (code === 'TABLE_INACTIVE' || code === 'TABLE_OUT_OF_SERVICE') {
          setError('This table is currently not available. Please ask the staff for help.');
        } else if (code === 'SESSION_CLOSED' || code === 'SESSION_EXPIRED') {
          setSessionEnded(true);
          clearSession();
        } else {
          setError(msg);
        }
      }
      setLoading(false);
    }
    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // ─── Render states ─────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto" />
          <p className="text-muted-foreground text-sm">Đang kết nối…</p>
        </div>
      </div>
    );
  }

  if (sessionEnded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-6">
        <div className="text-center space-y-4 max-w-sm">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto text-3xl">
            ✅
          </div>
          <h1 className="text-xl font-bold text-foreground">Phiên đã kết thúc</h1>
          <p className="text-muted-foreground text-sm">
            {paymentPaidOnEnd
              ? 'Cảm ơn bạn đã đến Mix Food! Hẹn gặp lại.'
              : 'Phiên gọi món của bạn đã kết thúc. Vui lòng quét mã QR để bắt đầu lại.'}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-6">
        <div className="text-center space-y-4 max-w-sm">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto text-3xl">
            ❌
          </div>
          <h1 className="text-xl font-bold text-foreground">Không thể kết nối</h1>
          <p className="text-muted-foreground text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!session || !table || !initData || !sessionToken) return null;

  // ─── Active session — render provider + nested routes ──────────────────────

  return (
    <TableOrderProvider
      sessionToken={sessionToken}
      onSessionEnded={() => {
        setSessionEnded(true);
      }}
      initialMenu={initData.menu}
      initialOrders={initData.orders}
      initialMessages={initData.messages}
      initialStaffCalls={initData.staffCalls}
      initialPaymentRequested={initData.paymentRequested}
      initialPaymentPaid={initData.paymentPaid}
    >
      <Outlet />
    </TableOrderProvider>
  );
}
