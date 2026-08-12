import React from 'react';

export const Businesses: React.FC = () => {
  return (
    <section id="buildtech" className="max-w-[1200px] mx-auto px-4 md:px-8 py-12 md:py-20">
      <div className="flex items-center gap-3 mb-8">
        <img src="/logo.svg" alt="SK Logo" className="w-7 h-7 object-contain" />
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D2C54] tracking-tight">
          Business Verticals
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Card 1: Buildtech */}
        <div className="bg-[#E1EBF5] border border-[#B8D1E8] overflow-hidden flex flex-col justify-between shadow-2xs hover:border-[#0D2C54] transition-colors">
          <div>
            <div className="h-56 sm:h-64 w-full overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000" 
                alt="Large scale commercial and industrial construction building" 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-[#0D2C54] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1">
                CIVIL & STRUCTURAL
              </div>
            </div>

            <div className="p-6 space-y-3">
              <h3 className="text-xl font-extrabold text-[#0D2C54]">
                Buildtech
              </h3>

              <p className="text-sm text-[#133E75] leading-relaxed font-medium">
                Large-scale commercial and industrial construction. Concrete, steel, and foundational engineering designed for extreme stability.
              </p>
            </div>
          </div>

          <div className="px-6 pb-6 pt-2">
            <a 
              href="#services" 
              className="btn-light-flat w-full sm:w-auto px-6 py-3 text-center text-xs font-extrabold uppercase tracking-wider inline-block"
            >
              View Projects
            </a>
          </div>
        </div>

        {/* Card 2: Transport */}
        <div id="transport" className="bg-[#E1EBF5] border border-[#B8D1E8] overflow-hidden flex flex-col justify-between shadow-2xs hover:border-[#0D2C54] transition-colors">
          <div>
            <div className="h-56 sm:h-64 w-full overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=1000" 
                alt="Fleet of heavy commercial transportation trucks" 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-[#0D2C54] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1">
                HEAVY LOGISTICS
              </div>
            </div>

            <div className="p-6 space-y-3">
              <h3 className="text-xl font-extrabold text-[#0D2C54]">
                Transport
              </h3>

              <p className="text-sm text-[#133E75] leading-relaxed font-medium">
                Heavy-haul logistics and raw material transit. A dedicated fleet engineered to move critical payloads across any distance.
              </p>
            </div>
          </div>

          <div className="px-6 pb-6 pt-2">
            <a 
              href="#booking" 
              className="btn-light-flat w-full sm:w-auto px-6 py-3 text-center text-xs font-extrabold uppercase tracking-wider inline-block"
            >
              Fleet Details
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
