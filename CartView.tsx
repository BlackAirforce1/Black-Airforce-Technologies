"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import Container from "@/components/Container";
import ProductGlyph from "@/components/ProductGlyph";
import { useCart } from "@/context/CartContext";
import { calculateOrderTotals, FREE_SHIPPING_THRESHOLD } from "@/lib/pricing";

export default function CartView() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <Container className="py-20 sm:py-28">
        <div className="notch flex flex-col items-center gap-4 bg-paper py-20 text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-red">
            Cart
          </span>
          <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            Your cart is empty.
          </h1>
          <p className="max-w-sm text-sm text-steel">
            Browse the shop and add something built to keep pace.
          </p>
          <Link
            href="/shop"
            className="notch-sm mt-2 bg-brand-red px-6 py-3 font-display text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-brand-red-dark"
          >
            Continue shopping
          </Link>
        </div>
      </Container>
    );
  }

  const { shipping, tax, total } = calculateOrderTotals(subtotal);

  return (
    <Container className="py-12 sm:py-16">
      <div className="border-b border-line pb-8">
        <span className="font-mono text-xs uppercase tracking-widest text-brand-red">
          Cart
        </span>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {items.length} {items.length === 1 ? "item" : "items"}
        </h1>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_340px]">
        <ul className="flex flex-col gap-6">
          {items.map((item) => {
            return (
              <li
                key={`${item.id}-${item.variant ?? "default"}`}
                className="flex gap-4 border-b border-line pb-6 sm:gap-6"
              >
                <Link
                  href={`/product/${item.id}`}
                  className="notch-sm h-20 w-20 shrink-0 overflow-hidden bg-mist sm:h-24 sm:w-24"
                >
                  {item.glyph && (
                    <ProductGlyph type={item.glyph} className="h-full w-full" />
                  )}
                </Link>

                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link
                        href={`/product/${item.id}`}
                        className="font-display text-sm font-semibold text-ink transition-colors hover:text-brand-red sm:text-base"
                      >
                        {item.name}
                      </Link>
                      {item.variant && (
                        <p className="mt-1 text-xs text-steel">{item.variant}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      aria-label={`Remove ${item.name} from cart`}
                      onClick={() => removeItem(item.id, item.variant)}
                      className="shrink-0 text-steel transition-colors hover:text-brand-red"
                    >
                      <Trash2 className="h-4 w-4" strokeWidth={1.75} />
                    </button>
                  </div>

                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center border border-line">
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${item.name}`}
                        onClick={() =>
                          updateQuantity(item.id, item.variant, item.quantity - 1)
                        }
                        className="flex h-8 w-8 items-center justify-center text-ink transition-colors hover:bg-mist"
                      >
                        <Minus className="h-3.5 w-3.5" strokeWidth={1.75} />
                      </button>
                      <span className="flex h-8 w-10 items-center justify-center font-mono text-sm text-ink">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label={`Increase quantity of ${item.name}`}
                        onClick={() =>
                          updateQuantity(item.id, item.variant, item.quantity + 1)
                        }
                        className="flex h-8 w-8 items-center justify-center text-ink transition-colors hover:bg-mist"
                      >
                        <Plus className="h-3.5 w-3.5" strokeWidth={1.75} />
                      </button>
                    </div>

                    <span className="font-mono text-sm font-medium text-ink">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <aside className="notch flex h-fit flex-col gap-4 bg-paper p-6">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-ink">
            Order summary
          </h2>

          <dl className="flex flex-col gap-2 text-sm">
            <div className="flex items-center justify-between text-steel">
              <dt>Subtotal</dt>
              <dd className="font-mono text-ink">${subtotal.toFixed(2)}</dd>
            </div>
            <div className="flex items-center justify-between text-steel">
              <dt>Shipping</dt>
              <dd className="font-mono text-ink">
                {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
              </dd>
            </div>
            <div className="flex items-center justify-between text-steel">
              <dt>Estimated tax</dt>
              <dd className="font-mono text-ink">${tax.toFixed(2)}</dd>
            </div>
          </dl>

          {shipping > 0 && (
            <p className="font-mono text-[11px] text-steel">
              Add ${(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)} more for free
              shipping.
            </p>
          )}

          <div className="flex items-center justify-between border-t border-line pt-4">
            <span className="font-display text-sm font-semibold uppercase tracking-wide text-ink">
              Total
            </span>
            <span className="font-mono text-lg font-medium text-ink">
              ${total.toFixed(2)}
            </span>
          </div>

          <Link
            href="/checkout"
            className="notch-sm flex items-center justify-center bg-brand-red px-6 py-3.5 font-display text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-brand-red-dark"
          >
            Checkout
          </Link>
          <Link
            href="/shop"
            className="text-center font-display text-xs font-semibold uppercase tracking-wide text-steel transition-colors hover:text-ink"
          >
            Continue shopping
          </Link>
        </aside>
      </div>
    </Container>
  );
}
