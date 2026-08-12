import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#022448] w-full text-white">
      <div className="w-full py-12 px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/10 max-w-[1200px] mx-auto">
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="text-lg font-extrabold tracking-tight text-white uppercase">
            Shree Krishna Group
          </div>
          <div className="text-xs text-white/70">
            © {new Date().getFullYear()} Shree Krishna Buildtech & Shree Krishna Transport. All rights reserved.
          </div>
        </div>

        <nav className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs font-bold">
          <a className="text-white/70 hover:text-white transition-opacity uppercase" href="#buildtech">
            Buildtech
          </a>
          <a className="text-white/70 hover:text-white transition-opacity uppercase" href="#transport">
            Transport Fleet
          </a>
          <a className="text-white/70 hover:text-white transition-opacity uppercase" href="#services">
            Capabilities
          </a>
          <a className="text-white/70 hover:text-white transition-opacity uppercase" href="#booking">
            Truck Booking
          </a>
          <a className="text-white/70 hover:text-white transition-opacity uppercase" href="#careers">
            Driver Network
          </a>
        </nav>
      </div>
    </footer>
  );
};
