import React from 'react';
import {
  Phone,
  MessageCircle,
  Truck,
  ShieldCheck,
  Award,
  Clock,
  Sparkles,
  Info,
} from 'lucide-react';
import {
  PARCEL_COURIER_FREIGHT_RATES,
  RATE_CARD_META,
} from '../data/rateCardData';

interface RouteMapSectionProps {
  initialTab?: string;
  className?: string;
}

export const RouteMapSection: React.FC<RouteMapSectionProps> = ({
  className = '',
}) => {
  const generateWhatsAppUrl = (text: string) => {
    return `https://wa.me/919784800833?text=${encodeURIComponent(text)}`;
  };

  return (
    <section className={`w-full py-8 md:py-10 ${className}`} id="route-rate-cards">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        {/* Header Title & Proof Badges */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B3A66]/10 text-[#0B3A66] font-['Space_Mono'] text-xs font-bold border border-[#0B3A66]/20 mb-3">
            <Sparkles size={14} className="text-[#F5B51B]" />
            CURRENT PARCEL & COURIER FREIGHT RATE GUIDE
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase font-['Archivo_Narrow'] text-[#1a1f1b] tracking-tight">
            Express Parcel & Courier Rates (Per KG)
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 font-['Manrope'] mt-3 leading-relaxed">
            Transparent per-kilogram parcel charges for lightweight commercial packages, corporate documents, and express multimodal consignments radiating from Jaipur Central Dispatch Hub.
          </p>

          {/* 4 Feature Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6">
            <div className="bg-white p-3 rounded-xl border border-[#e2dacd] shadow-sm flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#EBF2F9] text-[#0B3A66] flex items-center justify-center shrink-0">
                <Truck size={17} />
              </div>
              <div className="text-left">
                <span className="text-[11px] font-bold text-[#1a1f1b] font-['Manrope'] block leading-tight">
                  Safe & On-Time
                </span>
                <span className="text-[9px] text-neutral-500 font-['Space_Mono']">Fast Linehaul</span>
              </div>
            </div>

            <div className="bg-white p-3 rounded-xl border border-[#e2dacd] shadow-sm flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#EBF2F9] text-[#0B3A66] flex items-center justify-center shrink-0">
                <ShieldCheck size={17} />
              </div>
              <div className="text-left">
                <span className="text-[11px] font-bold text-[#1a1f1b] font-['Manrope'] block leading-tight">
                  Verified Network
                </span>
                <span className="text-[9px] text-neutral-500 font-['Space_Mono']">50+ Partners</span>
              </div>
            </div>

            <div className="bg-white p-3 rounded-xl border border-[#e2dacd] shadow-sm flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#EBF2F9] text-[#0B3A66] flex items-center justify-center shrink-0">
                <Award size={17} />
              </div>
              <div className="text-left">
                <span className="text-[11px] font-bold text-[#1a1f1b] font-['Manrope'] block leading-tight">
                  Vetted Drivers
                </span>
                <span className="text-[9px] text-neutral-500 font-['Space_Mono']">Commercial Pros</span>
              </div>
            </div>

            <div className="bg-white p-3 rounded-xl border border-[#e2dacd] shadow-sm flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#FFF9E6] text-[#B8860B] flex items-center justify-center shrink-0">
                <Clock size={17} />
              </div>
              <div className="text-left">
                <span className="text-[11px] font-bold text-[#1a1f1b] font-['Manrope'] block leading-tight">
                  Fast Quotation
                </span>
                <span className="text-[9px] text-neutral-500 font-['Space_Mono']">Direct Dispatch</span>
              </div>
            </div>
          </div>
        </div>

        {/* Indicative Pricing Transparency Disclaimer */}
        <div className="mb-6 p-4 rounded-2xl bg-[#FFF9E6] border border-[#F5B51B]/40 flex items-start gap-3 text-xs font-['Manrope'] text-neutral-800 shadow-sm">
          <Info size={18} className="text-[#B8860B] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-[#071F35] font-['Space_Mono'] uppercase tracking-wider block mb-0.5">
              Indicative Market Rate Notice
            </span>
            <p className="text-neutral-700 leading-relaxed">
              {RATE_CARD_META.termsNote}
            </p>
          </div>
        </div>

        {/* TABLE C: PARCEL / COURIER & FREIGHT RATES */}
        <div className="bg-white rounded-3xl p-5 sm:p-7 md:p-10 border border-[#e2dacd] shadow-xl mb-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#e2dacd] mb-6">
            <div>
              <span className="text-xs font-bold text-[#0B3A66] font-['Space_Mono'] uppercase block">
                Express Surface, Air & Rail Parcel Network
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold uppercase font-['Archivo_Narrow'] text-[#1a1f1b]">
                Table C: Parcel / Courier & Freight Rates
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 font-['Manrope'] mt-1">
                Transparent per-kilogram parcel charges for lightweight packages, corporate documents, and delicate consignments.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF9E6] text-[#071F35] font-['Space_Mono'] text-xs font-bold border border-[#F5B51B]/30 shrink-0">
              <Sparkles size={14} className="text-[#F5B51B]" />
              Per KG Door-to-Door Rates
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left font-['Manrope'] text-sm">
              <thead>
                <tr className="bg-[#FFF9E6] border-y border-[#F5B51B]/30 text-xs font-['Space_Mono'] uppercase text-[#071F35]">
                  <th className="py-3 px-4 w-14">S. No.</th>
                  <th className="py-3 px-4">Service Type</th>
                  <th className="py-3 px-4 whitespace-nowrap">Category</th>
                  <th className="py-3 px-4">Recommended Freight</th>
                  <th className="py-3 px-4 text-right whitespace-nowrap">Indicative Rate</th>
                  <th className="py-3 px-4 text-center w-36">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ece6dd]">
                {PARCEL_COURIER_FREIGHT_RATES.map((item) => (
                  <tr key={item.sNo} className="hover:bg-[#fbf9f6] transition-colors group">
                    <td className="py-4 px-4 font-['Space_Mono'] text-xs text-neutral-500 font-bold">{item.sNo}.</td>
                    <td className="py-4 px-4 font-bold text-[#1a1f1b]">
                      <span className="text-base block">{item.serviceType}</span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="inline-block px-3 py-1.5 rounded-full bg-[#EBF2F9] text-[#0B3A66] text-xs font-bold font-['Space_Mono'] whitespace-nowrap">
                        {item.badge}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-xs text-neutral-600 max-w-sm">{item.idealFor}</td>
                    <td className="py-4 px-4 text-right">
                      <span className="font-extrabold text-[#0B3A66] font-['Space_Mono'] text-base sm:text-lg whitespace-nowrap">
                        {item.rate}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <a
                        href={generateWhatsAppUrl(
                          `Hi Shree Krishna Transport, I want to book parcel/courier service for: ${item.serviceType} (${item.rate}).`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0B3A66] hover:bg-[#072D54] text-white text-xs font-bold font-['Manrope'] transition-all shadow-sm whitespace-nowrap"
                      >
                        <MessageCircle size={13} />
                        <span>Get Quote →</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View (< md) */}
          <div className="md:hidden space-y-3">
            {PARCEL_COURIER_FREIGHT_RATES.map((item) => (
              <div key={item.sNo} className="p-4 rounded-2xl bg-[#fbf9f6] border border-[#ece6dd] shadow-sm flex flex-col gap-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-bold text-sm text-[#1a1f1b] block">{item.serviceType}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#EBF2F9] text-[#0B3A66] font-bold font-['Space_Mono'] inline-block mt-1">
                      {item.badge}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-neutral-500 font-['Space_Mono'] uppercase block">Indicative Rate</span>
                    <span className="font-extrabold text-[#0B3A66] font-['Space_Mono'] text-base">{item.rate}</span>
                  </div>
                </div>

                <p className="text-[11px] text-neutral-600 font-['Manrope'] py-1 border-t border-[#e2dacd]/70">
                  <strong className="text-neutral-700">Best for: </strong>{item.idealFor}
                </p>

                <div className="pt-1">
                  <a
                    href={generateWhatsAppUrl(
                      `Hi Shree Krishna Transport, I want to book parcel/courier service for: ${item.serviceType} (${item.rate}).`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-[#0B3A66] hover:bg-[#072D54] text-white text-xs font-bold font-['Manrope'] transition-all flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <MessageCircle size={14} />
                    <span>Get Instant Parcel Quote →</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Note & CTA */}
          <div className="mt-6 pt-5 border-t border-[#e2dacd] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-xs text-neutral-500 font-['Manrope'] italic">
              *Minimum billable weight may apply based on destination pin-code. Standard volumetric conversion: 1 CFT = 10 KG.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={generateWhatsAppUrl('Hi Shree Krishna Transport, I need a parcel/courier freight rate estimate.')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#0B3A66] text-white text-xs font-bold font-['Manrope'] hover:bg-[#072D54] transition-colors inline-flex items-center gap-1.5 shadow-sm"
              >
                <MessageCircle size={14} />
                <span>Request Custom Parcel Quote</span>
              </a>
            </div>
          </div>
        </div>

        {/* Direct Transport Dispatch Desk Contact Strip */}
        <div className="mt-8 bg-gradient-to-r from-[#071F35] to-[#1e2821] text-white rounded-3xl p-6 md:p-8 border border-neutral-800 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0B3A66] text-white flex items-center justify-center shrink-0 shadow-lg">
              <Phone size={26} />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#F5B51B] font-['Space_Mono'] block">
                Direct Transport Dispatch Desk
              </span>
              <h4 className="text-xl sm:text-2xl font-extrabold uppercase font-['Archivo_Narrow'] text-white">
                Have a Custom Payload or Unlisted Route?
              </h4>
              <p className="text-xs text-neutral-300 font-['Manrope'] mt-0.5">
                Call or message our fleet dispatcher for quick direct quotes on spot and contract linehauls.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={`tel:+919784800833`}
              className="px-5 py-3 rounded-xl bg-white text-[#1a1f1b] font-bold text-xs uppercase font-['Space_Mono'] hover:bg-neutral-100 transition-colors flex items-center gap-2"
            >
              <Phone size={14} className="text-[#0B3A66]" />
              <span>+91 97848 00833</span>
            </a>
            <a
              href={generateWhatsAppUrl('Hi Shree Krishna Transport, I need an instant freight quote.')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-[#0B3A66] hover:bg-[#072D54] text-white font-bold text-xs uppercase font-['Manrope'] transition-colors flex items-center gap-2 shadow-lg"
            >
              <MessageCircle size={16} />
              <span>Get Quick Quote on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
