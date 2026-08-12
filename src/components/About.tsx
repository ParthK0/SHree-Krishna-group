import React from 'react';

export const About: React.FC = () => {
  const features = [
    'Nationwide Logistics Fleet',
    'Heavy Structural Engineering',
    'End-to-End Project Management',
  ];

  return (
    <section id="about" className="section-bg-slate border-t border-b border-gray-300 py-12 md:py-20">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Text & Checklist */}
          <div className="md:col-span-6 lg:col-span-7 space-y-5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A202C] tracking-tight">
              Utilitarian. Dependable.
            </h2>

            <p className="text-sm md:text-base text-[#475569] leading-relaxed max-w-xl font-medium">
              We strip away the unnecessary to focus entirely on operational intent, whether moving raw materials across the country or erecting the structural framework for a new industrial site. Flat, minimalist, and uncompromisingly effective.
            </p>

            <ul className="space-y-3 pt-2">
              {features.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm font-bold text-[#1B2A4A]">
                  <span className="material-symbols-outlined text-lg text-[#1B2A4A] shrink-0">
                    settings
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Construction Worker Image */}
          <div className="md:col-span-6 lg:col-span-5">
            <div className="w-full h-64 sm:h-80 md:h-96 rounded-xs overflow-hidden border border-gray-300 shadow-sm relative">
              <img 
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1000" 
                alt="Construction worker working on steel structural framework" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
