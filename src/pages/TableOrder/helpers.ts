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
