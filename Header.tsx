"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-brand-red text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <span className="notch-sm flex h-9 w-9 items-center justify-center bg-ink font-display text-sm font-bold">
            BA
          </span>
          <span className="font-display text-base font-semibold leading-tight tracking-tight sm:text-lg">
            Black Airforce <span className="hidden sm:inline">Technologies</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 font-display text-sm font-medium uppercase tracking-wide md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-opacity hover:opacity-80"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative transition-opacity hover:opacity-80"
          >
            <CartIcon />
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-ink font-mono text-[11px]">
              {count}
            </span>
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="flex h-9 w-9 items-center justify-center md:hidden"
        >
          <MenuIcon open={open} />
        </button>
      </div>

      {open && (
        <div className="border-t border-white/20 px-4 pb-6 pt-2 md:hidden">
          <nav className="flex flex-col gap-4 font-display text-base font-medium uppercase tracking-wide">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Link href="/cart" onClick={() => setOpen(false)}>
              Cart ({count})
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path
        d="M3 4h2l2.4 12.4a1 1 0 0 0 1 .8h9.4a1 1 0 0 0 1-.8L21 8H6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="20" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="18" cy="20" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      {open ? (
        <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
      ) : (
        <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
      )}
    </svg>
  );
}
