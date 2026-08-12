import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Businesses } from './components/Businesses';
import { Services } from './components/Services';
import { BookingForm } from './components/BookingForm';
import { DriverForm } from './components/DriverForm';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export function App() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#121c2a] flex flex-col font-sans antialiased selection:bg-[#022448] selection:text-white">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Businesses />
        <Services />
        
        {/* Logistics Operations Section (Forms) */}
        <section className="section-bg w-full py-16 border-t border-gray-300" id="booking">
          <div className="max-w-[1200px] mx-auto px-4 md:px-8">
            <div className="mb-8">
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#022448] uppercase tracking-tight">
                Logistics Operations
              </h2>
              <p className="text-base text-[#43474E] mt-2 max-w-2xl">
                Streamlined booking for clients and straightforward onboarding for commercial drivers & fleet owners. No unnecessary steps.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <BookingForm />
              <DriverForm />
            </div>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
