"use client";

import Link from "next/link";
import { useState } from "react";
import ProductGlyph from "@/components/ProductGlyph";
import RatingStars from "@/components/RatingStars";
import type { Product } from "@/lib/products";
import { useCart } from "@/context/CartContext";

export default function ProductCard({
  product,
  showRating = false,
}: {
  product: Product;
  showRating?: boolean;
}) {
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  async function handleAddToCart() {
    await addItem({ id: product.id, name: product.name, price: product.price });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  return (
    <div className="group flex flex-col bg-paper transition-transform duration-300 hover:-translate-y-1">
      <Link
        href={`/product/${product.id}`}
        className="notch block aspect-square overflow-hidden bg-mist"
      >
        <ProductGlyph
          type={product.glyph}
          className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-2 border border-t-0 border-line p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-display text-base font-semibold text-ink transition-colors group-hover:text-brand-red">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs uppercase tracking-wide text-steel">
          {product.category}
        </p>

        {showRating && <RatingStars rating={product.rating} />}

        <div className="mt-1 flex items-center justify-between">
          <span className="font-mono text-lg font-medium text-ink">
            ${product.price}
          </span>

          <button
            type="button"
            onClick={handleAddToCart}
            className={`notch-sm flex items-center justify-center px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors duration-200 ${
              added
                ? "bg-ink text-white"
                : "bg-brand-red text-white hover:bg-brand-red-dark"
            }`}
          >
            {added ? "Added" : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
