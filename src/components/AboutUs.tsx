import React from 'react';
import { Building2, Award, MapPin, Users, Shield } from 'lucide-react';
import { GSTIN, ADDRESS_LINE1, ADDRESS_LINE2, ADDRESS_CITY, ADDRESS_STATE, ADDRESS_PIN } from '../lib/constants';

export const AboutUs: React.FC = () => {
  return (
    <section id="about-us" className="px-4 md:px-12 py-16 md:py-24 bg-[#1C201D] text-white border-b border-[#bfc9be]/15 relative overflow-hidden">
      {/* Background Subtle Accent Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0F6A37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F4B400]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Top Header Label */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-[#0F6A37]/20 border border-[#0F6A37]/40 flex items-center justify-center text-[#8ad7a0]">
            <Building2 size={18} />
          </div>
          <p className="font-['Manrope'] text-xs font-bold text-[#8ad7a0] uppercase tracking-widest">
            About Shree Krishna Transport
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Main Copy (Left - 7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-['Archivo_Narrow'] text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white leading-tight">
              Operational Discipline <br className="hidden sm:inline" />
              <span className="text-[#F4B400]">From Day One</span>
            </h2>

            {/* Route Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F6A37]/20 border border-[#0F6A37]/50 text-[#8ad7a0] font-['Space_Mono'] text-xs font-bold">
              <MapPin size={14} className="text-[#F4B400]" />
              <span>Rajasthan → All India Connectivity</span>
            </div>

            <div className="space-y-4 font-['Manrope'] text-sm md:text-base text-neutral-300 leading-relaxed">
              <p>
                Shree Krishna Transport is a new venture from <strong className="text-white">Shree Krishna Buildtech</strong>, a commercial and government contracting company founded by <strong className="text-white">Deepesh Kumar in 2022</strong>. Buildtech has spent the last few years delivering on construction contracts across Rajasthan — Shree Krishna Transport extends that same business into logistics, connecting businesses across Rajasthan with reliable trucking to destinations all over India.
              </p>

              <p>
                As a newly launched transport line, we're building our network of trucks and drivers from the ground up. What we bring from day one is the operational discipline of a company that already runs commercial and government contracts — transparent pricing, straight communication, and a promise we hold ourselves to: a freight quote within 1 hour, every time.
              </p>
            </div>
          </div>

          {/* Right Column Highlights & Promise (Right - 5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Backed by Buildtech Card */}
            <div className="flex items-center gap-3.5 p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 shadow-md">
              <div className="w-10 h-10 rounded-lg bg-[#F4B400]/10 border border-[#F4B400]/30 flex items-center justify-center text-[#F4B400] shrink-0">
                <Award size={20} />
              </div>
              <div>
                <div className="font-['Archivo_Narrow'] font-bold text-sm uppercase text-white tracking-wide">
                  Backed by Buildtech
                </div>
                <div className="font-['Manrope'] text-xs text-neutral-400">
                  Commercial & Govt Contractor (est. 2022)
                </div>
              </div>
            </div>

            {/* Building Our Network Card */}
            <div className="flex items-center gap-3.5 p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 shadow-md">
              <div className="w-10 h-10 rounded-lg bg-[#0F6A37]/20 border border-[#0F6A37]/40 flex items-center justify-center text-[#8ad7a0] shrink-0">
                <Users size={20} />
              </div>
              <div>
                <div className="font-['Archivo_Narrow'] font-bold text-sm uppercase text-white tracking-wide">
                  Building Our Network
                </div>
                <div className="font-['Manrope'] text-xs text-neutral-400">
                  Trucks & drivers, ground up
                </div>
              </div>
            </div>

            {/* 1-Hour Promise Callout */}
            <div className="bg-[#0F6A37]/10 border border-[#0F6A37]/30 rounded-xl p-4 flex items-center gap-3 mt-2">
              <div className="w-10 h-10 rounded-full bg-[#0F6A37] flex items-center justify-center shrink-0 text-white font-bold font-['Archivo_Narrow']">
                1h
              </div>
              <p className="font-['Manrope'] text-xs text-neutral-200 leading-snug">
                <strong className="text-white">Our Promise:</strong> Every enquiry receives a dedicated freight quote within 60 minutes via WhatsApp or direct call.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Business Information Card */}
      <div className="max-w-6xl mx-auto relative z-10 mt-10 pt-8 border-t border-neutral-700/60">
        <div className="flex items-center gap-2 mb-4">
          <Shield size={16} className="text-[#8ad7a0]" />
          <p className="font-['Manrope'] text-[10px] font-bold text-[#8ad7a0] uppercase tracking-widest">
            Business Information
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { label: 'Business Name', value: 'Shree Krishna Transport' },
            { label: 'GSTIN', value: GSTIN, highlight: true },
            { label: 'Registered Office', value: `${ADDRESS_LINE1}, ${ADDRESS_LINE2}, ${ADDRESS_CITY}, ${ADDRESS_STATE} ${ADDRESS_PIN}` },
            { label: 'Operating Area', value: 'Rajasthan → All India' },
            { label: 'Business Type', value: 'Road Transportation Services' },
          ].map(({ label, value, highlight }) => (
            <div key={label} className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-3">
              <div className="font-['Manrope'] text-[9px] font-bold text-neutral-500 uppercase tracking-widest mb-1">{label}</div>
              <div className={`font-['Space_Mono'] text-[10px] font-bold leading-snug ${highlight ? 'text-[#8ad7a0]' : 'text-white'}`}>{value}</div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
