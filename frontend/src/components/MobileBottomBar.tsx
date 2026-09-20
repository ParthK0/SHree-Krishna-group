import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, Truck } from 'lucide-react';

export const MobileBottomBar: React.FC = () => {
  const location = useLocation();

  return (
    <nav
      aria-label="Mobile Bottom Quick Actions"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#071F35]/95 backdrop-blur-lg border-t border-white/10 px-3 py-2 shadow-2xl flex items-center justify-around"
    >
      {/* 1. Phone Call Action */}
      <a
        href="tel:+919784800833"
        className="flex flex-col items-center justify-center gap-1 text-[#D9E4EE] hover:text-white px-3 py-1 transition-colors group"
      >
        <div className="w-9 h-9 rounded-full bg-white/10 group-hover:bg-[#F5B51B] group-hover:text-[#071F35] flex items-center justify-center text-[#F5B51B] transition-all shadow-sm">
          <Phone size={17} />
        </div>
        <span className="text-[10px] font-bold font-['Manrope'] tracking-tight">Call Dispatch</span>
      </a>

      {/* 2. Quick Enquiry Form Action */}
      <Link
        to="/contact#enquiry"
        className="flex flex-col items-center justify-center gap-1 text-[#D9E4EE] hover:text-white px-3 py-1 transition-colors group"
      >
        <div className="w-9 h-9 rounded-full bg-white/10 group-hover:bg-sky-500 group-hover:text-white flex items-center justify-center text-sky-400 transition-all shadow-sm">
          <Mail size={17} />
        </div>
        <span className="text-[10px] font-bold font-['Manrope'] tracking-tight">Quick Enquiry</span>
      </Link>

      {/* 3. Book Truck / Freight Action */}
      <Link
        to="/book-truck"
        className={`flex flex-col items-center justify-center gap-1 px-3 py-1 transition-colors group ${
          location.pathname === '/book-truck' ? 'text-[#F5B51B]' : 'text-[#D9E4EE] hover:text-white'
        }`}
      >
        <div className="w-9 h-9 rounded-full bg-[#F5B51B] text-[#071F35] flex items-center justify-center font-bold transition-all shadow-md group-hover:scale-105">
          <Truck size={18} />
        </div>
        <span className="text-[10px] font-extrabold font-['Manrope'] tracking-tight">Book Truck</span>
      </Link>
    </nav>
  );
};
