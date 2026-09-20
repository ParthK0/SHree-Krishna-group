import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Truck, CheckCircle2, ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    // White background padding frame
    <section className="w-full h-[100dvh] min-h-[580px] bg-white flex items-center justify-center p-1.5 sm:p-2 md:p-3">

      {/* 
        Image Card Box:
        Uses homefinalmobile.webp (portrait 1024x1536) for mobile view (< 768px)
        and homefinal.webp (landscape 1828x860) for desktop view (>= 768px)
      */}
      <div className="relative w-full h-full overflow-hidden rounded-xl sm:rounded-2xl md:rounded-[22px] shadow-md border border-neutral-100">

        {/* Responsive Picture Element */}
        <picture className="absolute inset-0 w-full h-full">
          <source media="(max-width: 767px)" srcSet="/images/homefinalmobile.webp" type="image/webp" />
          <source media="(min-width: 768px)" srcSet="/images/homefinal.webp" type="image/webp" />
          <img
            src="/images/homefinal.webp"
            alt="Shree Krishna Transport Network Fleet Convoy"
            className="w-full h-full object-cover object-[center_30%] sm:object-center transition-transform duration-1000 scale-100 hover:scale-105"
          />
        </picture>

        {/* 
          Directional Gradients (darkness reduced by 20% for brighter scenery visibility):
          - Desktop (md+): Left-to-right dark-to-transparent for side-by-side reading
          - Mobile (<md): Bottom-to-top gradient so the sunny sky & convoy remain clear and bright up top
        */}
        <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-black/45 via-black/30 sm:via-black/20 to-transparent pointer-events-none" />
        <div className="absolute inset-0 md:hidden bg-gradient-to-t from-black/70 via-black/40 to-transparent pointer-events-none" />

        {/* 
          Main Hero Visual Content:
          Centered vertically (mid from height) and left-aligned on mobile and desktop
        */}
        <div className="absolute inset-0 z-10 flex flex-col justify-center items-start px-4 sm:px-8 md:px-14 lg:px-16 max-w-4xl pt-16 md:pt-14 pb-4 md:pb-0">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3 sm:space-y-4 md:space-y-5 flex flex-col items-start w-full"
          >
            {/* Main Headline: Exactly 2 lines, left-aligned */}
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white uppercase font-['Archivo_Narrow'] tracking-tight leading-[1.1] md:leading-[1.2] drop-shadow-lg text-left">
              <span className="block whitespace-nowrap md:inline">Reliable Freight Transportation</span>{' '}
              <span className="block whitespace-nowrap md:inline">From Rajasthan Across India</span>
            </h1>

            {/* Value Proposition: 16px / 1.45 line-height, 2 explicit lines, high contrast */}
            <p className="text-[#E2ECF6] font-['Manrope'] font-normal text-[14px] xs:text-[16px] sm:text-base md:text-base lg:text-[18px] leading-[1.45] drop-shadow-md max-w-xl text-left">
              <span className="block md:inline">Full Truckload, Part Load &amp; Commercial Freight through</span>{' '}
              <span className="block md:inline">our verified transport network.</span>
            </p>

            {/* CTA Hierarchy: Stacked on mobile (line 1 & line 2), side-by-side on desktop */}
            <div className="flex flex-col sm:flex-row items-start justify-start gap-2.5 sm:gap-3 md:gap-4 pt-1 sm:pt-2 w-full sm:w-auto">
              {/* Amber Primary Button — Line 1 on mobile */}
              <Link
                to="/contact#enquiry"
                className="inline-flex items-center justify-center gap-1.5 md:gap-2 bg-[#F5B51B] hover:bg-[#E0A212] text-[#071F35] font-['Manrope'] font-extrabold text-[13.5px] xs:text-[14px] sm:text-xs md:text-sm uppercase tracking-wider px-4 xs:px-5 py-2.5 xs:py-3 sm:px-6 sm:py-3 md:px-8 md:py-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 hover:-translate-y-0.5 active:scale-95 group shimmer-btn shrink-0"
              >
                <span>Get a Freight Quote</span>
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1 animate-arrow-nudge text-[#071F35] md:w-4 md:h-4" />
              </Link>

              {/* Blue Secondary Button — Line 2 on mobile */}
              <Link
                to="/book-truck"
                className="inline-flex items-center justify-center gap-1.5 md:gap-2 bg-[#0B3A66]/90 hover:bg-[#072d54] text-white font-['Manrope'] font-bold text-[13.5px] xs:text-[14px] sm:text-xs md:text-sm uppercase tracking-wider px-4 xs:px-5 py-2.5 xs:py-3 sm:px-6 sm:py-3 md:px-8 md:py-3.5 rounded-full border border-[#85B7EB]/40 shadow-xl hover:shadow-2xl transition-all duration-200 hover:-translate-y-0.5 active:scale-95 group shrink-0"
              >
                <Truck size={15} className="transition-transform group-hover:scale-110 text-[#F5B51B] md:w-4 md:h-4" />
                <span>Book a Truck</span>
              </Link>
            </div>

            {/* Trust Row: 2x2 grid on mobile at 14px, horizontal on desktop */}
            <div className="w-full grid grid-cols-2 gap-x-3 xs:gap-x-4 gap-y-2 md:flex md:flex-wrap md:items-center md:gap-x-6 md:gap-y-1.5 pt-3 sm:pt-4 border-t border-white/15 text-[#E2ECF6] text-[13px] xs:text-[14px] sm:text-xs md:text-sm font-['Manrope'] font-medium text-left">
              <div className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-[#60A5FA] shrink-0" />
                <span>Pan-India Delivery</span>
              </div>
              <div className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-[#60A5FA] shrink-0" />
                <span>Verified Partners</span>
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

          </motion.div>
        </div>

      </div>
    </section>
  );
};
