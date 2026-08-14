import { Header } from './components/Header';
import { Hero } from './components/Hero';
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

              {/* Image Right */}
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src="/images/dropdelivery.webp"
                  alt="Book a Truck Delivery - Shree Krishna Transport"
                  className="w-full h-auto max-h-[500px] object-cover rounded-2xl border border-[#c5beB4] shadow-lg transition-all duration-300 hover:shadow-xl"
                />
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
                  src="/images/register-truck.webp"
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
