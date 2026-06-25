import type { GlyphType } from "@/components/ProductGlyph";

/**
 * Shared, client-safe types and the static category taxonomy. The actual
 * product catalog now lives in the database (see src/lib/server/products.ts
 * and scripts/seed-db.ts) rather than as a static array here, since this
 * module is imported by both client and server components.
 */

export type Category = "Footwear" | "Apparel" | "Accessories" | "Wearables";

export type ColorOption = {
  name: string;
  hex: string;
};

export type Product = {
  id: string;
  name: string;
  category: Category;
  price: number;
  rating: number;
  glyph: GlyphType;
  description: string;
  /** Spec bullets shown in the Details tab on the product page. */
  specs: string[];
  sizes?: string[];
  colors?: ColorOption[];
  featured?: boolean;
};

export const CATEGORIES: { name: Category; glyph: GlyphType }[] = [
  { name: "Footwear", glyph: "sneaker" },
  { name: "Apparel", glyph: "hoodie" },
  { name: "Accessories", glyph: "backpack" },
  { name: "Wearables", glyph: "earbuds" },
];
