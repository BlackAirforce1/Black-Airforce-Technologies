"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem } from "@/lib/cart";

export type { CartItem };

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  loading: boolean;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => Promise<void>;
  updateQuantity: (
    id: string,
    variant: string | undefined,
    quantity: number,
  ) => Promise<void>;
  removeItem: (id: string, variant: string | undefined) => Promise<void>;
  refreshCart: () => Promise<void>;
};

const CartContext = createContext<CartContextValue | null>(null);

async function parseItems(response: Response): Promise<CartItem[] | null> {
  if (!response.ok) return null;
  const data = await response.json().catch(() => null);
  return Array.isArray(data?.items) ? (data.items as CartItem[]) : null;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshCart = useCallback(async () => {
    try {
      const res = await fetch("/api/cart");
      const fetched = await parseItems(res);
      if (fetched) setItems(fetched);
    } catch {
      // Network or server hiccup: leave the cart as it was, the next
      // mutation (or a manual refresh) will retry.
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Standard "fetch on mount" effect: hydrate the cart from the server.
    // The actual state update happens after the fetch resolves, not
    // synchronously within the effect body, but the lint rule below can't
    // see through the function call to confirm that.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refreshCart();
  }, [refreshCart]);

  const addItem = useCallback(
    async (item: Omit<CartItem, "quantity">, quantity: number = 1) => {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: item.id, quantity, variant: item.variant }),
      });
      const updated = await parseItems(res);
      if (updated) setItems(updated);
    },
    [],
  );

  const updateQuantity = useCallback(
    async (id: string, variant: string | undefined, quantity: number) => {
      const res = await fetch(`/api/cart/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variant, quantity }),
      });
      const updated = await parseItems(res);
      if (updated) setItems(updated);
    },
    [],
  );

  const removeItem = useCallback(async (id: string, variant: string | undefined) => {
    const res = await fetch(`/api/cart/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ variant }),
    });
    const updated = await parseItems(res);
    if (updated) setItems(updated);
  }, []);

  const count = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  return (
    <CartContext.Provider
      value={{ items, count, subtotal, loading, addItem, updateQuantity, removeItem, refreshCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
