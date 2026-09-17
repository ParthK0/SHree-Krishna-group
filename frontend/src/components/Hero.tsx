import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, ArrowRight, MessageCircle, Package, ShieldCheck, Flame } from 'lucide-react';

export const Hero: React.FC = () => {

  return (
    <section className="relative w-full min-h-[480px] md:min-h-[550px] lg:min-h-[600px] flex items-center px-4 sm:px-8 md:px-12 lg:px-20 py-12 md:py-20 overflow-hidden bg-neutral-900 border-b border-[#3e4841]">
      {/* Full Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/home.webp')",
        }}
      />

      {/* Gradient Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/40 pointer-events-none" />

      {/* Copy Content */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col justify-center items-start text-left">
        <div className="max-w-3xl">
          
          {/* Live Urgency Counter & Service Pills */}
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9A015]/20 border border-[#E9A015]/50 text-[#E9A015] font-['Space_Mono'] text-[10px] sm:text-[11px] font-bold">
              <Flame size={13} className="text-[#E9A015] animate-bounce" />
              <span>134+ Quotes Delivered This Week</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#062448]/70 border border-[#062448] text-[#93C5FD] font-['Space_Mono'] text-[10px] sm:text-[11px] font-bold">
              <ShieldCheck size={13} className="text-[#85B7EB]" />
              <span>Full Truck • Part Load • Parcel (0–150 kg)</span>
            </span>
          </div>

          <h1 className="font-['Archivo_Narrow'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.92] tracking-tight text-white uppercase mb-3.5 drop-shadow-xl">
            SHREE KRISHNA TRANSPORT
          </h1>

          <h2 className="font-['Archivo_Narrow'] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#85B7EB] uppercase mb-5 leading-tight drop-shadow-md">
            Reliable Rajasthan to All India Transport &amp; Parcel Services
          </h2>

          <p className="font-['Inter'] text-base sm:text-lg md:text-xl text-neutral-100 leading-relaxed max-w-xl mb-7 flex items-center gap-2.5">
            <MessageCircle size={22} className="text-[#25D366] shrink-0" />
            <span>
              Get an instant freight quote within <strong className="text-[#E9A015] font-extrabold">60 minutes</strong> with transparent E-Way bill compliance.
            </span>
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 w-full sm:w-auto">
            <Link
              to="/book-truck"
              className="inline-flex items-center justify-center gap-2 bg-[#E9A015] hover:bg-[#D08C0A] text-[#4A2E00] font-['Manrope'] font-extrabold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-200 uppercase tracking-wider group"
            >
              <Truck size={19} className="transition-transform group-hover:translate-x-1 text-[#4A2E00]" />
              <span>Book a Truck</span>
              <ArrowRight size={17} className="arrow-slide ml-0.5 transition-transform group-hover:translate-x-1.5" />
            </Link>

            <Link
              to="/book-truck?type=parcel"
              className="inline-flex items-center justify-center gap-2 bg-[#062448] hover:bg-[#0A3366] text-white font-['Manrope'] font-extrabold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-200 uppercase tracking-wider group border border-[#93C5FD]/40"
            >
              <Package size={19} className="transition-transform group-hover:translate-x-1 text-[#E9A015]" />
              <span>Book a Parcel <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded ml-1 font-['Space_Mono']">0-150 kg</span></span>
              <ArrowRight size={17} className="arrow-slide ml-0.5 transition-transform group-hover:translate-x-1.5 text-white" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
