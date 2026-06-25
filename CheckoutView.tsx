"use client";

import { useState, type FormEvent, type InputHTMLAttributes } from "react";
import Link from "next/link";
import Container from "@/components/Container";
import { useCart } from "@/context/CartContext";
import { calculateOrderTotals } from "@/lib/pricing";

export default function CheckoutView() {
  const { items, subtotal, refreshCart } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [confirmationEmail, setConfirmationEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { shipping, tax, total } = calculateOrderTotals(subtotal);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    // Only the shipping/contact fields are sent. The card fields below are a
    // placeholder UI, no payment processor is wired up yet, so nothing from
    // that section is read or transmitted here.
    const payload = {
      email: String(formData.get("email") ?? ""),
      firstName: String(formData.get("firstName") ?? ""),
      lastName: String(formData.get("lastName") ?? ""),
      address: String(formData.get("address") ?? ""),
      apartment: String(formData.get("apartment") ?? ""),
      city: String(formData.get("city") ?? ""),
      state: String(formData.get("state") ?? ""),
      postalCode: String(formData.get("postalCode") ?? ""),
      country: String(formData.get("country") ?? ""),
      phone: String(formData.get("phone") ?? ""),
    };

    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error ?? "We couldn't place your order. Please try again.");
      }

      setConfirmationEmail(payload.email);
      setOrderNumber(data.orderNumber);
      await refreshCart();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (orderNumber) {
    return (
      <Container className="py-20 sm:py-28">
        <div className="notch mx-auto flex max-w-xl flex-col items-center gap-4 bg-paper py-16 text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-red">
            Order confirmed
          </span>
          <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            Thanks, your order is in.
          </h1>
          <p className="font-mono text-sm text-steel">Order {orderNumber}</p>
          <p className="max-w-sm text-sm text-steel">
            {confirmationEmail
              ? `A confirmation has been sent to ${confirmationEmail}.`
              : "A confirmation email is on its way."}
          </p>
          <Link
            href="/shop"
            className="notch-sm mt-2 bg-brand-red px-6 py-3 font-display text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-brand-red-dark"
          >
            Continue shopping
          </Link>
        </div>
      </Container>
    );
  }

  if (items.length === 0) {
    return (
      <Container className="py-20 sm:py-28">
        <div className="notch flex flex-col items-center gap-4 bg-paper py-20 text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-red">
            Checkout
          </span>
          <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            Your cart is empty.
          </h1>
          <p className="max-w-sm text-sm text-steel">
            Add something to your cart before checking out.
          </p>
          <Link
            href="/shop"
            className="notch-sm mt-2 bg-brand-red px-6 py-3 font-display text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-brand-red-dark"
          >
            Browse the shop
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-12 sm:py-16">
      <div className="border-b border-line pb-8">
        <span className="font-mono text-xs uppercase tracking-widest text-brand-red">
          Checkout
        </span>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Complete your order
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]"
      >
        <div className="flex flex-col gap-10">
          <section className="flex flex-col gap-4">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-ink">
              Contact
            </h2>
            <Field label="Email" name="email" type="email" autoComplete="email" required />
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-ink">
              Shipping address
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <Field label="First name" name="firstName" autoComplete="given-name" required />
              <Field label="Last name" name="lastName" autoComplete="family-name" required />
            </div>
            <Field label="Address" name="address" autoComplete="address-line1" required />
            <Field
              label="Apartment, suite, etc. (optional)"
              name="apartment"
              autoComplete="address-line2"
            />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <Field label="City" name="city" autoComplete="address-level2" required />
              <Field
                label="State / region"
                name="state"
                autoComplete="address-level1"
                required
              />
              <Field
                label="Postal code"
                name="postalCode"
                autoComplete="postal-code"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Country" name="country" autoComplete="country-name" required />
              <Field label="Phone" name="phone" type="tel" autoComplete="tel" required />
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-ink">
              Payment
            </h2>
            <Field label="Name on card" name="cardName" autoComplete="cc-name" required />
            <Field
              label="Card number"
              name="cardNumber"
              inputMode="numeric"
              autoComplete="cc-number"
              maxLength={19}
              placeholder="0000 0000 0000 0000"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <Field
                label="Expiry"
                name="cardExpiry"
                autoComplete="cc-exp"
                placeholder="MM / YY"
                maxLength={7}
                required
              />
              <Field
                label="CVC"
                name="cardCvc"
                inputMode="numeric"
                autoComplete="cc-csc"
                maxLength={4}
                required
              />
            </div>
          </section>
        </div>

        <aside className="notch flex h-fit flex-col gap-4 bg-paper p-6 lg:sticky lg:top-24">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-ink">
            Order summary
          </h2>

          <ul className="flex flex-col gap-3">
            {items.map((item) => (
              <li
                key={`${item.id}-${item.variant ?? "default"}`}
                className="flex items-start justify-between gap-3 text-sm"
              >
                <div>
                  <p className="text-ink">
                    {item.name} <span className="text-steel">x{item.quantity}</span>
                  </p>
                  {item.variant && <p className="text-xs text-steel">{item.variant}</p>}
                </div>
                <span className="shrink-0 font-mono text-ink">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <dl className="flex flex-col gap-2 border-t border-line pt-4 text-sm">
            <div className="flex items-center justify-between text-steel">
              <dt>Subtotal</dt>
              <dd className="font-mono text-ink">${subtotal.toFixed(2)}</dd>
            </div>
            <div className="flex items-center justify-between text-steel">
              <dt>Shipping</dt>
              <dd className="font-mono text-ink">
                {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
              </dd>
            </div>
            <div className="flex items-center justify-between text-steel">
              <dt>Estimated tax</dt>
              <dd className="font-mono text-ink">${tax.toFixed(2)}</dd>
            </div>
          </dl>

          <div className="flex items-center justify-between border-t border-line pt-4">
            <span className="font-display text-sm font-semibold uppercase tracking-wide text-ink">
              Total
            </span>
            <span className="font-mono text-lg font-medium text-ink">
              ${total.toFixed(2)}
            </span>
          </div>

          {error && (
            <p role="alert" className="text-sm text-brand-red">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="notch-sm flex items-center justify-center bg-brand-red px-6 py-3.5 font-display text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-brand-red-dark disabled:opacity-60"
          >
            {submitting ? "Placing order..." : "Place order"}
          </button>
        </aside>
      </form>
    </Container>
  );
}

function Field({
  label,
  className = "",
  ...props
}: { label: string; className?: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="font-mono text-[11px] uppercase tracking-wide text-steel">
        {label}
      </span>
      <input
        {...props}
        className="border border-line bg-paper px-3 py-2.5 text-sm text-ink focus-visible:border-brand-red"
      />
    </label>
  );
}
