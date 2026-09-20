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
    { label: 'Transport Routes', href: '/routes' },
    { label: 'Logistics Blog & Rates', href: '/blog' },
    { label: 'Book a Truck', href: '/book-truck' },
    { label: 'Book a Parcel (0–150 kg)', href: '/book-truck?type=parcel' },
    { label: 'Register Vehicle', href: '/register-truck' },
    { label: 'General Enquiry', href: '/contact#enquiry' },
    { label: 'About Us', href: '/#about-us' },
    { label: 'Contact', href: '/contact' },
  ];

  const legalLinks = [
    { label: 'Terms & Conditions', href: '/terms-and-conditions' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Cancellation & Refund', href: '/cancellation-refund-policy' },
  ];

  return (
    <footer id="contact" className="w-full bg-[#071F35] border-t border-[#0B3A66]/60 text-white pb-20 md:pb-0">

      {/* Main 4-Column Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-6 md:py-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">

          {/* Column 1 — Company */}
          <div className="space-y-2.5">
            <Link to="/" className="flex items-center gap-2">
              <img
                alt="Shree Krishna Transport Logo"
                className="h-7 w-auto object-contain"
                src="/images/logo.png"
              />
              <span className="font-['Archivo_Narrow'] text-sm sm:text-base font-bold text-white uppercase tracking-tight leading-tight">
                SHREE KRISHNA<br />TRANSPORT
              </span>
            </Link>

            <p className="font-['Manrope'] text-[11px] text-[#D9E4EE]/80 leading-relaxed">
              Reliable transportation services from Rajasthan to All India. Backed by Shree Krishna Buildtech.
            </p>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[#D9E4EE]">
                <Clock size={12} className="text-[#F5B51B] shrink-0" />
                <span className="font-['Manrope'] text-[11px] font-semibold">Quote Within 1 Hour</span>
              </div>
              <div className="flex items-center gap-2 text-[#D9E4EE]">
                <Truck size={12} className="text-[#85B7EB] shrink-0" />
                <span className="font-['Manrope'] text-[11px] font-semibold">PAN India Network</span>
              </div>
            </div>

            {/* GST Badge */}
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-[#0B3A66] bg-[#0B3A66]/40">
              <span className="font-['Manrope'] text-[9px] font-bold text-[#85B7EB] uppercase tracking-wider">
                GST Registered Business
              </span>
            </div>
          </div>

          {/* Column 2 — Contact */}
          <div className="space-y-2">
            <h3 className="font-['Archivo_Narrow'] text-xs font-bold text-white uppercase tracking-widest border-b border-[#0B3A66]/50 pb-1">
              Contact
            </h3>

            <div className="space-y-1.5">
              <a
                href={`tel:+91${PHONE_DISPLAY.replace(/\D/g,'').slice(-10)}`}
                className="flex items-start gap-2 group"
              >
                <Phone size={12} className="text-[#F5B51B] shrink-0 mt-0.5" />
                <div>
                  <div className="font-['Manrope'] text-[9px] font-bold text-[#D9E4EE]/60 uppercase tracking-wider">Phone</div>
                  <span className="font-['Space_Mono'] text-xs text-[#D9E4EE] group-hover:text-white transition-colors">{PHONE_DISPLAY}</span>
                </div>
              </a>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 group"
              >
                <MessageCircle size={12} className="text-[#25D366] shrink-0 mt-0.5" />
                <div>
                  <div className="font-['Manrope'] text-[9px] font-bold text-[#D9E4EE]/60 uppercase tracking-wider">WhatsApp</div>
                  <span className="font-['Space_Mono'] text-xs text-[#D9E4EE] group-hover:text-white transition-colors">{PHONE_DISPLAY}</span>
                </div>
              </a>

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-start gap-2 group"
              >
                <Mail size={12} className="text-[#85B7EB] shrink-0 mt-0.5" />
                <div>
                  <div className="font-['Manrope'] text-[9px] font-bold text-[#D9E4EE]/60 uppercase tracking-wider">Email</div>
                  <span className="font-['Space_Mono'] text-xs text-[#D9E4EE] group-hover:text-white transition-colors break-all">{CONTACT_EMAIL}</span>
                </div>
              </a>

              <div className="flex items-start gap-2">
                <Clock size={12} className="text-[#F5B51B] shrink-0 mt-0.5" />
                <div>
                  <div className="font-['Manrope'] text-[9px] font-bold text-[#D9E4EE]/60 uppercase tracking-wider">Business Hours</div>
                  <span className="font-['Space_Mono'] text-xs text-[#D9E4EE]">{BUSINESS_HOURS}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3 — Registered Office */}
          <div className="space-y-2">
            <h3 className="font-['Archivo_Narrow'] text-xs font-bold text-white uppercase tracking-widest border-b border-[#0B3A66]/50 pb-1">
              Registered Office
            </h3>

            <div className="flex items-start gap-2">
              <MapPin size={12} className="text-[#F5B51B] shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <p className="font-['Manrope'] text-xs font-bold text-white">{BUSINESS_NAME}</p>
                <p className="font-['Manrope'] text-[11px] text-[#D9E4EE]/80 leading-relaxed">
                  {ADDRESS_LINE1}, {ADDRESS_LINE2},<br />
                  {ADDRESS_CITY}, {ADDRESS_STATE} – {ADDRESS_PIN}, India
                </p>
              </div>
            </div>

            <div className="pt-1.5 border-t border-[#0B3A66]/50">
              <div className="font-['Manrope'] text-[9px] font-bold text-[#D9E4EE]/60 uppercase tracking-wider mb-0.5">GSTIN</div>
              <div className="font-['Space_Mono'] text-xs text-[#85B7EB] tracking-wide">{GSTIN}</div>
            </div>
          </div>

          {/* Column 4 — Quick Links + Legal */}
          <div className="space-y-2">
            <h3 className="font-['Archivo_Narrow'] text-xs font-bold text-white uppercase tracking-widest border-b border-[#0B3A66]/50 pb-1">
              Quick Links
            </h3>

            <nav className="grid grid-cols-2 gap-x-2 gap-y-1">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="flex items-center gap-1 font-['Manrope'] text-[11px] text-[#D9E4EE]/80 hover:text-white transition-colors group"
                >
                  <ArrowRight size={10} className="text-[#F5B51B] group-hover:translate-x-0.5 transition-transform shrink-0" />
                  <span className="truncate">{link.label}</span>
                </Link>
              ))}
            </nav>

            <div className="pt-1.5 border-t border-[#0B3A66]/50">
              <h4 className="font-['Archivo_Narrow'] text-[10px] font-bold text-white uppercase tracking-widest mb-1">
                Legal
              </h4>
              <nav className="flex flex-wrap gap-x-3 gap-y-1">
                {legalLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="flex items-center gap-1 font-['Manrope'] text-[10px] text-[#D9E4EE]/80 hover:text-white transition-colors group"
                  >
                    <ArrowRight size={9} className="text-[#F5B51B] group-hover:translate-x-0.5 transition-transform shrink-0" />
                    <span>{link.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#0B3A66]/50">
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-2 flex flex-col sm:flex-row justify-between items-center gap-1">
          <span className="font-['Manrope'] text-[10px] text-[#D9E4EE]/60 text-center">
            © {new Date().getFullYear()} {BUSINESS_NAME}. All Rights Reserved.
          </span>
          <span className="font-['Space_Mono'] text-[10px] text-[#D9E4EE]/50 text-center">
            GSTIN: {GSTIN}
          </span>
        </div>
      </div>

    </footer>
  );
};
