import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Crown, MessageCircle } from 'lucide-react';
import { apiGet, formatINR, whatsappLink } from '../lib/api';
type Pkg = { id: number; name: string; price: number; description: string; features: string[]; ideal_for: string; popular: boolean };
export default function Packages() {
  const [pkgs, setPkgs] = useState<Pkg[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { apiGet('/api/packages').then(d => setPkgs(d)).catch(console.error).finally(() => setLoading(false)); }, []);
  return (
    <section id="packages" className="bg-[#FFF9F1] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <p className="font-script text-[#b8912a] text-2xl sm:text-3xl">Honest Pricing</p>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#2a080f] mt-2">Packages For Sangli Budgets</h2>
          <p className="text-gray-500 mt-4 text-sm sm:text-base">Transparent starting prices. Final quote depends on venue size, flowers & dates — always confirmed on WhatsApp before booking.</p>
        </div>
        {loading ? (
          <div className="grid md:grid-cols-3 gap-6 mt-12">{[1,2,3].map(i => <div key={i} className="h-[480px] rounded-3xl bg-[#4a0e18]/5 animate-pulse" />)}</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6 mt-12 items-stretch">
            {pkgs.map((p, idx) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }} className={`relative rounded-3xl p-7 sm:p-8 flex flex-col ${p.popular ? 'bg-[#4a0e18] text-white shadow-2xl shadow-red-950/30 scale-[1.02] border-2 border-[#d4af37]' : 'bg-white text-[#2a080f] shadow-lg border border-[#d4af37]/25'}`}>
                {p.popular && (<span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#d4af37] to-[#b8912a] text-[#2a080f] text-[11px] font-bold uppercase tracking-widest px-5 py-1.5 rounded-full flex items-center gap-1.5 whitespace-nowrap"><Crown size={13} /> Most Popular</span>)}
                <h3 className={`font-display text-2xl font-bold ${p.popular ? 'text-[#f3d97b]' : 'text-[#4a0e18]'}`}>{p.name}</h3>
                <p className={`text-xs uppercase tracking-widest mt-1 ${p.popular ? 'text-white/60' : 'text-gray-400'}`}>{p.ideal_for}</p>
                <div className="mt-4 flex items-end gap-1.5">
                  <span className={`text-xs mb-2 ${p.popular ? 'text-white/60' : 'text-gray-400'}`}>starting</span>
                  <span className="font-display text-4xl sm:text-5xl font-bold">{formatINR(p.price)}</span>
                </div>
                <p className={`text-sm mt-3 leading-relaxed ${p.popular ? 'text-white/70' : 'text-gray-500'}`}>{p.description}</p>
                <ul className="mt-6 space-y-2.5 flex-1">
                  {(p.features || []).map((f, i) => (
                    <li key={i} className={`flex items-start gap-2.5 text-sm ${p.popular ? 'text-white/85' : 'text-gray-600'}`}><span className={`w-5 h-5 shrink-0 rounded-full flex items-center justify-center mt-0.5 ${p.popular ? 'bg-[#d4af37] text-[#2a080f]' : 'bg-[#4a0e18] text-[#f3d97b]'}`}><Check size={12} strokeWidth={3} /></span>{f}</li>
                  ))}
                </ul>
                <a href={whatsappLink(`Namaskar! I'm interested in the "${p.name}" package (${formatINR(p.price)}) for my event in Sangli. Please share details.`)} target="_blank" rel="noreferrer" className={`mt-7 flex items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold uppercase tracking-widest transition-all ${p.popular ? 'bg-gradient-to-r from-[#d4af37] to-[#b8912a] text-[#2a080f] hover:brightness-110' : 'bg-[#4a0e18] text-[#f3d97b] hover:bg-[#2a080f]'}`}><MessageCircle size={16} /> Get This Package</a>
              </motion.div>
            ))}
          </div>
        )}
        <div className="mt-10 grid sm:grid-cols-3 gap-4 text-center">
          {[{ t: 'Free Venue Visit', d: 'In Sangli, Miraj & Kupwad city limits' },{ t: 'Custom Combos', d: 'Haldi + Wedding + Reception bundles save 15%' },{ t: 'Easy Advance', d: 'Only 30% advance to lock your date' }].map(x => (
            <div key={x.t} className="bg-white rounded-2xl border border-[#d4af37]/25 px-5 py-4"><p className="font-display font-bold text-[#4a0e18]">{x.t}</p><p className="text-xs text-gray-500 mt-1">{x.d}</p></div>
          ))}
        </div>
      </div>
    </section>
  );
}
