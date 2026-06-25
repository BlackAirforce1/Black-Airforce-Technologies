import { randomUUID } from "node:crypto";
import { getDb } from "@/lib/server/db";
import { getCartItems, clearCartItems } from "@/lib/server/cart";
import { calculateOrderTotals } from "@/lib/pricing";

export type PlaceOrderInput = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
};

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export class EmptyCartError extends Error {
  constructor() {
    super("Your cart is empty.");
    this.name = "EmptyCartError";
  }
}

const REQUIRED_FIELDS: (keyof PlaceOrderInput)[] = [
  "email",
  "firstName",
  "lastName",
  "address",
  "city",
  "state",
  "postalCode",
  "country",
  "phone",
];

function validate(input: PlaceOrderInput) {
  for (const field of REQUIRED_FIELDS) {
    if (!input[field] || !String(input[field]).trim()) {
      throw new ValidationError(`Missing required field: ${field}`);
    }
  }
  if (!/^\S+@\S+\.\S+$/.test(input.email.trim())) {
    throw new ValidationError("Please provide a valid email address.");
  }
}

function findOrCreateUserId(email: string, name: string): string {
  const db = getDb();
  const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(email) as
    | { id: string }
    | undefined;

  if (existing) {
    return existing.id;
  }

  const id = randomUUID();
  db.prepare("INSERT INTO users (id, email, name) VALUES (?, ?, ?)").run(id, email, name);
  return id;
}

export type PlacedOrder = {
  orderId: string;
  orderNumber: string;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
};

export function placeOrder(cartId: string, input: PlaceOrderInput): PlacedOrder {
  validate(input);

  const items = getCartItems(cartId);
  if (items.length === 0) {
    throw new EmptyCartError();
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const { shipping, tax, total } = calculateOrderTotals(subtotal);

  const db = getDb();
  const orderId = randomUUID();

  db.exec("BEGIN");
  try {
    const userId = findOrCreateUserId(
      input.email.trim(),
      `${input.firstName} ${input.lastName}`.trim(),
    );

    db.prepare(
      `INSERT INTO orders (
        id, user_id, email, first_name, last_name, address, apartment, city, state,
        postal_code, country, phone, subtotal, shipping, tax, total
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    ).run(
      orderId,
      userId,
      input.email.trim(),
      input.firstName.trim(),
      input.lastName.trim(),
      input.address.trim(),
      input.apartment?.trim() || null,
      input.city.trim(),
      input.state.trim(),
      input.postalCode.trim(),
      input.country.trim(),
      input.phone.trim(),
      subtotal,
      shipping,
      tax,
      total,
    );

    const insertItem = db.prepare(
      `INSERT INTO order_items (id, order_id, product_id, name, price, quantity, variant)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
    );

    for (const item of items) {
      insertItem.run(
        randomUUID(),
        orderId,
        item.id,
        item.name,
        item.price,
        item.quantity,
        item.variant ?? null,
      );
    }

    clearCartItems(cartId);

    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }

  return {
    orderId,
    orderNumber: `AF-${orderId.slice(0, 8).toUpperCase()}`,
    subtotal,
    shipping,
    tax,
    total,
  };
}
