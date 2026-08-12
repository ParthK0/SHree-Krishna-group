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
    <section id="services" className="section-bg-slate border-t border-b border-gray-300 py-12 md:py-20">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A202C] tracking-tight mb-8">
          Core Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreServices.map((service, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-gray-200 p-6 flex flex-col justify-between space-y-4 shadow-2xs hover:border-gray-400 transition-colors"
            >
              <div>
                <span className="material-symbols-outlined text-3xl text-[#1B2A4A] mb-3 block">
                  {service.icon}
                </span>

                <h3 className="text-xs font-black uppercase text-[#1A202C] tracking-wider mb-2">
                  {service.title}
                </h3>

                <p className="text-xs text-[#475569] leading-relaxed font-medium">
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
