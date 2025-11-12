"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#about", label: "About us" },
  { href: "#products", label: "Products" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);

  // lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <>
      {LINKS.map(({ href, label }) => {
        const isHash = href.startsWith("#");
        const full = isHash ? `${pathname.split("#")[0]}${href}` : href;
        return (
          <Link
            key={href}
            href={full}
            onClick={onClick}
            className="px-3 py-2 text-sm tracking-wide uppercase hover:text-gold"
          >
            {label}
          </Link>
        );
      })}
    </>
  );

  return (
    // Use a Fragment because we now have two top-level elements
    <>
      <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur border-b border-gold/20">
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-display text-2xl">
            DELI VERI
          </Link>

          <nav className="hidden md:flex items-center">
            <NavLinks />
          </nav>

          <button
            className="md:hidden"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <Menu />
          </button>
        </div>
      </header>

      {/* --- Mobile drawer is now OUTSIDE the header --- */}
      {/* This fixes the z-index stacking problem */}
      <div
        className={[
          "md:hidden fixed inset-0 z-[60] transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        aria-hidden={!open}
        onClick={() => setOpen(false)} // click backdrop to close
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

        {/* Drawer panel (clicks shouldn't bubble to backdrop) */}
        <aside
          className={[
            "absolute right-0 top-0 h-full w-80 max-w-[85%] bg-cream border-l border-gold/20 shadow-2xl",
            "transition-transform duration-300 ease-out",
            open ? "translate-x-0" : "translate-x-full",
            "flex flex-col",
          ].join(" ")}
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-4 h-14 border-b border-gold/20">
            <span className="font-display text-xl">Menu</span>
            <button aria-label="Close menu" onClick={() => setOpen(false)}>
              <X />
            </button>
          </div>

          {/* This nav element uses flex-1 to fill the remaining vertical space */}
          <nav className="px-4 py-4 flex flex-col flex-1">
            <NavLinks onClick={() => setOpen(false)} />
          </nav>
        </aside>
      </div>
    </>
  );
}