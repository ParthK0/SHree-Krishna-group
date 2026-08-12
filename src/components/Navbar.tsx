import React, { useState } from 'react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Buildtech', href: '#buildtech' },
    { name: 'Transport', href: '#transport' },
    { name: 'Services', href: '#services' },
    { name: 'Logistics Operations', href: '#booking' },
    { name: 'Contact Us', href: '#contact' },
  ];

  return (
    <header className="bg-white border-b border-[#B8D1E8] sticky top-0 z-50 shadow-2xs">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Brand Logo & Title */}
        <a href="#home" className="flex items-center gap-3 group">
          <img 
            src="/logo.svg" 
            alt="Shree Krishna Group Official Logo" 
            className="w-9 h-9 object-contain group-hover:scale-105 transition-transform" 
          />
          <div className="flex flex-col">
            <span className="font-black text-lg tracking-tight text-[#0D2C54] leading-none">
              Shree Krishna Group
            </span>
            <span className="text-[10px] font-bold text-[#133E75] uppercase tracking-wider mt-0.5">
              Buildtech & Transport
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-extrabold uppercase tracking-wider text-[#133E75] hover:text-[#0D2C54] transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center">
          <a
            href="#booking"
            className="btn-dark-navy px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider shadow-xs"
          >
            Book a Truck
          </a>
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#0D2C54] focus:outline-none"
          aria-label="Toggle Menu"
        >
          <span className="material-symbols-outlined text-2xl font-bold">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#B8D1E8] px-6 py-4 space-y-3 shadow-md animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-extrabold text-[#0D2C54] py-1.5 border-b border-gray-100 hover:text-[#071C38]"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="pt-2">
            <a
              href="#booking"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-dark-navy w-full py-3 text-center text-xs font-bold uppercase tracking-wider block"
            >
              Book a Truck
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
