/**
 * TableOrderContext
 *
 * Provides shared state for all sub-pages of the QR table ordering flow:
 * menu, orders, messages, staff calls, cart, and payment status.
 *
 * Also sets up the WebSocket connection for real-time updates.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { io, type Socket } from 'socket.io-client';
import { toast } from '@/components/ui/sonner';
import { useTableSession } from '@/contexts/TableSessionContext';
import {
  createOrder,
  cancelOrder as cancelOrderRequest,
  getOrders,
  sendMessage,
  callStaff,
  requestPayment,
  type ScanResponse,
  type OrderResponse,
  type MessageResponse,
  type StaffCallResponse,
} from '@/services/table-session.service';
import { API_BASE, generateIdempotencyKey } from './helpers';

// ─── CartItem ──────────────────────────────────────────────────────────────────

export interface CartItem {
  productId: number;
  name: { en: string; vn: string };
  price: number;
  quantity: number;
  notes: string;
}

// ─── Context shape ─────────────────────────────────────────────────────────────

export interface TableOrderContextValue {
  // data
  menu: ScanResponse['menu'];
  setMenu: React.Dispatch<React.SetStateAction<ScanResponse['menu']>>;
  orders: OrderResponse[];
  setOrders: React.Dispatch<React.SetStateAction<OrderResponse[]>>;
  messages: MessageResponse[];
  setMessages: React.Dispatch<React.SetStateAction<MessageResponse[]>>;
  staffCalls: StaffCallResponse[];
  setStaffCalls: React.Dispatch<React.SetStateAction<StaffCallResponse[]>>;
  paymentRequested: boolean;
  setPaymentRequested: React.Dispatch<React.SetStateAction<boolean>>;
  paymentPaid: boolean;
  setPaymentPaid: React.Dispatch<React.SetStateAction<boolean>>;
  sessionEnded: boolean;
  setSessionEnded: React.Dispatch<React.SetStateAction<boolean>>;
  // cart
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  cartTotal: number;
  cartCount: number;
  orderNotes: string;
  setOrderNotes: (v: string) => void;
  submitting: boolean;
  // actions
  addToCart: (product: { id: number; name: { en: string; vn: string }; price: number }) => void;
  removeFromCart: (productId: number) => void;
  updateQty: (productId: number, qty: number) => void;
  submitOrder: () => Promise<void>;
  cancelOrder: (orderId: number) => Promise<void>;
  sendChat: (text: string) => Promise<void>;
  handleCallStaff: (type: string) => Promise<void>;
  handleRequestPayment: () => Promise<void>;
  // ref for chat scroll
  chatBottomRef: React.RefObject<HTMLDivElement>;
}

const TableOrderContext = createContext<TableOrderContextValue | undefined>(undefined);

export function useTableOrder() {
  const ctx = useContext(TableOrderContext);
  if (!ctx) throw new Error('useTableOrder must be used within TableOrderProvider');
  return ctx;
}

// ─── Provider ─────────────────────────────────────────────────────────────────

interface TableOrderProviderProps {
  sessionToken: string; // NOT null — only rendered when session is active
  children: ReactNode;
  // Lifted-state setters so index.tsx can react to session lifecycle events
  onSessionEnded: () => void;
  // Initial data hydrated from scan / session recovery
  initialMenu?: ScanResponse['menu'];
  initialOrders?: OrderResponse[];
  initialMessages?: MessageResponse[];
  initialStaffCalls?: StaffCallResponse[];
  initialPaymentRequested?: boolean;
  initialPaymentPaid?: boolean;
}

export function TableOrderProvider({
  sessionToken,
  children,
  onSessionEnded,
  initialMenu = [],
  initialOrders = [],
  initialMessages = [],
  initialStaffCalls = [],
  initialPaymentRequested = false,
  initialPaymentPaid = false,
}: TableOrderProviderProps) {
  const { session, clearSession } = useTableSession();
  const navigate = useNavigate();

  // ── Data state ──────────────────────────────────────────────────────────────
  const [menu, setMenu] = useState<ScanResponse['menu']>(initialMenu);
  const [orders, setOrders] = useState<OrderResponse[]>(initialOrders);
  const [messages, setMessages] = useState<MessageResponse[]>(initialMessages);
  const [staffCalls, setStaffCalls] = useState<StaffCallResponse[]>(initialStaffCalls);
  const [paymentRequested, setPaymentRequested] = useState(initialPaymentRequested);
  const [paymentPaid, setPaymentPaid] = useState(initialPaymentPaid);
  const [sessionEnded, setSessionEnded] = useState(false);

  // ── Cart state ──────────────────────────────────────────────────────────────
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderNotes, setOrderNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [checkoutKey, setCheckoutKey] = useState(() => generateIdempotencyKey());

  const socketRef = useRef<Socket | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // ── WebSocket ───────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!sessionToken || !session) return;

    const socket = io(API_BASE, {
      auth: { token: sessionToken },
      transports: ['websocket', 'polling'],
    });

    socketRef.current = socket;

    socket.on('ORDER_STATUS_UPDATED', async ({ orderId, status, itemCancelled }: any) => {
      // Item-level cancels don't necessarily change the order's own status
      // (e.g. cancelling 1 of 3 items leaves it PENDING) — a full refetch
      // keeps items/totals in sync instead of trying to patch them in place.
      if (itemCancelled) {
        try {
          setOrders(await getOrders(sessionToken));
        } catch {
          setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
        }
        toast.info('Đơn hàng của bạn vừa được cập nhật. Xem tin nhắn để biết chi tiết.');
        return;
      }
      if (status === 'CANCELLED') {
        toast.info('Đơn hàng của bạn vừa được cập nhật. Xem tin nhắn để biết chi tiết.');
      }
      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
    });

    socket.on('STAFF_MESSAGE_RECEIVED', (msg: any) => {
      setMessages((prev) => [...prev, msg]);
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    });

    socket.on('PAYMENT_STATUS_UPDATED', ({ status }: any) => {
      if (status === 'PAID') setPaymentPaid(true);
      setPaymentRequested(true);
    });

    socket.on('SESSION_CLOSED', () => {
      setSessionEnded(true);
      clearSession();
      onSessionEnded();
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionToken, session?.id]);

  // ── Scroll chat to bottom when messages change ──────────────────────────────

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  // ── Cart actions ────────────────────────────────────────────────────────────

  const addToCart = useCallback(
    (product: { id: number; name: { en: string; vn: string }; price: number }) => {
      setCart((prev) => {
        const existing = prev.find((i) => i.productId === product.id);
        if (existing)
          return prev.map((i) =>
            i.productId === product.id ? { ...i, quantity: i.quantity + 1 } : i,
          );
        return [
          ...prev,
          { productId: product.id, name: product.name, price: product.price, quantity: 1, notes: '' },
        ];
      });
    },
    [],
  );

  const removeFromCart = useCallback((productId: number) => {
    setCart((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const updateQty = useCallback(
    (productId: number, qty: number) => {
      if (qty <= 0) {
        removeFromCart(productId);
        return;
      }
      setCart((prev) => prev.map((i) => (i.productId === productId ? { ...i, quantity: qty } : i)));
    },
    [removeFromCart],
  );

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  // ── Submit order ────────────────────────────────────────────────────────────

  const submitOrder = async () => {
    if (!sessionToken || cart.length === 0 || submitting) return;
    setSubmitting(true);
    try {
      const newOrder = await createOrder(
        sessionToken,
        cart.map(({ productId, quantity, notes }) => ({ productId, quantity, notes: notes || undefined })),
        orderNotes || undefined,
        checkoutKey,
      );
      setOrders((prev) => {
        const exists = prev.find((o) => o.id === newOrder.id);
        if (exists) return prev;
        return [...prev, newOrder];
      });
      setCart([]);
      setOrderNotes('');
      setCartOpen(false);
      setCheckoutKey(generateIdempotencyKey());
      navigate('orders');
    } catch (err: any) {
      const code = err?.response?.data?.error?.code;
      if (code === 'SESSION_NOT_ACTIVE' || code === 'SESSION_CLOSED' || code === 'SESSION_EXPIRED') {
        setSessionEnded(true);
        clearSession();
        onSessionEnded();
      } else {
        toast.error(err?.response?.data?.message || 'Đặt món thất bại. Vui lòng thử lại.');
      }
    }
    setSubmitting(false);
  };

  // ── Cancel order (customer self-service — only while PENDING) ──────────────

  const cancelOrder = async (orderId: number) => {
    if (!sessionToken) return;
    try {
      await cancelOrderRequest(sessionToken, orderId);
      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: 'CANCELLED' } : o)));
      toast.success('Đã hủy đơn hàng.');
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Không thể hủy đơn hàng này. Vui lòng nhắn tin cho nhân viên.');
    }
  };

  // ── Chat ────────────────────────────────────────────────────────────────────

  const sendChat = async (text: string) => {
    if (!sessionToken || !text.trim()) return;
    try {
      let msg;
      try {
        msg = await sendMessage(sessionToken, text.trim());
      } catch {
        // One silent retry — masks a transient timeout/cold-start blip
        // instead of the user having to notice the failure and resend.
        msg = await sendMessage(sessionToken, text.trim());
      }
      setMessages((prev) => [...prev, { ...msg, senderType: 'CUSTOMER' }]);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Gửi tin nhắn thất bại. Vui lòng thử lại.');
    }
  };

  // ── Staff calls ─────────────────────────────────────────────────────────────

  const handleCallStaff = async (type: string) => {
    if (!sessionToken) return;
    try {
      let call;
      try {
        call = await callStaff(sessionToken, type);
      } catch {
        call = await callStaff(sessionToken, type);
      }
      setStaffCalls((prev) => [
        ...prev.filter((c) => c.type !== type || c.status === 'RESOLVED'),
        call,
      ]);
      toast.success('✅ Nhân viên đã được thông báo!');
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Gọi nhân viên thất bại. Vui lòng thử lại.');
    }
  };

  // ── Payment request ─────────────────────────────────────────────────────────

  const [requestingPayment, setRequestingPayment] = useState(false);

  const handleRequestPayment = async () => {
    if (!sessionToken || paymentRequested || requestingPayment) return;
    setRequestingPayment(true);
    try {
      const pr = await requestPayment(sessionToken);
      setPaymentRequested(true);
      if (pr.status === 'PAID') setPaymentPaid(true);
      navigate('bill');
    } catch (err: any) {
      const code = err?.response?.data?.error?.code;
      if (code === 'NO_ORDERS') {
        toast.error('Chưa có đơn hàng nào để thanh toán.');
      } else if (code === 'SESSION_NOT_ACTIVE') {
        setSessionEnded(true);
        clearSession();
        onSessionEnded();
      } else {
        toast.error(err?.response?.data?.message || 'Không thể yêu cầu thanh toán. Vui lòng thử lại.');
      }
    }
    setRequestingPayment(false);
  };

  // ── Context value ───────────────────────────────────────────────────────────

  const value: TableOrderContextValue = {
    menu,
    setMenu,
    orders,
    setOrders,
    messages,
    setMessages,
    staffCalls,
    setStaffCalls,
    paymentRequested,
    setPaymentRequested,
    paymentPaid,
    setPaymentPaid,
    sessionEnded,
    setSessionEnded,
    cart,
    setCart,
    cartOpen,
    setCartOpen,
    cartTotal,
    cartCount,
    orderNotes,
    setOrderNotes,
    submitting,
    addToCart,
    removeFromCart,
    updateQty,
    submitOrder,
    cancelOrder,
    sendChat,
    handleCallStaff,
    handleRequestPayment,
    chatBottomRef,
  };

  return <TableOrderContext.Provider value={value}>{children}</TableOrderContext.Provider>;
}
