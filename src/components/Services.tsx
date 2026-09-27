import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { apiGet, formatINR, whatsappLink } from '../lib/api';
type Service = { id: number; title: string; description: string; image_url: string; price_from: number; includes: string[]; featured: boolean };
export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { apiGet('/api/services').then(d => setServices(d)).catch(console.error).finally(() => setLoading(false)); }, []);
  return (
    <section id="services" className="bg-[#1c0d12] py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <p className="font-script text-[#e8c766] text-2xl sm:text-3xl">What We Do</p>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white mt-2">Decor For Every Celebration</h2>
          <p className="text-white/60 mt-4 text-sm sm:text-base">From Maharashtrian weddings to modern birthdays — pick a service or let us bundle everything for you.</p>
        </div>
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">{[1,2,3,4,5,6].map(i => <div key={i} className="h-96 rounded-2xl bg-white/5 animate-pulse" />)}</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {services.map((s, idx) => (
              <motion.div key={s.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }} className="group bg-white/[0.04] border border-white/10 hover:border-[#d4af37]/50 rounded-2xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-950/40">
                <div className="relative h-52 overflow-hidden">
                  <img src={s.image_url} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c0d12] via-transparent to-transparent" />
                  {s.featured && <span className="absolute top-3 left-3 bg-[#d4af37] text-[#2a080f] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Most Booked</span>}
                  <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-[#f3d97b] text-xs font-semibold px-3 py-1.5 rounded-full">from {formatINR(s.price_from)}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl font-semibold text-white">{s.title}</h3>
                  <p className="text-white/60 text-sm mt-2 leading-relaxed line-clamp-2">{s.description}</p>
                  <ul className="mt-4 space-y-1.5">{(s.includes || []).slice(0, 3).map((inc, i) => (<li key={i} className="flex items-center gap-2 text-xs text-white/70"><Check size={13} className="text-[#d4af37] shrink-0" />{inc}</li>))}</ul>
                  <a href={whatsappLink(`Namaskar! I want to enquire about ${s.title} decor in Sangli.`)} target="_blank" rel="noreferrer" className="mt-5 flex items-center justify-center gap-2 w-full border border-[#d4af37]/40 text-[#f3d97b] rounded-full py-2.5 text-xs font-semibold uppercase tracking-widest hover:bg-[#d4af37] hover:text-[#2a080f] transition-all">Enquire on WhatsApp <ArrowRight size={14} /></a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
