import { describe, expect, it } from "vitest";
import { formatVND, generateIdempotencyKey, ORDER_STATUS_LABEL } from "./helpers";

describe("table-order helpers", () => {
  it("formats totals using Vietnamese currency", () => {
    expect(formatVND(125_000)).toMatch(/125[.\s]000\s?₫/);
  });

  it("creates a new idempotency key for every checkout", () => {
    const first = generateIdempotencyKey();
    const second = generateIdempotencyKey();

    expect(first).not.toBe(second);
    expect(first).toMatch(/^\d+-[a-z0-9]+$/);
  });

  it("keeps order status labels human-readable", () => {
    expect(ORDER_STATUS_LABEL.PREPARING).toBe("Đang chuẩn bị");
    expect(ORDER_STATUS_LABEL.READY).toBe("Sẵn sàng");
  });
});
