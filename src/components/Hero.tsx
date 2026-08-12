import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="max-w-[1200px] mx-auto px-4 md:px-8 py-16 md:py-28 flex flex-col items-start gap-6 relative">
      
      {/* Location Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EDF1F5] border border-gray-300/60 text-[#1E3A5F] text-xs font-bold uppercase tracking-wider">
        <span className="material-symbols-outlined text-sm">location_on</span>
        Jaipur • Rajasthan • India
      </div>

      {/* Main Headline */}
      <h1 className="text-3xl md:text-5xl font-extrabold text-[#022448] max-w-3xl uppercase tracking-tight leading-tight">
        Building projects.<br />
        Moving businesses.
      </h1>

      {/* Description */}
      <p className="text-base md:text-lg text-[#43474E] max-w-2xl leading-relaxed">
        Industrial excellence in construction materials, civil & sanitary works, and logistics. Under the leadership of <strong className="text-[#022448] font-bold">Deepesh Kumar</strong>, we provide the structural foundation and transportation network to keep industries moving efficiently.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full sm:w-auto">
        <a 
          href="#booking" 
          className="btn-primary px-8 py-4 text-center font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 min-h-[48px]"
        >
          Book a Truck
          <span className="material-symbols-outlined text-[18px]">local_shipping</span>
        </a>
        <a 
          href="#services" 
          className="btn-ghost px-8 py-4 text-center font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 min-h-[48px]"
        >
          Our Services
        </a>
      </div>

      {/* Operational Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full pt-8 border-t border-gray-200 mt-6">
        <div className="flex items-center gap-3 p-3 bg-white border border-gray-200">
          <span className="material-symbols-outlined text-[#1E3A5F] text-2xl">verified</span>
          <div>
            <h4 className="text-xs font-bold uppercase text-[#022448]">Buildtech Division</h4>
            <p className="text-[11px] text-[#43474E]">Civil & Sanitary Execution</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-white border border-gray-200">
          <span className="material-symbols-outlined text-[#1E3A5F] text-2xl">route</span>
          <div>
            <h4 className="text-xs font-bold uppercase text-[#022448]">Transport Network</h4>
            <p className="text-[11px] text-[#43474E]">Jaipur & North India Routes</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-white border border-gray-200">
          <span className="material-symbols-outlined text-[#1E3A5F] text-2xl">account_circle</span>
          <div>
            <h4 className="text-xs font-bold uppercase text-[#022448]">Deepesh Kumar</h4>
            <p className="text-[11px] text-[#43474E]">Project & Fleet Lead</p>
          </div>
        </div>
      </div>

    </section>
  );
};
