import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, BadgeCheck } from 'lucide-react';
import { apiGet } from '../lib/api';
type T = { id: number; name: string; location: string; rating: number; message: string; event_type: string; date_text: string };
export default function Testimonials() {
  const [list, setList] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [idx, setIdx] = useState(0);
  useEffect(() => { apiGet('/api/testimonials').then(d => setList(d)).catch(console.error).finally(() => setLoading(false)); }, []);
  const next = () => setIdx(i => (list.length ? (i + 1) % list.length : 0));
  const prev = () => setIdx(i => (list.length ? (i - 1 + list.length) % list.length : 0));
  useEffect(() => { if (list.length < 2) return; const t = setInterval(next, 6000); return () => clearInterval(t); }, [list.length]);
  const avg = list.length ? (list.reduce((a, b) => a + b.rating, 0) / list.length).toFixed(1) : '4.9';
  return (
    <section id="reviews" className="bg-[#1c0d12] py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center">
          <p className="font-script text-[#e8c766] text-2xl sm:text-3xl">Client Love</p>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white mt-2">Families Trust The Bliss</h2>
          <div className="inline-flex items-center gap-2 mt-4 bg-white/5 border border-white/10 rounded-full px-5 py-2">
            <div className="flex">{[1,2,3,4,5].map(s => <Star key={s} size={15} className="fill-[#f3d97b] text-[#f3d97b]" />)}</div>
            <span className="text-white text-sm font-semibold">{avg} / 5</span>
            <span className="text-white/50 text-xs">- {list.length || '100'}+ verified reviews</span>
          </div>
        </div>
        {loading ? (<div className="h-64 mt-10 rounded-3xl bg-white/5 animate-pulse" />) : list.length > 0 ? (
          <div className="relative mt-10">
            <motion.div key={idx} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45 }} className="bg-white/[0.05] border border-white/10 rounded-3xl p-7 sm:p-10 text-center backdrop-blur-sm">
              <Quote size={36} className="text-[#d4af37]/50 mx-auto" />
              <p className="text-white/90 text-base sm:text-xl leading-relaxed mt-4 font-light italic">&quot;{list[idx].message}&quot;</p>
              <div className="flex justify-center gap-1 mt-5">{Array.from({ length: list[idx].rating }).map((_, s) => <Star key={s} size={16} className="fill-[#f3d97b] text-[#f3d97b]" />)}</div>
              <p className="text-white font-display font-semibold text-lg mt-3">{list[idx].name}</p>
              <p className="text-white/50 text-xs uppercase tracking-widest mt-1 flex items-center justify-center gap-1.5"><BadgeCheck size={13} className="text-[#d4af37]" /> {list[idx].event_type} - {list[idx].location} - {list[idx].date_text}</p>
            </motion.div>
            <div className="flex items-center justify-center gap-4 mt-6">
              <button onClick={prev} className="p-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"><ChevronLeft size={20} /></button>
              <div className="flex gap-2">{list.map((_, i) => (<button key={i} onClick={() => setIdx(i)} className={`h-2 rounded-full transition-all ${i === idx ? 'w-8 bg-[#d4af37]' : 'w-2 bg-white/25 hover:bg-white/40'}`} />))}</div>
              <button onClick={next} className="p-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"><ChevronRight size={20} /></button>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
