"use client";

import { useCallback, useEffect, useMemo, useRef, useState, CSSProperties } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Item = { file: string; label?: string };

export default function SideThumbCarousel({
  items = [
    { file: "lion.jpg", label: "Lion" },
    { file: "elephant.jpg", label: "Asiatic elephant" },
    { file: "cockatoo.jpg", label: "Black cockatoo" },
    { file: "camel.jpg", label: "Dromedary" },
    { file: "polar-bear.jpg", label: "Polar bear" },
  ],

  /* Desktop layout (md and up) */
  maxWidth = 1280,
  mainWidth = 900, // desired max width for main image
  mainHeight = 520,
  thumbSize = 110,
  thumbCols = 2,
  thumbGap = 6,

  /* Mobile layout (under md) */
  mobileAspect = 16 / 9,
  mobileThumbSize = 82,
  mobileThumbGap = 8, // (kept for API symmetry)

  /* Behavior */
  intervalMs = 3000,
  fadeMs = 600,
  showArrows = true,
  autoplay = true,
}: {
  items?: Item[];

  maxWidth?: number;
  mainWidth?: number;
  mainHeight?: number;
  thumbSize?: number;
  thumbCols?: number;
  thumbGap?: number;

  mobileAspect?: number;
  mobileThumbSize?: number;
  mobileThumbGap?: number;

  intervalMs?: number;
  fadeMs?: number;
  showArrows?: boolean;
  autoplay?: boolean;
}) {
  const slides = useMemo(() => items, [items]);
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  const next = useCallback(() => {
    setIdx((i) => (i + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setIdx((i) => (i - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // autoplay
  useEffect(() => {
    if (!autoplay || paused || slides.length <= 1) return;
    timerRef.current = window.setInterval(next, intervalMs) as unknown as number;
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [autoplay, paused, slides.length, intervalMs, next]);

  // RIGHT grid thumbnails (desktop)
  const visibleThumbs = Math.max(
    2,
    thumbCols * Math.max(2, Math.floor(mainHeight / (thumbSize + thumbGap)))
  );
  const rightThumbIndices = useMemo(
    () =>
      Array.from(
        { length: Math.min(visibleThumbs, Math.max(0, slides.length - 1)) },
        (_, t) => (idx + 1 + t) % slides.length
      ),
    [idx, slides.length, visibleThumbs]
  );

  // MOBILE: list of thumbs (exclude current)
  const mobileThumbIndices = useMemo(
    () => slides.map((_, i) => i).filter((i) => i !== idx),
    [idx, slides.length]
  );

  // Fixed sidebar width & clamped main width (prevents big gaps)
  const sidebarWidth = thumbCols * thumbSize + (thumbCols - 1) * thumbGap;
  const clampedMainWidth = `clamp(520px, 62vw, ${mainWidth}px)`;

  return (
    <section className="pt-10" aria-label="Gallery with side thumbnails">
      <h2 className="heading text-center">Gallery</h2>

      {/* DESKTOP / TABLET */}
      <div
        className="hidden md:block mx-auto mt-8 relative rounded-2xl border border-gold/20 bg-white/60 overflow-visible shadow"
        style={{ maxWidth }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Two fixed columns: [clamped main] [fixed sidebar] */}
        <div
          className="grid items-start justify-items-start"
          style={{
            gridTemplateColumns: `${clampedMainWidth} ${sidebarWidth}px`,
            columnGap: "12px",
            rowGap: "12px",
            padding: "12px",
          }}
        >
          {/* LEFT big image */}
          <div
            className="relative rounded-xl overflow-hidden border border-gold/20 bg-white w-full"
            style={{ height: mainHeight }}
          >
            {slides.map((s, i) => {
              const active = i === idx;
              return (
                <figure
                  key={i}
                  className="absolute inset-0 m-0"
                  aria-hidden={!active}
                  style={{ opacity: active ? 1 : 0, transition: `opacity ${fadeMs}ms ease` }}
                >
                  <img
                    src={`/gallery/${s.file}`}
                    alt={s.label || s.file}
                    className="h-full w-full object-cover"
                    loading={active ? "eager" : "lazy"}
                  />
                  {s.label && (
                    <figcaption className="absolute inset-x-0 bottom-0 bg-black/35 backdrop-blur-sm text-cream px-4 py-2 text-sm">
                      {s.label}
                    </figcaption>
                  )}
                </figure>
              );
            })}

            {showArrows && slides.length > 1 && (
              <>
                <button
                  aria-label="Previous"
                  onClick={prev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 hover:bg-black/55 p-2 text-cream"
                >
                  <ChevronLeft />
                </button>
                <button
                  aria-label="Next"
                  onClick={next}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 hover:bg-black/55 p-2 text-cream"
                >
                  <ChevronRight />
                </button>
              </>
            )}
          </div>

          {/* RIGHT: fixed-width tight grid of upcoming photos */}
          <div
            className="grid content-start"
            style={{
              width: `${sidebarWidth}px`,
              gridTemplateColumns: `repeat(${thumbCols}, ${thumbSize}px)`,
              gap: `${thumbGap}px`,
              paddingRight: "4px",
            }}
          >
            {rightThumbIndices.map((ti, k) => {
              const s = slides[ti];
              const isNext = k === 0;
              return (
                <button
                  key={`${ti}-${k}`}
                  onClick={() => setIdx(ti)}
                  className={`relative rounded-md overflow-hidden border shadow focus:outline-none focus:ring-2 focus:ring-gold/50 ${
                    isNext ? "border-gold" : "border-gold/20"
                  }`}
                  style={{ width: thumbSize, height: thumbSize }}
                  title={s.label || s.file}
                >
                  <img
                    src={`/gallery/${s.file}`}
                    alt={s.label || s.file}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  {!isNext && <span className="absolute inset-0 bg-black/10" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div
        className="md:hidden mx-auto mt-6 relative rounded-2xl border border-gold/20 bg-white/60 overflow-hidden shadow w-full"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="relative w-full" style={{ paddingTop: `${100 / (mobileAspect || 16 / 9)}%` }}>
          {slides.map((s, i) => {
            const active = i === idx;
            return (
              <figure
                key={i}
                className="absolute inset-0 m-0"
                aria-hidden={!active}
                style={{ opacity: active ? 1 : 0, transition: `opacity ${fadeMs}ms ease` }}
              >
                <img
                  src={`/gallery/${s.file}`}
                  alt={s.label || s.file}
                  className="h-full w-full object-cover"
                  loading={active ? "eager" : "lazy"}
                />
                {s.label && (
                  <figcaption className="absolute inset-x-0 bottom-0 bg-black/35 backdrop-blur-sm text-cream px-3 py-1.5 text-xs">
                    {s.label}
                  </figcaption>
                )}
              </figure>
            );
          })}

          {showArrows && slides.length > 1 && (
            <>
              <button
                aria-label="Previous"
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 hover:bg-black/55 p-2 text-cream"
              >
                <ChevronLeft />
              </button>
              <button
                aria-label="Next"
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 hover:bg-black/55 p-2 text-cream"
              >
                <ChevronRight />
              </button>
            </>
          )}
        </div>

        {/* Horizontal thumbs */}
        <div className="relative px-2 py-3">
          <div className="overflow-x-auto no-scrollbar">
            <ul
              className="flex gap-2 w-max pr-2"
              style={{ scrollSnapType: "x mandatory" as CSSProperties["scrollSnapType"] }}
            >
              {mobileThumbIndices.map((ti) => {
                const s = slides[ti];
                return (
                  <li
                    key={ti}
                    className="shrink-0"
                    style={{ scrollSnapAlign: "start" as CSSProperties["scrollSnapAlign"] }}
                  >
                    <button
                      onClick={() => setIdx(ti)}
                      className="relative rounded-md overflow-hidden border border-gold/30 shadow"
                      style={{ width: mobileThumbSize, height: mobileThumbSize }}
                      title={s.label || s.file}
                    >
                      <img
                        src={`/gallery/${s.file}`}
                        alt={s.label || s.file}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute inset-0 bg-black/10" />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
