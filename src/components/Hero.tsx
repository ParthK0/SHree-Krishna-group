import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="max-w-[1200px] mx-auto px-4 md:px-8 py-10 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Copy & Actions */}
        <div className="md:col-span-6 lg:col-span-7 space-y-5">
          
          {/* Logo Brand Tag */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-[#E1EBF5] border border-[#B8D1E8] text-[#0D2C54] text-xs font-black uppercase tracking-wider">
            <img src="/logo.svg" alt="SK Logo" className="w-5 h-5 object-contain" />
            Shree Krishna Buildtech & Transport
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0D2C54] tracking-tight leading-[1.1]">
            Building projects.<br />
            Moving businesses.
          </h1>

          <p className="text-sm md:text-base text-[#133E75] leading-relaxed max-w-xl font-medium">
            Industrial excellence in construction and logistics. We provide the structural stability and operational reliability your projects demand. Built to last, engineered to deliver.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2 w-full max-w-md">
            <a
              href="#booking"
              className="btn-dark-navy w-full py-4 text-center text-sm font-extrabold tracking-wide min-h-[50px] flex items-center justify-center"
            >
              Book a Truck
            </a>
            <a
              href="#services"
              className="btn-dark-charcoal w-full py-4 text-center text-sm font-extrabold tracking-wide min-h-[50px] flex items-center justify-center"
            >
              Our Services
            </a>
          </div>
        </div>

        {/* Right Column: Hero Construction Image */}
        <div className="md:col-span-6 lg:col-span-5">
          <div className="w-full h-64 sm:h-80 md:h-96 rounded-xs overflow-hidden border-2 border-[#0D2C54]/20 shadow-md relative group">
            <img 
              src="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&q=80&w=1000" 
              alt="Industrial construction site with heavy cranes and scaffolding" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 right-3 bg-white/95 border border-[#B8D1E8] p-2 shadow-sm">
              <img src="/logo.svg" alt="SK Seal" className="w-7 h-7 object-contain" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
