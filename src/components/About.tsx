import React from 'react';

export const About: React.FC = () => {
  const features = [
    'Nationwide Logistics Fleet',
    'Heavy Structural Engineering',
    'End-to-End Project Management',
  ];

  return (
    <section id="about" className="bg-[#E1EBF5] border-t border-b border-[#B8D1E8] py-12 md:py-20">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Text & Checklist */}
          <div className="md:col-span-6 lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2 text-[#0D2C54]">
              <img src="/logo.svg" alt="SK Logo" className="w-5 h-5 object-contain" />
              <span className="text-xs font-black uppercase tracking-wider">SK CORE PHILOSOPHY</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D2C54] tracking-tight">
              Utilitarian. Dependable.
            </h2>

            <p className="text-sm md:text-base text-[#133E75] leading-relaxed max-w-xl font-medium">
              We strip away the unnecessary to focus entirely on operational intent, whether moving raw materials across the country or erecting the structural framework for a new industrial site. Flat, minimalist, and uncompromisingly effective.
            </p>

            <ul className="space-y-3 pt-2">
              {features.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm font-bold text-[#0D2C54]">
                  <span className="material-symbols-outlined text-xl text-[#0D2C54] shrink-0">
                    check_circle
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Construction Worker Image */}
          <div className="md:col-span-6 lg:col-span-5">
            <div className="w-full h-64 sm:h-80 md:h-96 rounded-xs overflow-hidden border-2 border-[#0D2C54]/20 shadow-md relative group">
              <img 
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1000" 
                alt="Construction worker working on steel structural framework" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
