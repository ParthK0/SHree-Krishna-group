import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Truck,
  ArrowRight,
  Search,
  Sparkles,
  MapPin,
  Scale,
  Layers,
  Phone,
  CheckCircle2,
  Filter,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { getPublishedRoutes } from '../data/routeRegistry';
import { RouteMapSection } from '../components/RouteMapSection';
import { useMetaSEO } from '../lib/useMetaSEO';

export const RoutesIndexPage: React.FC = () => {
  useMetaSEO({
    title: 'Verified Freight Corridors & Current Rate Guide | Shree Krishna Transport',
    description: 'Browse verified daily scheduled freight routes from Jaipur to Delhi, Haryana, Punjab, Gujarat, Uttar Pradesh, Rajasthan & Pan-India. Compare indicative rate cards and book verified fleet linehaul.',
    canonicalPath: '/routes',
    ogImage: '/images/hero-truck-1.webp',
  });

  const routes = getPublishedRoutes();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedState, setSelectedState] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [visibleLimit, setVisibleLimit] = useState<number>(9);

  // Structured Route Finder State
  const [finderDestination, setFinderDestination] = useState('');
  const [finderLoadType, setFinderLoadType] = useState('FTL');
  const [finderWeight, setFinderWeight] = useState('5-ton');

  const popularCorridors = [
    { label: 'Jaipur ➔ Delhi NCR', city: 'Delhi', target: 'delhi' },
    { label: 'Jaipur ➔ Gurgaon', city: 'Gurgaon', target: 'gurgaon' },
    { label: 'Jaipur ➔ Noida', city: 'Noida', target: 'noida' },
    { label: 'Jaipur ➔ Sonipat', city: 'Sonipat', target: 'sonipat' },
    { label: 'Jaipur ➔ Chandigarh', city: 'Chandigarh', target: 'chandigarh' },
    { label: 'Jaipur ➔ Ludhiana', city: 'Ludhiana', target: 'ludhiana' },
    { label: 'Jaipur ➔ Ahmedabad', city: 'Ahmedabad', target: 'ahmedabad' },
    { label: 'Jaipur ➔ Surat', city: 'Surat', target: 'surat' },
    { label: 'Jaipur ➔ Alwar', city: 'Alwar', target: 'alwar' },
    { label: 'Jaipur ➔ Kota', city: 'Kota', target: 'kota' },
    { label: 'Jaipur ➔ Jodhpur', city: 'Jodhpur', target: 'jodhpur' },
    { label: 'Jaipur ➔ Udaipur', city: 'Udaipur', target: 'udaipur' },
    { label: 'Jaipur ➔ Agra', city: 'Agra', target: 'agra' },
    { label: 'Jaipur ➔ Lucknow', city: 'Lucknow', target: 'lucknow' },
    { label: 'Jaipur ➔ Mumbai', city: 'Mumbai', target: 'mumbai' },
  ];

  const handleFinderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (finderDestination) {
      setSelectedCity(finderDestination);
      setSearchTerm(finderDestination);
      const catalogEl = document.getElementById('all-corridors');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      const rateCardsEl = document.getElementById('route-rate-cards');
      if (rateCardsEl) {
        rateCardsEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleQuickChipClick = (city: string) => {
    setSelectedCity(city);
    setSearchTerm(city);
    const catalogEl = document.getElementById('all-corridors');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const stateOptions = [
    { label: 'All States', value: 'all' },
    { label: 'Rajasthan', value: 'Rajasthan' },
    { label: 'Delhi / NCR', value: 'Delhi / NCR' },
    { label: 'Haryana', value: 'Haryana' },
    { label: 'Punjab', value: 'Punjab' },
    { label: 'Uttar Pradesh', value: 'Uttar Pradesh' },
    { label: 'Uttarakhand', value: 'Uttarakhand' },
    { label: 'Gujarat', value: 'Gujarat' },
    { label: 'Maharashtra', value: 'Maharashtra' },
    { label: 'Madhya Pradesh', value: 'Madhya Pradesh' },
    { label: 'South India', value: 'South' },
    { label: 'East India', value: 'East' },
    { label: 'Other Regions', value: 'Other' },
  ];

  const filteredRoutes = routes
    .filter((route) => {
      const query = searchTerm.toLowerCase().trim();
      const matchSearch =
        !query ||
        route.fromCity.toLowerCase().includes(query) ||
        route.toCity.toLowerCase().includes(query) ||
        (route.state && route.state.toLowerCase().includes(query)) ||
        route.h1.toLowerCase().includes(query) ||
        route.industries.some((i) => i.toLowerCase().includes(query));

      const matchCity =
        selectedCity === 'all' ||
        route.fromCity.toLowerCase().includes(selectedCity.toLowerCase()) ||
        route.toCity.toLowerCase().includes(selectedCity.toLowerCase());

      const matchState =
        selectedState === 'all'
          ? true
          : selectedState === 'South'
          ? ['Tamil Nadu', 'Karnataka', 'Telangana', 'Andhra Pradesh'].includes(route.state || '')
          : selectedState === 'East'
          ? ['West Bengal', 'Bihar', 'Jharkhand', 'Chhattisgarh'].includes(route.state || '')
          : selectedState === 'Other'
          ? ![
              'Rajasthan',
              'Haryana',
              'Delhi / NCR',
              'Punjab',
              'Gujarat',
              'Uttar Pradesh',
              'Uttarakhand',
              'Maharashtra',
              'Madhya Pradesh',
              'Tamil Nadu',
              'Karnataka',
              'Telangana',
              'Andhra Pradesh',
              'West Bengal',
              'Bihar',
              'Jharkhand',
              'Chhattisgarh',
            ].includes(route.state || '')
          : route.state?.toLowerCase() === selectedState.toLowerCase();

      return matchSearch && matchCity && matchState;
    })
    .sort((a, b) => {
      if (sortBy === 'state-asc') {
        const stateA = a.state || '';
        const stateB = b.state || '';
        if (stateA !== stateB) return stateA.localeCompare(stateB);
        return a.toCity.localeCompare(b.toCity);
      }
      if (sortBy === 'city-asc') {
        return a.toCity.localeCompare(b.toCity);
      }
      if (sortBy === 'dist-asc') {
        return a.distanceKm - b.distanceKm;
      }
      if (sortBy === 'dist-desc') {
        return b.distanceKm - a.distanceKm;
      }
      return 0;
    });

  return (
    <div className="w-full bg-[#ECE6DD] min-h-screen text-[#1a1f1b]">
      {/* Top Hero Section */}
      <section className="bg-gradient-to-b from-[#E4DDD3] to-[#ECE6DD] pt-10 pb-8 px-4 md:px-12 border-b border-[#d8d0c3]">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B3A66]/10 text-[#0B3A66] font-['Space_Mono'] text-xs font-bold border border-[#0B3A66]/20">
            <Sparkles size={14} className="text-[#F5B51B]" />
            VERIFIED FREIGHT CORRIDORS & CURRENT RATE GUIDE
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase font-['Archivo_Narrow'] text-[#1a1f1b] tracking-tight">
            Verified Freight Routes & Current Rate Guide
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-neutral-600 font-['Manrope'] max-w-3xl mx-auto leading-relaxed">
            Direct linehaul transport radiating from Jaipur Central Dispatch Hub. Explore indicative rate cards, payload capacities, and verified highway corridors across Northern, Western, and Central India.
          </p>

          {/* Reconciled Metrics Bar */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl mx-auto text-left">
            <div className="bg-white/80 backdrop-blur-sm p-3.5 rounded-2xl border border-[#d8d0c3] shadow-sm">
              <div className="flex items-center gap-2 text-[#0B3A66] font-['Space_Mono'] font-bold text-xs">
                <CheckCircle2 size={16} className="text-[#22c55e]" />
                <span>{routes.length} Active Corridors</span>
              </div>
              <p className="text-[11px] text-neutral-600 font-['Manrope'] mt-1">
                Scheduled daily linehaul radiating from Jaipur Central Hub to all major regional drop zones.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-3.5 rounded-2xl border border-[#d8d0c3] shadow-sm">
              <div className="flex items-center gap-2 text-[#0B3A66] font-['Space_Mono'] font-bold text-xs">
                <CheckCircle2 size={16} className="text-[#22c55e]" />
                <span>15+ States & Regions</span>
              </div>
              <p className="text-[11px] text-neutral-600 font-['Manrope'] mt-1">
                Published benchmark market rate cards across Northern, Western, Central, Southern & Eastern India.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-3.5 rounded-2xl border border-[#d8d0c3] shadow-sm">
              <div className="flex items-center gap-2 text-[#0B3A66] font-['Space_Mono'] font-bold text-xs">
                <CheckCircle2 size={16} className="text-[#22c55e]" />
                <span>{routes.length} Published Route Guides</span>
              </div>
              <p className="text-[11px] text-neutral-600 font-['Manrope'] mt-1">
                In-depth route blueprints with verified rates, transit times, toll breakdown, and booking steps.
              </p>
            </div>
          </div>
        </div>

        {/* STAGE 1: Structured Route Finder Bar */}
        <div className="max-w-5xl mx-auto mt-8">
          <form
            onSubmit={handleFinderSubmit}
            className="bg-white rounded-3xl p-4 sm:p-5 border border-[#d8d0c3] shadow-xl flex flex-col md:flex-row items-stretch md:items-center gap-3"
          >
            {/* FROM (Origin Hub) */}
            <div className="flex-1 bg-[#fbf9f6] p-3 rounded-2xl border border-[#ece6dd]">
              <label className="text-[10px] font-bold text-neutral-500 font-['Space_Mono'] uppercase flex items-center gap-1 mb-1">
                <MapPin size={12} className="text-[#0B3A66]" />
                From (Origin Hub)
              </label>
              <div className="font-bold text-xs sm:text-sm text-[#1a1f1b] font-['Manrope'] flex items-center justify-between">
                <span>Jaipur, RJ-14</span>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#EBF2F9] text-[#0B3A66] font-['Space_Mono']">
                  Central Terminal
                </span>
              </div>
            </div>

            {/* TO (Destination) */}
            <div className="flex-1 bg-[#fbf9f6] p-3 rounded-2xl border border-[#ece6dd]">
              <label className="text-[10px] font-bold text-neutral-500 font-['Space_Mono'] uppercase flex items-center gap-1 mb-1">
                <MapPin size={12} className="text-[#F5B51B]" />
                To (Destination)
              </label>
              <select
                value={finderDestination}
                onChange={(e) => setFinderDestination(e.target.value)}
                className="w-full bg-transparent font-bold text-xs sm:text-sm text-[#1a1f1b] font-['Manrope'] focus:outline-none cursor-pointer"
              >
                <option value="">Select Destination Hub...</option>
                <optgroup label="Delhi & NCR">
                  <option value="Delhi">Delhi Central / Okhla</option>
                  <option value="Gurgaon">Gurgaon / Manesar (Haryana)</option>
                  <option value="Noida">Noida / Greater Noida (UP)</option>
                  <option value="Faridabad">Faridabad / Ballabgarh (Haryana)</option>
                  <option value="Bahadurgarh">Bahadurgarh / Jhajjar (Haryana)</option>
                </optgroup>
                <optgroup label="Haryana Industrial Belt">
                  <option value="Sonipat">Sonipat / Kundli / Rai</option>
                  <option value="Panipat">Panipat Textile Belt</option>
                  <option value="Karnal">Karnal Agri-Industrial</option>
                  <option value="Jind">Jind Central Mandi</option>
                  <option value="Jhajjar">Jhajjar Industrial Zone</option>
                </optgroup>
                <optgroup label="Rajasthan Intra-State">
                  <option value="Alwar">Alwar / Matsya Industrial Area</option>
                  <option value="Bhiwadi">Bhiwadi / Neemrana Auto Cluster</option>
                  <option value="Kota">Kota Coaching & Chemical Hub</option>
                  <option value="Jodhpur">Jodhpur Handicrafts & Basni</option>
                  <option value="Ajmer">Ajmer / Kishangarh Marble</option>
                  <option value="Udaipur">Udaipur Marble & Minerals</option>
                  <option value="Jaisalmer">Jaisalmer Solar & Stone Zone</option>
                </optgroup>
                <optgroup label="Punjab & North">
                  <option value="Chandigarh">Ambala / Chandigarh Tricity</option>
                  <option value="Ludhiana">Ludhiana Industrial Hub</option>
                  <option value="Amritsar">Amritsar Border Gateway</option>
                </optgroup>
                <optgroup label="Gujarat & Western India">
                  <option value="Ahmedabad">Ahmedabad (Sanand, Changodar)</option>
                  <option value="Surat">Surat (Sachin GIDC, Textile)</option>
                  <option value="Vadodara">Vadodara Chemical & Engg</option>
                  <option value="Rajkot">Rajkot Auto Ancillary & Foundry</option>
                </optgroup>
                <optgroup label="Maharashtra">
                  <option value="Mumbai">Mumbai (Bhiwandi, JNPT, Panvel)</option>
                  <option value="Pune">Pune (Chakan, Bhosari, Talegaon)</option>
                </optgroup>
                <optgroup label="Uttar Pradesh & Central">
                  <option value="Agra">Agra Leather & Foundry Hub</option>
                  <option value="Kanpur">Kanpur Industrial Hub</option>
                  <option value="Lucknow">Lucknow Transport Nagar</option>
                  <option value="Indore">Indore / Pithampur (MP)</option>
                  <option value="Kolkata">Kolkata Dankuni Hub (WB)</option>
                </optgroup>
              </select>
            </div>

            {/* LOAD TYPE */}
            <div className="w-full md:w-40 bg-[#fbf9f6] p-3 rounded-2xl border border-[#ece6dd]">
              <label className="text-[10px] font-bold text-neutral-500 font-['Space_Mono'] uppercase flex items-center gap-1 mb-1">
                <Layers size={12} className="text-[#0B3A66]" />
                Load Type
              </label>
              <select
                value={finderLoadType}
                onChange={(e) => setFinderLoadType(e.target.value)}
                className="w-full bg-transparent font-bold text-xs sm:text-sm text-[#1a1f1b] font-['Manrope'] focus:outline-none cursor-pointer"
              >
                <option value="FTL">Full Truck (FTL)</option>
                <option value="PTL">Part Load (PTL)</option>
                <option value="Parcel">Parcel / Courier</option>
              </select>
            </div>

            {/* WEIGHT SPEC */}
            <div className="w-full md:w-36 bg-[#fbf9f6] p-3 rounded-2xl border border-[#ece6dd]">
              <label className="text-[10px] font-bold text-neutral-500 font-['Space_Mono'] uppercase flex items-center gap-1 mb-1">
                <Scale size={12} className="text-[#0B3A66]" />
                Est. Weight
              </label>
              <select
                value={finderWeight}
                onChange={(e) => setFinderWeight(e.target.value)}
                className="w-full bg-transparent font-bold text-xs sm:text-sm text-[#1a1f1b] font-['Manrope'] focus:outline-none cursor-pointer"
              >
                <option value="5-ton">Up to 5 Tons</option>
                <option value="7-ton">7 Ton</option>
                <option value="15-ton">10 – 15 Tons</option>
                <option value="trailer">16 – 25+ Tons</option>
                <option value="parcel">Under 500 KG</option>
              </select>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="py-3 px-6 rounded-2xl bg-[#0B3A66] hover:bg-[#072D54] text-white font-bold font-['Archivo_Narrow'] text-sm sm:text-base uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shrink-0"
            >
              <span>Find Route & Rates</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* STAGE 2: Popular Freight Corridor Quick Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            <span className="text-xs font-bold text-neutral-500 font-['Space_Mono'] mr-1">
              Popular Linehauls:
            </span>
            {popularCorridors.map((corridor) => (
              <button
                key={corridor.city}
                onClick={() => handleQuickChipClick(corridor.city)}
                className="text-xs font-bold font-['Manrope'] px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-neutral-800 border border-[#d8d0c3] hover:border-[#0B3A66] transition-all shadow-xs flex items-center gap-1"
              >
                <span>{corridor.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* STAGE 3 & 4: Rate Cards Guide & Interactive Corridor Map HUD */}
      <RouteMapSection />

      {/* STAGE 5: Complete Transport Corridors Catalog */}
      <section className="py-12 px-4 md:px-12 max-w-7xl mx-auto border-t border-[#d8d0c3]" id="all-corridors">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-6 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold font-['Space_Mono'] uppercase text-[#0B3A66] mb-1">
              <Truck size={14} />
              <span>Verified Transport Network</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold uppercase font-['Archivo_Narrow'] text-[#1a1f1b]">
              Complete Transport Corridors Directory
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-['Manrope'] mt-0.5">
              Showing {Math.min(visibleLimit, filteredRoutes.length)} of {filteredRoutes.length} Corridors ({routes.length} Published Route Blueprints)
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={15} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setVisibleLimit(9);
                }}
                placeholder="Search route, city, state..."
                className="pl-9 pr-3 py-2 rounded-xl border border-[#d8d0c3] bg-white text-xs font-['Manrope'] focus:outline-none focus:border-[#0B3A66] w-48 sm:w-56"
              />
            </div>

            {/* City Dropdown */}
            <div className="flex items-center text-xs font-['Manrope']">
              <select
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                  setVisibleLimit(9);
                }}
                className="px-3 py-2 rounded-xl border border-[#d8d0c3] bg-white text-xs font-bold focus:outline-none focus:border-[#0B3A66] cursor-pointer"
              >
                <option value="all">All Destination Hubs</option>
                {Array.from(new Set(routes.map((r) => r.toCity))).sort().map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center text-xs font-['Manrope']">
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setVisibleLimit(9);
                }}
                className="px-3 py-2 rounded-xl border border-[#d8d0c3] bg-white text-xs font-bold focus:outline-none focus:border-[#0B3A66] cursor-pointer"
              >
                <option value="default">Sort: Default</option>
                <option value="state-asc">Sort: State (A-Z)</option>
                <option value="city-asc">Sort: Destination City (A-Z)</option>
                <option value="dist-asc">Sort: Distance (Low to High)</option>
                <option value="dist-desc">Sort: Distance (High to Low)</option>
              </select>
            </div>
          </div>
        </div>

        {/* State Filter Pills / Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 scrollbar-thin">
          <span className="text-[11px] font-bold text-neutral-500 font-['Space_Mono'] uppercase mr-1 shrink-0 flex items-center gap-1">
            <Filter size={13} className="text-[#0B3A66]" />
            State:
          </span>
          {stateOptions.map((opt) => {
            const isActive = selectedState === opt.value;
            const count =
              opt.value === 'all'
                ? routes.length
                : opt.value === 'South'
                ? routes.filter((r) => ['Tamil Nadu', 'Karnataka', 'Telangana', 'Andhra Pradesh'].includes(r.state || '')).length
                : opt.value === 'East'
                ? routes.filter((r) => ['West Bengal', 'Bihar', 'Jharkhand', 'Chhattisgarh'].includes(r.state || '')).length
                : opt.value === 'Other'
                ? routes.filter(
                    (r) =>
                      ![
                        'Rajasthan',
                        'Haryana',
                        'Delhi / NCR',
                        'Punjab',
                        'Gujarat',
                        'Uttar Pradesh',
                        'Uttarakhand',
                        'Maharashtra',
                        'Madhya Pradesh',
                        'Tamil Nadu',
                        'Karnataka',
                        'Telangana',
                        'Andhra Pradesh',
                        'West Bengal',
                        'Bihar',
                        'Jharkhand',
                        'Chhattisgarh',
                      ].includes(r.state || '')
                  ).length
                : routes.filter((r) => r.state?.toLowerCase() === opt.value.toLowerCase()).length;

            return (
              <button
                key={opt.value}
                onClick={() => {
                  setSelectedState(opt.value);
                  setVisibleLimit(9);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-bold font-['Manrope'] shrink-0 transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#0B3A66] text-white shadow-sm'
                    : 'bg-white text-neutral-700 border border-[#d8d0c3] hover:border-[#0B3A66] hover:bg-neutral-50'
                }`}
              >
                <span>{opt.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-['Space_Mono'] ${
                    isActive ? 'bg-white/25 text-white' : 'bg-[#ece6dd] text-neutral-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* No Results Fallback */}
        {filteredRoutes.length === 0 && (
          <div className="bg-white rounded-3xl p-10 border border-[#d8d0c3] text-center my-6">
            <Truck className="w-12 h-12 text-neutral-400 mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-bold font-['Archivo_Narrow'] uppercase text-[#1a1f1b] mb-1">
              No corridors match your current filter
            </h3>
            <p className="text-xs text-neutral-500 font-['Manrope'] mb-4">
              Try clearing the search term, selecting "All States", or adjusting the destination filter.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCity('all');
                setSelectedState('all');
                setSortBy('default');
                setVisibleLimit(9);
              }}
              className="px-4 py-2 rounded-xl bg-[#0B3A66] text-white text-xs font-bold font-['Manrope'] hover:bg-[#072D54] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Route Cards Grid (Default 9 visible) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoutes.slice(0, visibleLimit).map((route) => (
            <div
              key={route.slug}
              className="bg-white rounded-2xl p-6 border border-[#e2dacd] shadow-sm hover:shadow-lg transition-all hover:border-[#0B3A66] flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3 gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#EBF2F9] text-[#0B3A66] text-[10px] font-bold font-['Space_Mono'] uppercase">
                      Daily Linehaul
                    </span>
                    {route.state && (
                      <span className="px-2 py-0.5 rounded-full bg-[#F5B51B]/20 text-[#8a6505] text-[10px] font-bold font-['Space_Mono'] uppercase">
                        {route.state}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-['Space_Mono'] font-bold text-neutral-500 shrink-0">
                    {route.distanceKm} km
                  </span>
                </div>

                <h3 className="text-xl font-bold uppercase font-['Archivo_Narrow'] text-[#1a1f1b] group-hover:text-[#0B3A66] transition-colors mb-2">
                  {route.fromCity} ➔ {route.toCity}
                </h3>

                <p className="text-xs text-neutral-600 font-['Manrope'] mb-4 line-clamp-2">
                  {route.heroSubheading}
                </p>

                <div className="space-y-1.5 text-xs text-neutral-500 font-['Manrope'] mb-4 border-t border-b border-[#ECE6DD] py-3">
                  <div className="flex items-center justify-between">
                    <span>Transit Time:</span>
                    <span className="font-bold text-[#0B3A66]">{route.transitTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Fleet Types:</span>
                    <span className="font-semibold text-neutral-800">Pickup to 32ft / Trailer</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="shrink-0">Indicative Freight:</span>
                    <span className="font-bold text-[#B8860B] font-['Space_Mono'] text-right truncate">
                      {route.rateCardHighlights?.panIndiaRate
                        ? `19ft: ${route.rateCardHighlights.panIndiaRate.rate19ft}`
                        : route.priceEstimates[0]
                        ? `${route.priceEstimates[0].truckName.split('(')[0].trim()}: ${route.priceEstimates[0].priceRange}`
                        : 'On Request'}
                    </span>
                  </div>
                </div>

                {/* Explicit Industry Pills */}
                <div className="mb-4">
                  <span className="text-[10px] font-bold text-neutral-400 font-['Space_Mono'] uppercase tracking-wider block mb-1.5">
                    Key Cargo & Industries:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {route.industries.slice(0, 4).map((ind, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 bg-[#ECE6DD] rounded text-neutral-700 font-['Manrope']">
                        {ind}
                      </span>
                    ))}
                    {route.industries.length > 4 && (
                      <span className="text-[10px] px-1.5 py-0.5 bg-[#ECE6DD] rounded text-neutral-500">
                        +{route.industries.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to={`/${route.slug}`}
                  className="w-full py-2.5 rounded-xl bg-[#0B3A66] text-white font-['Manrope'] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-[#072D54] transition-colors"
                >
                  <span>View Route & Rates</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View More Option (Keep 9 in front, rest on click) */}
        {filteredRoutes.length > 9 && (
          <div className="text-center mt-10">
            {visibleLimit < filteredRoutes.length ? (
              <button
                onClick={() => setVisibleLimit(filteredRoutes.length)}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#0B3A66] hover:bg-[#072D54] text-white font-bold font-['Archivo_Narrow'] text-sm sm:text-base uppercase tracking-wider transition-all shadow-md hover:shadow-lg group cursor-pointer"
              >
                <span>View More Corridors ({filteredRoutes.length - visibleLimit} More)</span>
                <ChevronDown size={18} className="transition-transform group-hover:translate-y-0.5" />
              </button>
            ) : (
              <button
                onClick={() => {
                  setVisibleLimit(9);
                  const catalogEl = document.getElementById('all-corridors');
                  if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white hover:bg-neutral-50 text-neutral-700 border border-[#d8d0c3] font-bold font-['Manrope'] text-xs uppercase tracking-wider transition-all shadow-xs cursor-pointer"
              >
                <span>Show Less (Keep 9 Front Cities)</span>
                <ChevronUp size={15} />
              </button>
            )}
          </div>
        )}

        {/* STAGE 6: Custom Route Request & Dispatch CTA */}
        <div className="mt-12 bg-white rounded-3xl p-8 border border-[#e2dacd] text-center max-w-3xl mx-auto shadow-sm">
          <Truck className="w-10 h-10 text-[#0B3A66] mx-auto mb-3" />
          <h3 className="text-xl font-bold uppercase font-['Archivo_Narrow'] text-[#1a1f1b] mb-2">
            Have an Unlisted Corridor or Specialized Cargo?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 font-['Manrope'] mb-5 max-w-xl mx-auto">
            We coordinate dedicated FTL and shared PTL transport across all 28 states and major industrial zones. Get a transparent freight estimate directly from our dispatch desk.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link
              to="/contact#enquiry"
              className="px-6 py-3 rounded-xl bg-[#0B3A66] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#072D54] transition-colors shadow-sm"
            >
              Request Custom Quote
            </Link>
            <a
              href="tel:+919784800833"
              className="px-6 py-3 rounded-xl bg-[#ECE6DD] text-[#1a1f1b] font-bold text-xs uppercase tracking-wider hover:bg-[#ded6ca] transition-colors flex items-center gap-1.5"
            >
              <Phone size={14} className="text-[#0B3A66]" />
              <span>Call Dispatch: +91 97848 00833</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
