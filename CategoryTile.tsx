import Link from "next/link";
import ProductGlyph from "@/components/ProductGlyph";
import type { Category } from "@/lib/products";
import type { GlyphType } from "@/components/ProductGlyph";

export default function CategoryTile({
  name,
  glyph,
}: {
  name: Category;
  glyph: GlyphType;
}) {
  return (
    <Link
      href={`/shop?category=${encodeURIComponent(name)}`}
      className="group notch relative flex aspect-[4/5] flex-col justify-end overflow-hidden bg-ink"
    >
      <ProductGlyph
        type={glyph}
        tone="dark"
        className="absolute inset-0 h-full w-full opacity-80 transition-transform duration-500 ease-out group-hover:scale-110"
      />
      <div className="relative z-10 flex items-center justify-between bg-ink/80 p-4 backdrop-blur-sm">
        <span className="font-display text-sm font-semibold uppercase tracking-wide text-white">
          {name}
        </span>
        <span className="font-mono text-xs text-white/70 transition-transform duration-200 group-hover:translate-x-1">
          &rarr;
        </span>
      </div>
    </Link>
  );
}
