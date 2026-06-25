# Black Airforce Technologies

E-commerce storefront built with Next.js (App Router), TypeScript, Tailwind CSS v4,
and a real SQLite-backed API.

## Status: Step 6 of 6 (backend, database, API routes)

The build is now feature-complete and wired end to end to a real database. Steps 1-5
covered the foundation, homepage, shop grid, product detail, and cart/checkout UI on
mock data. Step 6 replaces that mock data with:

- **Database**: SQLite via Node's built-in `node:sqlite` module, no native compilation,
  no separate database server, no ORM. Tables: `products`, `reviews`, `users`, `carts`,
  `cart_items`, `orders`, `order_items`. The schema bootstraps itself on first
  connection, and the database **auto-seeds itself** with the demo catalog if it's
  empty, so `npm install && npm run dev` just works with no separate setup step. The
  file lives at `data/app.db` and is gitignored.
- **API routes** (`src/app/api/`):
  - `GET /api/products`: list with `?category=`, `?minPrice=`, `?maxPrice=`,
    `?sort=`, `?featured=true`, all pushed down into the SQL query.
  - `GET /api/products/[id]`: a single product with its reviews and related products.
  - `GET /api/cart` / `POST /api/cart`: read the cart, or add an item.
  - `PATCH /api/cart/[productId]` / `DELETE /api/cart/[productId]`: update or remove
    a line item (matched by product id + variant).
  - `POST /api/orders`: validates the shipping form, snapshots the current cart into
    a real order (with its own name/price/quantity per line, independent of future
    catalog changes), finds-or-creates a user by email, and clears the cart.
- **Cart sessions**: an anonymous cart is tracked via an httpOnly `baf_cart_id` cookie,
  so the cart now survives a page refresh (it didn't before this step).
- **Front-end wiring**: the homepage and shop pages fetch products straight from the
  database in their Server Components (no self-fetch over HTTP, that's wasted work);
  `CartContext` now calls the cart API routes instead of holding local-only state, with
  the same public hook shape as before so no consuming component's interface changed;
  checkout's "Place order" button calls the real `/api/orders` endpoint and shows a
  genuine error message on failure instead of always succeeding.
- The checkout payment fields are still a deliberate placeholder: the API only ever
  receives the shipping/contact fields, the card inputs are never read or transmitted.
  Wiring up real payments means integrating a processor (Stripe, etc.) behind that
  section, not something to fake at the database layer.

### A scope note on "users"

There's a `users` table, and every order is linked to one, but there's no login or
account system. A user record is found-or-created by email at checkout time, the same
pattern as guest checkout on most real storefronts. Adding actual accounts (signup,
login, order history) would be a reasonable next step but wasn't part of the original
six.

### Why SQLite instead of Postgres/MySQL

This was a constraint of the build environment, not a long-term recommendation: the
sandbox this was built in can reach npm but not arbitrary services, which ruled out
Prisma and any native-binary database driver. `node:sqlite` is built into Node itself
(no install, no network call), so it's what's wired up for local development.

**Important for deploying to Vercel**: SQLite writing to a local file does not work
reliably on Vercel's serverless functions (the filesystem is ephemeral per invocation,
so writes don't persist, and concurrent writes aren't safe). Before deploying, swap
`data` access for a hosted database, e.g. Vercel Postgres or Neon. Because the data
layer is isolated to `src/lib/server/db.ts`, `cart.ts`, `products.ts`, `reviews.ts`, and
`orders.ts`, that's a contained swap: replace the SQL calls in those five files with
the equivalent calls against your hosted database (or reintroduce an ORM like Prisma or
Drizzle there), and nothing in the API routes, pages, or components needs to change.

### Node version requirement

`node:sqlite` is a Node 22.5+ feature. Run this with Node 22 or later (check with
`node --version`); the `engines` field in `package.json` documents this.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. The database auto-creates and auto-seeds itself on first
run, no separate setup step needed.

To wipe and reload the demo data at any point:

```bash
npm run db:seed
```

## Deploying to Vercel

This is a standard Next.js app and deploys to Vercel with no extra configuration for
the front end. For the database, see "Why SQLite instead of Postgres/MySQL" above,
swap in a hosted database before going to production.

## Brand tokens

| Token             | Value     | Use                          |
| ------------------ | --------- | ----------------------------- |
| `brand-red`        | `#C00000` | Header, primary CTAs          |
| `brand-red-dark`   | `#930000` | Hover state on red elements   |
| `ink`              | `#161616` | Body text, dark surfaces      |
| `paper`            | `#FFFFFF` | Cards, footer background      |
| `mist`             | `#F4F4F5` | Page background                |
| `steel`            | `#6B6B70` | Secondary text                |
| `line`             | `#E2E2E4` | Borders, dividers              |

