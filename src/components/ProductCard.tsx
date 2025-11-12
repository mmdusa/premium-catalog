"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

export type Product = {
  title: string;
  img: string;
  origin?: string;
  badge?: "DOP" | "IGP" | "STG" | "Artisanal" | string;
  notes?: string[];
  pricePerKg?: string;
  ref?: string;
  pack?: string;
  weight?: string;
  description?: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const p = product;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const badgeClass = (b?: string) =>
    b === "DOP"
      ? "bg-[#fff7e6] border-[#e6b800]/40"
      : b === "IGP"
      ? "bg-[#e6fff3] border-[#00a36c]/30"
      : b === "STG"
      ? "bg-[#eef2ff] border-[#4f46e5]/30"
      : "bg-cream/90 border-gold/40";

  return (
    <>
      {/* CARD */}
      <article
        className="group relative overflow-hidden rounded-3xl border border-gold/20 bg-white shadow-sm
                   transition-all duration-300 hover:shadow-xl"
      >
        {/* BIGGER image on card: taller on mobile, generous on desktop */}
        <div className="relative aspect-[4/3] md:aspect-[3/2] overflow-hidden">
          <img
            src={p.img}
            alt={p.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {p.badge && (
              <span
                className={`rounded-full px-3 py-1 text-[11px] uppercase tracking-wide border ${badgeClass(
                  p.badge
                )}`}
              >
                {p.badge}
              </span>
            )}
            {p.origin && (
              <span className="rounded-full bg-cream/90 border border-gold/40 px-3 py-1 text-[11px] uppercase tracking-wide">
                {p.origin}
              </span>
            )}
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
        </div>

        <div className="p-6">
          <h3 className="font-display text-2xl tracking-tight">{p.title}</h3>

          {p.notes?.length ? (
            <ul className="mt-3 flex flex-wrap gap-2">
              {p.notes.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-gold/30 bg-cream/70 px-3 py-1 text-xs text-deepgreen/80"
                >
                  {t}
                </li>
              ))}
            </ul>
          ) : null}

          <div className="my-5 h-px bg-gradient-to-r from-gold/30 via-gold/10 to-transparent" />

          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm
                         bg-deepgreen text-cream hover:bg-deepgreen/90 transition"
            >
              View product
            </button>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm
                         border border-gold/40 text-deepgreen hover:bg-cream/70 transition"
            >
              Request catalog
            </a>
          </div>
        </div>
      </article>

      {/* MODAL */}
      {open && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center"
          aria-modal="true"
          role="dialog"
          onClick={() => setOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

          {/* Panel:
              - mobile: full-screen sheet (rounded-none), scroll inside
              - md+: centered, rounded, 2 columns
           */}
          <div
            className="relative w-full h-[100dvh] md:h-auto md:max-h-[90dvh] md:w-[min(100%,64rem)]
                       bg-cream border border-gold/30 shadow-2xl overflow-hidden
                       md:rounded-3xl rounded-none"
            onClick={(e) => e.stopPropagation()}
            style={{
              // safe area padding for iOS notches on mobile full-screen
              paddingTop: "env(safe-area-inset-top)",
              paddingBottom: "env(safe-area-inset-bottom)",
            }}
          >
            {/* Sticky header (works nicely on mobile) */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-4 md:px-7 py-3 md:py-4 border-b border-gold/20 bg-white/80 backdrop-blur">
              <div className="flex flex-col">
                <h3 className="font-display text-xl md:text-3xl tracking-tight text-deepgreen">
                  {p.title}
                </h3>
                {p.pricePerKg && (
                  <span className="text-sm md:text-base font-semibold text-[#2d315a]">
                    {p.pricePerKg}
                  </span>
                )}
              </div>
              <button
                aria-label="Close"
                className="rounded-full p-2 hover:bg-cream"
                onClick={() => setOpen(false)}
              >
                <X />
              </button>
            </div>

            {/* Body: scrollable on mobile */}
            <div className="md:grid md:grid-cols-2 md:gap-0 h-[calc(100%-3.25rem)] md:h-auto overflow-y-auto">
              {/* IMAGE SIDE:
                  - mobile: tall image ~56vh
                  - desktop: full cover
               */
              }
              <div className="relative md:aspect-auto">
                <div className="relative h-[56dvh] md:h-full">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* DETAILS SIDE */}
              <div className="p-5 md:p-7 space-y-5">
                {p.description && (
                  <p className="text-deepgreen/80 leading-relaxed">{p.description}</p>
                )}

                <div className="h-px bg-gold/20" />

                <dl className="grid grid-cols-2 gap-y-3 text-deepgreen/90">
                  {p.ref && (
                    <>
                      <dt className="font-semibold tracking-wide text-[#2d315a]">REF.</dt>
                      <dd>{p.ref}</dd>
                    </>
                  )}
                  {p.pack && (
                    <>
                      <dt className="font-semibold tracking-wide text-[#2d315a]">Pack</dt>
                      <dd>{p.pack}</dd>
                    </>
                  )}
                  {p.weight && (
                    <>
                      <dt className="font-semibold tracking-wide text-[#2d315a]">Weight</dt>
                      <dd>{p.weight}</dd>
                    </>
                  )}
                  {p.origin && (
                    <>
                      <dt className="font-semibold tracking-wide text-[#2d315a]">Origin</dt>
                      <dd>{p.origin}</dd>
                    </>
                  )}
                  {p.badge && (
                    <>
                      <dt className="font-semibold tracking-wide text-[#2d315a]">Badge</dt>
                      <dd>{p.badge}</dd>
                    </>
                  )}
                </dl>

                {p.notes?.length ? (
                  <>
                    <div className="h-px bg-gold/20" />
                    <div className="flex flex-wrap gap-2">
                      {p.notes.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-cream/80 border border-gold/30 px-3 py-1 text-xs"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </>
                ) : null}

                <div className="pt-2 pb-1">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm
                               bg-deepgreen text-cream hover:bg-deepgreen/90 transition"
                    onClick={() => setOpen(false)}
                  >
                    Request trade sheet
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
