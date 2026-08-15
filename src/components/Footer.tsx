import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Mail, MapPin, Clock, Truck, ArrowRight } from 'lucide-react';
import {
  BUSINESS_NAME, PHONE_DISPLAY, WHATSAPP_NUMBER, CONTACT_EMAIL,
  GSTIN, ADDRESS_LINE1, ADDRESS_LINE2, ADDRESS_CITY, ADDRESS_STATE,
  ADDRESS_PIN, BUSINESS_HOURS,
} from '../lib/constants';

export const Footer: React.FC = () => {
  const quickLinks = [
    { label: 'Book a Truck', href: '/book-truck' },
    { label: 'Register Vehicle', href: '/register-truck' },
    { label: 'General Enquiry', href: '/enquiry' },
    { label: 'About Us', href: '/#about-us' },
    { label: 'Contact', href: '/contact' },
  ];

  const legalLinks = [
    { label: 'Terms & Conditions', href: '/terms-and-conditions' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Cancellation & Refund', href: '/cancellation-refund-policy' },
  ];

  return (
    <footer id="contact" className="w-full bg-[#1a1d1a] border-t border-neutral-800">

      {/* Main 4-Column Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-8 md:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6">

          {/* Column 1 — Company */}
          <div className="space-y-3">
            <Link to="/" className="flex items-center gap-2">
              <img
                alt="Shree Krishna Transport Logo"
                className="h-8 w-auto object-contain"
                src="/images/logo.png"
              />
              <span className="font-['Archivo_Narrow'] text-sm sm:text-base font-bold text-white uppercase tracking-tight leading-tight">
                SHREE KRISHNA<br />TRANSPORT
              </span>
            </Link>

            <p className="font-['Manrope'] text-[11px] text-neutral-400 leading-relaxed">
              Reliable transportation services from Rajasthan to All India. Backed by Shree Krishna Buildtech.
            </p>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-neutral-300">
                <Clock size={13} className="text-[#F4B400] shrink-0" />
                <span className="font-['Manrope'] text-[11px] font-semibold">Quote Within 1 Hour</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-300">
                <Truck size={13} className="text-[#8ad7a0] shrink-0" />
                <span className="font-['Manrope'] text-[11px] font-semibold">PAN India Network</span>
              </div>
            </div>

            {/* GST Badge */}
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-[#0F6A37]/50 bg-[#0F6A37]/10">
              <span className="font-['Manrope'] text-[9px] font-bold text-[#8ad7a0] uppercase tracking-wider">
                GST Registered Business
              </span>
            </div>
          </div>

          {/* Column 2 — Contact */}
          <div className="space-y-3">
            <h3 className="font-['Archivo_Narrow'] text-xs font-bold text-white uppercase tracking-widest border-b border-neutral-800 pb-1.5">
              Contact
            </h3>

            <div className="space-y-2">
              <a
                href={`tel:+91${PHONE_DISPLAY.replace(/\D/g,'').slice(-10)}`}
                className="flex items-start gap-2 group"
              >
                <Phone size={13} className="text-[#F4B400] shrink-0 mt-0.5" />
                <div>
                  <div className="font-['Manrope'] text-[9px] font-bold text-neutral-500 uppercase tracking-wider">Phone</div>
                  <span className="font-['Space_Mono'] text-xs text-neutral-300 group-hover:text-white transition-colors">{PHONE_DISPLAY}</span>
                </div>
              </a>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 group"
              >
                <MessageCircle size={13} className="text-[#25D366] shrink-0 mt-0.5" />
                <div>
                  <div className="font-['Manrope'] text-[9px] font-bold text-neutral-500 uppercase tracking-wider">WhatsApp</div>
                  <span className="font-['Space_Mono'] text-xs text-neutral-300 group-hover:text-white transition-colors">{PHONE_DISPLAY}</span>
                </div>
              </a>

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-start gap-2 group"
              >
                <Mail size={13} className="text-[#8ad7a0] shrink-0 mt-0.5" />
                <div>
                  <div className="font-['Manrope'] text-[9px] font-bold text-neutral-500 uppercase tracking-wider">Email</div>
                  <span className="font-['Space_Mono'] text-xs text-neutral-300 group-hover:text-white transition-colors break-all">{CONTACT_EMAIL}</span>
                </div>
              </a>

              <div className="flex items-start gap-2">
                <Clock size={13} className="text-[#F4B400] shrink-0 mt-0.5" />
                <div>
                  <div className="font-['Manrope'] text-[9px] font-bold text-neutral-500 uppercase tracking-wider">Business Hours</div>
                  <span className="font-['Space_Mono'] text-xs text-neutral-300">{BUSINESS_HOURS}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3 — Registered Office */}
          <div className="space-y-3">
            <h3 className="font-['Archivo_Narrow'] text-xs font-bold text-white uppercase tracking-widest border-b border-neutral-800 pb-1.5">
              Registered Office
            </h3>

            <div className="flex items-start gap-2">
              <MapPin size={13} className="text-[#F4B400] shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <p className="font-['Manrope'] text-xs font-bold text-white">{BUSINESS_NAME}</p>
                <p className="font-['Manrope'] text-[11px] text-neutral-400 leading-relaxed">
                  {ADDRESS_LINE1}, {ADDRESS_LINE2},<br />
                  {ADDRESS_CITY}, {ADDRESS_STATE} – {ADDRESS_PIN}, India
                </p>
              </div>
            </div>

            <div className="pt-1.5 border-t border-neutral-800">
              <div className="font-['Manrope'] text-[9px] font-bold text-neutral-500 uppercase tracking-wider mb-0.5">GSTIN</div>
              <div className="font-['Space_Mono'] text-xs text-[#8ad7a0] tracking-wide">{GSTIN}</div>
            </div>
          </div>

          {/* Column 4 — Quick Links + Legal */}
          <div className="space-y-3">
            <h3 className="font-['Archivo_Narrow'] text-xs font-bold text-white uppercase tracking-widest border-b border-neutral-800 pb-1.5">
              Quick Links
            </h3>

            <nav className="grid grid-cols-1 gap-1">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="flex items-center gap-1.5 font-['Manrope'] text-[11px] text-neutral-400 hover:text-white transition-colors group"
                >
                  <ArrowRight size={11} className="text-[#0F6A37] group-hover:translate-x-0.5 transition-transform" />
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="pt-2 border-t border-neutral-800">
              <h4 className="font-['Archivo_Narrow'] text-[10px] font-bold text-white uppercase tracking-widest mb-1.5">
                Legal
              </h4>
              <nav className="grid grid-cols-1 gap-1">
                {legalLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="flex items-center gap-1.5 font-['Manrope'] text-[11px] text-neutral-400 hover:text-white transition-colors group"
                  >
                    <ArrowRight size={11} className="text-[#0F6A37] group-hover:translate-x-0.5 transition-transform" />
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-2.5 flex flex-col sm:flex-row justify-between items-center gap-1.5">
          <span className="font-['Manrope'] text-[10px] text-neutral-500 text-center">
            © {new Date().getFullYear()} {BUSINESS_NAME}. All Rights Reserved.
          </span>
          <span className="font-['Space_Mono'] text-[10px] text-neutral-600 text-center">
            GSTIN: {GSTIN}
          </span>
        </div>
      </div>

    </footer>
  );
};
