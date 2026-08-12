import React from 'react';

export const Businesses: React.FC = () => {
  return (
    <section id="buildtech" className="max-w-[1200px] mx-auto px-4 md:px-8 py-16">
      <h2 className="text-xl md:text-2xl font-extrabold text-[#022448] uppercase mb-8 border-b-2 border-[#022448] inline-block pb-1">
        Business Verticals
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Buildtech Card */}
        <div className="section-bg border-base p-6 md:p-8 flex flex-col justify-between h-full">
          <div>
            <div className="border-b border-gray-300 pb-4 mb-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black text-[#1E3A5F] uppercase tracking-wider block">REGISTERED FIRM</span>
                <h3 className="text-xl font-bold text-[#022448]">Shree Krishna Buildtech</h3>
              </div>
              <span className="material-symbols-outlined text-[#022448] text-4xl">construction</span>
            </div>

            <p className="text-sm text-[#43474E] leading-relaxed mb-6">
              Supplying construction management, sanitary fittings, civil execution support, and structural components for industrial and commercial projects. Built for endurance and precision.
            </p>
          </div>

          <ul className="flex flex-col border-t border-gray-300">
            <li className="py-2.5 border-b border-gray-300 text-xs font-semibold text-[#121c2a] flex items-center gap-2">
              <div className="w-2 h-2 bg-[#022448]"></div> Civil Works & Concrete Planning
            </li>
            <li className="py-2.5 border-b border-gray-300 text-xs font-semibold text-[#121c2a] flex items-center gap-2">
              <div className="w-2 h-2 bg-[#022448]"></div> Sanitary Installations & BOQ Estimation
            </li>
            <li className="py-2.5 text-xs font-semibold text-[#121c2a] flex items-center gap-2">
              <div className="w-2 h-2 bg-[#022448]"></div> Site Project Management Coordination
            </li>
          </ul>
        </div>

        {/* Transport Card */}
        <div id="transport" className="section-bg border-base p-6 md:p-8 flex flex-col justify-between h-full">
          <div>
            <div className="border-b border-gray-300 pb-4 mb-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black text-[#1E3A5F] uppercase tracking-wider block">TRANSPORT BRAND</span>
                <h3 className="text-xl font-bold text-[#022448]">Shree Krishna Transport</h3>
              </div>
              <span className="material-symbols-outlined text-[#022448] text-4xl">local_shipping</span>
            </div>

            <p className="text-sm text-[#43474E] leading-relaxed mb-6">
              A robust logistics network providing reliable freight forwarding, raw material transportation, and commercial goods hauling across Jaipur, Rajasthan, and North Indian routes.
            </p>
          </div>

          <ul className="flex flex-col border-t border-gray-300">
            <li className="py-2.5 border-b border-gray-300 text-xs font-semibold text-[#121c2a] flex items-center gap-2">
              <div className="w-2 h-2 bg-[#022448]"></div> Commercial Truck Booking & Haulage
            </li>
            <li className="py-2.5 border-b border-gray-300 text-xs font-semibold text-[#121c2a] flex items-center gap-2">
              <div className="w-2 h-2 bg-[#022448]"></div> Raw Material Transit & Goods Transport
            </li>
            <li className="py-2.5 text-xs font-semibold text-[#121c2a] flex items-center gap-2">
              <div className="w-2 h-2 bg-[#022448]"></div> Verified Driver Network & Return Loads
            </li>
          </ul>
        </div>

      </div>
    </section>
  );
};
