/**
 * Shared, client-safe Review type. Review data now lives in the database
 * (see src/lib/server/reviews.ts and scripts/seed-db.ts).
 */
export type Review = {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
};
