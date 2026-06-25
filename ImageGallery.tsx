"use client";

import { useState } from "react";
import ProductGlyph, { type GlyphType } from "@/components/ProductGlyph";

type GalleryView = {
  label: string;
  tone: "default" | "dark";
  surface: "mist" | "paper" | "ink";
  zoom?: boolean;
};

const VIEWS: GalleryView[] = [
  { label: "Front", tone: "default", surface: "mist" },
  { label: "Detail", tone: "default", surface: "paper", zoom: true },
  { label: "Studio", tone: "dark", surface: "ink" },
];

const SURFACE_CLASS: Record<GalleryView["surface"], string> = {
  mist: "bg-mist",
  paper: "bg-paper",
  ink: "bg-ink",
};

export default function ImageGallery({
  glyph,
  productName,
}: {
  glyph: GlyphType;
  productName: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = VIEWS[activeIndex];

  return (
    <div className="flex flex-col gap-4">
      <div className={`notch relative aspect-square w-full overflow-hidden ${SURFACE_CLASS[active.surface]}`}>
        <ProductGlyph
          type={glyph}
          tone={active.tone}
          className={`h-full w-full transition-transform duration-500 ease-out ${
            active.zoom ? "scale-125" : "scale-100"
          }`}
        />
        <span
          className={`absolute bottom-4 right-4 font-mono text-[11px] uppercase tracking-wide ${
            active.tone === "dark" ? "text-white/60" : "text-steel"
          }`}
        >
          {productName} / {active.label}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {VIEWS.map((view, index) => (
          <button
            key={view.label}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Show ${view.label.toLowerCase()} view`}
            aria-pressed={activeIndex === index}
            className={`notch-sm aspect-square overflow-hidden border-2 transition-colors ${
              SURFACE_CLASS[view.surface]
            } ${activeIndex === index ? "border-brand-red" : "border-line"}`}
          >
            <ProductGlyph type={glyph} tone={view.tone} className="h-full w-full" />
          </button>
        ))}
      </div>
    </div>
  );
}
