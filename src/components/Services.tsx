import React from 'react';

export const Services: React.FC = () => {
  const coreServices = [
    {
      icon: 'build',
      title: 'STRUCTURAL FABRICATION',
      desc: 'Custom-welded heavy steel fabrication for large-scale industrial applications.',
    },
    {
      icon: 'sync',
      title: 'FREIGHT FORWARDING',
      desc: 'Reliable, scheduled freight transport prioritizing efficiency and raw material logistics.',
    },
    {
      icon: 'square_foot',
      title: 'PROJECT PLANNING',
      desc: 'Utilitarian site planning and structural blueprinting for complex builds.',
    },
    {
      icon: 'warehouse',
      title: 'WAREHOUSING',
      desc: 'Secure, heavy-capacity storage facilities for construction materials and fleet overflow.',
    },
  ];

  return (
    <section id="services" className="bg-[#E1EBF5] border-t border-b border-[#B8D1E8] py-12 md:py-20">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="flex items-center gap-3 mb-8">
          <img src="/logo.svg" alt="SK Logo" className="w-7 h-7 object-contain" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D2C54] tracking-tight">
            Core Services
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreServices.map((service, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-[#B8D1E8] p-6 flex flex-col justify-between space-y-4 shadow-2xs hover:border-[#0D2C54] transition-all hover:-translate-y-0.5"
            >
              <div>
                <span className="material-symbols-outlined text-3xl text-[#0D2C54] mb-3 block">
                  {service.icon}
                </span>

                <h3 className="text-xs font-black uppercase text-[#0D2C54] tracking-wider mb-2">
                  {service.title}
                </h3>

                <p className="text-xs text-[#133E75] leading-relaxed font-medium">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
