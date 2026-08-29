/**
 * MenuPage
 *
 * Displays the restaurant menu grouped by category.
 * Reads menu data and cart actions from TableOrderContext.
 */

import { useTableOrder } from './TableOrderContext';
import { formatVND } from './helpers';

export default function MenuPage() {
  const { menu, cart, addToCart, updateQty } = useTableOrder();

  return (
    <div className="p-4 space-y-6">
      {menu.map((category) => (
        <div key={category.id}>
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">
            {(category.name as any)?.vn || (category.name as any)?.en}
          </h2>
          <div className="space-y-2">
            {category.products
              .filter((p) => p.isActive)
              .map((product) => {
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
      ))}
    </div>
  );
}
