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
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Column 1 — Company */}
          <div className="space-y-5">
            <Link to="/" className="flex items-center gap-2.5">
              <img
                alt="Shree Krishna Transport Logo"
                className="h-9 w-auto object-contain"
                src="/images/logo.png"
              />
              <span className="font-['Archivo_Narrow'] text-base font-bold text-white uppercase tracking-tight leading-tight">
                SHREE KRISHNA<br />TRANSPORT
              </span>
            </Link>

            <p className="font-['Manrope'] text-xs text-neutral-400 leading-relaxed">
              Reliable transportation services from Rajasthan to All India. Backed by Shree Krishna Buildtech.
            </p>

            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 text-neutral-300">
                <Clock size={14} className="text-[#F4B400] shrink-0" />
                <span className="font-['Manrope'] text-xs font-semibold">Quote Within 1 Hour</span>
              </div>
              <div className="flex items-center gap-2.5 text-neutral-300">
                <Truck size={14} className="text-[#8ad7a0] shrink-0" />
                <span className="font-['Manrope'] text-xs font-semibold">PAN India Network</span>
              </div>
            </div>

            {/* GST Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#0F6A37]/50 bg-[#0F6A37]/10">
              <span className="font-['Manrope'] text-[10px] font-bold text-[#8ad7a0] uppercase tracking-wider">
                GST Registered Business
              </span>
            </div>
          </div>

          {/* Column 2 — Contact */}
          <div className="space-y-4">
            <h3 className="font-['Archivo_Narrow'] text-sm font-bold text-white uppercase tracking-widest border-b border-neutral-800 pb-2">
              Contact
            </h3>

            <div className="space-y-3">
              <a
                href={`tel:+91${PHONE_DISPLAY.replace(/\D/g,'').slice(-10)}`}
                className="flex items-start gap-2.5 group"
              >
                <Phone size={14} className="text-[#F4B400] shrink-0 mt-0.5" />
                <div>
                  <div className="font-['Manrope'] text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-0.5">Phone</div>
                  <span className="font-['Space_Mono'] text-xs text-neutral-300 group-hover:text-white transition-colors">{PHONE_DISPLAY}</span>
                </div>
              </a>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 group"
              >
                <MessageCircle size={14} className="text-[#25D366] shrink-0 mt-0.5" />
                <div>
                  <div className="font-['Manrope'] text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-0.5">WhatsApp</div>
                  <span className="font-['Space_Mono'] text-xs text-neutral-300 group-hover:text-white transition-colors">{PHONE_DISPLAY}</span>
                </div>
              </a>

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-start gap-2.5 group"
              >
                <Mail size={14} className="text-[#8ad7a0] shrink-0 mt-0.5" />
                <div>
                  <div className="font-['Manrope'] text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-0.5">Email</div>
                  <span className="font-['Space_Mono'] text-xs text-neutral-300 group-hover:text-white transition-colors break-all">{CONTACT_EMAIL}</span>
                </div>
              </a>

              <div className="flex items-start gap-2.5">
                <Clock size={14} className="text-[#F4B400] shrink-0 mt-0.5" />
                <div>
                  <div className="font-['Manrope'] text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-0.5">Business Hours</div>
                  <span className="font-['Space_Mono'] text-xs text-neutral-300">{BUSINESS_HOURS}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3 — Registered Office */}
          <div className="space-y-4">
            <h3 className="font-['Archivo_Narrow'] text-sm font-bold text-white uppercase tracking-widest border-b border-neutral-800 pb-2">
              Registered Office
            </h3>

            <div className="flex items-start gap-2.5">
              <MapPin size={14} className="text-[#F4B400] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-['Manrope'] text-xs font-bold text-white">{BUSINESS_NAME}</p>
                <p className="font-['Manrope'] text-xs text-neutral-400 leading-relaxed">
                  {ADDRESS_LINE1},<br />
                  {ADDRESS_LINE2},<br />
                  {ADDRESS_CITY},<br />
                  {ADDRESS_STATE} – {ADDRESS_PIN}<br />
                  India
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-neutral-800">
              <div className="font-['Manrope'] text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-1.5">GSTIN</div>
              <div className="font-['Space_Mono'] text-xs text-[#8ad7a0] tracking-wide">{GSTIN}</div>
            </div>
          </div>

          {/* Column 4 — Quick Links + Legal */}
          <div className="space-y-4">
            <h3 className="font-['Archivo_Narrow'] text-sm font-bold text-white uppercase tracking-widest border-b border-neutral-800 pb-2">
              Quick Links
            </h3>

            <nav className="space-y-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="flex items-center gap-1.5 font-['Manrope'] text-xs text-neutral-400 hover:text-white transition-colors group"
                >
                  <ArrowRight size={12} className="text-[#0F6A37] group-hover:translate-x-0.5 transition-transform" />
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="pt-4 border-t border-neutral-800">
              <h4 className="font-['Archivo_Narrow'] text-xs font-bold text-white uppercase tracking-widest mb-3">
                Legal
              </h4>
              <nav className="space-y-2">
                {legalLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="flex items-center gap-1.5 font-['Manrope'] text-xs text-neutral-400 hover:text-white transition-colors group"
                  >
                    <ArrowRight size={12} className="text-[#0F6A37] group-hover:translate-x-0.5 transition-transform" />
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
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
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
