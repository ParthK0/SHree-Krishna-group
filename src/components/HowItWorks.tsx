import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Search, MessageCircle, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    num: '01',
    icon: <MapPin size={20} />,
    title: 'Tell us your trip',
    desc: 'Provide pickup, drop-off, goods type, and load details via our form.',
    highlight: false,
  },
  {
    num: '02',
    icon: <Search size={20} />,
    title: 'Check availability',
    desc: 'We verify trucks in our network that match your route and load.',
    highlight: false,
  },
  {
    num: '03',
    icon: <MessageCircle size={20} />,
    title: 'Get a quote',
    desc: 'Receive a freight quote via WhatsApp within 1 hour — guaranteed.',
    highlight: false,
  },
  {
    num: '04',
    icon: <CheckCircle2 size={20} />,
    title: 'Confirmed',
    desc: 'Booking locked. Truck & driver dispatched on agreed date.',
    highlight: true,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

export const HowItWorks: React.FC = () => {
  return (
    <section className="px-4 md:px-12 py-12 md:py-16 bg-[#ECE6DD] border-y border-[#d5ceC4]">
      <div className="mb-10">
        <p className="font-['Manrope'] text-xs font-bold text-[#6b786d] uppercase tracking-widest mb-2">Process</p>
        <h2 className="font-['Archivo_Narrow'] text-2xl md:text-3xl font-bold uppercase text-[#1a1f1b]">
          How it works — for businesses.
        </h2>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 relative"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {/* Dashed connector line */}
        <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-px border-t-2 border-dashed border-[#b8c9bb] z-0 pointer-events-none" />

        {steps.map((step) => (
          <motion.div
            key={step.num}
            variants={cardVariants}
            transition={{ duration: 0.55 }}
            whileHover={{ y: -8, boxShadow: '0 16px 40px rgba(0,0,0,0.08)', borderColor: '#0F6A37' }}
            className="relative z-10 flex flex-col items-start rounded-lg p-6 border-2 cursor-default transition-colors duration-300 bg-white border-[#e5ebe7]"
            style={{ transition: 'box-shadow 0.25s, border-color 0.25s' }}
          >
            {/* Number badge */}
            <motion.div
              whileHover={{ rotate: 5 }}
              className="font-['Space_Mono'] text-xs font-bold px-2.5 py-1 mb-5 inline-block bg-[#2a2f2b] text-[#eef3ef]"
            >
              {step.num}
            </motion.div>

            {/* Icon */}
            <div className="mb-4 text-[#0F6A37]">
              {step.icon}
            </div>

            <h4 className="font-['Archivo_Narrow'] text-lg font-bold uppercase mb-2 text-[#1a1f1b]">
              {step.title}
            </h4>
            <p className="font-['Inter'] text-xs text-[#6b786d] leading-relaxed">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
