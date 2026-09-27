import { motion } from 'framer-motion';
import { Instagram, MapPin, Star, Sparkles, ChevronDown } from 'lucide-react';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../lib/api';
export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src="/images/hero-wedding.jpg" alt="Indian wedding mandap decoration" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1c0d12]/80 via-[#4a0e18]/60 to-[#1c0d12]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1c0d12]/70 via-transparent to-[#1c0d12]/40" />
      </div>
      <div className="absolute top-24 left-6 sm:left-16 opacity-30 animate-pulse"><Sparkles className="text-[#e8c766]" size={28} /></div>
      <div className="absolute top-1/3 right-8 sm:right-20 opacity-20 animate-bounce"><Sparkles className="text-[#f3d97b]" size={20} /></div>
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-28 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="inline-flex items-center gap-2 border border-[#d4af37]/50 bg-black/30 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
            <MapPin size={13} className="text-[#e8c766]" />
            <span className="text-xs tracking-[0.2em] uppercase text-[#f3d97b]">Sangli - Miraj - Kupwad - Kolhapur</span>
          </div>
          <p className="font-script text-[#f3d97b] text-2xl sm:text-3xl mb-2">Welcome to</p>
          <h1 className="font-display text-white text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight">The Bliss Decor<br /><span className="bg-gradient-to-r from-[#f3d97b] via-[#d4af37] to-[#f3d97b] bg-clip-text text-transparent">& Events</span></h1>
          <p className="mt-5 text-white/80 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">Sangli's most loved wedding & event decorators — dreamy mandaps, haldi-mehndi setups, birthdays & baby showers crafted with love, flowers & fairy lights.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#booking" className="w-full sm:w-auto bg-gradient-to-r from-[#d4af37] to-[#b8912a] text-[#2a080f] font-semibold rounded-full px-8 py-3.5 text-sm uppercase tracking-wider hover:brightness-110 hover:scale-105 transition-all shadow-xl shadow-amber-900/50">Check Dates & Book</a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-2 border border-white/30 bg-white/10 backdrop-blur-sm text-white rounded-full px-8 py-3.5 text-sm uppercase tracking-wider hover:bg-white/20 transition-all"><Instagram size={17} /> {INSTAGRAM_HANDLE}</a>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }} className="mt-10 flex items-center justify-center gap-6 sm:gap-10 text-white">
          <div><p className="font-display text-2xl sm:text-3xl font-bold text-[#f3d97b]">500+</p><p className="text-[11px] sm:text-xs text-white/60 uppercase tracking-widest mt-1">Events Decorated</p></div>
          <div className="w-px h-10 bg-white/20" />
          <div><p className="font-display text-2xl sm:text-3xl font-bold text-[#f3d97b] flex items-center gap-1 justify-center">4.9 <Star size={18} className="fill-[#f3d97b] text-[#f3d97b]" /></p><p className="text-[11px] sm:text-xs text-white/60 uppercase tracking-widest mt-1">Client Rating</p></div>
          <div className="w-px h-10 bg-white/20" />
          <div><p className="font-display text-2xl sm:text-3xl font-bold text-[#f3d97b]">5+ Yrs</p><p className="text-[11px] sm:text-xs text-white/60 uppercase tracking-widest mt-1">In Sangli</p></div>
        </motion.div>
      </div>
      <a href="#about" className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 hover:text-[#e8c766] transition-colors animate-bounce"><ChevronDown size={28} /></a>
    </section>
  );
}
