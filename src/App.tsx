import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { RouteStrip } from './components/RouteStrip';
import { Stats } from './components/Stats';
import { TwoPathSplit } from './components/TwoPathSplit';
import { HowItWorks } from './components/HowItWorks';
import { VisualBreak } from './components/VisualBreak';
import { BookingForm } from './components/BookingForm';
import { DriverForm } from './components/DriverForm';
import { Footer } from './components/Footer';
import { FadeUp } from './components/FadeUp';

export function App() {
  return (
    <div className="min-h-screen bg-[#ECE6DD] text-[#1a1f1b] flex flex-col font-['Inter'] antialiased selection:bg-[#F4B400] selection:text-[#6c5000]">
      <Header />

      <main className="flex-grow">
        {/* 1. Hero — animated truck + gradient buttons */}
        <Hero />

        {/* 2. Route Strip — animated sequential arrows */}
        <RouteStrip />

        {/* 3. Stats — count-up animation */}
        <FadeUp>
          <Stats />
        </FadeUp>

        {/* 4. Two-path split — bg: white */}
        <FadeUp>
          <TwoPathSplit />
        </FadeUp>

        {/* 5. How It Works — bg: light gray, stagger cards */}
        <FadeUp>
          <HowItWorks />
        </FadeUp>

        {/* 6. Visual break — full-bleed image */}
        <VisualBreak />

        {/* 7. Section 1: Book a Truck — Form Left, Image Right */}
        <FadeUp>
          <section id="book-truck" className="px-4 md:px-12 py-16 md:py-24 bg-white border-b border-[#e5ebe7]">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
              {/* Form Left */}
              <div>
                <BookingForm />
              </div>

              {/* Image Placeholder Right */}
              <div className="w-full h-full min-h-[420px] bg-[#ECE6DD] border-2 border-dashed border-[#c5beB4] rounded-2xl flex flex-col items-center justify-center p-8 text-center transition-all hover:border-[#0F6A37]/50 group">
                <div className="w-16 h-16 rounded-full bg-[#E0D9CE] flex items-center justify-center text-[#6b786d] group-hover:text-[#0F6A37] group-hover:scale-110 transition-all mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="font-['Manrope'] text-xs font-bold text-[#1a1f1b] uppercase tracking-wider mb-1">
                  Book a Truck Image
                </p>
                <p className="font-['Space_Mono'] text-xs font-bold text-[#0F6A37] bg-[#EBF5EE] px-3 py-1 rounded-full mb-2">
                  Recommended: 1200 × 900 px (4:3)
                </p>
                <p className="font-['Inter'] text-xs text-[#6b786d] max-w-xs">
                  Ideal image: Loaded freight truck, cargo loading, or highway transport.
                </p>
              </div>
            </div>
          </section>
        </FadeUp>

        {/* 8. Section 2: Register Your Truck — Image Left, Form Right */}
        <FadeUp>
          <section id="register-truck" className="px-4 md:px-12 py-16 md:py-24 bg-[#ECE6DD]">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
              {/* Image Left */}
              <div className="w-full h-full order-2 lg:order-1 flex items-center justify-center">
                <img
                  src="/images/register-truck.png"
                  alt="Register Your Truck - Shree Krishna Transport Fleet"
                  className="w-full h-auto max-h-[500px] object-cover rounded-2xl border border-[#c5beB4] shadow-lg transition-all duration-300 hover:shadow-xl"
                />
              </div>

              {/* Form Right */}
              <div className="order-1 lg:order-2">
                <DriverForm />
              </div>
            </div>
          </section>
        </FadeUp>
      </main>

      <Footer />
    </div>
  );
}

export default App;
