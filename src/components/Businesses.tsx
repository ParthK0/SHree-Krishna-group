import React from 'react';

export const Businesses: React.FC = () => {
  return (
    <section id="buildtech" className="max-w-[1200px] mx-auto px-4 md:px-8 py-12 md:py-20">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A202C] tracking-tight mb-8">
        Business Verticals
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Card 1: Buildtech */}
        <div className="bg-[#EEF2F6] border border-gray-300 overflow-hidden flex flex-col justify-between">
          <div>
            <div className="h-56 sm:h-64 w-full overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000" 
                alt="Large scale commercial and industrial construction building" 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 space-y-3">
              <h3 className="text-xl font-extrabold text-[#1A202C]">
                Buildtech
              </h3>

              <p className="text-sm text-[#475569] leading-relaxed font-medium">
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
        <div id="transport" className="bg-[#EEF2F6] border border-gray-300 overflow-hidden flex flex-col justify-between">
          <div>
            <div className="h-56 sm:h-64 w-full overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=1000" 
                alt="Fleet of heavy commercial transportation trucks" 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 space-y-3">
              <h3 className="text-xl font-extrabold text-[#1A202C]">
                Transport
              </h3>

              <p className="text-sm text-[#475569] leading-relaxed font-medium">
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
