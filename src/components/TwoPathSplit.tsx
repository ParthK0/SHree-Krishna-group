import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Navigation, ArrowRight } from 'lucide-react';

const cards = [
  {
    icon: <Truck size={24} />,
    iconBg: 'bg-[#1c6b3e]',
    iconColor: 'text-[#9be9b0]',
    title: 'Need a truck?',
    desc: "Tell us where the goods are going, what you're moving, and when you need it. We'll source the right vehicle for the job.",
    cta: 'Book a Truck',
  },
  {
    icon: <Navigation size={24} />,
    iconBg: 'bg-[#F1F5F2]',
    iconColor: 'text-[#3d4a3f]',
    title: 'Have a truck?',
    desc: 'Register your vehicle details and preferred routes. Get notified when matching loads are available to minimize empty running.',
    cta: 'Register Vehicle',
  },
];

export const TwoPathSplit: React.FC = () => {
  return (
    <section id="services" className="px-4 md:px-12 py-12 md:py-16 bg-[#ECE6DD]">
      <div className="mb-8">
        <p className="font-['Manrope'] text-xs font-bold text-[#6b786d] uppercase tracking-widest mb-2">Choose your path</p>
        <h2 className="font-['Archivo_Narrow'] text-2xl md:text-4xl font-bold uppercase text-[#1a1f1b]">
          Which side of the road are you on?
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card) => (
          <motion.div
            key={card.title}
            className="border-2 border-[#e5ebe7] bg-white rounded-lg p-8 flex flex-col justify-between group cursor-default"
            whileHover={{
              y: -6,
              rotate: 0.5,
              borderColor: '#0F6A37',
              boxShadow: '0 20px 40px rgba(15,106,55,0.12)',
            }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div>
              <div className={`w-12 h-12 ${card.iconBg} ${card.iconColor} flex items-center justify-center mb-6 rounded-lg`}>
                {card.icon}
              </div>
              <h3 className="font-['Archivo_Narrow'] text-2xl md:text-3xl font-bold mb-3 uppercase text-[#1a1f1b]">
                {card.title}
              </h3>
              <p className="font-['Inter'] text-sm text-[#3d4a3f] leading-relaxed mb-8">
                {card.desc}
              </p>
            </div>
            <a
              href={card.cta === 'Book a Truck' ? '#book-truck' : '#register-truck'}
              className={
                card.cta === 'Book a Truck'
                  ? "inline-flex items-center justify-center gap-2 bg-[#F4B400] hover:bg-[#e0a500] text-[#6c5000] font-['Manrope'] font-extrabold text-xs px-5 py-3 rounded-lg shadow-sm transition-all duration-200 uppercase tracking-wider self-start"
                  : "inline-flex items-center gap-2 font-['Manrope'] text-xs font-bold text-[#0F6A37] hover:text-[#134E3A] uppercase tracking-wider group-hover:gap-3 transition-all duration-200 self-start"
              }
            >
              {card.cta}
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
