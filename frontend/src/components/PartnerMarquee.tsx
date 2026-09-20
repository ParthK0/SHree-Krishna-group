import React from 'react';
import { ShieldCheck, Award, Factory, Building2, Package, Sparkles } from 'lucide-react';

const partners = [
  { name: 'Automotive & Spares', icon: Factory },
  { name: 'Textiles & Garments', icon: Package },
  { name: 'Ceramics & Marble', icon: Building2 },
  { name: 'Heavy Machinery & Steel', icon: Factory },
  { name: 'Chemicals & Minerals', icon: Sparkles },
  { name: 'Agricultural Produce', icon: ShieldCheck },
  { name: 'FMCG & Retail Logistics', icon: Award },
  { name: 'Electricals & Equipment', icon: Building2 },
];

export const PartnerMarquee: React.FC = () => {
  return (
    <section className="w-full bg-[#ECE6DD] py-4 sm:py-5 border-b border-[#e2dacd]/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-12 text-center mb-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 border border-[#c5beb4]/40 text-[#0B3A66] font-['Space_Mono'] text-[11px] font-bold shadow-xs">
          <Award size={13} className="text-[#F5B51B]" />
          <span>Our Trusted Industrial Network</span>
        </div>
      </div>

      {/* Infinite scrolling ticker */}
      <div className="relative w-full overflow-hidden flex items-center">
        {/* Left / Right Fade Vignettes */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#ECE6DD] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#ECE6DD] to-transparent z-10 pointer-events-none" />

        <div className="flex shrink-0 animate-marquee items-center gap-8 sm:gap-12 select-none">
          {[...partners, ...partners, ...partners].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-white/60 border border-[#e0d8cc] text-[#3d4a3f] font-['Manrope'] font-bold text-xs uppercase tracking-wider whitespace-nowrap shadow-xs hover:bg-white hover:border-[#0B3A66]/30 transition-all duration-200"
              >
                <Icon size={16} className="text-[#0B3A66]/70" />
                <span>{item.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
