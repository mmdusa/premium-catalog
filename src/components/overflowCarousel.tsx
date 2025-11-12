"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Item = { file: string; label?: string };

export default function SideThumbCarousel({
  items = [
    { file: "lion.jpg", label: "Lion" },
    { file: "elephant.jpg", label: "Asiatic elephant" },
    { file: "cockatoo.jpg", label: "Black cockatoo" },
    { file: "camel.jpg", label: "Dromedary" },
    { file: "polar-bear.jpg", label: "Polar bear" },
    { file: "zebra.jpg", label: "Grévy’s zebra" },
    { file: "cheetah.jpg", label: "Cheetah" },
  ],

  // Layout
  maxWidth = 1280,    // total stage width
  mainWidth = 820,    // left big image width
  mainHeight = 480,   // left big image height
  thumbSize = 118,    // square thumbnail size (px)
  thumbCols = 2,      // columns in the right grid
  thumbGap = 6,       // gap between thumbs (px)

  // Behavior
  intervalMs = 3000,  // autoplay interval
  fadeMs = 600,       // cross-fade duration
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

  intervalMs?: number;
  fadeMs?: number;
  showArrows?: boolean;
  autoplay?: boolean;
}) {
  const slides = useMemo(() => items, [items]);
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  const next = () => setIdx((i) => (i + 1) % slides.length);
  const prev = () => setIdx((i) => (i - 1 + slides.length) % slides.length);

  // autoplay
  useEffect(() => {
    if (!autoplay || paused || slides.length <= 1) return;
    timerRef.current = window.setInterval(next, intervalMs) as unknown as number;
    return () => { if (timerRef.current) window.clearInterval(timerRef.current); };
  }, [autoplay, paused, intervalMs, slides.length]);

  // next thumbnails (tight grid on the right)
  const visibleThumbs = Math.max(2, thumbCols * Math.max(2, Math.floor(mainHeight / (thumbSize + thumbGap))));
  const thumbIndices = useMemo(
    () => Array.from({ length: Math.min(visibleThumbs, Math.max(0, slides.length - 1)) }, (_, t) => (idx + 1 + t) % slides.length),
    [idx, slides.length, visibleThumbs]
  );

  return (
    <section className="pt-10" aria-label="Side thumbnails gallery">
      <div
        className="relative rounded-2xl border border-gold/20 bg-white/60 overflow-visible shadow"
        style={{ maxWidth }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* 2-column grid stage: LEFT main, RIGHT thumbs — left-aligned */}
        <div
          className="grid items-center"
          style={{
            gridTemplateColumns: `${mainWidth}px auto`,
            gap: "12px",
            padding: "12px",
          }}
        >
          {/* LEFT: big fading slide (left-aligned) */}
          <div className="relative rounded-xl overflow-hidden border border-gold/20 bg-white" style={{ width: mainWidth, height: mainHeight }}>
            {slides.map((s, i) => {
              const active = i === idx;
              return (
                <figure
                  key={i}
                  className="absolute inset-0 m-0"
                  aria-hidden={!active}
                  style={{
                    opacity: active ? 1 : 0,
                    transition: `opacity ${fadeMs}ms ease`,
                  }}
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

          {/* RIGHT: tight grid of upcoming photos, aligned to the right side */}
          <div
            className="grid content-start"
            style={{
              gridTemplateColumns: `repeat(${thumbCols}, ${thumbSize}px)`,
              gap: `${thumbGap}px`,
              paddingRight: "8px",
            }}
          >
            {thumbIndices.map((ti, k) => {
              const s = slides[ti];
              const isNext = k === 0; // first upcoming
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
                  {/* subtle dark overlay for non-next thumbs */}
                  {!isNext && <span className="absolute inset-0 bg-black/10" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
