export const SHIPPING_FLAT_RATE = 8;
export const FREE_SHIPPING_THRESHOLD = 150;
export const TAX_RATE = 0.08;

export function calculateOrderTotals(subtotal: number) {
  const shipping =
    subtotal <= 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT_RATE;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;

  return { shipping, tax, total };
}
