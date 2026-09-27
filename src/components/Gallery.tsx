import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X, Heart, MessageCircle, Mail, Instagram } from 'lucide-react';
import { apiGet, INSTAGRAM_URL, whatsappLink, gmailLink, CONTACT_EMAIL } from '../lib/api';
type Item = { id: number; title: string; category: string; image_url: string; event_type: string; location: string; likes: number };
const cats = [
  { label: 'All', match: 'All' },
  { label: 'Wedding & Engagement', match: 'Wedding' },
  { label: 'Haldi & Mehndi', match: 'Haldi & Mehndi' },
  { label: 'Birthday', match: 'Birthday' },
  { label: 'Baby Shower', match: 'Baby Shower' },
  { label: 'Corporate & Events', match: 'Corporate' },
];
export default function Gallery() {
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [cat, setCat] = useState('All');
  const [lightbox, setLightbox] = useState<Item | null>(null);
  useEffect(() => {
    apiGet('/api/gallery')
      .then(d => setAllItems(d))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);
  const norm = (s: string) => s.toLowerCase();
  const catMatch = (item: Item) => {
    if (cat === 'All') return true;
    const c = norm(item.category || '');
    const t = norm(item.event_type || '');
    const active = cats.find(x => x.label === cat);
    if (!active) return true;
    if (active.match === 'Wedding') return c.includes('wedding') || t.includes('wedding') || c.includes('engagement') || t.includes('engagement');
    if (active.match === 'Corporate') return c.includes('corporat') || t.includes('corporat');
    return c.includes(norm(active.match)) || t.includes(norm(active.match));
  };
  const items = allItems.filter(catMatch);
  const contactMsg = (item: Item) => `Namaskar! I loved your "${item.title}" ${item.event_type} decor photo on your website. I want similar decor for my event.`;
  return (
    <section id="gallery" className="bg-[#FFF9F1] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <p className="font-script text-[#b8912a] text-2xl sm:text-3xl">Our Portfolio</p>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#2a080f] mt-2">Real Events, Real Bliss</h2>
          <p className="text-gray-500 mt-4 text-sm sm:text-base">A glimpse of our recent setups across Sangli, Miraj & Kolhapur. Tap any photo to view it big.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {cats.map(c => (
            <button key={c.label} onClick={() => setCat(c.label)} className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${cat === c.label ? 'bg-[#4a0e18] text-[#f3d97b] shadow-lg' : 'bg-white text-gray-600 border border-gray-200 hover:border-[#d4af37]'}`}>{c.label}</button>
          ))}
        </div>
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mt-10">{[1,2,3,4,5,6,7,8].map(i => <div key={i} className="h-56 sm:h-72 rounded-2xl bg-[#4a0e18]/5 animate-pulse" />)}</div>
        ) : items.length === 0 ? (
          <p className="text-center text-gray-400 mt-12">No photos in this category yet — check our Instagram for more!</p>
        ) : (
          <motion.div layout className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mt-10">
            <AnimatePresence>
              {items.map(item => (
                <motion.div key={item.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} onClick={() => setLightbox(item)} className="group relative rounded-2xl overflow-hidden cursor-pointer h-56 sm:h-72 shadow-md hover:shadow-2xl transition-shadow">
                  <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                    <p className="text-white font-semibold text-xs sm:text-sm">{item.title}</p>
                    <p className="text-white/60 text-[10px] sm:text-xs flex items-center gap-1 mt-1"><MapPin size={11} />{item.location}</p>
                  </div>
                  <span className="absolute top-2.5 right-2.5 bg-black/50 backdrop-blur-sm text-white text-[10px] sm:text-xs px-2.5 py-1 rounded-full flex items-center gap-1"><Heart size={11} className="fill-red-400 text-red-400" />{item.likes}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
        <div className="text-center mt-10">
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#833AB4] via-[#C13584] to-[#E1306C] text-white rounded-full px-8 py-3 text-sm font-semibold hover:opacity-90 hover:scale-105 transition-all shadow-lg">View 500+ Photos on Instagram</a>
        </div>
      </div>
      {lightbox && (
        <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto" onClick={() => setLightbox(null)}>
          <div className="relative max-w-3xl w-full" onClick={e => e.stopPropagation()}>
            <img src={lightbox.image_url} alt={lightbox.title} className="w-full max-h-[70vh] object-contain rounded-2xl" />
            <div className="mt-3 flex items-center justify-between text-white gap-3">
              <div><p className="font-semibold">{lightbox.title}</p><p className="text-white/60 text-sm">{lightbox.event_type} - {lightbox.location}</p></div>
              <button onClick={() => setLightbox(null)} className="p-2 bg-white/10 rounded-full hover:bg-white/20 shrink-0"><X size={20} /></button>
            </div>
            <div className="mt-4 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4">
              <p className="text-white/80 text-xs uppercase tracking-widest font-semibold text-center">Love this look? Contact us</p>
              <div className="mt-3 grid sm:grid-cols-3 gap-2.5">
                <a href={whatsappLink(contactMsg(lightbox))} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-[#25D366] text-white rounded-full py-2.5 text-xs sm:text-sm font-semibold hover:brightness-110 transition-all"><MessageCircle size={16} /> Contact on WhatsApp</a>
                <a href={gmailLink(`Decor Enquiry — ${lightbox.title}`, `Namaskar!\n\nI loved your "${lightbox.title}" ${lightbox.event_type} decor photo on your website and want similar decor for my event.\n\nMy name:\nMy phone:\nEvent date:\n`)} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-white text-gray-800 rounded-full py-2.5 text-xs sm:text-sm font-semibold hover:bg-gray-100 transition-all"><Mail size={16} className="text-[#C13584]" /> Contact with Gmail</a>
                <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#833AB4] via-[#C13584] to-[#E1306C] text-white rounded-full py-2.5 text-xs sm:text-sm font-semibold hover:opacity-90 transition-all"><Instagram size={16} /> Contact on Instagram</a>
              </div>
              <p className="text-white/40 text-[11px] text-center mt-2.5">WhatsApp: +91 84465 69599 • Gmail: {CONTACT_EMAIL}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
