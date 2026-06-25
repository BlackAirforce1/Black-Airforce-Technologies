"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import FilterPanel from "@/components/shop/FilterPanel";
import { CATEGORIES, type Category, type Product } from "@/lib/products";

type SortKey = "featured" | "popularity" | "price-asc" | "price-desc";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "popularity", label: "Most popular" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
];

const PRICE_MIN = 0;

function isCategory(value: string | null): value is Category {
  return CATEGORIES.some((category) => category.name === value);
}

export default function ShopView({ initialProducts }: { initialProducts: Product[] }) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const priceMax = useMemo(() => {
    if (initialProducts.length === 0) return 100;
    return Math.ceil(Math.max(...initialProducts.map((p) => p.price)) / 10) * 10;
  }, [initialProducts]);

  const [selectedCategories, setSelectedCategories] = useState<Category[]>(
    isCategory(categoryParam) ? [categoryParam] : [],
  );
  const [minPrice, setMinPrice] = useState(PRICE_MIN);
  const [maxPrice, setMaxPrice] = useState(priceMax);
  const [sortKey, setSortKey] = useState<SortKey>("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  function toggleCategory(category: Category) {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  }

  function resetFilters() {
    setSelectedCategories([]);
    setMinPrice(PRICE_MIN);
    setMaxPrice(priceMax);
  }

  const filteredProducts = useMemo(() => {
    const matches = initialProducts.filter((product) => {
      const inCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);
      const inPriceRange = product.price >= minPrice && product.price <= maxPrice;
      return inCategory && inPriceRange;
    });

    return [...matches].sort((a, b) => {
      switch (sortKey) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "popularity":
          return b.rating - a.rating;
        default:
          return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
      }
    });
  }, [initialProducts, selectedCategories, minPrice, maxPrice, sortKey]);

  const activeFilterCount =
    selectedCategories.length + (minPrice > PRICE_MIN || maxPrice < priceMax ? 1 : 0);

  const filterPanelProps = {
    products: initialProducts,
    selectedCategories,
    onToggleCategory: toggleCategory,
    minPrice,
    maxPrice,
    onMinPriceChange: setMinPrice,
    onMaxPriceChange: setMaxPrice,
    onReset: resetFilters,
    priceBounds: [PRICE_MIN, priceMax] as [number, number],
  };

  return (
    <Container className="py-12 sm:py-16">
      <Reveal>
        <div className="flex flex-col gap-2 border-b border-line pb-8">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-red">
            Shop
          </span>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            All products
          </h1>
        </div>
      </Reveal>

      <div className="mt-8 grid gap-10 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <FilterPanel {...filterPanelProps} />
        </aside>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="notch-sm flex items-center gap-2 border border-line bg-paper px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-ink lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" strokeWidth={1.75} />
              Filters
              {activeFilterCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-red font-mono text-[11px] text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <p className="font-mono text-xs text-steel">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "product" : "products"}
            </p>

            <label className="ml-auto flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink">
              Sort
              <select
                value={sortKey}
                onChange={(event) => setSortKey(event.target.value as SortKey)}
                className="notch-sm border border-line bg-paper px-3 py-2 font-display text-xs font-semibold uppercase tracking-wide text-ink focus-visible:border-brand-red"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product, index) => (
                <Reveal key={product.id} delay={Math.min(index, 6) * 60}>
                  <ProductCard product={product} showRating />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="notch mt-8 flex flex-col items-center gap-3 bg-paper py-16 text-center">
              <p className="font-display text-lg font-semibold text-ink">
                No products match these filters.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="font-display text-sm font-semibold uppercase tracking-wide text-brand-red underline underline-offset-4"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setMobileFiltersOpen(false)}
            className="absolute inset-0 bg-ink/50"
          />
          <div className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col gap-6 overflow-y-auto bg-paper p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-ink">Filters</h2>
              <button
                type="button"
                aria-label="Close filters"
                onClick={() => setMobileFiltersOpen(false)}
              >
                <X className="h-5 w-5 text-ink" strokeWidth={1.75} />
              </button>
            </div>

            <FilterPanel {...filterPanelProps} />

            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              className="notch-sm mt-auto bg-brand-red px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-brand-red-dark"
            >
              Show {filteredProducts.length} results
            </button>
          </div>
        </div>
      )}
    </Container>
  );
}
