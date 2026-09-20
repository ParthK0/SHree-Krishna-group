import React from 'react';
import { Link } from 'react-router-dom';
import { useMetaSEO } from '../lib/useMetaSEO';
import { FreightRateCalculator } from '../components/FreightRateCalculator';
import { Truck, ShieldCheck, FileCheck, HelpCircle, ArrowRight, MessageCircle } from 'lucide-react';
import { PHONE_DISPLAY, GSTIN } from '../lib/constants';

export const CalculatorPage: React.FC = () => {
  useMetaSEO({
    title: 'Online Freight & Transport Rate Calculator | Shree Krishna Transport',
    description: 'Calculate instant truck transport rates and express parcel charges across India. Indicative tariffs for 14ft, 22ft, 32ft containers, multi-axle trailers, and 0–150 kg parcels.',
    canonicalPath: '/rate-calculator',
  });

  return (
    <div className="w-full min-h-screen bg-[#ECE6DD] text-[#1a1f1b] font-['Manrope'] pb-16">
      {/* Hero Header */}
      <section className="bg-neutral-900 text-white py-8 md:py-10 px-4 md:px-8 border-b border-[#3e4841] relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay"
          style={{ backgroundImage: "url('/images/home.webp')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-neutral-900 to-neutral-950/90" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0B3A66]/30 border border-[#0B3A66]/60 text-[#85B7EB] font-['Space_Mono'] text-xs uppercase font-bold tracking-wider">
            <Truck size={14} className="text-[#F5B51B]" />
            <span>TRANSPARENT FREIGHT ESTIMATION</span>
          </div>

          <h1 className="font-['Archivo_Narrow'] text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white">
            Freight &amp; Parcel Rate Calculator
          </h1>

          <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Estimate indicative road transportation costs, highway mileages, and expected transit durations across major industrial corridors in seconds.
          </p>
        </div>
      </section>

      {/* Main Calculator Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 -mt-6 relative z-20">
        <FreightRateCalculator />
      </section>

      {/* Trust & Methodology Guide */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-16 space-y-12">
        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-[#c5beb4] rounded-xl p-5 space-y-2 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-[#EBF2F9] text-[#0B3A66] flex items-center justify-center">
              <FileCheck size={20} />
            </div>
            <h3 className="font-['Archivo_Narrow'] font-bold text-lg uppercase text-[#1a1f1b]">
              100% GST &amp; E-Way Bill Ready
            </h3>
            <p className="text-xs text-[#5a665c] leading-relaxed">
              Every trip includes an authorized GST Tax Invoice (GSTIN: {GSTIN}) and legitimate consignment note (bilti) for hassle-free highway clearance.
            </p>
          </div>

          <div className="bg-white border border-[#c5beb4] rounded-xl p-5 space-y-2 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-[#EBF2F9] text-[#F5B51B] flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
            <h3 className="font-['Archivo_Narrow'] font-bold text-lg uppercase text-[#1a1f1b]">
              Transit Insurance Assistance
            </h3>
            <p className="text-xs text-[#5a665c] leading-relaxed">
              Assistance with comprehensive goods-in-transit insurance for commercial machinery, electronics, and valuable consignments.
            </p>
          </div>

          <div className="bg-white border border-[#c5beb4] rounded-xl p-5 space-y-2 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-[#EBF2F9] text-[#0B3A66] flex items-center justify-center">
              <MessageCircle size={20} />
            </div>
            <h3 className="font-['Archivo_Narrow'] font-bold text-lg uppercase text-[#1a1f1b]">
              Direct WhatsApp Dispatch
            </h3>
            <p className="text-xs text-[#5a665c] leading-relaxed">
              After submitting your quote, our dispatch desk reviews vehicle availability and replies with an exact rate on WhatsApp within 60 minutes.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white border border-[#c5beb4] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center gap-2 border-b border-[#e5ded5] pb-4">
            <HelpCircle size={22} className="text-[#0B3A66]" />
            <h2 className="font-['Archivo_Narrow'] text-xl sm:text-2xl font-bold uppercase text-[#1a1f1b]">
              Frequently Asked Questions About Freight Rates
            </h2>
          </div>

          <div className="space-y-5 text-sm">
            <div>
              <h4 className="font-bold text-[#1a1f1b]">Are these rates final or indicative?</h4>
              <p className="text-neutral-600 text-xs sm:text-sm mt-1">
                The rates calculated above are realistic indicative market ranges based on standard highway mileage and route registry records. Final confirmed rates are provided via WhatsApp based on exact factory/warehouse pickup pin codes, loading floor requirements, and current diesel fluctuations.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-[#1a1f1b]">Do freight charges include loading and unloading labor?</h4>
              <p className="text-neutral-600 text-xs sm:text-sm mt-1">
                Standard freight covers vehicle hire, driver allowance, and toll allocations. Loading (hamali) and unloading labor charges can be included upon advance request.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-[#1a1f1b]">What is the difference between FTL, PTL, and Parcel?</h4>
              <p className="text-neutral-600 text-xs sm:text-sm mt-1">
                <strong>Full Truck Load (FTL)</strong> reserves the entire vehicle dedicated solely to your consignment. <strong>Part Truck Load (PTL)</strong> shares truck space for 1–5 ton shipments. <strong>Parcel (0–150 kg)</strong> is for express cartons, spare parts, and commercial boxes.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#e5ded5] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-neutral-500">
              Need immediate assistance? Call dispatch desk directly at <strong className="text-[#1a1f1b]">{PHONE_DISPLAY}</strong>.
            </p>
            <Link
              to="/book-truck"
              className="inline-flex items-center gap-2 text-xs font-bold font-['Manrope'] text-[#0B3A66] hover:text-[#072D54] uppercase tracking-wider"
            >
              <span>Go to Quote Form</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
