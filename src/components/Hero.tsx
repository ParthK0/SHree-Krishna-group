import React from 'react';
import { Truck, ArrowRight, MessageCircle } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-[435px] md:min-h-[515px] lg:min-h-[565px] flex items-center px-4 sm:px-8 md:px-12 lg:px-20 py-12 md:py-18 overflow-hidden bg-neutral-900 border-b border-[#3e4841]">
      {/* Full Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/home.webp')",
        }}
      />

      {/* Gradient Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/30 pointer-events-none" />

      {/* Copy Content */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col justify-center items-start text-left">
        <div className="max-w-3xl">
          <h1 className="font-['Archivo_Narrow'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.92] tracking-tight text-white uppercase mb-3.5 drop-shadow-lg">
            SHREE KRISHNA TRANSPORT
          </h1>

          <h2 className="font-['Archivo_Narrow'] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#8ad7a0] uppercase mb-5 leading-tight drop-shadow-md">
            Reliable Rajasthan to All India Transport Services
          </h2>

          <p className="font-['Inter'] text-base sm:text-lg md:text-xl text-neutral-100 leading-relaxed max-w-xl mb-8 flex items-center gap-2.5">
            <MessageCircle size={24} className="text-[#25D366] shrink-0" />
            <span>
              Get a freight quotation within <strong className="text-[#F4B400] font-extrabold">1 hour</strong> on WhatsApp.
            </span>
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-5 w-full sm:w-auto">
            <a
              href="#book-truck"
              className="inline-flex items-center justify-center gap-2.5 bg-[#F4B400] hover:bg-[#e0a500] text-[#6c5000] font-['Manrope'] font-extrabold text-sm sm:text-base px-7 py-3.5 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-200 uppercase tracking-wider group"
            >
              <Truck size={20} className="transition-transform group-hover:translate-x-1 text-[#6c5000]" />
              <span>Book a Truck</span>
              <ArrowRight size={18} className="arrow-slide ml-1 transition-transform group-hover:translate-x-1.5" />
            </a>
            <a
              href="#register-truck"
              className="inline-flex items-center justify-center gap-2.5 bg-[#0F6A37] hover:bg-[#0c562c] text-white font-['Manrope'] font-extrabold text-sm sm:text-base px-7 py-3.5 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-200 uppercase tracking-wider group"
            >
              <Truck size={20} className="transition-transform group-hover:translate-x-1 text-white" />
              <span>Register Vehicle</span>
              <ArrowRight size={18} className="arrow-slide ml-1 transition-transform group-hover:translate-x-1.5 text-white" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
