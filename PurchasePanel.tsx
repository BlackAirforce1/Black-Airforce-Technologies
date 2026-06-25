"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import RatingStars from "@/components/RatingStars";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/products";

export default function PurchasePanel({
  product,
  reviewCount,
}: {
  product: Product;
  reviewCount: number;
}) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes?.[0] ?? null,
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product.colors?.[0]?.name ?? null,
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const variantLabel = [selectedSize ? `Size ${selectedSize}` : null, selectedColor]
    .filter(Boolean)
    .join(" / ");

  async function handleAddToCart() {
    await addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        variant: variantLabel || undefined,
      },
      quantity,
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <span className="font-mono text-xs uppercase tracking-widest text-brand-red">
          {product.category}
        </span>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {product.name}
        </h1>
        <div className="mt-3 flex items-center gap-3">
          <RatingStars rating={product.rating} />
          <span className="font-mono text-xs text-steel">
            {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
          </span>
        </div>
      </div>

      <p className="font-mono text-2xl font-medium text-ink">${product.price}</p>

      <p className="max-w-md text-sm text-steel">{product.description}</p>

      {product.colors && (
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ink">
            Color
            {selectedColor && <span className="ml-1.5 text-steel">/ {selectedColor}</span>}
          </h3>
          <div className="mt-3 flex gap-3">
            {product.colors.map((color) => (
              <button
                key={color.name}
                type="button"
                aria-label={color.name}
                aria-pressed={selectedColor === color.name}
                onClick={() => setSelectedColor(color.name)}
                className={`h-9 w-9 rounded-full border-2 transition-transform ${
                  selectedColor === color.name
                    ? "scale-110 border-brand-red"
                    : "border-line"
                }`}
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        </div>
      )}

      {product.sizes && (
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ink">
            Size
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                aria-pressed={selectedSize === size}
                onClick={() => setSelectedSize(size)}
                className={`notch-sm flex h-10 min-w-10 items-center justify-center border px-3 font-mono text-sm transition-colors ${
                  selectedSize === size
                    ? "border-brand-red bg-brand-red text-white"
                    : "border-line bg-paper text-ink hover:border-ink"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ink">
          Quantity
        </h3>
        <div className="mt-3 flex w-fit items-center border border-line">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            className="flex h-10 w-10 items-center justify-center text-ink transition-colors hover:bg-mist"
          >
            <Minus className="h-4 w-4" strokeWidth={1.75} />
          </button>
          <span className="flex h-10 w-12 items-center justify-center font-mono text-sm text-ink">
            {quantity}
          </span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQuantity((value) => Math.min(9, value + 1))}
            className="flex h-10 w-10 items-center justify-center text-ink transition-colors hover:bg-mist"
          >
            <Plus className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        className={`notch flex items-center justify-center px-8 py-4 font-display text-sm font-semibold uppercase tracking-wide text-white transition-colors ${
          added ? "bg-ink" : "bg-brand-red hover:bg-brand-red-dark"
        }`}
      >
        {added ? "Added to cart" : "Add to cart"}
      </button>
    </div>
  );
}
