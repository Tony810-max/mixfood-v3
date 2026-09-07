/**
 * TableSessionContext
 *
 * Stores the customer's table session token and derived session state.
 * The session token is persisted in sessionStorage (not localStorage) so it
 * is cleared when the browser tab is closed, reducing the risk of stale tokens.
 *
 * Security:
 *   - The session token is never sent in URLs.
 *   - It is sent only as the Authorization header on API requests.
 *   - tableId, sessionId, restaurantId are NEVER passed from this context to
 *     the backend in request bodies — the backend derives them from the signed JWT.
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const SESSION_KEY = 'mixfood.table-session-token';

export interface TableInfo {
  id: number;
  tableNumber: string;
  name?: string;
  capacity: number;
  status: string;
}

export interface SessionInfo {
  id: string;
  status: string;
  openedAt: string;
  expiresAt: string;
}

export interface TableSessionContextValue {
  sessionToken: string | null;
  session: SessionInfo | null;
  table: TableInfo | null;
  setSessionData: (token: string, session: SessionInfo, table: TableInfo) => void;
  clearSession: () => void;
  isSessionActive: boolean;
}

const TableSessionContext = createContext<TableSessionContextValue | undefined>(undefined);

export function TableSessionProvider({ children }: { children: ReactNode }) {
  const [sessionToken, setSessionToken] = useState<string | null>(
    () => sessionStorage.getItem(SESSION_KEY),
  );
  const [session, setSession] = useState<SessionInfo | null>(null);
  const [table, setTable] = useState<TableInfo | null>(null);

  const setSessionData = (token: string, sessionInfo: SessionInfo, tableInfo: TableInfo) => {
    sessionStorage.setItem(SESSION_KEY, token);
    setSessionToken(token);
    setSession(sessionInfo);
    setTable(tableInfo);
  };

  const clearSession = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setSessionToken(null);
    setSession(null);
    setTable(null);
  };

  const isSessionActive =
    !!sessionToken &&
    !!session &&
    ['ACTIVE', 'PAYMENT_REQUESTED', 'PAYMENT_PROCESSING'].includes(session.status);

  return (
    <TableSessionContext.Provider
      value={{ sessionToken, session, table, setSessionData, clearSession, isSessionActive }}
    >
      {children}
    </TableSessionContext.Provider>
  );
}

export function useTableSession() {
  const ctx = useContext(TableSessionContext);
  if (!ctx) throw new Error('useTableSession must be used within TableSessionProvider');
  return ctx;
}
