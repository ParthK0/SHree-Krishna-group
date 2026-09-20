import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Phone, MessageCircle, Mail, MapPin, Clock, Building2, Shield, ExternalLink, Headphones } from 'lucide-react';
import {
  BUSINESS_NAME, PHONE_DISPLAY, WHATSAPP_NUMBER, CONTACT_EMAIL,
  GSTIN, ADDRESS_LINE1, ADDRESS_LINE2, ADDRESS_CITY, ADDRESS_STATE, ADDRESS_PIN,
  BUSINESS_HOURS,
} from '../lib/constants';
import { useMetaSEO } from '../lib/useMetaSEO';
import { EnquiryForm } from '../components/EnquiryForm';

export const ContactPage: React.FC = () => {
  const location = useLocation();

  useMetaSEO({
    title: 'Contact Shree Krishna Transport Network | Jaipur Logistics Office & 24/7 Helpline',
    description: 'Contact Shree Krishna Transport Network Jaipur. Direct dispatch support (+91 97848 00833), online quote enquiries, and verified fleet bookings.',
    canonicalPath: '/contact',
  });

  useEffect(() => {
    if (location.hash === '#enquiry' || location.hash === '#enquiry-form') {
      const el = document.getElementById('enquiry');
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-[#ECE6DD] py-6 md:py-10 px-4 md:px-12">
      <div className="max-w-6xl xl:max-w-7xl mx-auto space-y-6 md:space-y-8">

        {/* Top Breadcrumb Navigation */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-['Manrope'] text-xs font-bold text-[#0B3A66] hover:text-[#071F35] uppercase tracking-wider transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
          <div className="font-['Space_Mono'] text-xs text-[#5a665c]">
            <span>Home</span> / <span className="text-[#0B3A66] font-bold">Contact Us</span>
          </div>
        </div>

        {/* Page Title Banner */}
        <div className="bg-white border border-[#c5beb4] rounded-2xl sm:rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#EBF2F9] flex items-center justify-center text-[#0B3A66]">
              <Phone size={18} />
            </div>
            <span className="font-['Manrope'] text-xs font-bold text-[#0B3A66] uppercase tracking-widest">
              Direct Dispatch Desk
            </span>
          </div>
          <h1 className="font-['Archivo_Narrow'] text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase text-[#1a1f1b] tracking-tight">
            Contact &amp; Logistics Support
          </h1>
          <p className="font-['Manrope'] text-xs sm:text-sm md:text-base text-[#4A554C] mt-1.5 max-w-2xl leading-relaxed">
            Reach our dispatch coordinators for commercial vehicle bookings, rate estimates, and live consignment support.
          </p>
        </div>

        {/* 2-Column Split: Left = Reach Us + Business Info + Map | Right = General Enquiry & Support Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

          {/* LEFT SIDE: Reach Us & Business Information with Map (5 columns) */}
          <div className="lg:col-span-5 space-y-6">

            {/* 1. Reach Us Card */}
            <div className="bg-white border border-[#c5beb4] rounded-2xl sm:rounded-3xl p-6 md:p-7 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[#e2dad0] pb-3">
                <h2 className="font-['Archivo_Narrow'] text-xl font-bold uppercase text-[#1a1f1b] tracking-tight">
                  Reach Us
                </h2>
                <span className="text-[10px] font-['Space_Mono'] font-bold text-[#0B3A66] bg-[#EBF2F9] px-2.5 py-0.5 rounded-full">
                  Quick Response
                </span>
              </div>

              <div className="space-y-3">
                <a
                  href={`tel:+91${PHONE_DISPLAY.replace(/\D/g,'').slice(-10)}`}
                  className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#f4f0ea] border border-[#e2dad0] hover:border-[#0B3A66] hover:bg-white transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#EBF2F9] flex items-center justify-center text-[#0B3A66] shrink-0 group-hover:scale-105 transition-transform">
                    <Phone size={18} />
                  </div>
                  <div>
                    <div className="font-['Manrope'] text-[10px] font-bold text-[#6b786d] uppercase tracking-widest mb-0.5">Phone Call</div>
                    <div className="font-['Space_Mono'] text-sm font-bold text-[#1a1f1b] group-hover:text-[#0B3A66] transition-colors">{PHONE_DISPLAY}</div>
                    <div className="font-['Manrope'] text-[10px] text-[#0B3A66] font-semibold mt-0.5">Instant dispatch connect</div>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#f4f0ea] border border-[#e2dad0] hover:border-[#25D366] hover:bg-white transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#dcf5e5] flex items-center justify-center text-[#25D366] shrink-0 group-hover:scale-105 transition-transform">
                    <MessageCircle size={18} />
                  </div>
                  <div>
                    <div className="font-['Manrope'] text-[10px] font-bold text-[#6b786d] uppercase tracking-widest mb-0.5">WhatsApp Helpline</div>
                    <div className="font-['Space_Mono'] text-sm font-bold text-[#1a1f1b] group-hover:text-[#25D366] transition-colors">{PHONE_DISPLAY}</div>
                    <div className="font-['Manrope'] text-[10px] text-[#16a34a] font-semibold mt-0.5">Fastest quotes &amp; updates</div>
                  </div>
                </a>

                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#f4f0ea] border border-[#e2dad0] hover:border-[#0B3A66] hover:bg-white transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#EBF2F9] flex items-center justify-center text-[#0B3A66] shrink-0 group-hover:scale-105 transition-transform">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="font-['Manrope'] text-[10px] font-bold text-[#6b786d] uppercase tracking-widest mb-0.5">Email Desk</div>
                    <div className="font-['Space_Mono'] text-xs font-bold text-[#1a1f1b] group-hover:text-[#0B3A66] transition-colors break-all">{CONTACT_EMAIL}</div>
                    <div className="font-['Manrope'] text-[10px] text-[#6b786d] mt-0.5">Corporate &amp; invoicing support</div>
                  </div>
                </a>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#f4f0ea] border border-[#e2dad0]">
                  <div className="w-10 h-10 rounded-lg bg-[#FFF8E1] flex items-center justify-center text-[#F5B51B] shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <div className="font-['Manrope'] text-[10px] font-bold text-[#6b786d] uppercase tracking-widest mb-0.5">Business Hours</div>
                    <div className="font-['Space_Mono'] text-xs sm:text-sm font-bold text-[#1a1f1b]">{BUSINESS_HOURS}</div>
                    <div className="font-['Manrope'] text-[10px] text-[#6b786d] mt-0.5">Emergency lines active 24/7</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Business Information Card */}
            <div className="bg-white border border-[#c5beb4] rounded-2xl sm:rounded-3xl p-6 md:p-7 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[#e2dad0] pb-3">
                <h2 className="font-['Archivo_Narrow'] text-xl font-bold uppercase text-[#1a1f1b] tracking-tight">
                  Business Information
                </h2>
                <span className="text-[10px] font-['Space_Mono'] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  GST Verified
                </span>
              </div>

              <div className="space-y-3 font-['Space_Mono'] text-xs">
                <div className="flex items-start gap-3 p-3.5 bg-[#f4f0ea] rounded-xl border border-[#e2dad0]">
                  <Building2 size={16} className="text-[#0B3A66] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-['Manrope'] text-[10px] font-bold text-[#6b786d] uppercase tracking-widest mb-0.5">Company Legal Name</div>
                    <div className="text-[#1a1f1b] font-bold">{BUSINESS_NAME}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 bg-[#f4f0ea] rounded-xl border border-[#e2dad0]">
                  <Shield size={16} className="text-[#0B3A66] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-['Manrope'] text-[10px] font-bold text-[#6b786d] uppercase tracking-widest mb-0.5">GSTIN Registration</div>
                    <div className="text-[#0B3A66] font-bold tracking-wide">{GSTIN}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 bg-[#f4f0ea] rounded-xl border border-[#e2dad0]">
                  <MapPin size={16} className="text-[#F5B51B] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-['Manrope'] text-[10px] font-bold text-[#6b786d] uppercase tracking-widest mb-0.5">Registered Office Address</div>
                    <div className="text-[#1a1f1b] font-bold leading-relaxed">
                      {ADDRESS_LINE1},<br />
                      {ADDRESS_LINE2},<br />
                      {ADDRESS_CITY}, {ADDRESS_STATE} – {ADDRESS_PIN}, India
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3 bg-[#f4f0ea] rounded-xl border border-[#e2dad0]">
                    <div className="font-['Manrope'] text-[9px] font-bold text-[#6b786d] uppercase tracking-widest mb-1">Operating Network</div>
                    <div className="text-[#1a1f1b] font-bold text-[11px] leading-tight">Rajasthan → All India</div>
                  </div>
                  <div className="p-3 bg-[#f4f0ea] rounded-xl border border-[#e2dad0]">
                    <div className="font-['Manrope'] text-[9px] font-bold text-[#6b786d] uppercase tracking-widest mb-1">Service Type</div>
                    <div className="text-[#1a1f1b] font-bold text-[11px] leading-tight">FTL, PTL &amp; Express</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Embedded Location Map with Directions */}
            <div className="bg-white border border-[#c5beb4] rounded-2xl sm:rounded-3xl p-6 md:p-7 shadow-sm space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-[#e2dad0] pb-3">
                <div>
                  <h2 className="font-['Archivo_Narrow'] text-lg font-bold uppercase text-[#1a1f1b] tracking-tight">
                    Office Location Map
                  </h2>
                  <p className="font-['Manrope'] text-[11px] text-[#5a665c]">
                    Shastri Nagar, Jaipur, Rajasthan 302016
                  </p>
                </div>
                <a
                  href="https://maps.google.com/?q=1D,+Lalita+Colony,+Nahari+Ka+Naka,+Shastri+Nagar,+Jaipur,+Rajasthan+302016"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-['Manrope'] text-xs font-bold text-[#0B3A66] hover:underline shrink-0"
                >
                  <span>Open in Maps</span>
                  <ExternalLink size={12} />
                </a>
              </div>

              <div className="w-full h-56 sm:h-64 rounded-xl overflow-hidden border border-[#e2dad0] shadow-inner relative bg-[#f4f0ea]">
                <iframe
                  title="Shree Krishna Transport Network Office Map"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight={0}
                  marginWidth={0}
                  src="https://maps.google.com/maps?q=1D,+Lalita+Colony,+Nahari+Ka+Naka,+Shastri+Nagar,+Jaipur,+Rajasthan+302016&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: General Enquiry & Support Form (7 columns) */}
          <div id="enquiry" className="lg:col-span-7 space-y-3 scroll-mt-24">
            <div className="bg-white border border-[#c5beb4] rounded-2xl sm:rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4 border-b border-[#e2dad0] pb-4">
                <div className="w-10 h-10 rounded-xl bg-[#EBF2F9] flex items-center justify-center text-[#0B3A66] shrink-0">
                  <Headphones size={20} />
                </div>
                <div>
                  <h2 className="font-['Archivo_Narrow'] text-2xl font-bold uppercase text-[#1a1f1b] tracking-tight">
                    General Enquiry &amp; Support Form
                  </h2>
                  <p className="font-['Manrope'] text-xs text-[#4A554C]">
                    Fill in your consignment details or inquiry below. Receive a verified quote and callback within 60 minutes.
                  </p>
                </div>
              </div>
              
              <EnquiryForm />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
