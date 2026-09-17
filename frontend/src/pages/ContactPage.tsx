import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Phone, MessageCircle, Mail, MapPin, Clock, Building2, Shield, Send } from 'lucide-react';
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
    title: 'Contact Shree Krishna Transport | Jaipur Logistics Office & 24/7 Helpline',
    description: 'Contact Shree Krishna Transport Jaipur. Office address in Sitapura / VKI, direct WhatsApp support (+91 97848 00833), phone booking, and GST invoicing.',
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
    <div className="min-h-screen bg-[#ECE6DD] py-10 md:py-16 px-4 md:px-12">
      <div className="max-w-4xl mx-auto space-y-8">

        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-['Manrope'] text-xs font-bold text-[#062448] hover:text-[#03162C] uppercase tracking-wider transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
          <div className="font-['Space_Mono'] text-xs text-[#5a665c]">
            <span>Home</span> / <span className="text-[#062448] font-bold">Contact</span>
          </div>
        </div>

        {/* Page Header */}
        <div className="bg-white border border-[#c5beb4] rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#EBF2F9] flex items-center justify-center text-[#062448]">
              <Phone size={18} />
            </div>
            <span className="font-['Manrope'] text-xs font-bold text-[#062448] uppercase tracking-widest">
              Get In Touch
            </span>
          </div>
          <h1 className="font-['Archivo_Narrow'] text-3xl md:text-4xl font-bold uppercase text-[#1a1f1b]">
            Contact Us
          </h1>
          <p className="font-['Manrope'] text-xs md:text-sm text-[#4A554C] mt-1">
            Reach us via WhatsApp, phone, or email. We respond within 1 hour during business hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Contact Methods */}
          <div className="bg-white border border-[#c5beb4] rounded-2xl p-6 md:p-8 shadow-sm space-y-5">
            <h2 className="font-['Archivo_Narrow'] text-lg font-bold uppercase text-[#1a1f1b]">Reach Us</h2>

            <a
              href={`tel:+91${PHONE_DISPLAY.replace(/\D/g,'').slice(-10)}`}
              className="flex items-start gap-4 p-4 rounded-xl bg-[#f4f0ea] border border-[#e2dad0] hover:border-[#062448] transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#EBF2F9] flex items-center justify-center text-[#062448] shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <div className="font-['Manrope'] text-[10px] font-bold text-[#6b786d] uppercase tracking-widest mb-0.5">Phone</div>
                <div className="font-['Space_Mono'] text-sm font-bold text-[#1a1f1b] group-hover:text-[#062448] transition-colors">{PHONE_DISPLAY}</div>
              </div>
            </a>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-4 rounded-xl bg-[#f4f0ea] border border-[#e2dad0] hover:border-[#25D366] transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#dcf5e5] flex items-center justify-center text-[#25D366] shrink-0">
                <MessageCircle size={18} />
              </div>
              <div>
                <div className="font-['Manrope'] text-[10px] font-bold text-[#6b786d] uppercase tracking-widest mb-0.5">WhatsApp</div>
                <div className="font-['Space_Mono'] text-sm font-bold text-[#1a1f1b] group-hover:text-[#25D366] transition-colors">{PHONE_DISPLAY}</div>
                <div className="font-['Manrope'] text-[10px] text-[#6b786d] mt-0.5">Fastest response</div>
              </div>
            </a>

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-start gap-4 p-4 rounded-xl bg-[#f4f0ea] border border-[#e2dad0] hover:border-[#062448] transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#EBF2F9] flex items-center justify-center text-[#062448] shrink-0">
                <Mail size={18} />
              </div>
              <div>
                <div className="font-['Manrope'] text-[10px] font-bold text-[#6b786d] uppercase tracking-widest mb-0.5">Email</div>
                <div className="font-['Space_Mono'] text-sm font-bold text-[#1a1f1b] group-hover:text-[#062448] transition-colors break-all">{CONTACT_EMAIL}</div>
              </div>
            </a>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-[#f4f0ea] border border-[#e2dad0]">
              <div className="w-10 h-10 rounded-lg bg-[#FFF8E1] flex items-center justify-center text-[#E9A015] shrink-0">
                <Clock size={18} />
              </div>
              <div>
                <div className="font-['Manrope'] text-[10px] font-bold text-[#6b786d] uppercase tracking-widest mb-0.5">Business Hours</div>
                <div className="font-['Space_Mono'] text-sm font-bold text-[#1a1f1b]">{BUSINESS_HOURS}</div>
              </div>
            </div>
          </div>

          {/* Business Information Card */}
          <div className="bg-white border border-[#c5beb4] rounded-2xl p-6 md:p-8 shadow-sm space-y-5">
            <h2 className="font-['Archivo_Narrow'] text-lg font-bold uppercase text-[#1a1f1b]">Business Information</h2>

            <div className="space-y-4 font-['Space_Mono'] text-xs">
              <div className="flex items-start gap-3 p-4 bg-[#f4f0ea] rounded-xl border border-[#e2dad0]">
                <Building2 size={16} className="text-[#062448] shrink-0 mt-0.5" />
                <div>
                  <div className="font-['Manrope'] text-[10px] font-bold text-[#6b786d] uppercase tracking-widest mb-1">Business Name</div>
                  <div className="text-[#1a1f1b] font-bold">{BUSINESS_NAME}</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-[#f4f0ea] rounded-xl border border-[#e2dad0]">
                <Shield size={16} className="text-[#062448] shrink-0 mt-0.5" />
                <div>
                  <div className="font-['Manrope'] text-[10px] font-bold text-[#6b786d] uppercase tracking-widest mb-1">GSTIN</div>
                  <div className="text-[#062448] font-bold tracking-wide">{GSTIN}</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-[#f4f0ea] rounded-xl border border-[#e2dad0]">
                <MapPin size={16} className="text-[#E9A015] shrink-0 mt-0.5" />
                <div>
                  <div className="font-['Manrope'] text-[10px] font-bold text-[#6b786d] uppercase tracking-widest mb-1">Registered Office</div>
                  <div className="text-[#1a1f1b] font-bold leading-relaxed">
                    {ADDRESS_LINE1},<br />
                    {ADDRESS_LINE2},<br />
                    {ADDRESS_CITY}, {ADDRESS_STATE} {ADDRESS_PIN}<br />
                    India
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-[#f4f0ea] rounded-xl border border-[#e2dad0]">
                  <div className="font-['Manrope'] text-[10px] font-bold text-[#6b786d] uppercase tracking-widest mb-1">Operating Area</div>
                  <div className="text-[#1a1f1b] font-bold text-xs">Rajasthan → All India</div>
                </div>
                <div className="p-3 bg-[#f4f0ea] rounded-xl border border-[#e2dad0]">
                  <div className="font-['Manrope'] text-[10px] font-bold text-[#6b786d] uppercase tracking-widest mb-1">Business Type</div>
                  <div className="text-[#1a1f1b] font-bold text-xs">Road Transportation</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Inline Enquiry & Quotation Form */}
        <div id="enquiry" className="space-y-3 scroll-mt-24">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#EBF2F9] flex items-center justify-center text-[#062448]">
              <Send size={16} />
            </div>
            <div>
              <h2 className="font-['Archivo_Narrow'] text-xl font-bold uppercase text-[#1a1f1b]">
                Send an Online Freight Enquiry
              </h2>
              <p className="font-['Manrope'] text-xs text-[#4A554C]">
                Prefer a callback or written quote? Fill in your consignment details below and our team will get back to you within 60 minutes.
              </p>
            </div>
          </div>
          <EnquiryForm />
        </div>

        {/* Google Maps Real Interactive Embed */}
        <div className="bg-white border border-[#c5beb4] rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h2 className="font-['Archivo_Narrow'] text-xl font-bold uppercase text-[#1a1f1b]">
                Jaipur Registered Office Location
              </h2>
              <p className="font-['Manrope'] text-xs text-[#5a665c]">
                1D, Lalita Colony, Nahari Ka Naka, Shastri Nagar, Jaipur, Rajasthan 302016
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=1D,+Lalita+Colony,+Nahari+Ka+Naka,+Shastri+Nagar,+Jaipur,+Rajasthan+302016"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-['Manrope'] text-xs font-bold text-[#062448] hover:underline shrink-0"
            >
              <span>Get Driving Directions →</span>
            </a>
          </div>

          <div className="w-full h-72 sm:h-80 rounded-xl overflow-hidden border border-[#e2dad0] shadow-inner relative bg-[#f4f0ea]">
            <iframe
              title="Shree Krishna Transport Office Map"
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
    </div>
  );
};
