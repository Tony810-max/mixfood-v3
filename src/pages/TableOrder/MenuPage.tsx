/**
 * MenuPage
 *
 * Displays the restaurant menu grouped by category, with a search box and a
 * category select to narrow down a potentially long menu.
 * Reads menu data and cart actions from TableOrderContext.
 */

import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { QuantityStepper } from '@/components/ui/quantity-stepper';
import { useTableOrder } from './TableOrderContext';
import { formatVND } from './helpers';

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, ''); // strip Vietnamese diacritics for looser matching
}

export default function MenuPage() {
  const { menu, cart, addToCart, updateQty } = useTableOrder();
  const [query, setQuery] = useState('');
  const [activeCategoryId, setActiveCategoryId] = useState<string>('all');

  const normalizedQuery = normalize(query.trim());

  const categoriesWithItems = useMemo(
    () => menu.filter((c) => c.products.some((p) => p.isActive)),
    [menu],
  );

  const filteredMenu = useMemo(() => {
    return menu
      .map((category) => ({
        ...category,
        products: category.products.filter((p) => {
          if (!p.isActive) return false;
          if (activeCategoryId !== 'all' && String(category.id) !== activeCategoryId) return false;
          if (!normalizedQuery) return true;
          const name = (p.name as any)?.vn || (p.name as any)?.en || '';
          return normalize(name).includes(normalizedQuery);
        }),
      }))
      .filter((category) => category.products.length > 0);
  }, [menu, normalizedQuery, activeCategoryId]);

  const isEmpty = filteredMenu.length === 0;

  return (
    <div className="flex flex-col">
      {/* Search + filter bar */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm p-4 pb-3 space-y-2.5 border-b border-border/60">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm món ăn…"
            className="w-full h-11 pl-10 pr-9 rounded-2xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
              aria-label="Xóa tìm kiếm"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {categoriesWithItems.length > 1 && (
          <Select value={activeCategoryId} onValueChange={setActiveCategoryId}>
            <SelectTrigger className="h-9 rounded-xl text-sm bg-card border-border">
              <SelectValue placeholder="Danh mục" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả danh mục</SelectItem>
              {categoriesWithItems.map((category) => (
                <SelectItem key={category.id} value={String(category.id)}>
                  {(category.name as any)?.vn || (category.name as any)?.en}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Results */}
      <div className="p-4 pt-3 space-y-6">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
            <Search className="w-10 h-10 mb-3 opacity-40" />
            <p className="text-sm">Không tìm thấy món ăn phù hợp</p>
            {(query || activeCategoryId !== 'all') && (
              <button
                onClick={() => {
                  setQuery('');
                  setActiveCategoryId('all');
                }}
                className="mt-3 text-sm text-primary font-medium"
              >
                Xóa bộ lọc
              </button>
            )}
          </div>
        ) : (
          filteredMenu.map((category) => (
            <div key={category.id}>
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">
                {(category.name as any)?.vn || (category.name as any)?.en}
              </h2>
              <div className="space-y-2.5">
                {category.products.map((product) => {
                  const cartItem = cart.find((c) => c.productId === product.id);
                  return (
                    <div
                      key={product.id}
                      className={`flex items-center gap-3 p-3 rounded-2xl border bg-card shadow-layered transition-colors ${
                        cartItem ? 'border-primary/40' : 'border-border'
                      }`}
                    >
                      {product.image ? (
                        <img
                          src={product.image}
                          alt=""
                          className="w-16 h-16 rounded-xl object-cover shrink-0"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-xl bg-muted shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-foreground truncate">
                          {(product.name as any)?.vn || (product.name as any)?.en}
                        </p>
                        <p className="text-primary font-semibold text-sm">
                          {formatVND(product.price)}
                        </p>
                      </div>
                      {cartItem ? (
                        <QuantityStepper
                          className="shrink-0"
                          value={cartItem.quantity}
                          onChange={(qty) => updateQty(product.id, qty)}
                          max={99}
                        />
                      ) : (
                        <button
                          className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center shrink-0"
                          onClick={() => addToCart(product)}
                        >
                          +
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
