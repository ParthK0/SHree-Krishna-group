import React from 'react';
import { WHATSAPP_NUMBER } from '../lib/whatsapp';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="bg-[#E1EBF5] border-t border-[#B8D1E8] py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="bg-white border border-[#B8D1E8] p-8 text-center max-w-2xl mx-auto space-y-4 shadow-2xs relative overflow-hidden">
          
          <img src="/logo.svg" alt="SK Seal" className="w-12 h-12 object-contain mx-auto mb-2 opacity-90" />

          <span className="text-xs font-black uppercase text-[#0D2C54] tracking-wider block">
            OPERATIONS & DISPATCH
          </span>
          
          <h2 className="text-2xl font-extrabold text-[#0D2C54] uppercase">
            Contact Operations
          </h2>

          <p className="text-xs md:text-sm text-[#133E75] font-medium leading-relaxed max-w-lg mx-auto">
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
