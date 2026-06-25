import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { seedDatabase } from "@/lib/server/seed";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "app.db");

declare global {
  var __appDb: DatabaseSync | undefined;
}

function bootstrapSchema(db: DatabaseSync) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      price REAL NOT NULL,
      rating REAL NOT NULL,
      glyph TEXT NOT NULL,
      description TEXT NOT NULL,
      specs TEXT NOT NULL,
      sizes TEXT,
      colors TEXT,
      featured INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS reviews (
      id TEXT PRIMARY KEY,
      product_id TEXT NOT NULL REFERENCES products(id),
      author TEXT NOT NULL,
      rating REAL NOT NULL,
      review_date TEXT NOT NULL,
      comment TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      name TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS carts (
      id TEXT PRIMARY KEY,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS cart_items (
      id TEXT PRIMARY KEY,
      cart_id TEXT NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
      product_id TEXT NOT NULL REFERENCES products(id),
      quantity INTEGER NOT NULL,
      variant TEXT
    );

    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id),
      email TEXT NOT NULL,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      address TEXT NOT NULL,
      apartment TEXT,
      city TEXT NOT NULL,
      state TEXT NOT NULL,
      postal_code TEXT NOT NULL,
      country TEXT NOT NULL,
      phone TEXT NOT NULL,
      subtotal REAL NOT NULL,
      shipping REAL NOT NULL,
      tax REAL NOT NULL,
      total REAL NOT NULL,
      status TEXT NOT NULL DEFAULT 'confirmed',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS order_items (
      id TEXT PRIMARY KEY,
      order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
      product_id TEXT NOT NULL REFERENCES products(id),
      name TEXT NOT NULL,
      price REAL NOT NULL,
      quantity INTEGER NOT NULL,
      variant TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_reviews_product ON reviews(product_id);
    CREATE INDEX IF NOT EXISTS idx_cart_items_cart ON cart_items(cart_id);
    CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
  `);
}

function createConnection(): DatabaseSync {
  mkdirSync(DATA_DIR, { recursive: true });
  const db = new DatabaseSync(DB_PATH);
  db.exec("PRAGMA journal_mode = WAL;");
  db.exec("PRAGMA foreign_keys = ON;");
  bootstrapSchema(db);
  seedDatabase(db);
  return db;
}

/**
 * Returns a singleton SQLite connection, cached on `globalThis` so that
 * Next.js dev-mode module reloading doesn't open a new connection (and
 * re-run the schema bootstrap) on every file change.
 */
export function getDb(): DatabaseSync {
  if (!globalThis.__appDb) {
    globalThis.__appDb = createConnection();
  }
  return globalThis.__appDb;
}
