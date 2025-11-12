"use client";

type Item = { file: string; title?: string; subtitle?: string };

const items: Item[] = [
  { file: "lion.jpg", title: "Lion", subtitle: "Panthera leo" },
  { file: "elephant.jpg", title: "Asiatic elephant", subtitle: "Elephas maximus" },
  { file: "cockatoo.jpg", title: "Black cockatoo", subtitle: "Calyptorhynchus banksii" },
  { file: "camel.jpg", title: "Dromedary", subtitle: "Camelus dromedarius" },
  { file: "polar-bear.jpg", title: "Polar bear", subtitle: "Ursus maritimus" },
  { file: "zebra.jpg", title: "Grévy’s zebra", subtitle: "Equus grevyi" },
  { file: "cheetah.jpg", title: "Cheetah", subtitle: "Acinonyx jubatus" },
];

export default function CircularGallery() {
  const n = items.length;
  return (
    <section className="circ container" aria-label="Circular mini gallery" style={{ ["--n" as any]: n }}>
      <div className="circ-stage">
        {items.map((it, i) => (
          <article className="circ-card" key={i} style={{ ["--i" as any]: i }}>
            <figure>
              <img src={`/gallery/${it.file}`} alt={it.title || it.file} loading="lazy" />
              <figcaption>
                <h3>{it.title || it.file}</h3>
                {it.subtitle && <em>{it.subtitle}</em>}
              </figcaption>
            </figure>
          </article>
        ))}
      </div>

      <style jsx>{`
        .circ { --size: min(70vw, 28rem); --radius: calc(var(--size) * 0.46); }
        .circ .circ-stage { position: relative; margin-inline: auto; width: var(--size); height: var(--size); perspective: 1200px; transform-style: preserve-3d; }
        .circ .circ-card { --j: calc(var(--i) / var(--n)); position: absolute; inset: 0; transform-style: preserve-3d; transform: rotateY(calc(var(--j) * 1turn)) translateZ(var(--radius)); }
        .circ figure { display: grid; grid-template-rows: 1fr auto; width: 12rem; height: 16rem; overflow: hidden; border-radius: .75rem; background: #ffffffcc; border: 1px solid rgba(0,0,0,.08); box-shadow: 0 10px 25px rgba(0,0,0,.15); backface-visibility: hidden; }
        .circ img { width: 100%; height: 100%; object-fit: cover; }
        .circ figcaption { padding: .5rem .75rem; background: rgba(255,255,255,.7); backdrop-filter: blur(4px); }
        .circ figcaption h3 { margin: 0; font-weight: 600; }
        .circ figcaption em { font-style: normal; opacity: .75; font-size: .9em; }
        .circ .circ-card:hover { transform: translateZ(var(--radius)) rotateY(calc(var(--j) * 1turn)) scale(1.03); transition: transform .25s ease; }
        @media (max-width: 768px) {
          .circ .circ-stage { width: 100%; max-width: 100%; overflow-x: auto; display: flex; gap: .75rem; perspective: none; height: auto; }
          .circ .circ-card { position: relative; inset: auto; transform: none; }
          .circ figure { width: 11rem; height: 14rem; }
        }
      `}</style>
    </section>
  );
}
