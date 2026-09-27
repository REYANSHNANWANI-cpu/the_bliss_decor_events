import { MessageCircle } from 'lucide-react';
import { whatsappLink } from '../lib/api';
export default function WhatsAppFloat() {
  return (
    <a href={whatsappLink('Namaskar! I want to enquire about event decor in Sangli.')} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" className="fixed bottom-5 right-5 z-50 group flex items-center gap-2">
      <span className="hidden sm:block bg-white text-gray-700 text-xs font-medium px-3.5 py-2 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Chat with us!</span>
      <span className="relative w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
        <MessageCircle size={26} className="text-white relative" />
      </span>
    </a>
  );
}
