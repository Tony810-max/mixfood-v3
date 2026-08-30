// ─── Shared helpers for TableOrder pages ──────────────────────────────────────

export const API_BASE =
  import.meta.env.VITE_WS_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  'http://localhost:3001';

export function formatVND(n: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n);
}

export function generateIdempotencyKey() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export const ORDER_STATUS_LABEL: Record<string, string> = {
  PENDING:   '⏳ Đang chờ',
  CONFIRMED: '✅ Đã xác nhận',
  PREPARING: '👨‍🍳 Đang chuẩn bị',
  READY:     '🔔 Sẵn sàng',
  SERVED:    '🍽️ Đã phục vụ',
  COMPLETED: '✅ Hoàn thành',
  CANCELLED: '❌ Đã hủy',
};

// Tailwind classes for order status pills + a matching left-border accent,
// mirroring the color language used on the admin side.
export const ORDER_STATUS_STYLE: Record<string, { badge: string; border: string }> = {
  PENDING:   { badge: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400', border: 'border-l-yellow-400' },
  CONFIRMED: { badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',          border: 'border-l-blue-400' },
  PREPARING: { badge: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',  border: 'border-l-orange-400' },
  READY:     { badge: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',      border: 'border-l-green-400' },
  SERVED:    { badge: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',  border: 'border-l-purple-400' },
  COMPLETED: { badge: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',              border: 'border-l-gray-300' },
  CANCELLED: { badge: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',               border: 'border-l-red-400' },
};
