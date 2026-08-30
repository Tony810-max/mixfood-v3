/**
 * MenuPage
 *
 * Displays the restaurant menu grouped by category, with a search box to
 * filter items by name and quick category chips to jump between sections.
 * Reads menu data and cart actions from TableOrderContext.
 */

import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
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
  const [activeCategoryId, setActiveCategoryId] = useState<number | 'all'>('all');

  const normalizedQuery = normalize(query.trim());

  const filteredMenu = useMemo(() => {
    return menu
      .map((category) => ({
        ...category,
        products: category.products.filter((p) => {
          if (!p.isActive) return false;
          if (activeCategoryId !== 'all' && category.id !== activeCategoryId) return false;
          if (!normalizedQuery) return true;
          const name = (p.name as any)?.vn || (p.name as any)?.en || '';
          return normalize(name).includes(normalizedQuery);
        }),
      }))
      .filter((category) => category.products.length > 0);
  }, [menu, normalizedQuery, activeCategoryId]);

  const categoriesWithItems = useMemo(
    () => menu.filter((c) => c.products.some((p) => p.isActive)),
    [menu],
  );

  const isEmpty = filteredMenu.length === 0;

  return (
    <div className="flex flex-col">
      {/* Search bar */}
      <div className="sticky top-0 z-10 bg-background p-4 pb-2 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm món ăn…"
            className="w-full h-10 pl-9 pr-9 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              aria-label="Xóa tìm kiếm"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category chips */}
        {categoriesWithItems.length > 1 && (
          <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4">
            <button
              onClick={() => setActiveCategoryId('all')}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                activeCategoryId === 'all'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-card text-muted-foreground border-border'
              }`}
            >
              Tất cả
            </button>
            {categoriesWithItems.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategoryId(category.id)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  activeCategoryId === category.id
                    ? 'bg-primary text-white border-primary'
                    : 'bg-card text-muted-foreground border-border'
                }`}
              >
                {(category.name as any)?.vn || (category.name as any)?.en}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Results */}
      <div className="p-4 pt-2 space-y-6">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
            <Search className="w-10 h-10 mb-3 opacity-50" />
            <p className="text-sm">Không tìm thấy món ăn phù hợp</p>
            {query && (
              <button onClick={() => setQuery('')} className="mt-3 text-sm text-primary font-medium">
                Xóa tìm kiếm
              </button>
            )}
          </div>
        ) : (
          filteredMenu.map((category) => (
            <div key={category.id}>
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">
                {(category.name as any)?.vn || (category.name as any)?.en}
              </h2>
              <div className="space-y-2">
                {category.products.map((product) => {
                  const cartItem = cart.find((c) => c.productId === product.id);
                  return (
                    <div
                      key={product.id}
                      className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card"
                    >
                      {product.image && (
                        <img
                          src={product.image}
                          alt=""
                          className="w-16 h-16 rounded-lg object-cover shrink-0"
                        />
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
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted"
                            onClick={() => updateQty(product.id, cartItem.quantity - 1)}
                          >
                            −
                          </button>
                          <span className="w-5 text-center text-sm font-semibold">
                            {cartItem.quantity}
                          </span>
                          <button
                            className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center"
                            onClick={() => addToCart(product)}
                          >
                            +
                          </button>
                        </div>
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
