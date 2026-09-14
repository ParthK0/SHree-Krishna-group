import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, Truck, Phone, Info, Wrench, Building2, 
  MessageSquare, Calendar, Package, MapPin, BookOpen, ChevronDown 
} from 'lucide-react';

interface NavLinkItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown when route changes
  useEffect(() => {
    setMoreDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [location]);

  const handleNavClick = (href: string) => {
    if (href.includes('#')) {
      const [path, hash] = href.split('#');
      if (location.pathname === path || (path === '/' && location.pathname === '')) {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  };

  // 5 Primary Links as requested
  const primaryLinks: NavLinkItem[] = [
    { name: 'Book Truck', href: '/book-truck', icon: Truck },
    { name: 'Book Parcel', href: '/book-truck?type=parcel', icon: Package, badge: '0–150 kg' },
    { name: 'Routes', href: '/routes', icon: MapPin },
    { name: 'Blog', href: '/blog', icon: BookOpen },
    { name: 'Contact', href: '/contact', icon: Phone },
  ];

  // Secondary Links for "More" Dropdown
  const moreLinks: NavLinkItem[] = [
    { name: 'Services', href: '/#services', icon: Wrench },
    { name: 'How It Works', href: '/#how-it-works', icon: Info },
    { name: 'About Us', href: '/#about-us', icon: Building2 },
    { name: 'Enquiry', href: '/contact#enquiry', icon: MessageSquare },
    { name: 'Register Vehicle', href: '/register-truck', icon: Calendar },
  ];

  const isMoreActive = moreLinks.some(
    (link) => location.pathname === link.href.split('#')[0] && (link.href.includes('#') ? location.hash === `#${link.href.split('#')[1]}` : true)
  );

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full flex items-center justify-between px-4 md:px-12 bg-[#ECE6DD]/95 backdrop-blur-md border-b border-[#e5ebe7] transition-all duration-300 ${
          scrolled ? 'py-1.5 shadow-md' : 'py-2.5'
        }`}
      >
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <img
            alt="Shree Krishna Transport Logo"
            className={`object-contain transition-all duration-300 ${scrolled ? 'h-7 md:h-8' : 'h-8 md:h-9.5'}`}
            src="/images/logo.png"
          />
          <span className={`font-['Archivo_Narrow'] font-bold tracking-tight text-[#1a1f1b] uppercase transition-all duration-300 ${scrolled ? 'text-sm sm:text-base' : 'text-base sm:text-lg'}`}>
            SHREE KRISHNA TRANSPORT
          </span>
        </Link>

        {/* Desktop Navigation: 5 Primary + "More" Dropdown */}
        <nav className="hidden lg:flex items-center justify-center gap-4 xl:gap-6 mx-auto">
          {primaryLinks.map((link) => {
            const isActive =
              location.pathname + location.search === link.href ||
              (link.href === '/book-truck' && location.pathname === '/book-truck' && !location.search);

            return (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`font-['Manrope'] text-xs font-bold transition-colors uppercase tracking-wider whitespace-nowrap inline-flex items-center gap-1.5 ${
                  isActive ? 'text-[#0F6A37]' : 'text-[#3d4a3f] hover:text-[#0F6A37]'
                }`}
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded font-['Space_Mono'] font-bold bg-[#0F6A37]/10 text-[#0F6A37] border border-[#0F6A37]/30">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}

          {/* "More" Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
              onMouseEnter={() => setMoreDropdownOpen(true)}
              aria-expanded={moreDropdownOpen}
              className={`font-['Manrope'] text-xs font-bold uppercase tracking-wider whitespace-nowrap inline-flex items-center gap-1 py-1 px-2 rounded-md transition-colors ${
                isMoreActive || moreDropdownOpen
                  ? 'text-[#0F6A37] bg-[#0F6A37]/10'
                  : 'text-[#3d4a3f] hover:text-[#0F6A37]'
              }`}
            >
              <span>More</span>
              <ChevronDown 
                size={14} 
                className={`transition-transform duration-200 ${moreDropdownOpen ? 'rotate-180 text-[#0F6A37]' : ''}`} 
              />
            </button>

            {/* Dropdown Menu */}
            {moreDropdownOpen && (
              <div 
                onMouseLeave={() => setMoreDropdownOpen(false)}
                className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-[#c5beb4] py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
              >
                {moreLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={() => {
                        setMoreDropdownOpen(false);
                        handleNavClick(link.href);
                      }}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-['Manrope'] font-bold text-[#3d4a3f] hover:text-[#0F6A37] hover:bg-[#F4EFE6] transition-colors uppercase tracking-wider"
                    >
                      <Icon size={15} className="text-[#0F6A37]/70 shrink-0" />
                      <span>{link.name}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          className="lg:hidden p-2 rounded-lg text-[#1a1f1b] hover:bg-[#dcd5c9] transition-colors focus:outline-none"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </header>

      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-72 max-w-[85vw] bg-[#1C201D] text-white p-6 shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col justify-between overflow-y-auto ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-700">
            <span className="font-bold text-base text-white uppercase tracking-tight font-['Archivo_Narrow']">
              Navigation Menu
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1 rounded-lg text-neutral-400 hover:text-[#0F6A37] transition-colors"
            >
              <X size={22} />
            </button>
          </div>

          {/* Primary Navigation Section */}
          <div>
            <div className="text-[10px] font-['Space_Mono'] uppercase tracking-widest text-[#8ad7a0] font-bold mb-2">
              Primary Quick Links
            </div>
            <nav className="flex flex-col gap-1">
              {primaryLinks.map((link) => {
                const Icon = link.icon;
                const isActive =
                  location.pathname + location.search === link.href ||
                  (link.href === '/book-truck' && location.pathname === '/book-truck' && !location.search);

                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleNavClick(link.href);
                    }}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg font-['Manrope'] font-bold text-xs transition-all uppercase tracking-wider ${
                      isActive
                        ? 'bg-[#0F6A37] text-white'
                        : 'text-neutral-200 hover:text-white hover:bg-[#0F6A37]/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={16} className={isActive ? 'text-white' : 'text-[#8ad7a0]'} />
                      <span>{link.name}</span>
                    </div>
                    {link.badge && (
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-['Space_Mono'] font-bold ${
                        isActive ? 'bg-[#F4B400] text-[#6c5000]' : 'bg-[#0F6A37]/30 text-[#8ad7a0]'
                      }`}>
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Secondary / More Section */}
          <div className="pt-4 border-t border-neutral-800">
            <div className="text-[10px] font-['Space_Mono'] uppercase tracking-widest text-neutral-400 font-bold mb-2">
              More Services & Info
            </div>
            <nav className="flex flex-col gap-1">
              {moreLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleNavClick(link.href);
                    }}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg font-['Manrope'] font-semibold text-xs text-neutral-300 hover:text-white hover:bg-neutral-800/80 transition-all uppercase tracking-wider"
                  >
                    <Icon size={15} className="text-neutral-500" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Bottom Booking CTAs */}
        <div className="pt-6 border-t border-neutral-800 space-y-2 shrink-0">
          <Link
            to="/book-truck"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full flex items-center justify-center gap-2 bg-[#F4B400] text-[#6c5000] font-['Manrope'] font-extrabold text-xs py-2.5 rounded-lg uppercase tracking-wider shadow-md hover:bg-[#e0a500] transition-colors"
          >
            <Truck size={15} />
            <span>Book a Truck (FTL/PTL)</span>
          </Link>
          <Link
            to="/book-truck?type=parcel"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full flex items-center justify-center gap-2 bg-[#0F6A37] text-white font-['Manrope'] font-extrabold text-xs py-2.5 rounded-lg uppercase tracking-wider shadow-md hover:bg-[#0c562c] transition-colors"
          >
            <Package size={15} />
            <span>Book a Parcel (0–150 kg)</span>
          </Link>
        </div>
      </aside>
    </>
  );
};
