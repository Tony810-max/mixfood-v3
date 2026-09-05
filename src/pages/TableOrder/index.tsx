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
import { CheckCircle2, QrCode, RefreshCw, TriangleAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTableSession } from '@/contexts/TableSessionContext';
import { useLanguage } from '@/contexts/LanguageContext';
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
import { getApiError } from './helpers';

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
  const { t } = useLanguage();
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
          setError(t.invalidQr);
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
      } catch (err: unknown) {
        const { code } = getApiError(err);
        if (code === 'TABLE_INACTIVE' || code === 'TABLE_OUT_OF_SERVICE') {
          setError(t.tableUnavailable);
        } else if (code === 'SESSION_CLOSED' || code === 'SESSION_EXPIRED') {
          setSessionEnded(true);
          clearSession();
        } else {
          setError(t.restaurantUnreachable);
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
      <div className="grid min-h-dvh place-items-center bg-background px-6">
        <div className="surface-panel w-full max-w-sm p-7 text-center" role="status" aria-live="polite">
          <div className="relative mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-primary/10 text-primary">
            <QrCode className="h-7 w-7" />
            <span className="absolute inset-0 animate-ping rounded-2xl border border-primary/25" />
          </div>
          <h1 className="text-xl font-bold">{t.openingYourTable}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{t.loadingTableSession}</p>
        </div>
      </div>
    );
  }

  if (sessionEnded) {
    return (
      <div className="grid min-h-dvh place-items-center bg-background px-6">
        <div className="surface-panel w-full max-w-sm p-7 text-center">
          <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-success/10 text-success">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h1 className="text-xl font-bold text-foreground">{t.sessionEnded}</h1>
          <p className="text-muted-foreground text-sm">
            {paymentPaidOnEnd
              ? t.sessionEndedPaid
              : t.sessionEndedUnpaid}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid min-h-dvh place-items-center bg-background px-6">
        <div className="surface-panel w-full max-w-sm p-7 text-center" role="alert">
          <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-destructive/10 text-destructive">
            <TriangleAlert className="h-8 w-8" />
          </div>
          <h1 className="text-xl font-bold text-foreground">{t.connectionError}</h1>
          <p className="text-muted-foreground text-sm">{error}</p>
          <Button className="mt-5 w-full" variant="outline" onClick={() => window.location.reload()}>
            <RefreshCw /> {t.reconnect}
          </Button>
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
