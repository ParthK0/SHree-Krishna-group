import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, CheckCircle2, ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    // White background padding frame
    <section className="w-full h-[100dvh] min-h-[560px] bg-white flex items-center justify-center p-1.5 sm:p-2 md:p-3">

      {/* 
        Image Card Box:
        Fills the container evenly so the white border is thin and uniform on all 4 sides
      */}
      <div className="relative w-full h-full overflow-hidden rounded-xl sm:rounded-2xl md:rounded-[22px] shadow-md border border-neutral-100">
        <img
          src="/images/homefinal.webp"
          alt="Shree Krishna Transport Network Fleet"
          className="w-full h-full object-cover object-[65%_center] sm:object-center"
        />

        {/* 
          1. Directional Gradient (DARK on Left -> LIGHT on Right):
             Darkness reduced by another 15% for maximum brightness & scenery visibility
        */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/35 sm:via-black/25 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-black/[0.06] pointer-events-none" />

        {/* 
          Main Hero Visual Content:
          Centered vertically and pushed left, overlaying the image
        */}
        <div className="absolute inset-0 z-10 flex flex-col justify-center px-4 sm:px-8 md:px-14 lg:px-16 max-w-4xl pt-12 sm:pt-14">
          <div className="space-y-4 sm:space-y-5">


            {/* Main Headline in Bold Contrast */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white uppercase font-['Archivo_Narrow'] tracking-tight leading-[1.05] drop-shadow-lg">
              Reliable Freight Transportation From Rajasthan Across India
            </h1>

            {/* Value Proposition Description in Secondary Text #D9E4EE */}
            <p className="mt-3 sm:mt-4 text-[#D9E4EE] font-['Manrope'] font-normal text-xs sm:text-sm md:text-base lg:text-[17px] leading-relaxed drop-shadow-md max-w-xl">
              Full Truckload, Part Load &amp; Commercial Freight &mdash; sourced through our verified transport network. Get a freight quote within 60 minutes.
            </p>

            {/* CTA Hierarchy: Primary = Amber #F5B51B, Secondary = Brand Blue */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-5 sm:mt-6">
              {/* Amber Primary Button — Get a Freight Quote */}
              <Link
                to="/contact#enquiry"
                className="inline-flex items-center justify-center gap-2 bg-[#F5B51B] hover:bg-[#E0A212] text-[#071F35] font-['Manrope'] font-extrabold text-xs sm:text-sm uppercase tracking-wider px-7 sm:px-8 py-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 hover:-translate-y-0.5 group"
              >
                <span>Get a Freight Quote</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 text-[#071F35]" />
              </Link>

              {/* Blue Secondary Button — Book a Truck */}
              <Link
                to="/book-truck"
                className="inline-flex items-center justify-center gap-2 bg-[#0B3A66] hover:bg-[#072d54] text-white font-['Manrope'] font-bold text-xs sm:text-sm uppercase tracking-wider px-7 sm:px-8 py-3.5 rounded-full border border-[#85B7EB]/40 shadow-xl hover:shadow-2xl transition-all duration-200 hover:-translate-y-0.5 group"
              >
                <Truck size={17} className="transition-transform group-hover:scale-110 text-[#F5B51B]" />
                <span>Book a Truck</span>
              </Link>
            </div>

            {/* Horizontal Trust Row */}
            <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2 mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-white/15 text-[#D9E4EE] text-xs sm:text-sm font-['Manrope']">
              <div className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-[#60A5FA] shrink-0" />
                <span>Pan-India Delivery</span>
              </div>
              <div className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-[#60A5FA] shrink-0" />
                <span>Verified Transport Partners</span>
              </div>
              <div className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-[#60A5FA] shrink-0" />
                <span>E-Way Bill Support</span>
              </div>
              <div className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-[#60A5FA] shrink-0" />
                <span>Quote Within 60 Min</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
