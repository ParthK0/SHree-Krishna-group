import React from 'react';
import { motion } from 'framer-motion';
import { Truck, ArrowRight, Route, UserPlus } from 'lucide-react';

export const Transport: React.FC = () => {
  return (
    <section id="transport" className="py-24 bg-neutral-950 border-t border-neutral-900 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Info */}
          <motion.div 
            className="lg:col-span-7 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-black text-amber-500 tracking-widest uppercase">
              SHREE KRISHNA TRANSPORT
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-neutral-100 leading-tight">
              Book a truck. <br />
              <span className="text-amber-500">Move your goods.</span>
            </h2>

            <p className="text-neutral-300 text-base leading-relaxed">
              Starting from Jaipur, we coordinate commercial goods transportation with verified truck owners and drivers across major North Indian routes. Get competitive freight quotes without fleet management hassles.
            </p>

            {/* Starting Network Box */}
            <div className="p-5 rounded-2xl bg-neutral-900/80 border-l-4 border-amber-500 border-y border-r border-neutral-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-wider">
                <Route className="w-4 h-4" />
                Primary Route Network
              </div>
              <p className="text-sm font-medium text-neutral-200">
                Jaipur • Rajasthan • Delhi/NCR • Gujarat • North India
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#booking"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold text-sm shadow-md shadow-amber-500/20 transition-all transform hover:-translate-y-0.5"
              >
                <Truck className="w-4 h-4" />
                Book a Truck
              </a>
              <a
                href="#driver"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-neutral-900 border border-neutral-700 hover:border-amber-500/50 text-neutral-200 hover:text-amber-400 font-extrabold text-sm transition-all"
              >
                <UserPlus className="w-4 h-4 text-amber-500" />
                I Am a Driver / Truck Owner
              </a>
            </div>
          </motion.div>

          {/* Quick Quote Prompt Card */}
          <motion.div 
            className="lg:col-span-5"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="p-8 rounded-3xl bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800 space-y-6 shadow-2xl relative">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center">
                <Truck className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-neutral-100 mb-2">
                  Need a truck quote?
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Send pickup, destination, goods type, and vehicle requirements. We will quickly confirm truck availability and share a competitive freight quote.
                </p>
              </div>

              <div className="pt-2 border-t border-neutral-800">
                <a
                  href="#booking"
                  className="inline-flex items-center gap-2 text-xs font-black text-amber-400 hover:text-amber-300 transition-colors uppercase tracking-wider group"
                >
                  Request instant quote
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
