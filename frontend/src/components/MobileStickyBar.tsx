import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PhoneCall, Truck } from 'lucide-react';
import { PHONE_NUMBER, PHONE_DISPLAY } from '../lib/constants';

export const MobileStickyBar: React.FC = () => {
  const location = useLocation();

  // Hide on admin routes or when user is already on booking page form
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-neutral-900/95 backdrop-blur-md border-t border-neutral-700/80 px-3 py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.35)] safe-area-pb">
      <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
        {/* Direct Call Button */}
        <a
          href={`tel:+91${PHONE_NUMBER}`}
          className="flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-600 text-white font-['Manrope'] font-bold text-xs py-3 px-3 rounded-xl border border-neutral-700 shadow transition-colors"
          aria-label={`Call Dispatch at ${PHONE_DISPLAY}`}
        >
          <PhoneCall size={16} className="text-[#8ad7a0] shrink-0" />
          <span className="truncate">Call Dispatch</span>
        </a>

        {/* 1-Hour WhatsApp Quote Button */}
        <Link
          to="/book-truck"
          className="flex items-center justify-center gap-1.5 bg-[#F4B400] hover:bg-[#e0a500] active:bg-[#c99500] text-[#6c5000] font-['Manrope'] font-extrabold text-xs py-3 px-2 rounded-xl shadow transition-colors uppercase tracking-wider"
          aria-label="Request 1-Hour WhatsApp Freight Quote"
        >
          <Truck size={16} className="text-[#6c5000] shrink-0" />
          <span className="truncate">1-Hr WhatsApp Quote</span>
        </Link>
      </div>
    </div>
  );
};
