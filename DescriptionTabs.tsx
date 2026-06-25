"use client";

import { useState } from "react";
import RatingStars from "@/components/RatingStars";
import type { Review } from "@/lib/reviews";

type TabKey = "details" | "reviews" | "shipping";

const TABS: { key: TabKey; label: string }[] = [
  { key: "details", label: "Details" },
  { key: "reviews", label: "Reviews" },
  { key: "shipping", label: "Shipping" },
];

export default function DescriptionTabs({
  description,
  specs,
  reviews,
}: {
  description: string;
  specs: string[];
  reviews: Review[];
}) {
  const [active, setActive] = useState<TabKey>("details");

  return (
    <div className="mt-16 border-t border-line pt-10">
      <div className="flex gap-8 border-b border-line">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActive(tab.key)}
            aria-pressed={active === tab.key}
            className={`relative pb-4 font-display text-sm font-semibold uppercase tracking-wide transition-colors ${
              active === tab.key ? "text-ink" : "text-steel hover:text-ink"
            }`}
          >
            {tab.label}
            {tab.key === "reviews" && reviews.length > 0 && (
              <span className="ml-1.5 font-mono text-xs text-steel">
                ({reviews.length})
              </span>
            )}
            {active === tab.key && (
              <span className="absolute inset-x-0 -bottom-px h-0.5 bg-brand-red" />
            )}
          </button>
        ))}
      </div>

      <div className="mt-8 max-w-2xl">
        {active === "details" && (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-steel">{description}</p>
            <ul className="flex flex-col gap-2">
              {specs.map((spec) => (
                <li key={spec} className="flex items-start gap-3 text-sm text-ink">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-brand-red" />
                  {spec}
                </li>
              ))}
            </ul>
          </div>
        )}

        {active === "reviews" && (
          <div className="flex flex-col gap-6">
            {reviews.length === 0 ? (
              <p className="text-sm text-steel">No reviews yet for this product.</p>
            ) : (
              reviews.map((review) => (
                <div
                  key={review.id}
                  className="border-b border-line pb-6 last:border-b-0 last:pb-0"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-sm font-semibold text-ink">
                      {review.author}
                    </span>
                    <span className="font-mono text-xs text-steel">{review.date}</span>
                  </div>
                  <div className="mt-2">
                    <RatingStars rating={review.rating} />
                  </div>
                  <p className="mt-3 text-sm text-steel">{review.comment}</p>
                </div>
              ))
            )}
          </div>
        )}

        {active === "shipping" && (
          <div className="flex flex-col gap-4 text-sm text-steel">
            <p>Orders ship within 1 to 2 business days from our fulfillment center.</p>
            <ul className="flex flex-col gap-2">
              <li className="flex items-center gap-3 text-ink">
                <span className="h-1.5 w-1.5 shrink-0 bg-brand-red" />
                Standard shipping: 3 to 5 business days
              </li>
              <li className="flex items-center gap-3 text-ink">
                <span className="h-1.5 w-1.5 shrink-0 bg-brand-red" />
                Express shipping: 1 to 2 business days
              </li>
              <li className="flex items-center gap-3 text-ink">
                <span className="h-1.5 w-1.5 shrink-0 bg-brand-red" />
                Free returns within 30 days of delivery
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
