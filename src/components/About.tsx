import React from 'react';

export const About: React.FC = () => {
  return (
    <section id="about" className="section-bg w-full border-t border-b border-base py-16">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Left Text */}
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-extrabold text-[#022448] uppercase border-b-2 border-[#022448] inline-block pb-2">
              About Us
            </h2>
            <p className="text-base text-[#121c2a] leading-relaxed font-medium">
              Shree Krishna Group is a dual-force enterprise focused on structural integrity and logistical efficiency. Led by <strong className="text-[#022448]">Deepesh Kumar</strong>, we cut out the noise and focus on delivering tangible results for heavy industry and business clients.
            </p>
            <p className="text-sm text-[#43474E] leading-relaxed">
              Through <strong>Shree Krishna Buildtech</strong> (civil, sanitary, BOQ coordination, and procurement) and <strong>Shree Krishna Transport</strong> (goods logistics & asset-light driver network), our methodology is simple: solid materials, dependable fleets, and transparent communication.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs font-bold text-[#022448]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#022448]"></span>
                Direct Site Execution & Sanitary Procurement
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#022448]"></span>
                Verified Fleet Drivers & Inter-City Freight Logistics
              </div>
            </div>
          </div>

          {/* Right Image Banner */}
          <div 
            className="h-72 md:h-80 w-full bg-cover bg-center border border-gray-300 relative shadow-xs" 
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000')` 
            }}
          >
            <div className="absolute inset-0 bg-[#022448]/30"></div>
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 border border-gray-300 p-3 text-xs font-bold text-[#022448] uppercase tracking-wider flex items-center justify-between">
              <span>Industrial Execution & Freight Logistics</span>
              <span className="material-symbols-outlined text-sm">precision_manufacturing</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
