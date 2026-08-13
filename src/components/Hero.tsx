import React from 'react';
import { Truck, ArrowRight } from 'lucide-react';

/* Subtle dot-grid SVG background at 5% opacity */
const FloatingBg: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none float-bg" style={{ opacity: 0.06 }}>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="#9be9b0" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)" />
    </svg>
  </div>
);

/* Animated truck that drives across the bottom of the hero (hidden on mobile) */
const AnimatedTruck: React.FC = () => (
  <div className="hidden md:block absolute bottom-5 left-0 pointer-events-none select-none truck-animate" style={{ opacity: 0.5 }}>
    <div className="flex items-center gap-1 text-[#8ad7a0]">
      <Truck size={32} strokeWidth={1.5} />
      <div className="flex gap-1">
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            className="w-3 h-0.5 rounded-full bg-[#8ad7a0]"
            style={{ opacity: 1 - i * 0.06 }}
          />
        ))}
      </div>
    </div>
  </div>
);

export const Hero: React.FC = () => {
  return (
    <section className="px-4 md:px-12 py-8 md:py-14 bg-[#ECE6DD]">
      <div className="relative bg-[#1C201D] rounded-lg overflow-hidden border border-[#2E3530] p-8 md:p-14 flex flex-col md:flex-row gap-8 md:gap-14 justify-between items-start shadow-xl"
        style={{ boxShadow: '0 20px 60px rgba(28, 32, 29, 0.25)' }}
      >
        {/* Hero Background Image Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center  pointer-events-none"
          style={{ 
            backgroundImage: "url('/images/new home.png')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1C201D]/95 via-[#1C201D]/80 to-[#141815]/85 pointer-events-none" />

        <FloatingBg />

        {/* Copy */}
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-neutral-900/80 border border-neutral-700/60 rounded-full px-4 py-1.5 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#0F6A37] animate-pulse" />
            <span className="font-['Manrope'] text-[10px] font-bold text-neutral-300 uppercase tracking-widest">
              Jaipur · Rajasthan · North India
            </span>
          </div>

          <h1 className="font-['Archivo_Narrow'] text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight text-white uppercase mb-5">
            SHREE KRISHNA <br />
            <span className="text-neutral-300">TRANSPORT.</span>
          </h1>

          <p className="font-['Inter'] text-base md:text-lg text-neutral-300 leading-relaxed max-w-lg mb-8">
            We connect businesses with independent truck owners and drivers, then confirm every booking directly over WhatsApp. Quote within 1 hour.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#book-truck" 
              className="inline-flex items-center justify-center gap-2 bg-[#F4B400] hover:bg-[#e0a500] text-[#6c5000] font-['Manrope'] font-extrabold text-sm px-7 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 uppercase tracking-wider group"
            >
              <Truck size={18} className="transition-transform group-hover:translate-x-1 text-[#6c5000]" />
              Book a Truck
              <ArrowRight size={16} className="arrow-slide ml-1 transition-transform group-hover:translate-x-1.5" />
            </a>
            <a 
              href="#register-truck" 
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-neutral-600 hover:border-white text-white font-['Manrope'] font-bold text-sm px-6 py-4 rounded-lg transition-all duration-200 uppercase tracking-wider group"
            >
              <span className="transition-transform group-hover:translate-x-1">Register Vehicle</span>
              <ArrowRight size={14} className="arrow-slide transition-transform group-hover:translate-x-1.5 text-[#0F6A37]" />
            </a>
          </div>
        </div>

        {/* Animated truck */}
        <AnimatedTruck />
      </div>
    </section>
  );
};
