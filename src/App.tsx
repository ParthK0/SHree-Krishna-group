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
    <div className="min-h-screen bg-[#F0F5FA] text-[#1A202C] flex flex-col font-sans antialiased selection:bg-[#1B2A4A] selection:text-white">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Businesses />
        <Services />
        
        {/* Logistics Operations Section */}
        <section id="booking" className="bg-[#E3EDF7] border-t border-b border-[#D1E1F0] py-12 md:py-20">
          <div className="max-w-[1200px] mx-auto px-4 md:px-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A202C] tracking-tight mb-8">
              Logistics Operations
            </h2>

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
