import React from 'react';

export const Services: React.FC = () => {
  const servicesList = [
    {
      icon: 'apartment',
      title: 'Commercial Const.',
      desc: 'Project coordination, BOQ estimates, and execution support for commercial developments.',
    },
    {
      icon: 'factory',
      title: 'Industrial Const.',
      desc: 'Civil supervision and material logistics suited for industrial plants & warehouses.',
    },
    {
      icon: 'plumbing',
      title: 'Sanitary Works',
      desc: 'Sanitaryware material planning, estimation, fitting coordination, and contractor support.',
    },
    {
      icon: 'route',
      title: 'Road Transport',
      desc: 'Pan-national logistics network for goods movement starting from Jaipur & NCR.',
    },
    {
      icon: 'warehouse',
      title: 'Business Logistics',
      desc: 'Regular commercial transport management for traders, contractors, and suppliers.',
    },
    {
      icon: 'rv_hookup',
      title: 'Return Loads & Fleet',
      desc: 'Connect available trucks with return-route freight to optimize fleet efficiency.',
    },
  ];

  return (
    <section id="services" className="w-full border-t border-gray-300 py-16 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <h2 className="text-xl md:text-2xl font-extrabold text-[#022448] uppercase mb-8 border-b-2 border-[#022448] inline-block pb-1">
          Comprehensive Capabilities
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-gray-300">
          {servicesList.map((s, idx) => (
            <div 
              key={idx} 
              className="p-6 border-r border-b border-gray-300 hover:bg-[#EDF1F5]/60 transition-colors group"
            >
              <span className="material-symbols-outlined text-4xl text-[#022448] mb-3 block group-hover:scale-105 transition-transform">
                {s.icon}
              </span>
              <h3 className="text-sm font-extrabold uppercase text-[#022448] mb-2 tracking-wider">
                {s.title}
              </h3>
              <p className="text-xs text-[#43474E] leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
