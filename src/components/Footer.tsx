import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#071C38] text-white py-12 px-4 text-center border-t border-[#0D2C54]">
      <div className="max-w-[1200px] mx-auto space-y-5">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center justify-center gap-3">
          <img src="/logo.svg" alt="Shree Krishna Group Logo" className="w-8 h-8 object-contain filter brightness-200 contrast-125" />
          <h3 className="text-xl font-black tracking-tight text-white uppercase">
            Shree Krishna Group
          </h3>
        </div>

        {/* Copyright Tagline */}
        <p className="text-xs text-[#B8D1E8] max-w-md mx-auto leading-relaxed font-medium">
          © {new Date().getFullYear()} Shree Krishna Group. Industrial Excellence in Construction & Logistics.
        </p>

        {/* Link Grid */}
        <div className="pt-2 flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-xs font-bold text-[#E1EBF5] max-w-lg mx-auto">
          <a href="#about" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
          <a href="#services" className="hover:text-white transition-colors">
            Terms of Service
          </a>
          <a href="#buildtech" className="hover:text-white transition-colors">
            Safety Standards
          </a>
          <a href="#transport" className="hover:text-white transition-colors">
            Fleet Details
          </a>
        </div>

      </div>
    </footer>
  );
};
