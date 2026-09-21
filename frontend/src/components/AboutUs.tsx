import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpDown, ArrowRight, ShieldCheck,
  MapPin, Sparkles, Truck, CheckCircle2, Search, X
} from 'lucide-react';
import { GSTIN } from '../lib/constants';
import { INDIAN_STATES_CITIES } from '../data/indianCities';

/** Searchable city dropdown with optgroup by state */
const CitySearchDropdown: React.FC<{
  value: string;
  onChange: (val: string) => void;
  label: string;
  iconColor: string;
}> = ({ value, onChange, label, iconColor }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Filter cities
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return INDIAN_STATES_CITIES;
    return INDIAN_STATES_CITIES
      .map((s) => ({
        state: s.state,
        cities: s.cities.filter(
          (c) =>
            c.toLowerCase().includes(q) ||
            s.state.toLowerCase().includes(q)
        ),
      }))
      .filter((s) => s.cities.length > 0);
  }, [search]);

  const handleSelect = (city: string, state: string) => {
    onChange(`${city}, ${state}`);
    setOpen(false);
    setSearch('');
  };

  // Extract display name (city only for compact display)
  const displayValue = value || 'Select a city...';

  return (
    <div className="space-y-1.5">
      <label className="font-['Manrope'] text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">
        {label}
      </label>
      <div className="relative" ref={wrapperRef}>
        {/* Trigger Button */}
        <button
          type="button"
          onClick={() => {
            setOpen(!open);
            if (!open) {
              setTimeout(() => inputRef.current?.focus(), 50);
            }
          }}
          className="w-full bg-[#f9f7f4] border border-[#dcd3c5] rounded-2xl py-3 px-4 pr-10 text-left text-xs sm:text-sm font-['Space_Mono'] font-bold text-[#1a1f1b] focus:border-[#0B3A66] focus:outline-none transition-colors cursor-pointer hover:border-[#0B3A66]/50"
        >
          <span className="block truncate">{displayValue}</span>
        </button>
        <MapPin size={16} className={`absolute right-4 top-1/2 -translate-y-1/2 ${iconColor} pointer-events-none`} />

        {/* Dropdown Panel */}
        {open && (
          <div className="absolute z-50 left-0 right-0 mt-1.5 bg-white border border-[#d8d0c3] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
            {/* Search Input */}
            <div className="p-2.5 border-b border-[#e2dacd]">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search any city or state..."
                  className="w-full pl-8 pr-8 py-2 rounded-xl bg-[#f9f7f4] border border-[#e2dacd] text-xs font-['Manrope'] font-semibold text-[#1a1f1b] placeholder:text-neutral-400 focus:outline-none focus:border-[#0B3A66] transition-colors"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>
            </div>

            {/* City List */}
            <div className="max-h-56 overflow-y-auto overscroll-contain">
              {filtered.length === 0 ? (
                <div className="px-4 py-6 text-center">
                  <p className="font-['Manrope'] text-xs text-neutral-500">No cities found for "{search}"</p>
                  <p className="font-['Manrope'] text-[10px] text-neutral-400 mt-1">Try a different city or state name</p>
                </div>
              ) : (
                filtered.map((s) => (
                  <div key={s.state}>
                    {/* State Header */}
                    <div className="px-3 py-1.5 bg-[#f4f0ea] border-b border-[#e8e0d4] sticky top-0 z-10">
                      <span className="font-['Manrope'] text-[10px] font-bold text-[#0B3A66] uppercase tracking-widest">
                        {s.state}
                      </span>
                    </div>
                    {/* Cities */}
                    {s.cities.map((city) => {
                      const fullValue = `${city}, ${s.state}`;
                      const isSelected = value === fullValue;
                      return (
                        <button
                          key={fullValue}
                          type="button"
                          onClick={() => handleSelect(city, s.state)}
                          className={`w-full text-left px-4 py-2 text-xs font-['Space_Mono'] font-semibold transition-colors flex items-center justify-between gap-2 ${isSelected
                            ? 'bg-[#EBF2F9] text-[#0B3A66] font-bold'
                            : 'text-[#1a1f1b] hover:bg-[#f4f0ea]'
                            }`}
                        >
                          <span className="truncate">{city}</span>
                          {isSelected && <CheckCircle2 size={13} className="text-[#0B3A66] shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer count */}
            <div className="px-3 py-1.5 border-t border-[#e2dacd] bg-[#f9f7f4]">
              <span className="font-['Manrope'] text-[9px] font-bold text-neutral-400 uppercase tracking-wider">
                {filtered.reduce((sum, s) => sum + s.cities.length, 0)} cities across {filtered.length} states
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const AboutUs: React.FC = () => {
  const [fromCity, setFromCity] = useState('Jaipur, Rajasthan');
  const [toCity, setToCity] = useState('New Delhi, Delhi');
  const [swapped, setSwapped] = useState(false);

  const handleSwap = () => {
    setSwapped(!swapped);
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const bookingUrl = `/book-truck?from=${encodeURIComponent(fromCity.split(',')[0].trim())}&to=${encodeURIComponent(toCity.split(',')[0].trim())}`;

  return (
    <section id="about-us" className="px-4 sm:px-6 md:px-12 py-8 sm:py-12 bg-[#ECE6DD]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">

          {/* Left Column: Brand Story & Twin Value Cards (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 border border-[#c5beb4]/50 text-[#0B3A66] font-['Space_Mono'] text-xs font-bold mb-3 shadow-xs">
                <Sparkles size={13} className="text-[#F5B51B]" />
                <span>About Shree Krishna Transport Network</span>
              </div>

              <h2 className="font-['Archivo_Narrow'] text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase text-[#1a1f1b] tracking-tight leading-tight mb-3">
                Your Trusted Partner in Pan-India Logistics
              </h2>

              <p className="font-['Manrope'] text-sm sm:text-base text-[#4A554C] leading-relaxed max-w-2xl mb-3">
                Shree Krishna Transport Network delivers more than shipments — we deliver reliability, confidence, and transparent freight solutions that connect Rajasthan's core industrial manufacturing hubs with commercial centers across India.
              </p>

              <div className="flex flex-wrap items-center gap-3 mb-3">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-1.5 text-xs font-['Manrope'] font-bold text-[#0B3A66] hover:text-[#071F35] uppercase tracking-wider bg-white/90 border border-[#c5beb4]/70 px-3.5 py-1.5 rounded-full shadow-xs hover:shadow-sm transition-all"
                >
                  <span>Explore Full Company Profile &amp; Fleet</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            {/* Twin Interactive Cards (Navy & Crisp White) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pt-2">

              {/* Card 1: Solid Navy Brand Card */}
              <div className="bg-[#0B3A66] text-white p-6 sm:p-7 rounded-3xl shadow-lg border border-[#0B3A66] flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#F5B51B] mb-5">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 className="font-['Archivo_Narrow'] text-xl font-bold uppercase tracking-tight text-white mb-2">
                    Delivering Excellence Every Mile
                  </h3>
                  <p className="font-['Manrope'] text-xs text-neutral-300 leading-relaxed">
                    Committed to verified vehicles, transparent E-Way bill compliance, and dedicated dispatch desk coordination on every load.
                  </p>
                </div>
              </div>

              {/* Card 2: Crisp Light Surface Card */}
              <div className="bg-white text-[#1a1f1b] p-6 sm:p-7 rounded-3xl shadow-sm border border-[#e2dacd] flex flex-col justify-between group hover:border-[#0B3A66]/40 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-[#EBF2F9] flex items-center justify-center text-[#0B3A66] mb-5">
                  <Truck size={24} />
                </div>
                <div>
                  <h3 className="font-['Archivo_Narrow'] text-xl font-bold uppercase tracking-tight text-[#1a1f1b] mb-2">
                    Shaping the Future of Freight
                  </h3>
                  <p className="font-['Manrope'] text-xs text-[#5a665c] leading-relaxed">
                    Direct scheduled linehauls radiating from Jaipur, Jodhpur, and Kota across 28+ states with fast turnaround and live milestones.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Quick Route Transfer Card (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-[32px] p-6 sm:p-7 shadow-xl border border-[#e2dacd] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#e2dacd]/60">
                <span className="font-['Archivo_Narrow'] text-lg font-extrabold uppercase text-[#0B3A66]">
                  Quick Route Dispatch
                </span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#EBF2F9] text-[#0B3A66] font-['Space_Mono'] font-bold">
                  Instant Availability
                </span>
              </div>

              {/* Transfer From — Searchable City Dropdown */}
              <CitySearchDropdown
                value={fromCity}
                onChange={setFromCity}
                label="Transfer From (Pickup Hub)"
                iconColor="text-[#0B3A66]"
              />

              {/* Swap Button */}
              <div className="flex justify-center my-2">
                <button
                  type="button"
                  onClick={handleSwap}
                  aria-label="Swap pickup and destination hubs"
                  className="w-9 h-9 rounded-full bg-[#EBF2F9] border border-[#0B3A66]/20 flex items-center justify-center text-[#0B3A66] hover:bg-[#0B3A66] hover:text-white transition-all shadow-xs"
                >
                  <ArrowUpDown size={15} className={`transition-transform duration-300 ${swapped ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Transfer To — Searchable City Dropdown */}
              <CitySearchDropdown
                value={toCity}
                onChange={setToCity}
                label="Transfer To (Delivery Hub)"
                iconColor="text-[#F5B51B]"
              />

              {/* Action Button */}
              <Link
                to={bookingUrl}
                className="w-full flex items-center justify-center gap-2 bg-[#F5B51B] hover:bg-[#E0A212] text-[#071F35] font-['Manrope'] font-extrabold text-xs uppercase tracking-wider py-3.5 rounded-2xl shadow-md transition-all duration-200 hover:shadow-lg mt-5 mb-5"
              >
                <span>Book Route</span>
                <ArrowRight size={15} />
              </Link>
            </div>

            {/* Bottom Transport Graphic */}
            <div className="relative rounded-2xl overflow-hidden h-36 border border-neutral-200">
              <img
                src="/images/dropdelivery.webp"
                alt="Shree Krishna Transport Linehaul Truck"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-3.5">
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle2 size={15} className="text-[#F5B51B]" />
                  <span className="font-['Space_Mono'] text-xs font-bold">
                    GST Registered: {GSTIN}
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
