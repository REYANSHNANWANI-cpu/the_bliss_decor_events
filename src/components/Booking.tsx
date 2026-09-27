import { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck, Phone, MapPin, Clock, Instagram, MessageCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { apiPost, INSTAGRAM_URL, INSTAGRAM_HANDLE, whatsappLink, PHONE_DISPLAY } from '../lib/api';
const eventTypes = ['Wedding & Engagement', 'Haldi', 'Mehndi', 'Birthday', 'Baby Shower', 'Naming Ceremony', 'Corporate & Events', 'Other'];
const budgets = ['Under \u20B915,000', '\u20B915,000 - \u20B930,000', '\u20B930,000 - \u20B960,000', '\u20B960,000 - \u20B91,00,000', '\u20B91,00,000+'];
export default function Booking() {
  const [form, setForm] = useState({ name: '', phone: '', event_type: '', event_date: '', venue: '', guests: '', budget: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const set = (k: string, v: string) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: '' })); };
  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Please enter your name';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, '').slice(-10))) e.phone = 'Enter a valid 10-digit mobile number';
    if (!form.event_type) e.event_type = 'Please select event type';
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus('sending'); setErrorMsg('');
    try { await apiPost('/api/enquiries', form); setStatus('done'); }
    catch (err: any) { setStatus('error'); setErrorMsg(err.message || 'Something went wrong. Please try WhatsApp instead.'); }
  };
  const inputCls = (bad?: string) => `w-full bg-white border ${bad ? 'border-red-400' : 'border-gray-200'} rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/60 focus:border-[#d4af37] transition-all`;
  return (
    <section id="booking" className="bg-[#FFF9F1] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <p className="font-script text-[#b8912a] text-2xl sm:text-3xl">Get In Touch</p>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#2a080f] mt-2">Check Your Date & Get a Quote</h2>
          <p className="text-gray-500 mt-4 text-sm sm:text-base">Fill this 30-second form — we reply on WhatsApp/call within a few hours. Wedding season dates fill fast!</p>
        </div>
        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8 mt-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-3 bg-white rounded-3xl shadow-xl border border-[#d4af37]/20 p-6 sm:p-9">
            {status === 'done' ? (
              <div className="text-center py-10">
                <CheckCircle2 size={64} className="text-green-500 mx-auto" />
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#2a080f] mt-5">Dhanyavaad, {form.name.split(' ')[0]}!</h3>
                <p className="text-gray-500 mt-3 max-w-md mx-auto text-sm sm:text-base">Your enquiry is saved. Our team will call/WhatsApp you shortly to discuss your <strong>{form.event_type}</strong> celebration.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-7">
                  <a href={whatsappLink(`Namaskar! I just submitted an enquiry on your website for ${form.event_type}. My name is ${form.name}.`)} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white rounded-full px-7 py-3 text-sm font-semibold hover:brightness-105 transition-all"><MessageCircle size={17} /> Chat Now on WhatsApp</a>
                  <button onClick={() => { setStatus('idle'); setForm({ name: '', phone: '', event_type: '', event_date: '', venue: '', guests: '', budget: '', message: '' }); }} className="text-sm text-gray-500 underline underline-offset-4">Send another enquiry</button>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4" noValidate>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className="text-xs font-semibold uppercase tracking-widest text-gray-500">Your Name *</label><input className={inputCls(errors.name) + ' mt-1.5'} placeholder="e.g. Priya Patil" value={form.name} onChange={e => set('name', e.target.value)} />{errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}</div>
                  <div><label className="text-xs font-semibold uppercase tracking-widest text-gray-500">Mobile Number *</label><input className={inputCls(errors.phone) + ' mt-1.5'} placeholder="10-digit mobile" inputMode="numeric" value={form.phone} onChange={e => set('phone', e.target.value)} />{errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}</div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className="text-xs font-semibold uppercase tracking-widest text-gray-500">Event Type *</label><select className={inputCls(errors.event_type) + ' mt-1.5'} value={form.event_type} onChange={e => set('event_type', e.target.value)}><option value="">Select event...</option>{eventTypes.map(t => <option key={t} value={t}>{t}</option>)}</select>{errors.event_type && <p className="text-red-500 text-xs mt-1">{errors.event_type}</p>}</div>
                  <div><label className="text-xs font-semibold uppercase tracking-widest text-gray-500">Event Date</label><input type="date" className={inputCls() + ' mt-1.5'} value={form.event_date} onChange={e => set('event_date', e.target.value)} /></div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className="text-xs font-semibold uppercase tracking-widest text-gray-500">Venue / Area</label><input className={inputCls() + ' mt-1.5'} placeholder="e.g. Sangli, Vishrambag..." value={form.venue} onChange={e => set('venue', e.target.value)} /></div>
                  <div><label className="text-xs font-semibold uppercase tracking-widest text-gray-500">Guests (approx)</label><input type="number" min={1} className={inputCls() + ' mt-1.5'} placeholder="e.g. 200" value={form.guests} onChange={e => set('guests', e.target.value)} /></div>
                </div>
                <div><label className="text-xs font-semibold uppercase tracking-widest text-gray-500">Budget Range</label><div className="flex flex-wrap gap-2 mt-2">{budgets.map(b => (<button type="button" key={b} onClick={() => set('budget', b)} className={`px-4 py-2 rounded-full text-xs font-medium border transition-all ${form.budget === b ? 'bg-[#4a0e18] text-[#f3d97b] border-[#4a0e18]' : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-[#d4af37]'}`}>{b}</button>))}</div></div>
                <div><label className="text-xs font-semibold uppercase tracking-widest text-gray-500">Tell Us More</label><textarea rows={3} className={inputCls() + ' mt-1.5 resize-none'} placeholder="Colours you love, theme ideas, hall name..." value={form.message} onChange={e => set('message', e.target.value)} /></div>
                {status === 'error' && <p className="text-red-500 text-sm bg-red-50 rounded-xl px-4 py-2.5">{errorMsg}</p>}
                <button type="submit" disabled={status === 'sending'} className="w-full bg-gradient-to-r from-[#4a0e18] to-[#8b1e3f] text-[#f3d97b] rounded-full py-4 text-sm font-semibold uppercase tracking-widest hover:brightness-125 transition-all flex items-center justify-center gap-2 disabled:opacity-60">{status === 'sending' ? (<><Loader2 size={17} className="animate-spin" /> Sending...</>) : (<><CalendarCheck size={17} /> Request Callback & Quote</>)}</button>
                <p className="text-center text-xs text-gray-400">No spam, ever. We only call about your event.</p>
              </form>
            )}
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="lg:col-span-2 space-y-4">
            <div className="bg-[#4a0e18] rounded-3xl p-6 sm:p-7 text-white shadow-xl">
              <h3 className="font-display text-xl font-bold text-[#f3d97b]">Contact Directly</h3>
              <div className="mt-5 space-y-4 text-sm">
                <a href="tel:+918446569599" className="flex items-center gap-3 hover:text-[#f3d97b] transition-colors"><span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0"><Phone size={17} className="text-[#f3d97b]" /></span><span><strong>{PHONE_DISPLAY}</strong><br /><span className="text-white/60 text-xs">Call 10am - 9pm, all days</span></span></a>
                <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-[#f3d97b] transition-colors"><span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0"><Instagram size={17} className="text-[#f3d97b]" /></span><span><strong>{INSTAGRAM_HANDLE}</strong><br /><span className="text-white/60 text-xs">DM us — fastest response!</span></span></a>
                <div className="flex items-center gap-3"><span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0"><MapPin size={17} className="text-[#f3d97b]" /></span><span><strong>Sangli, Maharashtra 416416</strong><br /><span className="text-white/60 text-xs">Serving Miraj, Kupwad, Kolhapur, Satara</span></span></div>
                <div className="flex items-center gap-3"><span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0"><Clock size={17} className="text-[#f3d97b]" /></span><span><strong>Open All Days</strong><br /><span className="text-white/60 text-xs">Site visits by appointment</span></span></div>
              </div>
              <a href={whatsappLink('Namaskar! I found your website and want decor for my event in Sangli.')} target="_blank" rel="noreferrer" className="mt-6 flex items-center justify-center gap-2 bg-[#25D366] text-white rounded-full py-3 text-sm font-semibold hover:brightness-105 transition-all"><MessageCircle size={17} /> WhatsApp Us Now</a>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-lg border border-[#d4af37]/25 h-64">
              <iframe title="Sangli map" src="https://www.google.com/maps?q=Sangli,Maharashtra&output=embed" className="w-full h-full border-0" loading="lazy" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
