import React, { useState } from 'react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Buildtech', href: '#buildtech' },
    { name: 'Transport', href: '#transport' },
    { name: 'Services', href: '#services' },
    { name: 'Booking', href: '#booking' },
    { name: 'Careers', href: '#careers' },
  ];

  return (
    <header className="bg-white sticky top-0 w-full z-50 border-b border-gray-200/80 shadow-xs">
      <div className="flex justify-between items-center h-16 w-full px-4 md:px-8 max-w-[1200px] mx-auto">
        
        {/* Brand */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-[#022448] text-white flex items-center justify-center font-black text-sm tracking-tighter">
            SK
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight text-[#022448] group-hover:text-[#1E3A5F] transition-colors leading-none">
              Shree Krishna Group
            </span>
            <span className="text-[10px] font-bold text-[#43474E] uppercase tracking-wider mt-0.5">
              Buildtech & Transport
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[#43474E] text-sm font-semibold hover:text-[#022448] hover:bg-[#EDF1F5] transition-all px-3 py-1.5"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Contact CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a 
            href="#contact" 
            className="btn-primary px-6 py-2.5 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5"
          >
            Contact Us
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-[#022448] p-2"
          aria-label="Toggle Menu"
        >
          <span className="material-symbols-outlined text-2xl">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-6 py-4 space-y-3 shadow-lg animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#022448] font-bold text-sm py-2 border-b border-gray-100 hover:text-[#1E3A5F]"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="pt-2">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary w-full py-3 text-center text-xs font-bold uppercase tracking-wider block"
            >
              Contact Us
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
