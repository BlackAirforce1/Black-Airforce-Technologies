import { NextRequest, NextResponse } from "next/server";
import { getAllProducts, getFeaturedProducts, type ProductSort } from "@/lib/server/products";
import type { Category } from "@/lib/products";

const VALID_CATEGORIES: Category[] = ["Footwear", "Apparel", "Accessories", "Wearables"];
const VALID_SORTS: ProductSort[] = ["featured", "popularity", "price-asc", "price-desc"];

function isCategory(value: string): value is Category {
  return (VALID_CATEGORIES as string[]).includes(value);
}

function isSort(value: string): value is ProductSort {
  return (VALID_SORTS as string[]).includes(value);
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  if (searchParams.get("featured") === "true") {
    return NextResponse.json({ products: getFeaturedProducts() });
  }

  const categories = searchParams.getAll("category").filter(isCategory);
  const minPriceParam = searchParams.get("minPrice");
  const maxPriceParam = searchParams.get("maxPrice");
  const sortParam = searchParams.get("sort");

  const products = getAllProducts({
    categories: categories.length > 0 ? categories : undefined,
    minPrice: minPriceParam ? Number(minPriceParam) : undefined,
    maxPrice: maxPriceParam ? Number(maxPriceParam) : undefined,
    sort: sortParam && isSort(sortParam) ? sortParam : undefined,
  });

  return NextResponse.json({ products });
}
