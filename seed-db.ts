/**
 * Explicitly (re)seeds the database with the demo catalog and reviews,
 * wiping any existing products/reviews/carts/orders/users first.
 *
 * The database also auto-seeds itself on first connection if it's empty
 * (see src/lib/server/db.ts), so this script is mainly for resetting back
 * to a clean demo state, not required for first-time setup.
 *
 * Run with: npm run db:seed
 */
import { getDb } from "../src/lib/server/db";
import { seedDatabase } from "../src/lib/server/seed";
import { SEED_PRODUCTS, SEED_REVIEWS } from "../src/lib/server/seed-data";

const db = getDb();
seedDatabase(db, { force: true });

console.log(`Seeded ${SEED_PRODUCTS.length} products and ${SEED_REVIEWS.length} reviews.`);
