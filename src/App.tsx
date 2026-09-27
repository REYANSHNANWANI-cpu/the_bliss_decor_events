import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import Reels from './components/Reels';
import Testimonials from './components/Testimonials';
import Booking from './components/Booking';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import Marquee, { InstaBanner } from './components/Marquee';
export default function App() {
  return (
    <div className="min-h-screen bg-[#FFF9F1] font-body antialiased">
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Gallery />
      <Reels />
      <InstaBanner />
      <Testimonials />
      <Booking />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
