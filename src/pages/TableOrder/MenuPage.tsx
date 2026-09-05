/**
 * MenuPage
 *
 * Displays the restaurant menu grouped by category, with a search box and a
 * category select to narrow down a potentially long menu.
 * Reads menu data and cart actions from TableOrderContext.
 */

import { useMemo, useState } from 'react';
import { ImageOff, Plus, Search, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { QuantityStepper } from '@/components/ui/quantity-stepper';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTableOrder } from './TableOrderContext';
import { formatVND } from './helpers';

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, ''); // strip Vietnamese diacritics for looser matching
}

export default function MenuPage() {
  const { t, lang } = useLanguage();
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
          const name = p.name.vn || p.name.en || '';
          return normalize(name).includes(normalizedQuery);
        }),
      }))
      .filter((category) => category.products.length > 0);
  }, [menu, normalizedQuery, activeCategoryId]);

  const isEmpty = filteredMenu.length === 0;
  const productName = (product: { name: { vn?: string; en?: string } }) => lang === 'vn' ? product.name.vn || product.name.en : product.name.en || product.name.vn;
  const categoryName = (category: { name: { vn?: string; en?: string } }) => lang === 'vn' ? category.name.vn || category.name.en : category.name.en || category.name.vn;

  return (
    <div className="flex flex-col" aria-label={t.tableMenu}>
      {/* Search + filter bar */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm p-4 pb-3 space-y-2.5 border-b border-border/60">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="search"
            aria-label={t.searchDish}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchDish}
            className="w-full h-11 pl-10 pr-9 rounded-2xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
              aria-label={t.clearSearch}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {categoriesWithItems.length > 1 && (
          <Select value={activeCategoryId} onValueChange={setActiveCategoryId}>
            <SelectTrigger className="h-9 rounded-xl text-sm bg-card border-border">
              <SelectValue placeholder={t.category} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.allCategories}</SelectItem>
              {categoriesWithItems.map((category) => (
                <SelectItem key={category.id} value={String(category.id)}>
                  {categoryName(category)}
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
            <p className="text-sm">{t.noMatchingDishes}</p>
            {(query || activeCategoryId !== 'all') && (
              <button
                onClick={() => {
                  setQuery('');
                  setActiveCategoryId('all');
                }}
                className="mt-3 text-sm text-primary font-medium"
              >
                {t.clearFilters}
              </button>
            )}
          </div>
        ) : (
          filteredMenu.map((category) => (
            <div key={category.id}>
              <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.12em] text-muted-foreground">
                {categoryName(category)}
              </h2>
              <div className="space-y-2.5">
                {category.products.map((product) => {
                  const cartItem = cart.find((c) => c.productId === product.id);
                  return (
                    <div
                      key={product.id}
                      className={`flex items-center gap-3 rounded-2xl border bg-card p-3 shadow-layered transition-[border-color,box-shadow] ${
                        cartItem ? 'border-primary/40' : 'border-border'
                      }`}
                    >
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={productName(product) || t.dish}
                          loading="lazy"
                          decoding="async"
                          className="w-16 h-16 rounded-xl object-cover shrink-0"
                        />
                      ) : (
                        <div className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-muted text-muted-foreground" aria-hidden="true">
                          <ImageOff className="h-5 w-5" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-medium text-foreground" title={productName(product) || t.unnamedDish}>
                            {productName(product) || t.unnamedDish}
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
                          type="button"
                          aria-label={t.addToCart.replace('{item}', productName(product) || t.unnamedDish)}
                          className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
                          onClick={() => addToCart(product)}
                        >
                          <Plus className="h-5 w-5" />
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
