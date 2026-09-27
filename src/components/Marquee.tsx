import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../lib/api';
const items = ['Wedding & Engagement', 'Haldi & Mehndi', 'Birthday Themes', 'Baby Showers', 'Stage & Entry', 'Flower Work', 'Corporate & Events'];
export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="bg-gradient-to-r from-[#d4af37] via-[#f3d97b] to-[#d4af37] py-3 overflow-hidden">
      <div className="flex gap-8 whitespace-nowrap animate-marquee w-max">
        {row.map((t, i) => (<span key={i} className="flex items-center gap-8 text-[#2a080f] font-display font-semibold text-sm uppercase tracking-widest">{t} <span className="text-[#8b1e3f]">+</span></span>))}
      </div>
    </div>
  );
}
export function InstaBanner() {
  return (
    <section className="bg-gradient-to-r from-[#833AB4] via-[#C13584] to-[#E1306C] py-10 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-white/80 text-xs uppercase tracking-[0.25em]">Daily decor ideas & behind the scenes</p>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1.5">Follow {INSTAGRAM_HANDLE} on Instagram</h3>
        </motion.div>
        <motion.a initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="shrink-0 inline-flex items-center gap-2 bg-white text-[#C13584] font-semibold rounded-full px-7 py-3 text-sm hover:scale-105 transition-transform shadow-xl"><Instagram size={18} /> Follow Now</motion.a>
      </div>
    </section>
  );
}
