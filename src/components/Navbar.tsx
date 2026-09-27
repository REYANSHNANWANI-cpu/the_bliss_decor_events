import { useState, useEffect } from 'react';
import { Menu, X, Instagram, Phone } from 'lucide-react';
import { INSTAGRAM_URL, PHONE_DISPLAY } from '../lib/api';
const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reels', href: '#reels' },
  { label: 'Reviews', href: '#reviews' },
];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#1c0d12]/95 backdrop-blur-md shadow-lg shadow-black/30' : 'bg-gradient-to-b from-black/70 to-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 sm:h-20">
        <a href="#home" className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#d4af37] via-[#f3d97b] to-[#9c7c1e] flex items-center justify-center shadow-lg shadow-amber-900/40">
            <span className="font-display text-[#4a0e18] font-bold text-xl">B</span>
          </div>
          <div className="leading-tight">
            <p className="font-display text-white text-base sm:text-lg font-semibold tracking-wide">The Bliss Decor</p>
            <p className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#e8c766]">& Events Sangli</p>
          </div>
        </a>
        <nav className="hidden lg:flex items-center gap-7">
          {links.map(l => (<a key={l.href} href={l.href} className="text-[13px] font-medium tracking-wide text-white/80 hover:text-[#e8c766] transition-colors uppercase">{l.label}</a>))}
        </nav>
        <div className="hidden lg:flex items-center gap-3">
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-white/80 hover:text-white border border-white/25 hover:border-[#e8c766] rounded-full px-4 py-2 transition-all"><Instagram size={15} /> Follow Us</a>
          <a href="#booking" className="text-xs font-semibold bg-gradient-to-r from-[#d4af37] to-[#b8912a] text-[#2a080f] rounded-full px-5 py-2.5 hover:brightness-110 transition-all shadow-lg shadow-amber-900/40 uppercase tracking-wide">Book Now</a>
        </div>
        <button className="lg:hidden text-white p-2" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X size={24} /> : <Menu size={24} />}</button>
      </div>
      {open && (
        <div className="lg:hidden bg-[#1c0d12] border-t border-white/10 px-6 py-5 space-y-1">
          {links.map(l => (<a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-2.5 text-white/85 hover:text-[#e8c766] font-medium border-b border-white/5">{l.label}</a>))}
          <div className="flex gap-3 pt-4">
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 text-sm text-white border border-white/25 rounded-full px-4 py-2.5"><Instagram size={16} /> Instagram</a>
            <a href="#booking" onClick={() => setOpen(false)} className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold bg-[#d4af37] text-[#2a080f] rounded-full px-4 py-2.5"><Phone size={16} /> Book Now</a>
          </div>
          <p className="text-center text-white/50 text-xs pt-3">{PHONE_DISPLAY}</p>
        </div>
      )}
    </header>
  );
}
