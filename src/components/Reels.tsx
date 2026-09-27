import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Eye, Instagram, ChevronLeft, ChevronRight, Clapperboard } from 'lucide-react';
import { apiGet, INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../lib/api';
type Reel = { id: number; title: string; thumbnail_url: string; instagram_url: string; views: string; duration: string };
export default function Reels() {
  const [reels, setReels] = useState<Reel[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => { apiGet('/api/reels').then(d => setReels(d)).catch(console.error).finally(() => setLoading(false)); }, []);
  const scroll = (dir: number) => { scrollRef.current?.scrollBy({ left: dir * 300, behavior: 'smooth' }); };
  return (
    <section id="reels" className="bg-gradient-to-b from-[#1c0d12] via-[#2a0f18] to-[#1c0d12] py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#C13584]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#d4af37]/10 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="font-script text-[#e8c766] text-2xl sm:text-3xl flex items-center gap-2"><Clapperboard size={22} /> Watch Our Work</p>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-white mt-2">Trending Reels on Instagram</h2>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-3 text-sm text-white/70 hover:text-white"><Instagram size={16} className="text-[#E1306C]" /> {INSTAGRAM_HANDLE} — follow for daily decor ideas</a>
          </div>
          <div className="flex gap-2">
            <button onClick={() => scroll(-1)} className="p-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"><ChevronLeft size={20} /></button>
            <button onClick={() => scroll(1)} className="p-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"><ChevronRight size={20} /></button>
          </div>
        </div>
        {loading ? (
          <div className="flex gap-5 mt-10 overflow-hidden">{[1,2,3,4].map(i => <div key={i} className="w-56 h-80 shrink-0 rounded-2xl bg-white/5 animate-pulse" />)}</div>
        ) : (
          <div ref={scrollRef} className="flex gap-4 sm:gap-5 mt-10 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
            {reels.map((r, idx) => (
              <motion.a key={r.id} href={r.instagram_url} target="_blank" rel="noreferrer" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.08 }} className="group relative shrink-0 w-52 sm:w-60 h-80 sm:h-96 rounded-2xl overflow-hidden snap-start border border-white/10 hover:border-[#E1306C]/60 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-pink-950/50">
                <img src={r.thumbnail_url} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#E1306C]/80 transition-all"><Play size={22} className="text-white fill-white ml-1" /></div>
                </div>
                <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 rounded-full">{r.duration}</span>
                <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1"><Eye size={11} />{r.views}</span>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white text-sm font-semibold leading-snug">{r.title}</p>
                  <p className="text-[#f3d97b] text-xs mt-1.5 font-medium">Watch on Instagram</p>
                </div>
              </motion.a>
            ))}
          </div>
        )}
        <div className="mt-8 bg-white/[0.04] border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-4 justify-between">
          <p className="text-white/70 text-sm text-center sm:text-left">Our reels show <strong className="text-white">full transformations</strong> — empty hall to dream venue in 30 seconds. New reel every week!</p>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="shrink-0 inline-flex items-center gap-2 bg-gradient-to-r from-[#833AB4] via-[#C13584] to-[#E1306C] text-white rounded-full px-6 py-2.5 text-sm font-semibold hover:opacity-90 transition-all"><Instagram size={16} /> Follow {INSTAGRAM_HANDLE}</a>
        </div>
      </div>
    </section>
  );
}
