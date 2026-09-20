import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquareText } from 'lucide-react';

export const FloatingQuickEnquiry: React.FC = () => {
  return (
    <div className="fixed bottom-5 right-4 md:bottom-6 md:right-6 z-30 group">
      <Link
        to="/contact#enquiry"
        aria-label="Send Quick Freight Enquiry via Email"
        className="relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#0B3A66] hover:bg-[#072442] text-white shadow-xl hover:shadow-2xl border-2 border-[#F5B51B] transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#85B7EB]/50"
      >
        {/* Soft pulse ring */}
        <span className="absolute -inset-1 rounded-full bg-[#F5B51B]/30 animate-ping pointer-events-none" />

        {/* Notification badge dot */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-[#F5B51B] border-2 border-[#0B3A66]" />

        {/* Message / Contact Icon */}
        <MessageSquareText size={22} className="relative z-10 text-[#F5B51B]" />
      </Link>

      {/* Hover tooltip for desktop */}
      <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 rounded-xl bg-[#071F35] text-white text-xs font-bold font-['Manrope'] whitespace-nowrap shadow-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden sm:block">
        Quick Freight Enquiry
        <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-[#071F35]" />
      </div>
    </div>
  );
};
