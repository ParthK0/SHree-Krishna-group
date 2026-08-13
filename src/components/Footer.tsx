import React from 'react';
import { WHATSAPP_NUMBER, PHONE_DISPLAY, CONTACT_EMAIL } from '../lib/whatsapp';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full px-4 md:px-12 bg-[#31312c] border-t border-[#bfc9be]/20">
      {/* Main footer row */}
      <div className="py-10 md:py-12 flex flex-col md:flex-row justify-between items-start gap-8">

        {/* Brand */}
        <div className="flex flex-col gap-2">
          <span className="font-['Archivo_Narrow'] text-xl font-bold text-[#fcf9f2] uppercase tracking-tight">
            SHREE KRISHNA TRANSPORT
          </span>
          <span className="font-['Manrope'] text-xs text-[#f3f0e9]/60 max-w-xs leading-relaxed">
            Connecting businesses with truck owners &amp; drivers across North India.
            Quote within 1 hour via WhatsApp.
          </span>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-3">
          <p className="font-['Manrope'] text-[10px] font-bold text-[#f3f0e9]/50 uppercase tracking-wider mb-1">Contact</p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-['Space_Mono'] text-xs text-[#e5e2db] hover:text-[#fcc019] transition-colors"
          >
            <span className="material-symbols-outlined text-[14px]">chat</span>
            {PHONE_DISPLAY} (WhatsApp)
          </a>
          <a
            href={`tel:+${WHATSAPP_NUMBER}`}
            className="flex items-center gap-2 font-['Space_Mono'] text-xs text-[#e5e2db] hover:text-[#fcc019] transition-colors"
          >
            <span className="material-symbols-outlined text-[14px]">call</span>
            {PHONE_DISPLAY}
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="flex items-center gap-2 font-['Space_Mono'] text-xs text-[#e5e2db] hover:text-[#fcc019] transition-colors"
          >
            <span className="material-symbols-outlined text-[14px]">mail</span>
            {CONTACT_EMAIL}
          </a>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-3">
          <p className="font-['Manrope'] text-[10px] font-bold text-[#f3f0e9]/50 uppercase tracking-wider mb-1">Quick Links</p>
          <a href="#forms" className="font-['Manrope'] text-xs text-[#e5e2db] hover:text-[#fcc019] transition-colors uppercase tracking-wider">Book a Truck</a>
          <a href="#forms" className="font-['Manrope'] text-xs text-[#e5e2db] hover:text-[#fcc019] transition-colors uppercase tracking-wider">Register Loads</a>
          <a href="#contact" className="font-['Manrope'] text-xs text-[#e5e2db] hover:text-[#fcc019] transition-colors uppercase tracking-wider">Contact Us</a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#bfc9be]/10 py-4 flex flex-col md:flex-row justify-between items-center gap-2">
        <span className="font-['Manrope'] text-[10px] text-[#f3f0e9]/40 uppercase tracking-wider">
          © {new Date().getFullYear()} Shree Krishna Transport. All rights reserved.
        </span>
        <div className="flex gap-4">
          <a href="#" className="font-['Manrope'] text-[10px] text-[#f3f0e9]/40 hover:text-[#fcc019] transition-colors uppercase tracking-wider">Privacy Policy</a>
          <a href="#" className="font-['Manrope'] text-[10px] text-[#f3f0e9]/40 hover:text-[#fcc019] transition-colors uppercase tracking-wider">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};
