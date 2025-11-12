export default function Footer() {
  return (
    <footer className="mt-24 border-t border-gold/20">
      <div className="mx-auto max-w-6xl px-4 py-10 grid md:grid-cols-3 gap-6">
        <div>
          <h4 className="font-display text-xl">DELI VERI</h4>
          <p className="text-deepgreen/80 mt-2">
            Via 00000b, Torino, Italy<br/> +39 000 111 2222<br/> hello@.example
          </p>
        </div>
        <div>
          <h4 className="font-display text-xl">Navigate</h4>
          <ul className="mt-2 space-y-1">
            <li><a className="link" href="#about">About us</a></li>
            <li><a className="link" href="#products">Products</a></li>
            <li><a className="link" href="#gallery">Gallery</a></li>
            <li><a className="link" href="#contact">Contact</a></li>
          </ul>
        </div>
        <div className="self-end md:text-right">
          <p className="text-deepgreen/70">© {new Date().getFullYear()} DELI VERI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
