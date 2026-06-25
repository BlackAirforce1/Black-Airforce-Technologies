import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="font-display text-lg font-semibold text-ink">
              Black Airforce Technologies
            </span>
            <p className="mt-3 max-w-xs text-sm text-steel">
              Precision-built tech and gear, made to perform.
            </p>
          </div>

          <FooterColumn
            title="Shop"
            links={[
              { href: "/shop", label: "All products" },
              { href: "/cart", label: "Cart" },
              { href: "/checkout", label: "Checkout" },
            ]}
          />
          <FooterColumn
            title="Company"
            links={[
              { href: "/", label: "About" },
              { href: "/", label: "Contact" },
            ]}
          />
          <FooterColumn
            title="Support"
            links={[
              { href: "/", label: "Shipping" },
              { href: "/", label: "Returns" },
            ]}
          />
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-xs text-steel sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Black Airforce Technologies. All rights reserved.</p>
          <p className="font-mono">Built for performance.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ink">
        {title}
      </h3>
      <ul className="mt-4 space-y-2 text-sm text-steel">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="transition-colors hover:text-ink">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
