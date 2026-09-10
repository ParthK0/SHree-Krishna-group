import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, ArrowRight, MessageCircle, Package, ShieldCheck } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-[445px] md:min-h-[525px] lg:min-h-[575px] flex items-center px-4 sm:px-8 md:px-12 lg:px-20 py-12 md:py-18 overflow-hidden bg-neutral-900 border-b border-[#3e4841]">
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
          {/* Top Service Pills */}
          <div className="inline-flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F6A37]/30 border border-[#0F6A37]/60 text-[#9be9b0] font-['Space_Mono'] text-[11px] font-bold">
              <ShieldCheck size={13} className="text-[#F4B400]" />
              <span>Full Truck • Part Load • Parcel (0–150 kg)</span>
            </span>
          </div>

          <h1 className="font-['Archivo_Narrow'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.92] tracking-tight text-white uppercase mb-3.5 drop-shadow-lg">
            SHREE KRISHNA TRANSPORT
          </h1>

          <h2 className="font-['Archivo_Narrow'] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#8ad7a0] uppercase mb-5 leading-tight drop-shadow-md">
            Reliable Rajasthan to All India Transport &amp; Parcel Services
          </h2>

          <p className="font-['Inter'] text-base sm:text-lg md:text-xl text-neutral-100 leading-relaxed max-w-xl mb-7 flex items-center gap-2.5">
            <MessageCircle size={24} className="text-[#25D366] shrink-0" />
            <span>
              Get a freight &amp; parcel quote within <strong className="text-[#F4B400] font-extrabold">1 hour</strong> on WhatsApp.
            </span>
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 w-full sm:w-auto">
            <Link
              to="/book-truck"
              className="inline-flex items-center justify-center gap-2 bg-[#F4B400] hover:bg-[#e0a500] text-[#6c5000] font-['Manrope'] font-extrabold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-200 uppercase tracking-wider group"
            >
              <Truck size={19} className="transition-transform group-hover:translate-x-1 text-[#6c5000]" />
              <span>Book a Truck</span>
              <ArrowRight size={17} className="arrow-slide ml-0.5 transition-transform group-hover:translate-x-1.5" />
            </Link>

            <Link
              to="/book-truck?type=parcel"
              className="inline-flex items-center justify-center gap-2 bg-[#0F6A37] hover:bg-[#0c562c] text-white font-['Manrope'] font-extrabold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-200 uppercase tracking-wider group border border-[#8ad7a0]/40"
            >
              <Package size={19} className="transition-transform group-hover:translate-x-1 text-[#F4B400]" />
              <span>Book a Parcel <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded ml-1 font-['Space_Mono']">0-150 kg</span></span>
              <ArrowRight size={17} className="arrow-slide ml-0.5 transition-transform group-hover:translate-x-1.5 text-white" />
            </Link>

            <Link
              to="/register-truck"
              className="inline-flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-100 font-['Manrope'] font-extrabold text-sm sm:text-base px-5 py-3.5 rounded-xl shadow-lg transition-all duration-200 uppercase tracking-wider border border-neutral-700 group"
            >
              <Truck size={19} className="transition-transform group-hover:translate-x-1 text-neutral-300" />
              <span>Register Vehicle</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

