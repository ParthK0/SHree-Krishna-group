import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Truck, Phone, Info, Wrench, Building2, MessageSquare, Calendar } from 'lucide-react';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const handleNavClick = (href: string) => {
    if (href.includes('#')) {
      const targetId = href.split('#')[1];
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const navLinks = [
    { name: 'Services', href: '/#services', icon: Wrench },
    { name: 'How It Works', href: '/#how-it-works', icon: Info },
    { name: 'Book a Truck', href: '/book-truck', icon: Truck },
    { name: 'Register Vehicle', href: '/register-truck', icon: Calendar },
    { name: 'Enquiry', href: '/enquiry', icon: MessageSquare },
    { name: 'About Us', href: '/#about-us', icon: Building2 },
    { name: 'Contact', href: '/contact', icon: Phone },
  ];

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

        <nav className="hidden lg:flex items-center justify-center gap-6 xl:gap-10 mx-auto">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`font-['Manrope'] text-[11px] font-bold transition-colors uppercase tracking-wider whitespace-nowrap ${
                  isActive ? 'text-[#0F6A37]' : 'text-[#3d4a3f] hover:text-[#0F6A37]'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          className="lg:hidden p-2 rounded-lg text-[#1a1f1b] hover:bg-[#dcd5c9] transition-colors focus:outline-none"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </header>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 right-0 z-50 h-full w-72 max-w-[85vw] bg-[#1C201D] text-white p-6 shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col justify-between ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-neutral-700 mb-6">
            <span className="font-bold text-lg text-white uppercase tracking-tight font-['Archivo_Narrow']">
              Navigation
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1 rounded-lg text-neutral-400 hover:text-[#0F6A37] transition-colors"
            >
              <X size={22} />
            </button>
          </div>

          <nav className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleNavClick(link.href);
                  }}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-lg font-['Manrope'] font-bold text-sm transition-all uppercase tracking-wider ${
                    isActive
                      ? 'bg-[#0F6A37] text-white'
                      : 'text-neutral-200 hover:text-white hover:bg-[#0F6A37]/30'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-white' : 'text-[#8ad7a0]'} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-neutral-800">
          <Link
            to="/book-truck"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full flex items-center justify-center gap-2 bg-[#F4B400] text-[#6c5000] font-['Manrope'] font-extrabold text-sm py-3 rounded-lg uppercase tracking-wider shadow-md hover:bg-[#e0a500] transition-colors"
          >
            <Truck size={18} />
            <span>Book a Truck</span>
          </Link>
        </div>
      </aside>
    </>
  );
};
