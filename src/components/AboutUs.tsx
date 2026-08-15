import React from 'react';
import { Building2, Award, MapPin, Users } from 'lucide-react';

export const AboutUs: React.FC = () => {
  return (
    <section id="about-us" className="px-4 md:px-12 py-10 md:py-14 bg-[#1C201D] text-white border-b border-[#bfc9be]/15 relative overflow-hidden">
      {/* Background Subtle Accent Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#0F6A37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#F4B400]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Top Header Label */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-lg bg-[#0F6A37]/20 border border-[#0F6A37]/40 flex items-center justify-center text-[#8ad7a0]">
            <Building2 size={16} />
          </div>
          <p className="font-['Manrope'] text-xs font-bold text-[#8ad7a0] uppercase tracking-widest">
            About Shree Krishna Transport
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          
          {/* Main Copy (Left - 7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="font-['Archivo_Narrow'] text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-white leading-tight">
              Operational Discipline <span className="text-[#F4B400]">From Day One</span>
            </h2>

            {/* Route Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F6A37]/20 border border-[#0F6A37]/50 text-[#8ad7a0] font-['Space_Mono'] text-xs font-bold">
              <MapPin size={13} className="text-[#F4B400]" />
              <span>Rajasthan → All India Connectivity</span>
            </div>

            <div className="space-y-3 font-['Manrope'] text-sm text-neutral-300 leading-relaxed">
              <p>
                Shree Krishna Transport is a logistics venture from <strong className="text-white">Shree Krishna Buildtech</strong>, a commercial and government contracting firm founded by <strong className="text-white">Deepesh Kumar in 2022</strong>. Building on years of project execution across Rajasthan, we connect regional businesses with reliable freight transport to destinations nationwide.
              </p>

              <p>
                As a growing transport network built from the ground up, we bring proven contracting discipline to logistics — transparent pricing, direct communication, and a guaranteed freight quote within 1 hour, every time.
              </p>
            </div>
          </div>

          {/* Right Column Highlights & Promise (Right - 5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {/* Backed by Buildtech Card */}
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 shadow-md">
              <div className="w-9 h-9 rounded-lg bg-[#F4B400]/10 border border-[#F4B400]/30 flex items-center justify-center text-[#F4B400] shrink-0">
                <Award size={18} />
              </div>
              <div>
                <div className="font-['Archivo_Narrow'] font-bold text-sm uppercase text-white tracking-wide">
                  Backed by Buildtech
                </div>
                <div className="font-['Manrope'] text-[11px] text-neutral-400">
                  Commercial & Govt Contractor (est. 2022)
                </div>
              </div>
            </div>

            {/* Building Our Network Card */}
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 shadow-md">
              <div className="w-9 h-9 rounded-lg bg-[#0F6A37]/20 border border-[#0F6A37]/40 flex items-center justify-center text-[#8ad7a0] shrink-0">
                <Users size={18} />
              </div>
              <div>
                <div className="font-['Archivo_Narrow'] font-bold text-sm uppercase text-white tracking-wide">
                  Building Our Network
                </div>
                <div className="font-['Manrope'] text-[11px] text-neutral-400">
                  Trucks & drivers, ground up
                </div>
              </div>
            </div>

            {/* 1-Hour Promise Callout */}
            <div className="bg-[#0F6A37]/10 border border-[#0F6A37]/30 rounded-xl p-3 flex items-center gap-3 mt-1">
              <div className="w-9 h-9 rounded-full bg-[#0F6A37] flex items-center justify-center shrink-0 text-white font-bold font-['Archivo_Narrow'] text-sm">
                1h
              </div>
              <p className="font-['Manrope'] text-xs text-neutral-200 leading-snug">
                <strong className="text-white">Our Promise:</strong> Every enquiry receives a dedicated freight quote within 60 minutes via WhatsApp or direct call.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
