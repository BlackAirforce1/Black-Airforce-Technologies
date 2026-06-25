import { Suspense } from "react";
import ShopView from "@/components/shop/ShopView";
import { getAllProducts } from "@/lib/server/products";

export const dynamic = "force-dynamic";

export default function ShopPage() {
  const products = getAllProducts();

  return (
    <Suspense fallback={null}>
      <ShopView initialProducts={products} />
    </Suspense>
  );
}
