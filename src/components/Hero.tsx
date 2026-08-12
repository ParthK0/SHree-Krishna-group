import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="max-w-[1200px] mx-auto px-4 md:px-8 py-10 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Copy & Actions */}
        <div className="md:col-span-6 lg:col-span-7 space-y-5">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1A202C] tracking-tight leading-[1.1]">
            Building projects.<br />
            Moving businesses.
          </h1>

          <p className="text-sm md:text-base text-[#475569] leading-relaxed max-w-xl font-medium">
            Industrial excellence in construction and logistics. We provide the structural stability and operational reliability your projects demand. Built to last, engineered to deliver.
          </p>

          {/* Action Buttons (Stacked on mobile, side-by-side on desktop) */}
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
          <div className="w-full h-64 sm:h-80 md:h-96 rounded-xs overflow-hidden border border-gray-300 shadow-sm relative">
            <img 
              src="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&q=80&w=1000" 
              alt="Industrial construction site with heavy cranes and scaffolding" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
};
