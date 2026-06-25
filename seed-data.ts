/**
 * Shared seed data for the SQLite database: the product catalog and
 * reviews. Used by db.ts to auto-seed an empty database on first
 * connection, and by scripts/seed-db.ts for an explicit reset/reseed.
 */

export type ColorOption = { name: string; hex: string };

export type ProductSeed = {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  glyph: string;
  description: string;
  specs: string[];
  sizes?: string[];
  colors?: ColorOption[];
  featured?: boolean;
};

export type ReviewSeed = {
  id: string;
  productId: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
};

const STEALTH_BLACK: ColorOption = { name: "Stealth Black", hex: "#161616" };
const CRIMSON_RED: ColorOption = { name: "Crimson Red", hex: "#C00000" };
const CLOUD_WHITE: ColorOption = { name: "Cloud White", hex: "#F4F4F5" };
const STEEL_GREY: ColorOption = { name: "Steel Grey", hex: "#6B6B70" };
const OLIVE_DRAB: ColorOption = { name: "Olive Drab", hex: "#4B4B3A" };
const NIGHT_NAVY: ColorOption = { name: "Night Navy", hex: "#1F2A44" };

const SHOE_SIZES = ["7", "8", "9", "10", "11", "12"];
const APPAREL_SIZES = ["XS", "S", "M", "L", "XL"];

