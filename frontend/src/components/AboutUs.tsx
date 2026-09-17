import React from 'react';
import { Building2, Award, MapPin, Shield } from 'lucide-react';
import { GSTIN } from '../lib/constants';

export const AboutUs: React.FC = () => {
  return (
    <section id="about-us" className="px-4 md:px-12 py-10 md:py-14 bg-[#1C201D] text-white border-b border-[#bfc9be]/15 relative overflow-hidden">
      {/* Background Subtle Accent Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#062448]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#E9A015]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Top Header Label */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-lg bg-[#062448]/20 border border-[#062448]/40 flex items-center justify-center text-[#85B7EB]">
            <Building2 size={16} />
          </div>
          <p className="font-['Manrope'] text-xs font-bold text-[#85B7EB] uppercase tracking-widest">
            About Shree Krishna Transport
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          
          {/* Main Copy (Left - 7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="font-['Archivo_Narrow'] text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-white leading-tight">
              Operational Discipline <span className="text-[#E9A015]">From Day One</span>
            </h2>

            {/* Route Pill Tag & GSTIN Tag */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#062448]/20 border border-[#062448]/50 text-[#85B7EB] font-['Space_Mono'] text-xs font-bold">
                <MapPin size={13} className="text-[#E9A015]" />
                <span>Rajasthan → All India Connectivity</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-[#062448]/50 text-[#85B7EB] font-['Space_Mono'] text-xs font-bold">
                <Shield size={13} className="text-[#062448]" />
                <span>GSTIN: {GSTIN}</span>
              </div>
            </div>

            <div className="space-y-3 font-['Manrope'] text-sm text-neutral-300 leading-relaxed">
              <p>
                Shree Krishna Transport is a transportation service provider and freight facilitator based in Jaipur, Rajasthan (GSTIN: <strong className="text-white font-['Space_Mono']">{GSTIN}</strong>). We connect regional businesses and cargo shippers with our network of independent transport partners across India.
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
              <div className="w-9 h-9 rounded-lg bg-[#E9A015]/10 border border-[#E9A015]/30 flex items-center justify-center text-[#E9A015] shrink-0">
                <Award size={18} />
              </div>
              <div>
                <div className="font-['Archivo_Narrow'] font-bold text-sm uppercase text-white tracking-wide">
                  Backed by Buildtech
                </div>
                <div className="font-['Manrope'] text-[11px] text-neutral-400">
                  Commercial &amp; Govt Contractor (est. 2022)
                </div>
              </div>
            </div>

            {/* GST Registered Business Card */}
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 shadow-md">
              <div className="w-9 h-9 rounded-lg bg-[#062448]/20 border border-[#062448]/40 flex items-center justify-center text-[#85B7EB] shrink-0">
                <Shield size={18} />
              </div>
              <div>
                <div className="font-['Archivo_Narrow'] font-bold text-sm uppercase text-white tracking-wide">
                  GST Registered Business
                </div>
                <div className="font-['Space_Mono'] text-[11px] text-[#85B7EB] font-bold">
                  {GSTIN}
                </div>
              </div>
            </div>

            {/* 1-Hour Promise Callout */}
            <div className="bg-[#062448]/10 border border-[#062448]/30 rounded-xl p-3 flex items-center gap-3 mt-1">
              <div className="w-9 h-9 rounded-full bg-[#062448] flex items-center justify-center shrink-0 text-white font-bold font-['Archivo_Narrow'] text-sm">
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
