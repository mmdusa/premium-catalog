"use client";

type Item = { file: string; name?: string };

// Put your local file names here (in /public/gallery)
const items: Item[] = [
  { file: "lion.jpg" },
  { file: "elephant.jpg" },
  { file: "cockatoo.jpg" },
  { file: "camel.jpg" },
  { file: "polar-bear.jpg" },
  { file: "waterbuck.jpg" },
  { file: "panda.jpg" },
  { file: "zebra.jpg" },
  { file: "cheetah.jpg" },
];

function displayName(file: string, fallback?: string) {
  if (fallback) return fallback;
  return file
    .replace(/\.[^.]+$/, "")         // remove file extension
    .replace(/[-_]+/g, " ")          // - or _ → space
    .replace(/\b\w/g, (m) => m.toUpperCase()); // Title Case
}

export default function MiniGallery() {
  return (
    <section id="sample-gallery" className="container pt-10">
      <h2 className="heading text-center">Gallery</h2>

      {/* horizontal strip with snap */}
      <div className="mt-8 overflow-x-auto no-scrollbar">
        <ul className="flex gap-4 w-max snap-x snap-mandatory pr-4">
          {items.map((it, i) => {
            const src = `/gallery/${it.file}`;
            const name = displayName(it.file, it.name);

            return (
              <li
                key={i}
                className="snap-start shrink-0 w-64 md:w-72 lg:w-80 relative rounded-xl overflow-hidden border border-gold/20 shadow"
                title={name}
              >
                <img
                  src={src}
                  alt={name}
                  className="block w-full h-48 md:h-56 lg:h-60 object-cover transition-transform duration-700 hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 p-3 bg-black/30 backdrop-blur-sm">
                  <p className="text-cream text-sm md:text-base font-medium leading-tight">
                    {name}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