export const SEED_PRODUCTS: ProductSeed[] = [
  {
    id: "af1-stealth-runner",
    name: "AF1 Stealth Runner",
    category: "Footwear",
    price: 189,
    rating: 4.8,
    glyph: "sneaker",
    description:
      "Low-profile running shoe with a reinforced midsole and a reflective accent stripe.",
    specs: [
      "Breathable mesh and synthetic leather upper",
      "Dual-density EVA midsole for impact absorption",
      "Reflective trim for low-light visibility",
      "Rubber traction outsole with multidirectional tread",
    ],
    sizes: SHOE_SIZES,
    colors: [STEALTH_BLACK, CRIMSON_RED],
    featured: true,
  },
  {
    id: "recon-trainer-mid",
    name: "Recon Trainer Mid",
    category: "Footwear",
    price: 215,
    rating: 4.6,
    glyph: "trainer",
    description:
      "High-top trainer built for grip and ankle support across mixed terrain.",
    specs: [
      "Mid-cut collar for added ankle support",
      "Reinforced toe cap for abrasion resistance",
      "Lugged outsole tuned for mixed terrain",
      "Internal heel counter for lockdown fit",
    ],
    sizes: SHOE_SIZES,
    colors: [STEALTH_BLACK, OLIVE_DRAB],
    featured: true,
  },
  {
    id: "tactical-tech-hoodie",
    name: "Tactical Tech Hoodie",
    category: "Apparel",
    price: 98,
    rating: 4.7,
    glyph: "hoodie",
    description:
      "Brushed-fleece hoodie with a zip security pocket and an adjustable hood.",
    specs: [
      "Brushed-fleece interior for warmth without bulk",
      "Zippered security pocket at the chest",
      "Adjustable, three-panel hood",
      "Ribbed cuffs and hem to lock in heat",
    ],
    sizes: APPAREL_SIZES,
    colors: [STEALTH_BLACK, STEEL_GREY],
    featured: true,
  },
  {
    id: "pulse-wireless-earbuds",
    name: "Pulse Wireless Earbuds",
    category: "Wearables",
    price: 129,
    rating: 4.5,
    glyph: "earbuds",
    description:
      "Active noise-cancelling earbuds with a 30-hour case battery life.",
    specs: [
      "Active noise cancellation with transparency mode",
      "30-hour total battery life with the charging case",
      "Bluetooth 5.3 with low-latency mode",
      "IPX4 sweat and splash resistance",
    ],
    colors: [STEALTH_BLACK, CLOUD_WHITE],
    featured: true,
  },
  {
    id: "cargo-utility-backpack",
    name: "Cargo Utility Backpack",
    category: "Accessories",
    price: 149,
    rating: 4.9,
    glyph: "backpack",
    description:
      "Water-resistant 24L backpack with a padded laptop sleeve and webbing straps.",
    specs: [
      "24L capacity, water-resistant 600D fabric",
      "Padded 16-inch laptop sleeve",
      "MOLLE-style webbing for modular attachments",
      "YKK zip hardware throughout",
    ],
    colors: [STEALTH_BLACK, OLIVE_DRAB],
    featured: true,
  },
  {
    id: "aero-performance-tee",
    name: "Aero Performance Tee",
    category: "Apparel",
    price: 45,
    rating: 4.4,
    glyph: "tee",
    description:
      "Moisture-wicking tee with flatlock seams built for chafe-free movement.",
    specs: [
      "Moisture-wicking, quick-dry fabric blend",
      "Flatlock seams to prevent chafing",
      "Four-way stretch for full range of motion",
      "UPF 30 sun protection",
    ],
    sizes: APPAREL_SIZES,
    colors: [STEALTH_BLACK, CLOUD_WHITE],
    featured: true,
  },
  {
    id: "strike-low-sneaker",
    name: "Strike Low Sneaker",
    category: "Footwear",
    price: 159,
    rating: 4.3,
    glyph: "sneaker",
    description:
      "Low-top silhouette with a lightweight cushioned sole built for everyday wear.",
    specs: [
      "Lightweight knit and synthetic upper",
      "Cushioned foam sole for all-day wear",
      "Padded collar for a snug, low-bulk fit",
      "Non-marking rubber outsole",
    ],
    sizes: SHOE_SIZES,
    colors: [CRIMSON_RED, CLOUD_WHITE],
  },
  {
    id: "glide-performance-jacket",
    name: "Glide Performance Jacket",
    category: "Apparel",
    price: 135,
    rating: 4.5,
    glyph: "hoodie",
    description:
      "Wind-resistant shell jacket with sealed seams and a packable hood.",
    specs: [
      "Wind-resistant, water-repellent shell fabric",
      "Fully sealed seams",
      "Packable hood that stows into the collar",
      "Zippered hand pockets and chest pocket",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [STEALTH_BLACK, NIGHT_NAVY],
  },
  {
    id: "field-crossbody-bag",
    name: "Field Crossbody Bag",
    category: "Accessories",
    price: 79,
    rating: 4.1,
    glyph: "backpack",
    description:
      "Compact crossbody bag with a quick-access magnetic flap and a webbing strap.",
    specs: [
      "Quick-access magnetic flap closure",
      "Adjustable webbing strap, worn cross-body or on the shoulder",
      "Interior organizer pocket for cards and cables",
      "Water-resistant base panel",
    ],
    colors: [STEALTH_BLACK, CRIMSON_RED],
  },
];

export const SEED_REVIEWS: ReviewSeed[] = [
  {
    id: "af1-stealth-runner-r1",
    productId: "af1-stealth-runner",
    author: "Daniela R.",
    rating: 5,
    date: "2 weeks ago",
    comment:
      "Fits true to size and the midsole holds up after weeks of daily wear. The reflective stripe actually catches headlights at night, not just a gimmick.",
  },
  {
    id: "af1-stealth-runner-r2",
    productId: "af1-stealth-runner",
    author: "Marcus T.",
    rating: 4,
    date: "1 month ago",
    comment:
      "Comfortable straight out of the box. Took off half a star only because the laces feel a touch thin for how often I'm tying these.",
  },
  {
    id: "recon-trainer-mid-r1",
    productId: "recon-trainer-mid",
    author: "Priya K.",
    rating: 5,
    date: "3 weeks ago",
    comment:
      "Ankle support is the standout here. Wore these on a gravel trail with no rolling or slipping.",
  },
  {
    id: "recon-trainer-mid-r2",
    productId: "recon-trainer-mid",
    author: "Femi A.",
    rating: 4,
    date: "2 months ago",
    comment:
      "Solid grip and the toe cap has already saved my feet a couple of times. Runs slightly narrow, consider going half a size up.",
  },
  {
    id: "tactical-tech-hoodie-r1",
    productId: "tactical-tech-hoodie",
    author: "Jordan B.",
    rating: 5,
    date: "1 week ago",
    comment:
      "The chest pocket is deep enough for a phone and keys without bouncing around. Fleece is warm without feeling heavy.",
  },
  {
    id: "tactical-tech-hoodie-r2",
    productId: "tactical-tech-hoodie",
    author: "Olamide S.",
    rating: 5,
    date: "5 weeks ago",
    comment:
      "Bought this in two colors. Hood stays put in wind, which is more than I can say for hoodies twice the price.",
  },
  {
    id: "pulse-wireless-earbuds-r1",
    productId: "pulse-wireless-earbuds",
    author: "Chinwe O.",
    rating: 4,
    date: "10 days ago",
    comment:
      "Noise cancelling is genuinely good on a commute. Battery life claim checks out, I'm getting close to a full work week between charges.",
  },
  {
    id: "pulse-wireless-earbuds-r2",
    productId: "pulse-wireless-earbuds",
    author: "Liam F.",
    rating: 5,
    date: "6 weeks ago",
    comment:
      "Transparency mode is the feature I didn't know I needed. Case fits in a jeans pocket without printing.",
  },
  {
    id: "cargo-utility-backpack-r1",
    productId: "cargo-utility-backpack",
    author: "Aisha M.",
    rating: 5,
    date: "4 days ago",
    comment:
      "Survived a week of rain during travel and everything inside stayed dry. Laptop sleeve fits a 16-inch machine with room for a charger.",
  },
  {
    id: "cargo-utility-backpack-r2",
    productId: "cargo-utility-backpack",
    author: "Tobi E.",
    rating: 5,
    date: "2 months ago",
    comment:
      "The webbing straps are the detail that sold me, clipped a tripod straight to the front panel for a shoot.",
  },
  {
    id: "aero-performance-tee-r1",
    productId: "aero-performance-tee",
    author: "Sade A.",
    rating: 4,
    date: "2 weeks ago",
    comment:
      "Light, breathable, and the seams really don't chafe even on longer runs. Wish it came in one more color.",
  },
  {
    id: "aero-performance-tee-r2",
    productId: "aero-performance-tee",
    author: "Ben C.",
    rating: 5,
    date: "1 month ago",
    comment:
      "My go-to gym tee now. Dries fast enough to wear back to back days while traveling.",
  },
  {
    id: "strike-low-sneaker-r1",
    productId: "strike-low-sneaker",
    author: "Nneka P.",
    rating: 4,
    date: "3 weeks ago",
    comment:
      "Lighter than I expected for the price. Great for all-day wear, wouldn't take these on a long run though.",
  },
  {
    id: "glide-performance-jacket-r1",
    productId: "glide-performance-jacket",
    author: "Kwame D.",
    rating: 5,
    date: "1 week ago",
    comment:
      "Cut wind on a motorcycle commute better than jackets twice the price. The packable hood is genuinely packable, not just marketing copy.",
  },
  {
    id: "field-crossbody-bag-r1",
    productId: "field-crossbody-bag",
    author: "Zainab H.",
    rating: 4,
    date: "5 weeks ago",
    comment:
      "Magnetic flap is convenient for quick access but I'd like a backup zip for peace of mind on crowded transit.",
  },
];
