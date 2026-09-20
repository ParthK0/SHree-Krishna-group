import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Truck,
  Phone,
  MessageCircle,
  Search,
  Clock,
  ShieldCheck,
  Award,
  ArrowRight,
  Sparkles,
  Filter,
  Info,
} from 'lucide-react';
import {
  DELHI_NCR_5_TON_RATES,
  DELHI_NCR_15_TON_RATES,
  PAN_INDIA_RATES,
  PARCEL_COURIER_FREIGHT_RATES,
  RATE_CARD_META,
} from '../data/rateCardData';

interface RouteMapSectionProps {
  initialTab?: 'delhi' | 'pan-india' | 'parcel';
  className?: string;
}

export const RouteMapSection: React.FC<RouteMapSectionProps> = ({
  initialTab = 'delhi',
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState<'delhi' | 'pan-india' | 'parcel'>(initialTab);
  const [delhiWeightTier, setDelhiWeightTier] = useState<'5-ton' | '15-ton'>('5-ton');
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filtered Pan-India routes for Left Rate Table tab
  const filteredPanIndia = PAN_INDIA_RATES.filter((item) => {
    const matchesRegion = regionFilter === 'all' || item.region.toLowerCase() === regionFilter.toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !query ||
      item.destination.toLowerCase().includes(query) ||
      item.state.toLowerCase().includes(query) ||
      item.rateRange.toLowerCase().includes(query) ||
      item.popularGoods.some((g) => g.toLowerCase().includes(query));
    return matchesRegion && matchesQuery;
  });

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
            CURRENT FREIGHT RATE GUIDE (INDICATIVE MARKET RATES)
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase font-['Archivo_Narrow'] text-[#1a1f1b] tracking-tight">
            Jaipur Hub Linehaul Corridors & Benchmark Rates
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 font-['Manrope'] mt-3 leading-relaxed">
            Direct-to-carrier pricing benchmarks with zero broker commission. Compare verified indicative rates for Jaipur to Delhi NCR (5 Ton & 15 Ton), Pan-India 18 Industrial Cities (7 Ton), and Express Parcel & Courier Rates.
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

        {/* Master Tab Bar: Delhi NCR (Table A & B) | Pan India (18 Cities) | Parcel Rates (Table C) */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <button
            onClick={() => setActiveTab('delhi')}
            className={`px-5 py-3 rounded-2xl font-['Archivo_Narrow'] font-bold text-xs sm:text-sm md:text-base uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm ${
              activeTab === 'delhi'
                ? 'bg-[#0B3A66] text-white shadow-[#0B3A66]/25 ring-2 ring-[#0B3A66]/30'
                : 'bg-white text-[#1a1f1b] border border-[#e2dacd] hover:border-[#0B3A66]'
            }`}
          >
            <Truck size={17} />
            <span>Delhi NCR (Table A & B)</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F5B51B] text-[#071F35] font-['Space_Mono'] font-extrabold">
              5T & 15T
            </span>
          </button>

          <button
            onClick={() => setActiveTab('pan-india')}
            className={`px-5 py-3 rounded-2xl font-['Archivo_Narrow'] font-bold text-xs sm:text-sm md:text-base uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm ${
              activeTab === 'pan-india'
                ? 'bg-[#0B3A66] text-white shadow-[#0B3A66]/25 ring-2 ring-[#0B3A66]/30'
                : 'bg-white text-[#1a1f1b] border border-[#e2dacd] hover:border-[#0B3A66]'
            }`}
          >
            <MapPin size={17} />
            <span>Jaipur ➔ Pan India (18 Cities)</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#EBF2F9] text-[#0B3A66] font-['Space_Mono'] font-bold">
              7 Ton
            </span>
          </button>

          <button
            onClick={() => setActiveTab('parcel')}
            className={`px-5 py-3 rounded-2xl font-['Archivo_Narrow'] font-bold text-xs sm:text-sm md:text-base uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm ${
              activeTab === 'parcel'
                ? 'bg-[#0B3A66] text-white shadow-[#0B3A66]/25 ring-2 ring-[#0B3A66]/30'
                : 'bg-white text-[#1a1f1b] border border-[#e2dacd] hover:border-[#0B3A66]'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#F5B51B]" />
            <span>Table C: Parcel & Courier</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FFF9E6] text-[#071F35] font-['Space_Mono'] font-extrabold">
              Per KG
            </span>
          </button>
        </div>

        {/* TAB 1: JAIPUR -> DELHI NCR (TABLE A & B) */}
        {activeTab === 'delhi' && (
          <div className="bg-white rounded-3xl p-5 sm:p-7 md:p-10 border border-[#e2dacd] shadow-xl animate-fadeIn mb-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#e2dacd] mb-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0B3A66] font-['Space_Mono'] uppercase">
                  <span>Corridor: Jaipur ➔ Delhi NCR</span>
                  <span>•</span>
                  <span>280 KM</span>
                  <span>•</span>
                  <span>{delhiWeightTier === '5-ton' ? 'Table A (5 Ton)' : 'Table B (15 Ton)'}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold uppercase font-['Archivo_Narrow'] text-[#1a1f1b]">
                  {delhiWeightTier === '5-ton'
                    ? 'Table A: Delhi NCR | Load Upto 5 Ton'
                    : 'Table B: Delhi NCR | Load Upto 15 Ton'}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 font-['Manrope'] mt-1">
                  Daily morning linehaul delivery across Okhla, Mayapuri, Mundka, Kundli, Gurugram, Faridabad, and Greater Noida.
                </p>
              </div>

              {/* Weight Selector: Table A (Load Upto 5 Ton) vs Table B (Load Upto 15 Ton) */}
              <div className="inline-flex p-1 rounded-2xl bg-[#f4eee6] border border-[#d8d0c3] shrink-0">
                <button
                  onClick={() => setDelhiWeightTier('5-ton')}
                  className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold uppercase font-['Space_Mono'] transition-all ${
                    delhiWeightTier === '5-ton'
                      ? 'bg-[#0B3A66] text-white shadow-sm'
                      : 'text-neutral-700 hover:text-black'
                  }`}
                >
                  Table A (5 Ton)
                </button>
                <button
                  onClick={() => setDelhiWeightTier('15-ton')}
                  className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold uppercase font-['Space_Mono'] transition-all ${
                    delhiWeightTier === '15-ton'
                      ? 'bg-[#0B3A66] text-white shadow-sm'
                      : 'text-neutral-700 hover:text-black'
                  }`}
                >
                  Table B (15 Ton)
                </button>
              </div>
            </div>

            {/* Desktop Table (hidden on mobile) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left font-['Manrope'] text-sm">
                <thead>
                  <tr className="bg-[#FFF9E6] border-y border-[#F5B51B]/30 text-xs font-['Space_Mono'] uppercase text-[#071F35]">
                    <th className="py-3 px-3 w-12">S. No.</th>
                    <th className="py-3 px-3">Vehicle Type</th>
                    <th className="py-3 px-3">Body Type</th>
                    <th className="py-3 px-3">Transit Time</th>
                    <th className="py-3 px-3">Payload Spec</th>
                    <th className="py-3 px-3">Recommended Cargo</th>
                    <th className="py-3 px-3 text-right">Indicative Rate</th>
                    <th className="py-3 px-3 text-center w-32">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ece6dd]">
                  {(delhiWeightTier === '5-ton' ? DELHI_NCR_5_TON_RATES : DELHI_NCR_15_TON_RATES).map((item) => (
                    <tr key={item.sNo} className="hover:bg-[#fbf9f6] transition-colors group">
                      <td className="py-3.5 px-3 font-['Space_Mono'] text-xs text-neutral-500 font-bold">{item.sNo}.</td>
                      <td className="py-3.5 px-3 font-bold text-[#1a1f1b]">
                        <div className="flex items-center gap-2">
                          <Truck size={16} className="text-[#0B3A66] shrink-0" />
                          <span>{item.vehicleType}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 text-xs font-['Space_Mono'] text-neutral-700">
                        {item.bodyType || 'High-Side / Open'}
                      </td>
                      <td className="py-3.5 px-3 text-xs font-['Space_Mono'] text-[#0B3A66] font-semibold whitespace-nowrap">
                        {item.transitTime || '4 – 6 Hours'}
                      </td>
                      <td className="py-3.5 px-3 text-xs font-['Space_Mono'] text-neutral-600 whitespace-nowrap">{item.capacity}</td>
                      <td className="py-3.5 px-3 text-xs text-neutral-600 max-w-xs">{item.idealFor}</td>
                      <td className="py-3.5 px-3 text-right font-extrabold text-[#0B3A66] font-['Space_Mono'] text-sm sm:text-base whitespace-nowrap">
                        ₹{item.rateRange}
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        <a
                          href={generateWhatsAppUrl(
                            `Hi Shree Krishna Transport, I need freight quotation for Jaipur to Delhi NCR for ${item.vehicleType} (${item.bodyType || 'Standard'}, Payload: ${item.capacity}, Indicative: ₹${item.rateRange}).`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0B3A66] hover:bg-[#072D54] text-white text-xs font-bold font-['Manrope'] transition-all shadow-sm whitespace-nowrap"
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
              {(delhiWeightTier === '5-ton' ? DELHI_NCR_5_TON_RATES : DELHI_NCR_15_TON_RATES).map((item) => (
                <div key={item.sNo} className="p-4 rounded-2xl bg-[#fbf9f6] border border-[#ece6dd] shadow-sm flex flex-col gap-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-sm text-[#1a1f1b]">
                        <Truck size={15} className="text-[#0B3A66] shrink-0" />
                        <span>{item.vehicleType}</span>
                      </div>
                      <span className="text-[11px] text-neutral-600 font-['Space_Mono']">{item.bodyType || 'High-Side / Open'}</span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[10px] text-neutral-500 font-['Space_Mono'] uppercase block">Indicative Rate</span>
                      <span className="font-extrabold text-[#0B3A66] font-['Space_Mono'] text-base">₹{item.rateRange}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] py-2 border-y border-[#e2dacd]/70 font-['Space_Mono']">
                    <div>
                      <span className="text-neutral-500">Payload: </span>
                      <span className="font-semibold text-neutral-800">{item.capacity}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500">Transit: </span>
                      <span className="font-semibold text-[#0B3A66]">{item.transitTime || '4 – 6 Hours'}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-neutral-600 font-['Manrope']">
                    <strong className="text-neutral-700">Best for: </strong>{item.idealFor}
                  </p>

                  <div className="pt-1">
                    <a
                      href={generateWhatsAppUrl(
                        `Hi Shree Krishna Transport, I need freight quotation for Jaipur to Delhi NCR for ${item.vehicleType} (${item.bodyType || 'Standard'}, Payload: ${item.capacity}, Indicative: ₹${item.rateRange}).`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl bg-[#0B3A66] hover:bg-[#072D54] text-white text-xs font-bold font-['Manrope'] transition-all flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <MessageCircle size={14} />
                      <span>Get Instant Quote →</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Note and Route Guides */}
            <div className="mt-6 pt-5 border-t border-[#e2dacd] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-xs text-neutral-500 font-['Manrope'] italic">
                *Toll charges, local MCD/green tax, and loading/unloading subject to specific consignment terms.
              </p>
              <div className="flex items-center gap-3">
                <Link
                  to="/jaipur-to-delhi-transport"
                  className="text-xs font-bold text-[#0B3A66] hover:underline font-['Space_Mono'] inline-flex items-center gap-1"
                >
                  View Full Route Specs <ArrowRight size={14} />
                </Link>
                <Link
                  to="/blog/jaipur-to-delhi-transport-cost-guide"
                  className="px-3.5 py-1.5 rounded-xl bg-[#f4eee6] hover:bg-[#e8e0d4] text-xs font-bold text-[#1a1f1b] font-['Manrope'] transition-colors"
                >
                  Read 2026 Cost Guide
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LEFT RATE TABLE: JAIPUR -> PAN INDIA (18 CITIES | 7 TON) */}
        {activeTab === 'pan-india' && (
          <div className="bg-white rounded-3xl p-5 sm:p-7 md:p-10 border border-[#e2dacd] shadow-xl animate-fadeIn mb-10">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-6 border-b border-[#e2dacd] mb-6">
              <div>
                <span className="text-xs font-bold text-[#0B3A66] font-['Space_Mono'] uppercase block">
                  Pan India Corridors • Direct Linehaul
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold uppercase font-['Archivo_Narrow'] text-[#1a1f1b]">
                  Jaipur ➔ 18 Industrial Cities (Load Upto 7 Ton)
                </h3>
              </div>

              {/* Search Bar */}
              <div className="relative min-w-[260px]">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" size={17} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search city, state, or rate..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#fbf9f6] border border-[#d8d0c3] text-xs font-['Manrope'] focus:outline-none focus:border-[#0B3A66]"
                />
              </div>
            </div>

            {/* Region Pill Filters */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-xs font-bold text-neutral-500 font-['Space_Mono'] mr-1 flex items-center gap-1">
                <Filter size={13} /> Region:
              </span>
              {[
                { label: 'All 18 Cities', value: 'all' },
                { label: 'Gujarat / West', value: 'west' },
                { label: 'Rajasthan Local', value: 'rajasthan' },
                { label: 'Central / MP', value: 'central' },
                { label: 'East / UP', value: 'east' },
                { label: 'North', value: 'north' },
              ].map((r) => (
                <button
                  key={r.value}
                  onClick={() => setRegionFilter(r.value)}
                  className={`px-3 py-1 rounded-full text-xs font-bold font-['Manrope'] transition-all ${
                    regionFilter === r.value
                      ? 'bg-[#0B3A66] text-white shadow-sm'
                      : 'bg-[#f4eee6] text-neutral-700 hover:bg-[#e8e0d4]'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left font-['Manrope'] text-sm">
                <thead>
                  <tr className="bg-[#FFF9E6] border-y border-[#F5B51B]/30 text-xs font-['Space_Mono'] uppercase text-[#071F35]">
                    <th className="py-3 px-3 w-12">S. No.</th>
                    <th className="py-3 px-3">City</th>
                    <th className="py-3 px-3">Indicative Rate (Upto 7 Ton)</th>
                    <th className="py-3 px-3">State / Region</th>
                    <th className="py-3 px-3">Distance & Transit</th>
                    <th className="py-3 px-3 text-right">19 ft Breakdown</th>
                    <th className="py-3 px-3 text-right">22 ft Breakdown</th>
                    <th className="py-3 px-3 text-center w-32">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ece6dd]">
                  {filteredPanIndia.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-neutral-500 text-xs font-['Manrope']">
                        No destinations matched "{searchQuery}". Try searching another city.
                      </td>
                    </tr>
                  ) : (
                    filteredPanIndia.map((item) => (
                      <tr key={item.sNo} className="hover:bg-[#fbf9f6] transition-colors group">
                        <td className="py-3.5 px-3 font-['Space_Mono'] text-xs text-neutral-500 font-bold">{item.sNo}.</td>
                        <td className="py-3.5 px-3 font-bold text-[#1a1f1b]">
                          <div className="flex items-center gap-1.5">
                            <MapPin size={15} className="text-[#F5B51B] shrink-0" />
                            <span className="text-base">{item.destination}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="inline-block px-3 py-1 rounded-xl bg-[#EBF2F9] text-[#0B3A66] font-['Space_Mono'] font-extrabold text-sm border border-[#0B3A66]/20 whitespace-nowrap">
                            {item.rateRange}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-xs font-['Manrope'] text-neutral-600">
                          <span className="px-2 py-0.5 rounded bg-neutral-100 border border-neutral-200 text-neutral-700 text-[11px] whitespace-nowrap">
                            {item.state}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-xs font-['Space_Mono'] text-neutral-600 whitespace-nowrap">
                          <span>{item.distanceKm} km</span> • <span className="text-[#0B3A66] font-semibold">{item.transitTime}</span>
                        </td>
                        <td className="py-3.5 px-3 text-right font-bold text-neutral-700 font-['Space_Mono'] text-xs sm:text-sm whitespace-nowrap">
                          {item.rate19ftFormatted}
                        </td>
                        <td className="py-3.5 px-3 text-right font-extrabold text-[#0B3A66] font-['Space_Mono'] text-xs sm:text-sm whitespace-nowrap">
                          {item.rate22ftFormatted}
                        </td>
                        <td className="py-3.5 px-3 text-center">
                          <a
                            href={generateWhatsAppUrl(
                              `Hi Shree Krishna Transport, I need freight quotation for Jaipur to ${item.destination} (${item.state}) for Load Upto 7 Ton (Indicative: ${item.rateRange}).`
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl bg-[#0B3A66] hover:bg-[#072D54] text-white text-xs font-bold font-['Manrope'] transition-all shadow-sm whitespace-nowrap"
                          >
                            <MessageCircle size={13} />
                            <span>Get Quote →</span>
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View (< md) */}
            <div className="md:hidden space-y-3">
              {filteredPanIndia.length === 0 ? (
                <div className="p-6 text-center text-neutral-500 text-xs font-['Manrope'] bg-[#fbf9f6] rounded-2xl border border-[#ece6dd]">
                  No destinations matched "{searchQuery}".
                </div>
              ) : (
                filteredPanIndia.map((item) => (
                  <div key={item.sNo} className="p-4 rounded-2xl bg-[#fbf9f6] border border-[#ece6dd] shadow-sm flex flex-col gap-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5 font-bold text-base text-[#1a1f1b]">
                          <MapPin size={15} className="text-[#F5B51B] shrink-0" />
                          <span>{item.destination}</span>
                        </div>
                        <span className="text-[11px] text-neutral-500 font-['Manrope']">{item.state} • {item.region} Region</span>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[10px] text-neutral-500 font-['Space_Mono'] uppercase block">Indicative Rate</span>
                        <span className="font-extrabold text-[#0B3A66] font-['Space_Mono'] text-sm">{item.rateRange}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] py-2 border-y border-[#e2dacd]/70 font-['Space_Mono']">
                      <div><span className="text-neutral-500">Distance:</span> <span className="font-semibold text-neutral-800">{item.distanceKm} km</span></div>
                      <div><span className="text-neutral-500">Transit:</span> <span className="font-semibold text-[#0B3A66]">{item.transitTime}</span></div>
                    </div>

                    <div className="flex items-center justify-between text-xs font-['Space_Mono'] bg-white p-2 rounded-xl border border-[#ece6dd]">
                      <div className="text-left">
                        <span className="text-[10px] text-neutral-400 block">19 ft Truck</span>
                        <span className="font-bold text-neutral-700">{item.rate19ftFormatted}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-neutral-400 block">22 ft Truck</span>
                        <span className="font-bold text-[#0B3A66]">{item.rate22ftFormatted}</span>
                      </div>
                    </div>

                    <div className="pt-1">
                      <a
                        href={generateWhatsAppUrl(
                          `Hi Shree Krishna Transport, I need freight quotation for Jaipur to ${item.destination} (${item.state}) for Load Upto 7 Ton (Indicative: ${item.rateRange}).`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 rounded-xl bg-[#0B3A66] hover:bg-[#072D54] text-white text-xs font-bold font-['Manrope'] transition-all flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <MessageCircle size={14} />
                        <span>Get Instant Quote →</span>
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Note & Resource Guide */}
            <div className="mt-6 pt-5 border-t border-[#e2dacd] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-xs text-neutral-500 font-['Manrope'] italic">
                *Rates reflect direct terminal-to-terminal linehaul benchmarks. Multi-drop and interior village drops quoted separately.
              </p>
              <div className="flex items-center gap-3">
                <Link
                  to="/blog/jaipur-to-pan-india-truck-transport-rates"
                  className="px-4 py-2 rounded-xl bg-[#0B3A66] text-white text-xs font-bold font-['Manrope'] hover:bg-[#072D54] transition-colors"
                >
                  Read 18-City Rate Analysis
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TABLE C: PARCEL / COURIER & FREIGHT RATES */}
        {activeTab === 'parcel' && (
          <div className="bg-white rounded-3xl p-5 sm:p-7 md:p-10 border border-[#e2dacd] shadow-xl animate-fadeIn mb-10">
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
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Recommended Freight</th>
                    <th className="py-3 px-4 text-right">Indicative Rate</th>
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
                      <td className="py-4 px-4 text-xs font-['Space_Mono']">
                        <span className="px-2.5 py-1 rounded-full bg-[#EBF2F9] text-[#0B3A66] font-bold">
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
