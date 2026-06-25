import { cookies } from "next/headers";
import { randomUUID } from "node:crypto";
import { getDb } from "@/lib/server/db";

const CART_COOKIE = "baf_cart_id";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

/**
 * Returns the current cart id from the `baf_cart_id` cookie, creating a new
 * Cart row (and cookie) if none exists yet, or if the cookie points at a
 * cart that's since been removed from the database.
 */
export async function getOrCreateCartId(): Promise<string> {
  const cookieStore = await cookies();
  const existingId = cookieStore.get(CART_COOKIE)?.value;
  const db = getDb();

  if (existingId) {
    const row = db.prepare("SELECT id FROM carts WHERE id = ?").get(existingId);
    if (row) {
      return existingId;
    }
  }

  const id = randomUUID();
  db.prepare("INSERT INTO carts (id) VALUES (?)").run(id);
  cookieStore.set(CART_COOKIE, id, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });

  return id;
}
