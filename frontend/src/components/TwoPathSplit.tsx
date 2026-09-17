import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Truck, Navigation, ArrowRight, Package } from 'lucide-react';

const cards = [
  {
    icon: <Truck size={24} />,
    iconBg: 'bg-[#0C3A6D]',
    iconColor: 'text-[#93C5FD]',
    badge: 'FTL / PTL',
    badgeColor: 'bg-[#062448]/10 text-[#062448]',
    title: 'Book a Truck',
    desc: "Moving full truckloads (FTL) or partial freight (PTL)? Tell us your route and cargo — we'll dispatch verified vehicles within 1 hour.",
    cta: 'Book a Truck',
    link: '/book-truck',
    buttonClass: "bg-[#E9A015] hover:bg-[#D08C0A] text-[#4A2E00]",
  },
  {
    icon: <Package size={24} />,
    iconBg: 'bg-[#062448]',
    iconColor: 'text-[#E9A015]',
    badge: '0–150 KG EXPRESS',
    badgeColor: 'bg-[#E9A015] text-[#4A2E00]',
    title: 'Book a Parcel',
    desc: 'Need fast delivery for cartons, spare parts, commercial samples, or boxes up to 150 kg? Enjoy quick dispatch and live WhatsApp coordination.',
    cta: 'Book a Parcel (0-150 kg)',
    link: '/book-truck?type=parcel',
    buttonClass: "bg-[#062448] hover:bg-[#0A3366] text-white",
  },
  {
    icon: <Navigation size={24} />,
    iconBg: 'bg-[#F1F5F2]',
    iconColor: 'text-[#3d4a3f]',
    badge: 'FOR DRIVERS & FLEETS',
    badgeColor: 'bg-neutral-200 text-neutral-700',
    title: 'Have a Truck?',
    desc: 'Register your vehicle details and preferred routes. Get notified when matching loads are available to minimize empty running and maximize earnings.',
    cta: 'Register Vehicle',
    link: '/register-truck',
    buttonClass: "bg-neutral-800 hover:bg-neutral-900 text-white",
  },
];

export const TwoPathSplit: React.FC = () => {
  return (
    <section id="services" className="px-4 md:px-12 py-12 md:py-16 bg-[#ECE6DD]">
      <div className="mb-8 max-w-3xl">
        <p className="font-['Manrope'] text-xs font-bold text-[#6b786d] uppercase tracking-widest mb-2">Our Services</p>
        <h2 className="font-['Archivo_Narrow'] text-2xl md:text-4xl font-bold uppercase text-[#1a1f1b]">
          Comprehensive Transport &amp; Parcel Solutions
        </h2>
        <p className="font-['Manrope'] text-xs md:text-sm text-[#5a665c] mt-1">
          Whether you need a 32-ft container, shared part-load, or express 0–150 kg parcel dispatch, we deliver with speed and transparency.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <motion.div
            key={card.title}
            className="border-2 border-[#e5ebe7] bg-white rounded-xl p-6 sm:p-7 flex flex-col justify-between group cursor-default shadow-sm hover:shadow-xl transition-all duration-300"
            whileHover={{
              y: -6,
              borderColor: '#062448',
              boxShadow: '0 20px 40px rgba(6,36,72,0.12)',
            }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className={`w-12 h-12 ${card.iconBg} ${card.iconColor} flex items-center justify-center rounded-xl shadow-sm`}>
                  {card.icon}
                </div>
                <span className={`text-[10px] px-2.5 py-1 rounded-full font-['Space_Mono'] font-bold uppercase tracking-wider ${card.badgeColor}`}>
                  {card.badge}
                </span>
              </div>

              <h3 className="font-['Archivo_Narrow'] text-xl md:text-2xl font-bold mb-2.5 uppercase text-[#1a1f1b]">
                {card.title}
              </h3>
              <p className="font-['Inter'] text-xs sm:text-sm text-[#4A554C] leading-relaxed mb-6">
                {card.desc}
              </p>
            </div>

            <Link
              to={card.link}
              className={`inline-flex items-center justify-center gap-2 font-['Manrope'] font-extrabold text-xs px-5 py-3 rounded-lg shadow-sm transition-all duration-200 uppercase tracking-wider self-start ${card.buttonClass}`}
            >
              <span>{card.cta}</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

