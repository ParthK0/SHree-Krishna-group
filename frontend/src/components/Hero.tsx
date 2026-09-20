import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, Menu, X, Truck, Package, MapPin, BookOpen, Phone, 
  Wrench, Info, Building2, Calendar, ChevronRight, CheckCircle2, ArrowRight 
} from 'lucide-react';

export const Hero: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Prevent background scrolling and handle Escape key when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDrawerOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [drawerOpen]);

  const handleSmoothScroll = (id: string) => {
    setDrawerOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Full list of navigation items for the 3-line menu drawer
  const menuItems = [
    { name: 'Home', href: '/', icon: Home, isRoute: true },
    { name: 'Book a Truck', href: '/book-truck', icon: Truck, isRoute: true, highlight: true },
    { name: 'Book a Parcel', href: '/book-truck?type=parcel', icon: Package, isRoute: true, badge: '0–150 kg' },
    { name: 'Routes', href: '/routes', icon: MapPin, isRoute: true },
    { name: 'Blog', href: '/blog', icon: BookOpen, isRoute: true },
    { name: 'Contact', href: '/contact', icon: Phone, isRoute: true },
    { name: 'Services', href: 'services', icon: Wrench, isRoute: false },
    { name: 'How It Works', href: 'how-it-works', icon: Info, isRoute: false },
    { name: 'About Us', href: 'about-us', icon: Building2, isRoute: false },
    { name: 'Register Vehicle', href: '/register-truck', icon: Calendar, isRoute: true },
  ];

  return (
    // White background padding frame
    <section className="w-full h-[100dvh] min-h-[560px] bg-white flex items-center justify-center p-1.5 sm:p-2 md:p-3">
      
      {/* 
        Image Card Box:
        Fills the container evenly so the white border is thin and uniform on all 4 sides
      */}
      <div className="relative w-full h-full overflow-hidden rounded-xl sm:rounded-2xl md:rounded-[22px] shadow-md border border-neutral-100">
        <img
          src="/images/homefinal.webp"
          alt="Shree Krishna Transport Fleet"
          className="w-full h-full object-cover object-[65%_center] sm:object-center"
        />

        {/* 
          1. Directional Gradient (DARK on Left -> LIGHT on Right):
             Darkness reduced by another 15% for maximum brightness & scenery visibility
        */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/35 sm:via-black/25 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-black/[0.06] pointer-events-none" />

        {/* 
          2. Top Header Bar:
             [LOGO]                         SERVICES  ROUTES  ABOUT  CONTACT   [☰]
             Subtle, grounded dark translucent glass header
        */}
        {/* 
          2. Top Header Bar:
             [LOGO]                     [SERVICES  ROUTES  ABOUT  CONTACT]                   [☰]
             Subtle, grounded dark translucent glass header with centered navbar
        */}
        <div className="absolute top-2.5 left-2.5 right-2.5 sm:top-3 sm:left-6 sm:right-6 z-20 flex items-center justify-between">
          
          {/* Logo & Brand Name */}
          <Link to="/" className="inline-flex items-center gap-2 group shrink-0 z-20">
            <img
              src="/images/logo.png"
              alt="Shree Krishna Transport Logo"
              className="h-8 sm:h-9 w-auto object-contain drop-shadow-md transition-transform group-hover:scale-105"
            />
            <span className="font-['Archivo_Narrow'] font-bold tracking-tight text-white uppercase text-base sm:text-lg leading-none drop-shadow-md">
              SHREE KRISHNA TRANSPORT
            </span>
          </Link>

          {/* Centered Desktop Navigation Bar */}
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-5 lg:gap-7 px-5 py-2 rounded-full bg-[#071F35]/35 hover:bg-[#071F35]/50 backdrop-blur-md border border-white/15 shadow-sm transition-colors z-20">
            <Link
              to="/"
              className="text-white hover:text-[#F5B51B] font-['Manrope'] font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors"
            >
              Home
            </Link>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll('services');
              }}
              className="text-[#D9E4EE] hover:text-[#F5B51B] font-['Manrope'] font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors"
            >
              Services
            </a>
            <Link
              to="/routes"
              className="text-[#D9E4EE] hover:text-[#F5B51B] font-['Manrope'] font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors"
            >
              Routes
            </Link>
            <a
              href="#about-us"
              onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll('about-us');
              }}
              className="text-[#D9E4EE] hover:text-[#F5B51B] font-['Manrope'] font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors"
            >
              About
            </a>
            <Link
              to="/contact"
              className="text-[#D9E4EE] hover:text-[#F5B51B] font-['Manrope'] font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* 3-Line Menu Button */}
          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="Open Navigation Menu"
            className="p-2 sm:p-2.5 rounded-full bg-[#071F35]/35 hover:bg-[#071F35]/60 text-white backdrop-blur-md border border-white/15 shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center group z-20 shrink-0"
          >
            <Menu size={20} className="text-white group-hover:text-[#F5B51B] transition-colors" />
          </button>
        </div>

        {/* 
          3. Hero Content on Left:
             - Headline in Crisp Pure White #FFFFFF
             - Secondary text in #D9E4EE
             - Amber #F5B51B Primary CTA + Deep Navy Blue Secondary CTA
             - Trust Row with Blue Accents
        */}
        <div className="absolute inset-0 flex items-center px-4 sm:px-8 md:px-12 lg:px-14 z-10 pointer-events-none">
          <div className="max-w-2xl text-left pointer-events-auto translate-y-3 sm:translate-y-4 md:translate-y-5">
            
            {/* Main Headline */}
            <h1 className="font-['Archivo_Narrow'] text-2xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold text-white uppercase tracking-tight leading-[1.08] drop-shadow-2xl">
              Reliable Freight Transportation From Rajasthan to All India
            </h1>

            {/* Value Proposition Description in Secondary Text #D9E4EE */}
            <p className="mt-3 sm:mt-4 text-[#D9E4EE] font-['Manrope'] font-normal text-xs sm:text-sm md:text-base lg:text-[17px] leading-relaxed drop-shadow-md max-w-xl">
              Move your cargo with dependable transportation solutions, transparent pricing, and trusted transport partners across India.
            </p>

            {/* CTA Hierarchy: Primary = Amber #F5B51B, Secondary = Brand Blue */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-5 sm:mt-6">
              {/* Amber Primary Button */}
              <Link
                to="/book-truck"
                className="inline-flex items-center justify-center gap-2 bg-[#F5B51B] hover:bg-[#E0A212] text-[#071F35] font-['Manrope'] font-extrabold text-xs sm:text-sm uppercase tracking-wider px-7 sm:px-8 py-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 hover:-translate-y-0.5 group"
              >
                <span>Get a Freight Quote</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 text-[#071F35]" />
              </Link>

              {/* Blue Secondary Button — Direct Call to Dispatch */}
              <a
                href="tel:+919784800833"
                className="inline-flex items-center justify-center gap-2.5 bg-[#0B3A66] hover:bg-[#072d54] text-white font-['Manrope'] font-bold text-xs sm:text-sm uppercase tracking-wider px-7 sm:px-8 py-3.5 rounded-full border border-[#85B7EB]/40 shadow-xl hover:shadow-2xl transition-all duration-200 hover:-translate-y-0.5 group"
              >
                <Phone size={17} className="transition-transform group-hover:scale-110 text-[#F5B51B]" />
                <span>Call Dispatch: +91 97848 00833</span>
              </a>
            </div>

            {/* Credible Response Promise */}
            <p className="mt-2.5 text-[11px] sm:text-xs text-[#D9E4EE] font-['Manrope']">
              Request a freight quote and hear back within <span className="text-[#60A5FA] font-bold">60 minutes</span>.
            </p>

            {/* Horizontal Trust Row */}
            <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2 mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-white/15 text-[#D9E4EE] text-xs sm:text-sm font-['Manrope']">
              <div className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-[#60A5FA] shrink-0" />
                <span>Pan-India Delivery</span>
              </div>
              <div className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-[#60A5FA] shrink-0" />
                <span>Verified Transport Partners</span>
              </div>
              <div className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-[#60A5FA] shrink-0" />
                <span>E-Way Bill Support</span>
              </div>
              <div className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-[#60A5FA] shrink-0" />
                <span>Quote Within 60 Min</span>
              </div>
            </div>

          </div>
        </div>

        {/* 
          4. Slide-Out Menu Drawer & Backdrop (#071F35 Dark Section with Amber Accents)
        */}
        {drawerOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />
        )}

        <aside
          className={`fixed top-0 right-0 z-50 h-full w-80 max-w-[85vw] bg-[#071F35]/95 backdrop-blur-2xl text-white p-6 shadow-2xl border-l border-white/15 transform transition-transform duration-300 ease-in-out flex flex-col justify-between overflow-y-auto ${
            drawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div>
            {/* Drawer Top: Header and Close Button */}
            <div className="flex items-center justify-between pb-4 border-b border-white/15">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#F5B51B] animate-pulse" />
                <span className="font-['Archivo_Narrow'] font-extrabold text-lg text-white uppercase tracking-wider">
                  Menu &amp; Services
                </span>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                aria-label="Close Navigation Menu"
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Menu Links */}
            <nav className="flex flex-col gap-1.5 mt-5">
              {menuItems.map((item) => {
                const Icon = item.icon;
                
                if (item.isRoute) {
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setDrawerOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-3 rounded-xl font-['Manrope'] font-bold text-xs sm:text-sm uppercase tracking-wider transition-all ${
                        item.highlight 
                          ? 'bg-[#F5B51B] text-[#071F35] shadow-md hover:bg-[#E0A212]' 
                          : 'text-[#D9E4EE] hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={18} className={item.highlight ? 'text-[#071F35]' : 'text-[#F5B51B]'} />
                        <span>{item.name}</span>
                      </div>
                      {item.badge ? (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/15 text-[#D9E4EE] font-['Space_Mono'] font-bold">
                          {item.badge}
                        </span>
                      ) : (
                        <ChevronRight size={15} className={item.highlight ? 'text-[#071F35]' : 'text-neutral-400'} />
                      )}
                    </Link>
                  );
                }

                return (
                  <a
                    key={item.name}
                    href={`#${item.href}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSmoothScroll(item.href);
                    }}
                    className="flex items-center justify-between px-3.5 py-3 rounded-xl font-['Manrope'] font-bold text-xs sm:text-sm uppercase tracking-wider text-[#D9E4EE] hover:text-white hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} className="text-[#F5B51B]" />
                      <span>{item.name}</span>
                    </div>
                    <ChevronRight size={15} className="text-neutral-400" />
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Drawer Bottom Quick Action */}
          <div className="pt-6 border-t border-white/15 space-y-2 shrink-0">
            <Link
              to="/book-truck"
              onClick={() => setDrawerOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-[#F5B51B] hover:bg-[#E0A212] text-[#071F35] font-['Manrope'] font-extrabold text-xs py-3 rounded-xl uppercase tracking-wider shadow-lg transition-all"
            >
              <Truck size={16} />
              <span>Book a Truck Instantly</span>
            </Link>
          </div>
        </aside>

      </div>
    </section>
  );
};
