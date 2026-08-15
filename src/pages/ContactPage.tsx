import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Phone, MessageCircle, Mail, MapPin, Clock, Building2, Shield } from 'lucide-react';
import {
  BUSINESS_NAME, PHONE_DISPLAY, WHATSAPP_NUMBER, CONTACT_EMAIL,
  GSTIN, ADDRESS_LINE1, ADDRESS_LINE2, ADDRESS_CITY, ADDRESS_STATE, ADDRESS_PIN,
  BUSINESS_HOURS,
} from '../lib/constants';

export const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#ECE6DD] py-10 md:py-16 px-4 md:px-12">
      <div className="max-w-4xl mx-auto space-y-8">

        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-['Manrope'] text-xs font-bold text-[#0F6A37] hover:text-[#134E3A] uppercase tracking-wider transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
          <div className="font-['Space_Mono'] text-xs text-[#5a665c]">
            <span>Home</span> / <span className="text-[#0F6A37] font-bold">Contact</span>
          </div>
        </div>

        {/* Page Header */}
        <div className="bg-white border border-[#c5beb4] rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#EBF5EE] flex items-center justify-center text-[#0F6A37]">
              <Phone size={18} />
            </div>
            <span className="font-['Manrope'] text-xs font-bold text-[#0F6A37] uppercase tracking-widest">
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
              className="flex items-start gap-4 p-4 rounded-xl bg-[#f4f0ea] border border-[#e2dad0] hover:border-[#0F6A37] transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#EBF5EE] flex items-center justify-center text-[#0F6A37] shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <div className="font-['Manrope'] text-[10px] font-bold text-[#6b786d] uppercase tracking-widest mb-0.5">Phone</div>
                <div className="font-['Space_Mono'] text-sm font-bold text-[#1a1f1b] group-hover:text-[#0F6A37] transition-colors">{PHONE_DISPLAY}</div>
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
              className="flex items-start gap-4 p-4 rounded-xl bg-[#f4f0ea] border border-[#e2dad0] hover:border-[#0F6A37] transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#EBF5EE] flex items-center justify-center text-[#0F6A37] shrink-0">
                <Mail size={18} />
              </div>
              <div>
                <div className="font-['Manrope'] text-[10px] font-bold text-[#6b786d] uppercase tracking-widest mb-0.5">Email</div>
                <div className="font-['Space_Mono'] text-sm font-bold text-[#1a1f1b] group-hover:text-[#0F6A37] transition-colors break-all">{CONTACT_EMAIL}</div>
              </div>
            </a>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-[#f4f0ea] border border-[#e2dad0]">
              <div className="w-10 h-10 rounded-lg bg-[#FFF8E1] flex items-center justify-center text-[#F4B400] shrink-0">
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
                <Building2 size={16} className="text-[#0F6A37] shrink-0 mt-0.5" />
                <div>
                  <div className="font-['Manrope'] text-[10px] font-bold text-[#6b786d] uppercase tracking-widest mb-1">Business Name</div>
                  <div className="text-[#1a1f1b] font-bold">{BUSINESS_NAME}</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-[#f4f0ea] rounded-xl border border-[#e2dad0]">
                <Shield size={16} className="text-[#0F6A37] shrink-0 mt-0.5" />
                <div>
                  <div className="font-['Manrope'] text-[10px] font-bold text-[#6b786d] uppercase tracking-widest mb-1">GSTIN</div>
                  <div className="text-[#0F6A37] font-bold tracking-wide">{GSTIN}</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-[#f4f0ea] rounded-xl border border-[#e2dad0]">
                <MapPin size={16} className="text-[#F4B400] shrink-0 mt-0.5" />
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

        {/* Google Maps placeholder */}
        <div className="bg-white border border-[#c5beb4] rounded-2xl p-6 shadow-sm">
          <h2 className="font-['Archivo_Narrow'] text-lg font-bold uppercase text-[#1a1f1b] mb-3">Our Location</h2>
          <div className="w-full h-48 bg-[#f4f0ea] rounded-xl border border-[#e2dad0] flex items-center justify-center">
            <div className="text-center">
              <MapPin size={28} className="text-[#0F6A37] mx-auto mb-2" />
              <p className="font-['Manrope'] text-xs text-[#6b786d]">Shastri Nagar, Jaipur, Rajasthan</p>
              <a
                href="https://maps.google.com/?q=Shastri+Nagar+Jaipur+Rajasthan"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block font-['Manrope'] text-xs font-bold text-[#0F6A37] hover:underline"
              >
                Open in Google Maps →
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
