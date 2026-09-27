import { Instagram, Phone, MapPin, Heart, MessageCircle } from 'lucide-react';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE, whatsappLink, PHONE_DISPLAY } from '../lib/api';
export default function Footer() {
  return (
    <footer className="bg-[#140910] text-white pt-14 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#d4af37] via-[#f3d97b] to-[#9c7c1e] flex items-center justify-center"><span className="font-display text-[#4a0e18] font-bold text-xl">B</span></div>
              <div className="leading-tight"><p className="font-display text-lg font-semibold">The Bliss Decor</p><p className="text-[10px] tracking-[0.3em] uppercase text-[#e8c766]">& Events Sangli</p></div>
            </div>
            <p className="text-white/50 text-sm mt-4 leading-relaxed">Sangli's trusted wedding & event decor studio. Mandaps, haldi setups, birthdays, baby showers & more — designed with love.</p>
            <div className="flex gap-2.5 mt-5">
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-pink-600 flex items-center justify-center transition-all" aria-label="Instagram"><Instagram size={18} /></a>
              <a href={whatsappLink('Namaskar! I want decor for my event.')} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#25D366] flex items-center justify-center transition-all" aria-label="WhatsApp"><MessageCircle size={18} /></a>
              <a href="tel:+918446569599" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#d4af37] hover:text-[#2a080f] flex items-center justify-center transition-all" aria-label="Call"><Phone size={18} /></a>
            </div>
          </div>
          <div>
            <p className="font-display font-semibold text-[#f3d97b] uppercase tracking-widest text-sm">Explore</p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/60">
              {[['About Us', '#about'], ['Gallery', '#gallery'], ['Reels', '#reels'], ['Reviews', '#reviews'], ['Book Now', '#booking']].map(([t, h]) => (<li key={h}><a href={h} className="hover:text-[#f3d97b] transition-colors">{t}</a></li>))}
            </ul>
          </div>
          <div>
            <p className="font-display font-semibold text-[#f3d97b] uppercase tracking-widest text-sm">We Decorate</p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/60">{['Wedding & Engagement', 'Haldi & Mehndi Decor', 'Birthday & Theme Parties', 'Baby Shower & Naming', 'Corporate & Events', 'Stage & Entry Decor'].map(s => <li key={s}>{s}</li>)}</ul>
          </div>
          <div>
            <p className="font-display font-semibold text-[#f3d97b] uppercase tracking-widest text-sm">Reach Us</p>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              <li className="flex gap-2.5"><MapPin size={16} className="shrink-0 mt-0.5 text-[#d4af37]" /> Sangli, Maharashtra 416416</li>
              <li className="flex gap-2.5"><Phone size={16} className="shrink-0 mt-0.5 text-[#d4af37]" /> {PHONE_DISPLAY}</li>
              <li className="flex gap-2.5"><Instagram size={16} className="shrink-0 mt-0.5 text-[#d4af37]" /> {INSTAGRAM_HANDLE}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-10 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
          <p>© 2026 The Bliss Decor & Events, Sangli. All rights reserved.</p>
          <p className="flex items-center gap-1">Crafted with <Heart size={12} className="fill-[#E1306C] text-[#E1306C]" /> in Sangli, Maharashtra</p>
        </div>
      </div>
    </footer>
  );
}
