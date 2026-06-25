"use client";

import { CATEGORIES, type Category, type Product } from "@/lib/products";

export default function FilterPanel({
  products,
  selectedCategories,
  onToggleCategory,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  onReset,
  priceBounds,
}: {
  products: Product[];
  selectedCategories: Category[];
  onToggleCategory: (category: Category) => void;
  minPrice: number;
  maxPrice: number;
  onMinPriceChange: (value: number) => void;
  onMaxPriceChange: (value: number) => void;
  onReset: () => void;
  priceBounds: [number, number];
}) {
  const [lowerBound, upperBound] = priceBounds;
  const hasActiveFilters =
    selectedCategories.length > 0 || minPrice > lowerBound || maxPrice < upperBound;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ink">
            Category
          </h3>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onReset}
              className="font-mono text-[11px] uppercase tracking-wide text-brand-red hover:underline"
            >
              Reset
            </button>
          )}
        </div>

        <ul className="mt-4 flex flex-col gap-3">
          {CATEGORIES.map((category) => {
            const count = products.filter(
              (product) => product.category === category.name,
            ).length;
            const checked = selectedCategories.includes(category.name);

            return (
              <li key={category.name}>
                <label className="flex cursor-pointer items-center justify-between gap-2 text-sm text-ink">
                  <span className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onToggleCategory(category.name)}
                      className="h-4 w-4 accent-brand-red"
                    />
                    {category.name}
                  </span>
                  <span className="font-mono text-xs text-steel">{count}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ink">
          Price
        </h3>
        <div className="mt-4 flex items-center gap-3">
          <label className="flex flex-1 flex-col gap-1">
            <span className="font-mono text-[11px] uppercase tracking-wide text-steel">
              Min
            </span>
            <input
              type="number"
              inputMode="numeric"
              min={lowerBound}
              max={maxPrice}
              value={minPrice}
              onChange={(event) => {
                const next = Number(event.target.value);
                onMinPriceChange(
                  Number.isNaN(next) ? lowerBound : Math.min(Math.max(next, lowerBound), maxPrice),
                );
              }}
              className="border border-line bg-paper px-3 py-2 font-mono text-sm text-ink focus-visible:border-brand-red"
            />
          </label>
          <span className="pt-5 text-sm text-steel">to</span>
          <label className="flex flex-1 flex-col gap-1">
            <span className="font-mono text-[11px] uppercase tracking-wide text-steel">
              Max
            </span>
            <input
              type="number"
              inputMode="numeric"
              min={minPrice}
              max={upperBound}
              value={maxPrice}
              onChange={(event) => {
                const next = Number(event.target.value);
                onMaxPriceChange(
                  Number.isNaN(next) ? upperBound : Math.max(Math.min(next, upperBound), minPrice),
                );
              }}
              className="border border-line bg-paper px-3 py-2 font-mono text-sm text-ink focus-visible:border-brand-red"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
