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
} from 'lucide-react';
import {
  DELHI_NCR_7_TON_RATES,
  DELHI_NCR_15_TON_RATES,
  PAN_INDIA_RATES,
  RATE_CARD_META,
} from '../data/rateCardData';

interface RouteMapSectionProps {
  initialTab?: 'delhi' | 'pan-india';
  className?: string;
}

export const RouteMapSection: React.FC<RouteMapSectionProps> = ({
  initialTab = 'delhi',
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState<'delhi' | 'pan-india'>(initialTab);
  const [delhiWeightTier, setDelhiWeightTier] = useState<'7-ton' | '15-ton'>('7-ton');
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeHub, setActiveHub] = useState<string | null>(null);

  // Filtered Pan-India routes
  const filteredPanIndia = PAN_INDIA_RATES.filter((item) => {
    const matchesRegion = regionFilter === 'all' || item.region.toLowerCase() === regionFilter.toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !query ||
      item.destination.toLowerCase().includes(query) ||
      item.state.toLowerCase().includes(query) ||
      item.popularGoods.some((g) => g.toLowerCase().includes(query));
    return matchesRegion && matchesQuery;
  });

  const generateWhatsAppUrl = (text: string) => {
    return `https://wa.me/919784800833?text=${encodeURIComponent(text)}`;
  };

  const hubNodes = [
    { name: 'Delhi NCR', region: 'North', x: '52%', y: '16%', highlight: 'Load Up to 15 Ton', link: '/jaipur-to-delhi-transport' },
    { name: 'Ahmedabad', region: 'West', x: '24%', y: '58%', highlight: '19ft: ₹24k | 22ft: ₹26k', link: '/jaipur-to-ahmedabad-transport' },
    { name: 'Mumbai', region: 'West', x: '28%', y: '82%', highlight: '19ft: ₹35.5k | 22ft: ₹37.5k', link: '/jaipur-to-mumbai-transport' },
    { name: 'Surat', region: 'West', x: '20%', y: '70%', highlight: '19ft: ₹26.5k | 22ft: ₹28.5k', link: '/jaipur-to-surat-transport' },
    { name: 'Jodhpur', region: 'Rajasthan', x: '26%', y: '36%', highlight: '19ft: ₹17k | 22ft: ₹19k', link: '/jaipur-to-jodhpur-transport' },
    { name: 'Ajmer', region: 'Rajasthan', x: '38%', y: '42%', highlight: '19ft: ₹10.5k | 22ft: ₹11.5k', link: '/jaipur-to-ajmer-transport' },
    { name: 'Kota', region: 'Rajasthan', x: '50%', y: '54%', highlight: '19ft: ₹14k | 22ft: ₹15.5k', link: '/routes' },
    { name: 'Indore', region: 'Central', x: '46%', y: '68%', highlight: '19ft: ₹25.5k | 22ft: ₹27.5k', link: '/routes' },
    { name: 'Bhopal', region: 'Central', x: '58%', y: '64%', highlight: '19ft: ₹27.5k | 22ft: ₹29.5k', link: '/routes' },
    { name: 'Lucknow', region: 'East', x: '78%', y: '32%', highlight: '19ft: ₹27.5k | 22ft: ₹29.5k', link: '/routes' },
    { name: 'Agra', region: 'East', x: '68%', y: '26%', highlight: '19ft: ₹14k | 22ft: ₹16k', link: '/routes' },
    { name: 'Alwar', region: 'Rajasthan', x: '58%', y: '22%', highlight: '19ft: ₹11k | 22ft: ₹13k', link: '/routes' },
  ];

  return (
    <section className={`w-full py-12 md:py-16 ${className}`} id="route-rate-cards">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        {/* Header Title & Proof Badges */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F6A37]/10 text-[#0F6A37] font-['Space_Mono'] text-xs font-bold border border-[#0F6A37]/20 mb-3">
            <Sparkles size={14} className="text-[#F4B400]" />
            OFFICIAL FREIGHT RATE CARDS & ROUTE MAP
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase font-['Archivo_Narrow'] text-[#1a1f1b] tracking-tight">
            Jaipur Hub Transport Network & Rates
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 font-['Manrope'] mt-3 leading-relaxed">
            Direct-from-carrier pricing with zero broker commission. Compare real rates for Jaipur to Delhi NCR and 18 Pan-India industrial destinations.
          </p>

          {/* 4 Feature Badges from the Image */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6">
            <div className="bg-white p-3 rounded-xl border border-[#e2dacd] shadow-sm flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#EBF5EE] text-[#0F6A37] flex items-center justify-center shrink-0">
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
              <div className="w-8 h-8 rounded-lg bg-[#EBF5EE] text-[#0F6A37] flex items-center justify-center shrink-0">
                <ShieldCheck size={17} />
              </div>
              <div className="text-left">
                <span className="text-[11px] font-bold text-[#1a1f1b] font-['Manrope'] block leading-tight">
                  Verified Fleet
                </span>
                <span className="text-[9px] text-neutral-500 font-['Space_Mono']">50+ Trucks</span>
              </div>
            </div>

            <div className="bg-white p-3 rounded-xl border border-[#e2dacd] shadow-sm flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#EBF5EE] text-[#0F6A37] flex items-center justify-center shrink-0">
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
                  Quote in 1 Hour
                </span>
                <span className="text-[9px] text-neutral-500 font-['Space_Mono']">WhatsApp Direct</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Hub Diagram Card */}
        <div className="mb-10 bg-[#1C201D] text-white rounded-3xl p-6 md:p-8 border border-neutral-800 shadow-xl overflow-hidden relative">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 relative z-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#F4B400] font-['Space_Mono'] block">
                Logistics Radiating Hub
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold uppercase font-['Archivo_Narrow'] text-white">
                Jaipur Central Dispatch Corridor Map
              </h3>
              <p className="text-xs text-neutral-300 font-['Manrope'] mt-1">
                Hover or click destination nodes to view verified freight charges from Jaipur dispatch terminals.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl text-xs font-['Space_Mono'] text-neutral-200">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F4B400] animate-ping" />
              <span>Jaipur Dispatch Active (24x7)</span>
            </div>
          </div>

          {/* Interactive Map Canvas representation */}
          <div className="relative w-full h-80 sm:h-96 rounded-2xl bg-gradient-to-br from-[#121613] to-[#1e251f] border border-white/10 overflow-hidden flex items-center justify-center">
            {/* Background Grid Lines */}
            <div className="absolute inset-0 bg-[radial-gradient(#39443b_1px,transparent_1px)] [background-size:20px_20px] opacity-40" />

            {/* Central Jaipur Node */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center pointer-events-auto">
              <div className="relative flex items-center justify-center">
                <span className="absolute w-20 h-20 rounded-full bg-[#0F6A37]/30 animate-pulse" />
                <span className="absolute w-12 h-12 rounded-full bg-[#F4B400]/20" />
                <div className="w-10 h-10 rounded-full bg-[#0F6A37] border-2 border-[#F4B400] text-white flex items-center justify-center shadow-lg font-bold text-xs font-['Space_Mono']">
                  RJ14
                </div>
              </div>
              <div className="mt-1.5 px-3 py-0.5 rounded-full bg-black/80 border border-[#F4B400]/60 text-[#F4B400] text-[11px] font-extrabold font-['Space_Mono'] shadow-md whitespace-nowrap">
                JAIPUR (HUB)
              </div>
            </div>

            {/* Radial Nodes */}
            {hubNodes.map((node, idx) => {
              const isSelected = activeHub === node.name;
              return (
                <div
                  key={idx}
                  style={{ left: node.x, top: node.y }}
                  onMouseEnter={() => setActiveHub(node.name)}
                  onMouseLeave={() => setActiveHub(null)}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-10 transition-transform duration-200 group cursor-pointer ${
                    isSelected ? 'scale-110 z-30' : 'hover:scale-105'
                  }`}
                >
                  <div className="flex items-center gap-1.5 bg-black/85 border border-white/20 hover:border-[#F4B400] text-white px-2.5 py-1 rounded-xl shadow-md transition-all">
                    <MapPin size={12} className="text-[#F4B400] shrink-0" />
                    <span className="text-[11px] font-bold font-['Manrope'] whitespace-nowrap">{node.name}</span>
                  </div>
                  {/* Tooltip on hover */}
                  <div
                    className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 whitespace-nowrap px-2.5 py-1 rounded-lg bg-[#0F6A37] text-white text-[10px] font-['Space_Mono'] font-bold shadow-xl transition-all duration-200 pointer-events-none ${
                      isSelected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0'
                    }`}
                  >
                    {node.highlight}
                  </div>
                </div>
              );
            })}

            {/* Bottom info strip inside map */}
            <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-neutral-400 font-['Space_Mono'] z-10 px-2 py-1 bg-black/40 rounded-xl backdrop-blur-sm">
              <span>Rajasthan • Gujarat • Maharashtra • MP • UP • Delhi NCR</span>
              <span className="text-[#8ad7a0]">Daily Dispatches via NH-48 & Western Freight Corridor</span>
            </div>
          </div>
        </div>

        {/* Master Tab Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <button
            onClick={() => setActiveTab('delhi')}
            className={`px-6 py-3 rounded-2xl font-['Archivo_Narrow'] font-bold text-sm sm:text-base uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm ${
              activeTab === 'delhi'
                ? 'bg-[#0F6A37] text-white shadow-[#0F6A37]/25'
                : 'bg-white text-[#1a1f1b] border border-[#e2dacd] hover:border-[#0F6A37]'
            }`}
          >
            <Truck size={18} />
            <span>Jaipur ➔ Delhi NCR Rate Card</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F4B400] text-[#6c5000] font-['Space_Mono'] font-extrabold">
              Up to 15 Ton
            </span>
          </button>

          <button
            onClick={() => setActiveTab('pan-india')}
            className={`px-6 py-3 rounded-2xl font-['Archivo_Narrow'] font-bold text-sm sm:text-base uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm ${
              activeTab === 'pan-india'
                ? 'bg-[#0F6A37] text-white shadow-[#0F6A37]/25'
                : 'bg-white text-[#1a1f1b] border border-[#e2dacd] hover:border-[#0F6A37]'
            }`}
          >
            <MapPin size={18} />
            <span>Jaipur ➔ Pan India Matrix</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#EBF5EE] text-[#0F6A37] font-['Space_Mono'] font-bold">
              18 Cities (19ft & 22ft)
            </span>
          </button>
        </div>

        {/* TAB 1: JAIPUR -> DELHI NCR */}
        {activeTab === 'delhi' && (
          <div className="bg-white rounded-3xl p-6 md:p-10 border border-[#e2dacd] shadow-xl animate-fadeIn">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#e2dacd] mb-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0F6A37] font-['Space_Mono'] uppercase">
                  <span>Corridor: Jaipur (Rajasthan) ➔ Delhi NCR</span>
                  <span>•</span>
                  <span>280 KM</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold uppercase font-['Archivo_Narrow'] text-[#1a1f1b]">
                  Delhi NCR Truck Transport Service Rates
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 font-['Manrope'] mt-1">
                  Daily morning delivery across Okhla, Mayapuri, Mundka, Kundli, Gurugram, Faridabad, and Noida.
                </p>
              </div>

              {/* Weight Selector: 7 Ton vs 15 Ton */}
              <div className="inline-flex p-1 rounded-2xl bg-[#f4eee6] border border-[#d8d0c3]">
                <button
                  onClick={() => setDelhiWeightTier('7-ton')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase font-['Space_Mono'] transition-all ${
                    delhiWeightTier === '7-ton'
                      ? 'bg-[#0F6A37] text-white shadow-sm'
                      : 'text-neutral-700 hover:text-black'
                  }`}
                >
                  Load Up to 7 Ton
                </button>
                <button
                  onClick={() => setDelhiWeightTier('15-ton')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase font-['Space_Mono'] transition-all ${
                    delhiWeightTier === '15-ton'
                      ? 'bg-[#0F6A37] text-white shadow-sm'
                      : 'text-neutral-700 hover:text-black'
                  }`}
                >
                  Load Up to 15 Ton
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left font-['Manrope'] text-sm">
                <thead>
                  <tr className="bg-[#FFF9E6] border-y border-[#F4B400]/30 text-xs font-['Space_Mono'] uppercase text-[#8a6500]">
                    <th className="py-3 px-4 w-14">S. No.</th>
                    <th className="py-3 px-4">Vehicle Model / Size</th>
                    <th className="py-3 px-4">Payload Spec</th>
                    <th className="py-3 px-4">Recommended Cargo</th>
                    <th className="py-3 px-4 text-right">Verified Rate (₹)</th>
                    <th className="py-3 px-4 text-center w-36">Instant Quote</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ece6dd]">
                  {(delhiWeightTier === '7-ton' ? DELHI_NCR_7_TON_RATES : DELHI_NCR_15_TON_RATES).map((item) => (
                    <tr key={item.sNo} className="hover:bg-[#fbf9f6] transition-colors group">
                      <td className="py-3.5 px-4 font-['Space_Mono'] text-xs text-neutral-500 font-bold">{item.sNo}.</td>
                      <td className="py-3.5 px-4 font-bold text-[#1a1f1b]">
                        <div className="flex items-center gap-2">
                          <Truck size={16} className="text-[#0F6A37] shrink-0" />
                          <span>{item.vehicleType}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-xs font-['Space_Mono'] text-neutral-600">{item.capacity}</td>
                      <td className="py-3.5 px-4 text-xs text-neutral-600 max-w-xs">{item.idealFor}</td>
                      <td className="py-3.5 px-4 text-right font-extrabold text-[#0F6A37] font-['Space_Mono'] text-sm sm:text-base whitespace-nowrap">
                        ₹{item.rateRange}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <a
                          href={generateWhatsAppUrl(
                            `Hi Shree Krishna Transport, I need freight quotation for Jaipur to Delhi NCR with ${item.vehicleType} (${item.capacity}).`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0F6A37] hover:bg-[#0c532b] text-white text-xs font-bold font-['Manrope'] transition-all shadow-sm"
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

            {/* Note and CTA banner */}
            <div className="mt-6 pt-5 border-t border-[#e2dacd] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-xs text-neutral-500 font-['Manrope'] italic">
                *{RATE_CARD_META.termsNote}
              </p>
              <div className="flex items-center gap-3">
                <Link
                  to="/jaipur-to-delhi-transport"
                  className="text-xs font-bold text-[#0F6A37] hover:underline font-['Space_Mono'] inline-flex items-center gap-1"
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

        {/* TAB 2: JAIPUR -> PAN INDIA MATRIX */}
        {activeTab === 'pan-india' && (
          <div className="bg-white rounded-3xl p-6 md:p-10 border border-[#e2dacd] shadow-xl animate-fadeIn">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-6 border-b border-[#e2dacd] mb-6">
              <div>
                <span className="text-xs font-bold text-[#0F6A37] font-['Space_Mono'] uppercase block">
                  Pan India Truck Transport Service • Load Up to 7 Ton
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold uppercase font-['Archivo_Narrow'] text-[#1a1f1b]">
                  18 Industrial Cities Freight Matrix
                </h3>
              </div>

              {/* Search Bar */}
              <div className="relative min-w-[260px]">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" size={17} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search city, state, or cargo..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#fbf9f6] border border-[#d8d0c3] text-xs font-['Manrope'] focus:outline-none focus:border-[#0F6A37]"
                />
              </div>
            </div>

            {/* Region Pill Filters */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-xs font-bold text-neutral-500 font-['Space_Mono'] mr-1 flex items-center gap-1">
                <Filter size={13} /> Region:
              </span>
              {[
                { label: 'All Corridors', value: 'all' },
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
                      ? 'bg-[#0F6A37] text-white shadow-sm'
                      : 'bg-[#f4eee6] text-neutral-700 hover:bg-[#e8e0d4]'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left font-['Manrope'] text-sm">
                <thead>
                  <tr className="bg-[#FFF9E6] border-y border-[#F4B400]/30 text-xs font-['Space_Mono'] uppercase text-[#8a6500]">
                    <th className="py-3 px-4 w-14">S. No.</th>
                    <th className="py-3 px-4">Destination (From Jaipur)</th>
                    <th className="py-3 px-4">State / Region</th>
                    <th className="py-3 px-4">Distance & Transit</th>
                    <th className="py-3 px-4 text-right">19 ft Rate (₹)</th>
                    <th className="py-3 px-4 text-right">22 ft Rate (₹)</th>
                    <th className="py-3 px-4 text-center w-36">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ece6dd]">
                  {filteredPanIndia.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-neutral-500 text-xs font-['Manrope']">
                        No destinations matched "{searchQuery}". Try searching another city.
                      </td>
                    </tr>
                  ) : (
                    filteredPanIndia.map((item) => (
                      <tr key={item.sNo} className="hover:bg-[#fbf9f6] transition-colors group">
                        <td className="py-3.5 px-4 font-['Space_Mono'] text-xs text-neutral-500 font-bold">{item.sNo}.</td>
                        <td className="py-3.5 px-4 font-bold text-[#1a1f1b]">
                          <div className="flex items-center gap-1.5">
                            <MapPin size={15} className="text-[#F4B400] shrink-0" />
                            <span>{item.destination}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-xs font-['Manrope'] text-neutral-600">
                          <span className="px-2 py-0.5 rounded bg-neutral-100 border border-neutral-200 text-neutral-700 text-[11px]">
                            {item.state}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-xs font-['Space_Mono'] text-neutral-600">
                          <span>{item.distanceKm} km</span> • <span className="text-[#0F6A37] font-semibold">{item.transitTime}</span>
                        </td>
                        <td className="py-3.5 px-4 text-right font-extrabold text-[#1a1f1b] font-['Space_Mono'] text-sm">
                          {item.rate19ftFormatted}
                        </td>
                        <td className="py-3.5 px-4 text-right font-extrabold text-[#0F6A37] font-['Space_Mono'] text-sm">
                          {item.rate22ftFormatted}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <a
                            href={generateWhatsAppUrl(
                              `Hi Shree Krishna Transport, I need freight quotation for Jaipur to ${item.destination} (${item.state}) for payload up to 7 Tons.`
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl bg-[#0F6A37] hover:bg-[#0c532b] text-white text-xs font-bold font-['Manrope'] transition-all shadow-sm"
                          >
                            <MessageCircle size={13} />
                            <span>Quote</span>
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Note & CTA banner */}
            <div className="mt-6 pt-5 border-t border-[#e2dacd] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-xs text-neutral-500 font-['Manrope'] italic">
                *{RATE_CARD_META.termsNote}
              </p>
              <div className="flex items-center gap-3">
                <Link
                  to="/blog/jaipur-to-pan-india-truck-transport-rates"
                  className="px-4 py-2 rounded-xl bg-[#0F6A37] text-white text-xs font-bold font-['Manrope'] hover:bg-[#0c532b] transition-colors"
                >
                  Read 18-City Rate Analysis
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Contact Strip Banner from Image Details */}
        <div className="mt-10 bg-gradient-to-r from-[#1C201D] to-[#262c27] text-white rounded-3xl p-6 md:p-8 border border-neutral-800 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0F6A37] text-white flex items-center justify-center shrink-0 shadow-lg">
              <Phone size={26} />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#F4B400] font-['Space_Mono'] block">
                Direct Transport Dispatch Desk
              </span>
              <h4 className="text-xl sm:text-2xl font-extrabold uppercase font-['Archivo_Narrow'] text-white">
                Have a Custom Payload or Unlisted Route?
              </h4>
              <p className="text-xs text-neutral-300 font-['Manrope'] mt-0.5">
                Call or WhatsApp our fleet dispatcher for guaranteed fixed rates within 60 minutes.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={`tel:+919784800833`}
              className="px-5 py-3 rounded-xl bg-white text-[#1a1f1b] font-bold text-xs uppercase font-['Space_Mono'] hover:bg-neutral-100 transition-colors flex items-center gap-2"
            >
              <Phone size={14} className="text-[#0F6A37]" />
              <span>+91 97848 00833</span>
            </a>
            <a
              href={generateWhatsAppUrl('Hi Shree Krishna Transport, I need an instant freight quote.')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-[#25D366] text-white font-bold text-xs uppercase font-['Manrope'] hover:bg-[#20ba59] transition-colors flex items-center gap-2 shadow-lg"
            >
              <MessageCircle size={16} />
              <span>WhatsApp Us in 1 Hr</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
