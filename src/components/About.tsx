import { motion } from 'framer-motion';
import { Heart, Flower2, Truck, BadgeCheck } from 'lucide-react';
import { INSTAGRAM_URL } from '../lib/api';
const points = [
  { icon: Flower2, title: 'Fresh Flowers, Every Time', text: 'Daily-sourced marigold, roses & orchids from Sangli & Kolhapur markets.' },
  { icon: Heart, title: 'Made For Your Story', text: 'Every setup is customised — your colours, your traditions, your budget.' },
  { icon: Truck, title: 'Sangli + Nearby Cities', text: 'We travel across Miraj, Kupwad, Kolhapur, Satara, Karad & Belgaum.' },
  { icon: BadgeCheck, title: 'End-to-End Management', text: 'Decor, lighting, entry, stage, mandap — one team, zero stress.' },
];
export default function About() {
  return (
    <section id="about" className="bg-[#FFF9F1] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
          <div className="grid grid-cols-2 gap-4">
            <img src="/images/about-1.jpg" alt="Haldi decor" className="rounded-2xl object-cover h-64 sm:h-80 w-full shadow-xl" />
            <img src="/images/about-2.jpg" alt="Birthday decor" className="rounded-2xl object-cover h-64 sm:h-80 w-full shadow-xl mt-8" />
          </div>
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-[#4a0e18] text-white rounded-2xl px-6 py-3 shadow-xl flex items-center gap-3 whitespace-nowrap">
            <span className="font-display text-2xl font-bold text-[#f3d97b]">500+</span>
            <span className="text-xs uppercase tracking-widest text-white/80">Happy Families<br />in Sangli</span>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="font-script text-[#b8912a] text-2xl sm:text-3xl">Our Story</p>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#2a080f] mt-2 leading-tight">We Turn Sangli Celebrations Into <span className="text-[#8b1e3f]">Blissful Memories</span></h2>
          <p className="mt-5 text-gray-600 leading-relaxed text-sm sm:text-base"><strong className="text-[#2a080f]">The Bliss Decor & Events</strong> started with one simple dream — to give Sangli weddings the grand, Pinterest-worthy decor of big cities, at honest local prices. From intimate haldi mornings to 1000-guest wedding stages, our team designs, builds and manages everything so you can simply enjoy your big day.</p>
          <p className="mt-3 text-gray-600 leading-relaxed text-sm sm:text-base">Follow our daily work, behind-the-scenes reels and client transformations on Instagram — new decor ideas posted every week!</p>
          <div className="mt-7 grid sm:grid-cols-2 gap-4">
            {points.map(p => (
              <div key={p.title} className="flex gap-3 bg-white rounded-xl p-4 shadow-sm border border-[#d4af37]/20">
                <div className="w-10 h-10 shrink-0 rounded-full bg-[#4a0e18] flex items-center justify-center"><p.icon size={18} className="text-[#f3d97b]" /></div>
                <div><p className="font-semibold text-[#2a080f] text-sm">{p.title}</p><p className="text-xs text-gray-500 mt-1 leading-relaxed">{p.text}</p></div>
              </div>
            ))}
          </div>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-7 text-sm font-semibold text-[#8b1e3f] hover:text-[#4a0e18] underline underline-offset-4 decoration-[#d4af37]">See our latest work on Instagram</a>
        </motion.div>
      </div>
    </section>
  );
}
