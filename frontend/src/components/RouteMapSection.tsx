import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  Truck,
  ShieldCheck,
  Award,
  Clock,
  Sparkles,
  Info,
  Package,
  MapPin,
} from 'lucide-react';
import {
  PAN_INDIA_RATES,
  DELHI_NCR_5_TON_RATES,
  DELHI_NCR_15_TON_RATES,
  PARCEL_COURIER_FREIGHT_RATES,
  RATE_CARD_META,
} from '../data/rateCardData';

interface RouteMapSectionProps {
  initialTab?: 'pan-india' | 'delhi-ncr' | 'parcel';
  className?: string;
}

export const RouteMapSection: React.FC<RouteMapSectionProps> = ({
  initialTab = 'pan-india',
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState<'pan-india' | 'delhi-ncr' | 'parcel'>(initialTab);
  const [regionFilter, setRegionFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const generateWhatsAppUrl = (text: string) => {
    return `https://wa.me/919784800833?text=${encodeURIComponent(text)}`;
  };

  const filteredPanIndiaRates = PAN_INDIA_RATES.filter((item) => {
    const matchesRegion = regionFilter === 'All' || item.region === regionFilter;
    const matchesSearch =
      !searchQuery ||
      item.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.state.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  return (
    <section className={`w-full py-8 md:py-12 ${className}`} id="route-rate-cards">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        {/* Header Title & Proof Badges */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B3A66]/10 text-[#0B3A66] font-['Space_Mono'] text-xs font-bold border border-[#0B3A66]/20 mb-3">
            <Sparkles size={14} className="text-[#F5B51B]" />
            CURRENT FREIGHT &amp; PARCEL RATE GUIDE
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase font-['Archivo_Narrow'] text-[#1a1f1b] tracking-tight">
            Official Commercial Freight Rate Cards
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 font-['Manrope'] mt-3 leading-relaxed">
            Transparent benchmark tariffs for Full Truck Load (FTL), 14ft–32ft containers, multi-axle trailers, and express parcels radiating from Jaipur Central Dispatch Hub.
          </p>

          {/* 4 Feature Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6">
            <div className="bg-white p-3 rounded-xl border border-[#e2dacd] shadow-sm flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#EBF2F9] text-[#0B3A66] flex items-center justify-center shrink-0">
                <Truck size={17} />
              </div>
              <div className="text-left">
                <span className="text-[11px] font-bold text-[#1a1f1b] font-['Manrope'] block leading-tight">
                  Safe &amp; On-Time
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
        <div className="mb-8 p-4 rounded-2xl bg-[#FFF9E6] border border-[#F5B51B]/40 flex items-start gap-3 text-xs font-['Manrope'] text-neutral-800 shadow-sm">
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

        {/* Category Tabs: Pan-India Corridors | Delhi NCR Fleet | Express Parcel */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
          <button
            type="button"
            onClick={() => setActiveTab('pan-india')}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-['Manrope'] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              activeTab === 'pan-india'
                ? 'bg-[#0B3A66] text-white shadow-md'
                : 'bg-white text-neutral-700 hover:text-[#0B3A66] border border-[#e2dacd]'
            }`}
          >
            <MapPin size={16} />
            <span>Pan-India Corridors (23 Cities)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('delhi-ncr')}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-['Manrope'] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              activeTab === 'delhi-ncr'
                ? 'bg-[#0B3A66] text-white shadow-md'
                : 'bg-white text-neutral-700 hover:text-[#0B3A66] border border-[#e2dacd]'
            }`}
          >
            <Truck size={16} />
            <span>Delhi NCR Fleet (5T &amp; 15T)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('parcel')}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-['Manrope'] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              activeTab === 'parcel'
                ? 'bg-[#0B3A66] text-white shadow-md'
                : 'bg-white text-neutral-700 hover:text-[#0B3A66] border border-[#e2dacd]'
            }`}
          >
            <Package size={16} />
            <span>Parcel Tariff (Per KG)</span>
          </button>
        </div>

        {/* TAB 1: PAN-INDIA CORRIDOR TARIFF TABLE */}
        {activeTab === 'pan-india' && (
          <div className="bg-white rounded-3xl p-5 sm:p-7 md:p-10 border border-[#e2dacd] shadow-xl mb-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#e2dacd] mb-6">
              <div>
                <span className="text-xs font-bold text-[#0B3A66] font-['Space_Mono'] uppercase block">
                  Origin: Jaipur Central Dispatch Hub
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold uppercase font-['Archivo_Narrow'] text-[#1a1f1b]">
                  Pan-India Direct Freight Tariffs (Load Upto 7 Ton)
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 font-['Manrope'] mt-1">
                  Verified rates for 19 ft and 22 ft closed container &amp; high-side trucks across 23 major Indian corridors.
                </p>
              </div>

              {/* Search & Region Filter */}
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Search destination city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-[#dcd3c5] text-xs font-['Manrope'] text-[#1a1f1b] placeholder:text-neutral-400 focus:outline-none focus:border-[#0B3A66]"
                />
                <select
                  value={regionFilter}
                  onChange={(e) => setRegionFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-[#dcd3c5] text-xs font-['Manrope'] font-bold text-[#1a1f1b] bg-white focus:outline-none focus:border-[#0B3A66]"
                >
                  <option value="All">All Regions</option>
                  <option value="North">North</option>
                  <option value="West">West</option>
                  <option value="Central">Central</option>
                  <option value="East">East</option>
                  <option value="Rajasthan">Rajasthan</option>
                </select>
              </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left font-['Manrope'] text-sm">
                <thead>
                  <tr className="bg-[#FFF9E6] border-y border-[#F5B51B]/30 text-xs font-['Space_Mono'] uppercase text-[#071F35]">
                    <th className="py-3 px-4 w-12">#</th>
                    <th className="py-3 px-4">Destination</th>
                    <th className="py-3 px-4">State</th>
                    <th className="py-3 px-4">Distance / Transit</th>
                    <th className="py-3 px-4 text-right">19 ft Rate</th>
                    <th className="py-3 px-4 text-right">22 ft Rate</th>
                    <th className="py-3 px-4">Popular Goods</th>
                    <th className="py-3 px-4 text-center w-32">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ece6dd]">
                  {filteredPanIndiaRates.map((item) => (
                    <tr key={item.sNo} className="hover:bg-[#fbf9f6] transition-colors group">
                      <td className="py-3.5 px-4 font-['Space_Mono'] text-xs text-neutral-500 font-bold">{item.sNo}.</td>
                      <td className="py-3.5 px-4 font-bold text-[#1a1f1b]">
                        <span className="text-base">{item.destination}</span>
                      </td>
                      <td className="py-3.5 px-4 text-xs font-['Manrope'] text-neutral-600">{item.state}</td>
                      <td className="py-3.5 px-4 text-xs font-['Space_Mono'] text-neutral-600">
                        <div>{item.distanceKm} km</div>
                        <div className="text-[11px] text-neutral-400">{item.transitTime}</div>
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-[#1a1f1b] font-['Space_Mono'] text-sm">
                        {item.rate19ftFormatted}
                      </td>
                      <td className="py-3.5 px-4 text-right font-extrabold text-[#0B3A66] font-['Space_Mono'] text-sm">
                        {item.rate22ftFormatted}
                      </td>
                      <td className="py-3.5 px-4 text-xs text-neutral-600 max-w-xs">
                        {item.popularGoods.join(', ')}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <a
                          href={generateWhatsAppUrl(
                            `Hi Shree Krishna Transport, I want to book truck for Jaipur to ${item.destination} (19ft: ${item.rate19ftFormatted}, 22ft: ${item.rate22ftFormatted}).`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B3A66] hover:bg-[#072D54] text-white text-xs font-bold font-['Manrope'] transition-all shadow-sm"
                        >
                          <MessageCircle size={13} />
                          <span>Quote</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-3">
              {filteredPanIndiaRates.map((item) => (
                <div key={item.sNo} className="p-4 rounded-2xl bg-[#fbf9f6] border border-[#ece6dd] shadow-sm flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-bold text-base text-[#1a1f1b] block">{item.destination}</span>
                      <span className="text-[11px] text-neutral-500 font-['Manrope']">{item.state} • {item.distanceKm} km ({item.transitTime})</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#EBF2F9] text-[#0B3A66] font-bold text-[10px] font-['Space_Mono']">
                      {item.region}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#ece6dd] text-xs font-['Space_Mono']">
                    <div className="bg-white p-2 rounded-lg border border-[#e2dacd]">
                      <span className="text-[10px] text-neutral-400 block uppercase">19 ft Truck</span>
                      <span className="font-bold text-[#1a1f1b]">{item.rate19ftFormatted}</span>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-[#e2dacd]">
                      <span className="text-[10px] text-neutral-400 block uppercase">22 ft Truck</span>
                      <span className="font-extrabold text-[#0B3A66]">{item.rate22ftFormatted}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-neutral-500 font-['Manrope']">
                    <strong>Goods: </strong>{item.popularGoods.join(', ')}
                  </p>

                  <a
                    href={generateWhatsAppUrl(
                      `Hi Shree Krishna Transport, I want to book truck for Jaipur to ${item.destination}.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 rounded-xl bg-[#0B3A66] hover:bg-[#072D54] text-white text-xs font-bold font-['Manrope'] text-center flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <MessageCircle size={14} />
                    <span>Get Instant Quote</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: DELHI NCR RATE CARDS (TABLE A & TABLE B) */}
        {activeTab === 'delhi-ncr' && (
          <div className="space-y-8 mb-10">
            {/* Table A: Load Up to 5 Ton */}
            <div className="bg-white rounded-3xl p-5 sm:p-7 md:p-10 border border-[#e2dacd] shadow-xl">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#e2dacd] mb-6">
                <div>
                  <span className="text-xs font-bold text-[#0B3A66] font-['Space_Mono'] uppercase block">
                    Jaipur ⇄ Delhi NCR Corridor (NH-48)
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold uppercase font-['Archivo_Narrow'] text-[#1a1f1b]">
                    Table A: Standard Fleet Tariff (Load Upto 5 Ton)
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 font-['Manrope'] mt-1">
                    Direct dispatches from Jaipur industrial clusters to Gurugram, Okhla, Mundka, Kundli, and Noida.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#EBF2F9] text-[#0B3A66] font-['Space_Mono'] text-xs font-bold">
                  Next-Morning Delivery
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-['Manrope'] text-sm">
                  <thead>
                    <tr className="bg-[#FFF9E6] border-y border-[#F5B51B]/30 text-xs font-['Space_Mono'] uppercase text-[#071F35]">
                      <th className="py-3 px-4 w-12">#</th>
                      <th className="py-3 px-4">Vehicle Type</th>
                      <th className="py-3 px-4">Body Type</th>
                      <th className="py-3 px-4">Capacity</th>
                      <th className="py-3 px-4">Ideal For</th>
                      <th className="py-3 px-4 text-right whitespace-nowrap">Official Rate (₹)</th>
                      <th className="py-3 px-4 text-center w-32">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ece6dd]">
                    {DELHI_NCR_5_TON_RATES.map((item) => (
                      <tr key={item.sNo} className="hover:bg-[#fbf9f6] transition-colors">
                        <td className="py-3.5 px-4 font-['Space_Mono'] text-xs text-neutral-500 font-bold">{item.sNo}.</td>
                        <td className="py-3.5 px-4 font-bold text-[#1a1f1b]">{item.vehicleType}</td>
                        <td className="py-3.5 px-4 text-xs text-neutral-600">{item.bodyType}</td>
                        <td className="py-3.5 px-4 text-xs font-['Space_Mono'] text-[#0B3A66] font-bold">{item.capacity}</td>
                        <td className="py-3.5 px-4 text-xs text-neutral-600 max-w-xs">{item.idealFor}</td>
                        <td className="py-3.5 px-4 text-right font-extrabold text-[#0B3A66] font-['Space_Mono'] whitespace-nowrap">
                          ₹{item.rateRange}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <a
                            href={generateWhatsAppUrl(`Hi Shree Krishna Transport, I want to book ${item.vehicleType} for Jaipur to Delhi NCR.`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B3A66] hover:bg-[#072D54] text-white text-xs font-bold font-['Manrope'] transition-all shadow-sm"
                          >
                            <MessageCircle size={13} />
                            <span>Book</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table B: Load Up to 15 Ton Multi-Axle */}
            <div className="bg-white rounded-3xl p-5 sm:p-7 md:p-10 border border-[#e2dacd] shadow-xl">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#e2dacd] mb-6">
                <div>
                  <span className="text-xs font-bold text-[#0B3A66] font-['Space_Mono'] uppercase block">
                    Heavy Commercial &amp; Project Cargo
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold uppercase font-['Archivo_Narrow'] text-[#1a1f1b]">
                    Table B: Heavy Freight Tariff (Load Upto 15 Ton)
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 font-['Manrope'] mt-1">
                    Multi-axle Taurus trucks and heavy containers for steel, marble, transformers, and bulk manufacturing.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#FFF9E6] text-[#071F35] font-['Space_Mono'] text-xs font-bold border border-[#F5B51B]/30">
                  Heavy Industrial Fleet
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-['Manrope'] text-sm">
                  <thead>
                    <tr className="bg-[#FFF9E6] border-y border-[#F5B51B]/30 text-xs font-['Space_Mono'] uppercase text-[#071F35]">
                      <th className="py-3 px-4 w-12">#</th>
                      <th className="py-3 px-4">Heavy Vehicle Type</th>
                      <th className="py-3 px-4">Body Type</th>
                      <th className="py-3 px-4">Payload Capacity</th>
                      <th className="py-3 px-4">Recommended Cargo</th>
                      <th className="py-3 px-4 text-right whitespace-nowrap">Official Rate (₹)</th>
                      <th className="py-3 px-4 text-center w-32">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ece6dd]">
                    {DELHI_NCR_15_TON_RATES.map((item) => (
                      <tr key={item.sNo} className="hover:bg-[#fbf9f6] transition-colors">
                        <td className="py-3.5 px-4 font-['Space_Mono'] text-xs text-neutral-500 font-bold">{item.sNo}.</td>
                        <td className="py-3.5 px-4 font-bold text-[#1a1f1b]">{item.vehicleType}</td>
                        <td className="py-3.5 px-4 text-xs text-neutral-600">{item.bodyType}</td>
                        <td className="py-3.5 px-4 text-xs font-['Space_Mono'] text-[#0B3A66] font-bold">{item.capacity}</td>
                        <td className="py-3.5 px-4 text-xs text-neutral-600 max-w-xs">{item.idealFor}</td>
                        <td className="py-3.5 px-4 text-right font-extrabold text-[#0B3A66] font-['Space_Mono'] whitespace-nowrap">
                          ₹{item.rateRange}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <a
                            href={generateWhatsAppUrl(`Hi Shree Krishna Transport, I want to book ${item.vehicleType} (${item.capacity}) for Jaipur to Delhi NCR.`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B3A66] hover:bg-[#072D54] text-white text-xs font-bold font-['Manrope'] transition-all shadow-sm"
                          >
                            <MessageCircle size={13} />
                            <span>Book</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PARCEL / COURIER & FREIGHT RATES */}
        {activeTab === 'parcel' && (
          <div className="bg-white rounded-3xl p-5 sm:p-7 md:p-10 border border-[#e2dacd] shadow-xl mb-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#e2dacd] mb-6">
              <div>
                <span className="text-xs font-bold text-[#0B3A66] font-['Space_Mono'] uppercase block">
                  Point-to-Point Express Surface Parcel Network
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold uppercase font-['Archivo_Narrow'] text-[#1a1f1b]">
                  Table C: Express Commercial Parcel &amp; Box Rates
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 font-['Manrope'] mt-1">
                  Transparent per-kilogram parcel charges for commercial cartons, spare parts, and corporate dispatches.
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
                            `Hi Shree Krishna Transport, I want to book parcel service for: ${item.serviceType} (${item.rate}).`
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
                        `Hi Shree Krishna Transport, I want to book parcel service for: ${item.serviceType} (${item.rate}).`
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
                  href={generateWhatsAppUrl('Hi Shree Krishna Transport, I need a parcel freight rate estimate.')}
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
        )}

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
