import { Star } from "lucide-react";

export default function RatingStars({ rating }: { rating: number }) {
  const rounded = Math.round(rating * 2) / 2;

  return (
    <div className="flex items-center gap-1.5" aria-label={`Rated ${rating} out of 5`}>
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => {
          const position = i + 1;
          const filled = position <= rounded;
          const half = !filled && position - 0.5 === rounded;

          return (
            <span key={i} className="relative h-3.5 w-3.5">
              <Star
                className="absolute inset-0 h-3.5 w-3.5 text-line"
                strokeWidth={1.5}
              />
              {(filled || half) && (
                <Star
                  className="absolute inset-0 h-3.5 w-3.5 text-brand-red"
                  strokeWidth={1.5}
                  fill="currentColor"
                  style={half ? { clipPath: "inset(0 50% 0 0)" } : undefined}
                />
              )}
            </span>
          );
        })}
      </div>
      <span className="font-mono text-xs text-steel">{rating.toFixed(1)}</span>
    </div>
  );
}
