import type { DatabaseSync } from "node:sqlite";
import { SEED_PRODUCTS, SEED_REVIEWS } from "@/lib/server/seed-data";

export function isDatabaseEmpty(db: DatabaseSync): boolean {
  const row = db.prepare("SELECT count(*) as count FROM products").get() as {
    count: number;
  };
  return row.count === 0;
}

/**
 * Seeds the product catalog and reviews into `db`.
 * - `force: false` (default) is a no-op if products already exist, so it's
 *   safe to call on every connection to auto-seed a fresh database.
 * - `force: true` clears existing products/reviews/carts/orders/users first,
 *   used by the explicit `npm run db:seed` reset script.
 */
export function seedDatabase(db: DatabaseSync, { force = false } = {}): void {
  if (!force && !isDatabaseEmpty(db)) {
    return;
  }

  db.exec(`
    DELETE FROM order_items;
    DELETE FROM orders;
    DELETE FROM cart_items;
    DELETE FROM carts;
    DELETE FROM reviews;
    DELETE FROM users;
    DELETE FROM products;
  `);

  const insertProduct = db.prepare(`
    INSERT INTO products (id, name, category, price, rating, glyph, description, specs, sizes, colors, featured)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const product of SEED_PRODUCTS) {
    insertProduct.run(
      product.id,
      product.name,
      product.category,
      product.price,
      product.rating,
      product.glyph,
      product.description,
      JSON.stringify(product.specs),
      product.sizes ? JSON.stringify(product.sizes) : null,
      product.colors ? JSON.stringify(product.colors) : null,
      product.featured ? 1 : 0,
    );
  }

  const insertReview = db.prepare(`
    INSERT INTO reviews (id, product_id, author, rating, review_date, comment)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  for (const review of SEED_REVIEWS) {
    insertReview.run(
      review.id,
      review.productId,
      review.author,
      review.rating,
      review.date,
      review.comment,
    );
  }
}
