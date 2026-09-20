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
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#071F35]/95 backdrop-blur-md border-t border-[#0B3A66]/60 px-3 py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.35)] safe-area-pb">
      <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
        {/* Direct Call Button */}
        <a
          href={`tel:+91${PHONE_NUMBER}`}
          className="flex items-center justify-center gap-2 bg-[#0B3A66] hover:bg-[#072D54] active:bg-[#051E38] text-white font-['Manrope'] font-bold text-xs py-3 px-3 rounded-xl border border-[#85B7EB]/30 shadow transition-colors"
          aria-label={`Call Dispatch at ${PHONE_DISPLAY}`}
        >
          <PhoneCall size={16} className="text-[#85B7EB] shrink-0" />
          <span className="truncate">Call Dispatch</span>
        </a>

        {/* 1-Hour WhatsApp Quote Button */}
        <Link
          to="/book-truck"
          className="flex items-center justify-center gap-1.5 bg-[#F5B51B] hover:bg-[#E0A212] active:bg-[#C89210] text-[#071F35] font-['Manrope'] font-extrabold text-xs py-3 px-2 rounded-xl shadow transition-colors uppercase tracking-wider"
          aria-label="Request 1-Hour WhatsApp Freight Quote"
        >
          <Truck size={16} className="text-[#071F35] shrink-0" />
          <span className="truncate">1-Hr WhatsApp Quote</span>
        </Link>
      </div>
    </div>
  );
};
