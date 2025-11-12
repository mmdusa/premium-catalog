"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ContactForm from "@/components/ContactForm";
import AutoScrollGallery from "@/components/AutoScrollGallery"; // ← auto-scrolling row (local images)
import ProductCard from "@/components/ProductCard";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />

        {/* AUTO-SCROLL GALLERY (uses /public/gallery/* files) */}
        <AutoScrollGallery
          items={[
            { file: "lion.jpg" },
            { file: "elephant.jpg" },
            { file: "cockatoo.jpg" },
            { file: "camel.jpg" },
            { file: "polar-bear.jpg" },
          ]}
          height={160}   // card height (px)
          speedSec={18}  // lower = faster (e.g., 12)
        />

        {/* ABOUT */}
        <section id="about" className="container">
          <div className="mx-auto max-w-4xl text-center space-y-6">
            <h2 className="heading">About Us</h2>
            <p className="body">
              NICHE FOOD ITALIAN PRODUCTS DISTRIBUTION (WE SEARCH, TEST EVERY
              PRODUCT IN OUR OFFER AND WE ALSO TAKE CARE OF ALL THE LOGISTIC
              PART)) - TAILORED OFFERS/EXPERIENCE (IF YOU NEED SOME THIS
              SPECIFIC JUST TELL US AND WE’LL FIND WHAT YOU NEED FROM ITALY),
              MIXED PALLETS (YOU DON’T NEED TO ORDER ONE PALLET PER PRODUCER BUT
              YOU CAN MIX UP TO 4 SUPPLIERS ON ONE PALLET AND WE’LL TAKE CARE
              OF EVERYTHING).
            </p>
          </div>
        </section>

        {/* PRODUCTS */}
<section id="products" className="container space-y-10">
  <h2 className="heading text-center">Products</h2>

  <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
    {[
      {
        title: "Piccolo Norcino",
        origin: "Umbria, IT",
        badge: "Artisanal",
        img: "/images/prod1.jpg",
        notes: ["Salame", "Natural casing", "Gentle spice"],
        pricePerKg: "63,40 zł/kg",
        ref: "REF. 217",
        pack: "25 sztuk / pudełko",
        weight: "180 g – 200 g",
        description:
          "Typowa salami z Norcii w naturalnej osłonce. Oryginalna receptura, przekazywana z pokolenia na pokolenie przez mistrzów wędliniarstwa. Średnio mielona, wyrazisty smak.",
      },
      {
        title: "Pecorino Toscano",
        origin: "Toscana, IT",
        badge: "DOP",
        img: "/images/prod2.jpg",
        notes: ["Sheep’s milk", "Nutty", "Aged 6–12m"],
        pricePerKg: "€24.90/kg",
        ref: "REF. 402",
        pack: "8 wheels / carton",
        weight: "1.6–2.0 kg",
        description:
          "Classic Pecorino Toscano DOP with balanced sweetness and a clean, nutty finish. Great for boards and grating.",
      },
      {
        title: "Salame Felino",
        origin: "Emilia-Romagna, IT",
        badge: "IGP",
        img: "/images/prod3.jpg",
        notes: ["Slow cure", "Delicate spice", "Silky"],
        pricePerKg: "€22.50/kg",
        ref: "REF. 311",
        pack: "12 pcs / carton",
        weight: "700–800 g",
        description:
          "Traditional Felino IGP — fine grind, gentle pepper and wine aromatics. Silk-like texture, excellent sliceability.",
      },
    ].map((p, i) => (
      <ProductCard key={i} product={p} />
    ))}
  </div>
</section>




        {/* CONTACT */}
        <section id="contact" className="container">
          <h2 className="heading text-center">Contact</h2>
          <div className="mx-auto max-w-3xl">
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
