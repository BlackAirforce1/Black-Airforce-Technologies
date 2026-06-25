import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import type { Product } from "@/lib/products";

export default function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-line bg-paper py-16 sm:py-20">
      <Container>
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-widest text-brand-red">
            You might also like
          </span>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Complete the kit.
          </h2>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <Reveal key={product.id} delay={index * 80}>
              <ProductCard product={product} showRating />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
