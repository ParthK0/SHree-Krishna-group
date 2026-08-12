import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B192C] text-white py-12 px-4 text-center">
      <div className="max-w-[1200px] mx-auto space-y-6">
        
        {/* Brand Title */}
        <h3 className="text-xl font-black tracking-tight text-white uppercase">
          Shree Krishna Group
        </h3>

        {/* Copyright Tagline */}
        <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed font-medium">
          © {new Date().getFullYear()} Shree Krishna Group. Industrial Excellence in Construction & Logistics.
        </p>

        {/* Link Grid */}
        <div className="pt-2 flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-xs font-bold text-slate-300 max-w-lg mx-auto">
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
