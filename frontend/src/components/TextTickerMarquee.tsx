import React from 'react';

export const TextTickerMarquee: React.FC = () => {
  const tickerItems = [
    { text: 'MOVE SMARTER', img: '/images/team_logistics.jpg' },
    { text: 'GET A QUOTE', img: '/images/warehouse_delivery.jpg' },
    { text: 'SHREE KRISHNA TRANSPORT', img: '/images/smart_tracking.jpg' },
    { text: 'PAN-INDIA LINEHAUL', img: '/images/home.webp' },
    { text: '28+ STATES CONNECTED', img: '/images/dropdelivery.webp' },
  ];

  return (
    <section className="w-full bg-[#ECE6DD] py-4 sm:py-6 border-y border-[#e2dacd]/60 overflow-hidden select-none">
      <div className="relative w-full overflow-hidden flex items-center">
        
        {/* Left / Right Gradient Vignettes */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-r from-[#ECE6DD] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-l from-[#ECE6DD] to-transparent z-10 pointer-events-none" />

        <div className="flex shrink-0 animate-marquee items-center gap-8 sm:gap-12 whitespace-nowrap">
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, idx) => (
            <div key={idx} className="inline-flex items-center gap-4 sm:gap-6">
              <span className="font-['Archivo_Narrow'] text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight text-[#0B3A66]/85 hover:text-[#0B3A66] transition-colors">
                {item.text}
              </span>
              <span className="inline-block w-16 sm:w-24 h-9 sm:h-12 rounded-full overflow-hidden border-2 border-white/80 shadow-md transform -rotate-2">
                <img
                  src={item.img}
                  alt={item.text}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
