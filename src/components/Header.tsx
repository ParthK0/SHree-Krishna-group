import React, { useEffect, useState } from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { WHATSAPP_NUMBER, PHONE_DISPLAY } from '../lib/whatsapp';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full flex justify-between items-center px-4 md:px-12 bg-[#ECE6DD]/95 backdrop-blur-md border-b border-[#e5ebe7] transition-all duration-300 ${
        scrolled ? 'py-2.5 shadow-md' : 'py-4'
      }`}
    >
      {/* Brand */}
      <a href="#" className="flex items-center gap-2.5 group">
        <img
          alt="Shree Krishna Transport Logo"
          className={`object-contain transition-all duration-300 ${scrolled ? 'h-7' : 'h-8'}`}
          src="/logo.svg"
        />
        <span className={`font-['Archivo_Narrow'] font-bold tracking-tight text-[#1a1f1b] uppercase transition-all duration-300 ${scrolled ? 'text-lg' : 'text-xl'}`}>
          SHREE KRISHNA TRANSPORT
        </span>
      </a>

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-6">
        <a className="font-['Manrope'] text-xs font-bold text-[#3d4a3f] hover:text-[#0F6A37] transition-colors uppercase tracking-wider" href="#book-truck">
          Book a Truck
        </a>
        <a className="font-['Manrope'] text-xs font-bold text-[#3d4a3f] hover:text-[#0F6A37] transition-colors uppercase tracking-wider" href="#register-truck">
          Register Vehicle
        </a>
        <a className="font-['Manrope'] text-xs font-bold text-[#3d4a3f] hover:text-[#0F6A37] transition-colors uppercase tracking-wider" href="#how-it-works">
          How It Works
        </a>
      </div>

      {/* Action Area */}
      <div className="flex items-center gap-4">
        {/* Utility Contact Links */}
        <div className="hidden sm:flex items-center gap-3 text-xs font-['Manrope'] font-medium text-neutral-600 border-r border-neutral-300 pr-3">
          <a
            className="flex items-center gap-1 hover:text-[#0F6A37] transition-colors"
            href={`tel:+${WHATSAPP_NUMBER}`}
          >
            <Phone size={13} className="text-neutral-500" />
            <span>{PHONE_DISPLAY}</span>
          </a>
          <a
            className="flex items-center gap-1 hover:text-[#0F6A37] transition-colors"
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={13} className="text-[#0F6A37]" />
            <span className="text-[#0F6A37] font-semibold">WhatsApp</span>
          </a>
        </div>

        {/* Primary Navbar CTA */}
        <a
          href="#book-truck"
          className="bg-[#F4B400] hover:bg-[#e0a500] text-[#6c5000] font-['Manrope'] font-extrabold text-xs px-4 py-2 rounded shadow-sm transition-all duration-200 uppercase tracking-wider"
        >
          Book a Truck
        </a>
      </div>
    </header>
  );
};
