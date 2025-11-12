// src/components/AutoScrollGallery.tsx
"use client";

import { useEffect, useMemo, useRef } from "react";

type Item = { file: string; label?: string };

type Props = {
  items: Item[];
  /** Card height in px */
  height?: number;
  /** Full loop duration in seconds (lower = faster) */
  speedSec?: number;
  /** Gap between cards in px */
  gap?: number;
  /** Pause animation when hovering (desktop) */
  pauseOnHover?: boolean;
};

export default function AutoScrollGallery({
  items,
  height = 160,
  speedSec = 18,
  gap = 12,
  pauseOnHover = true,
}: Props) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const animRef = useRef<Animation | null>(null);

  // duplicate items for seamless loop
  const loop = useMemo(() => (items?.length ? [...items, ...items] : []), [items]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el || !items?.length) return;

    // cancel any previous animation
    animRef.current?.cancel();

    // translate distance = width of first half of the track
    const firstHalfWidth = el.scrollWidth / 2;

    // respect reduced motion
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const anim = el.animate(
      reduced
        ? [{ transform: "translateX(0)" }]
        : [
            { transform: "translateX(0)" },
            { transform: `translateX(-${firstHalfWidth}px)` },
          ],
      {
        duration: Math.max(4, speedSec) * 1000,
        iterations: Infinity,
        easing: "linear",
      }
    );

    animRef.current = anim;

    return () => anim.cancel();
  }, [items?.length, speedSec, gap]);

  // optional pause-on-hover (desktop)
  useEffect(() => {
    if (!pauseOnHover) return;
    const el = trackRef.current;
    const anim = animRef.current;
    if (!el || !anim) return;

    const onEnter = () => (anim.playbackRate = 0);
    const onLeave = () => (anim.playbackRate = 1);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [pauseOnHover]);

  if (!items?.length) return null;

  return (
    <section className="container" aria-label="Auto-scrolling gallery">
      <div className="relative overflow-hidden rounded-2xl border border-gold/20 bg-white/60 shadow">
        <div
          ref={trackRef}
          className="flex items-center select-none"
          style={{ gap: `${gap}px`, padding: `${gap}px` }}
        >
          {loop.map((it, i) => (
            <figure
              key={`${it.file}-${i}`}
              className="m-0 shrink-0 rounded-xl overflow-hidden border border-gold/20 bg-white"
              style={{
                height,
                width: Math.round((height * 4) / 3), // 4:3 ratio cards
              }}
              title={it.label || it.file}
            >
              <img
                src={`/gallery/${it.file}`}
                alt={it.label || it.file}
                className="h-full w-full object-cover"
                loading="lazy"
                draggable={false}
              />
              {it.label && (
                <figcaption className="px-2 py-1 text-xs text-deepgreen/80 bg-cream/80">
                  {it.label}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
