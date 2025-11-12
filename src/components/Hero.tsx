export default function Hero() {
  return (
    <section
      className="relative z-10 h-[70vh] min-h-[780px] flex items-end" // <-- Add z-10 here
      style={{
        backgroundImage: "url('/images/hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      aria-label="Hero"
    >
      <div className="absolute inset-0 bg-deepgreen/50 mix-blend-multiply" />

      {/* bottom-left content */}
      <div className="relative w-full max-w-2xl pl-6 md:pl-10 pb-10 text-cream">
        <h1 className="font-display text-5xl md:text-6xl leading-tight">
          DELI VERI <span className="text-gold">Experience</span>
        </h1>
        <p className="mt-4 max-w-xl text-cream/90">
          WE SOURCE LIKE LOCALS, WE DELIVER LIKE PROS
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#products" className="btn">Explore our products</a>
          <a href="#contact" className="btn-outline">Request catalog</a>
        </div>
      </div>
    </section>
  );
}
