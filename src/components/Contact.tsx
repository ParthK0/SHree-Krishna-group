import React from 'react';
import { WHATSAPP_NUMBER } from '../lib/whatsapp';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="bg-[#EEF2F6] border-t border-gray-300 py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="bg-white border border-gray-300 p-8 text-center max-w-2xl mx-auto space-y-4 shadow-2xs">
          <span className="text-xs font-black uppercase text-[#1B2A4A] tracking-wider block">
            OPERATIONS & DISPATCH
          </span>
          
          <h2 className="text-2xl font-extrabold text-[#1A202C] uppercase">
            Contact Operations
          </h2>

          <p className="text-xs md:text-sm text-[#475569] font-medium leading-relaxed">
            Reach out directly for civil project estimation, sanitaryware supplies, or commercial logistics quotes starting from Jaipur, Rajasthan.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-bold">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-dark-navy w-full sm:w-auto px-8 py-3 uppercase tracking-wider text-center"
            >
              Direct WhatsApp (+91 97848 00833)
            </a>
            <a
              href="mailto:deepesh3052@gmail.com"
              className="btn-dark-charcoal w-full sm:w-auto px-8 py-3 uppercase tracking-wider text-center"
            >
              Email Dispatch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
