import type { GlyphType } from "@/components/ProductGlyph";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  /** Display label for the chosen size/color, e.g. "Size 9 / Stealth Black". */
  variant?: string;
  /** Included so client components can render a thumbnail without a separate lookup. */
  glyph?: GlyphType;
};
