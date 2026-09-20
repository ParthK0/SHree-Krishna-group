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
} from 'lucide-react';
import { getPublishedRoutes } from '../data/routeRegistry';
import { RouteMapSection } from '../components/RouteMapSection';
import { useMetaSEO } from '../lib/useMetaSEO';

export const RoutesIndexPage: React.FC = () => {
  useMetaSEO({
    title: 'Verified Freight Corridors & Current Rate Guide | Shree Krishna Transport',
    description: 'Browse verified daily scheduled freight routes from Jaipur to Delhi, Mumbai, Ahmedabad, Pune, Surat, Jodhpur & Pan-India. Compare indicative rate cards and book verified fleet linehaul.',
    canonicalPath: '/routes',
    ogImage: '/images/hero-truck-1.webp',
  });

  const routes = getPublishedRoutes();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');

  // Structured Route Finder State
  const [finderDestination, setFinderDestination] = useState('');
  const [finderLoadType, setFinderLoadType] = useState('FTL');
  const [finderWeight, setFinderWeight] = useState('5-ton');

  const popularCorridors = [
    { label: 'Jaipur ➔ Delhi NCR', city: 'Delhi', target: 'delhi' },
    { label: 'Jaipur ➔ Mumbai', city: 'Mumbai', target: 'mumbai' },
    { label: 'Jaipur ➔ Ahmedabad', city: 'Ahmedabad', target: 'ahmedabad' },
    { label: 'Jaipur ➔ Pune', city: 'Pune', target: 'pune' },
    { label: 'Jaipur ➔ Surat', city: 'Surat', target: 'surat' },
    { label: 'Jaipur ➔ Jodhpur', city: 'Jodhpur', target: 'jodhpur' },
    { label: 'Jaipur ➔ Bhiwadi', city: 'Bhiwadi', target: 'bhiwadi' },
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

  const filteredRoutes = routes.filter((route) => {
    const matchSearch =
      route.fromCity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.toCity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.h1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.industries.some((i) => i.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchCity =
      selectedCity === 'all' ||
      route.fromCity.toLowerCase() === selectedCity.toLowerCase() ||
      route.toCity.toLowerCase() === selectedCity.toLowerCase();

    return matchSearch && matchCity;
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
                <span>21 Active Corridors</span>
              </div>
              <p className="text-[11px] text-neutral-600 font-['Manrope'] mt-1">
                Scheduled daily linehaul radiating from Jaipur Central Hub to all major regional drop zones.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-3.5 rounded-2xl border border-[#d8d0c3] shadow-sm">
              <div className="flex items-center gap-2 text-[#0B3A66] font-['Space_Mono'] font-bold text-xs">
                <CheckCircle2 size={16} className="text-[#22c55e]" />
                <span>18 Industrial Hubs</span>
              </div>
              <p className="text-[11px] text-neutral-600 font-['Manrope'] mt-1">
                Published 7-Ton benchmark market rate cards for Gujarat, Maharashtra, MP, UP & Haryana.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-3.5 rounded-2xl border border-[#d8d0c3] shadow-sm">
              <div className="flex items-center gap-2 text-[#0B3A66] font-['Space_Mono'] font-bold text-xs">
                <CheckCircle2 size={16} className="text-[#22c55e]" />
                <span>12 Published Route Guides</span>
              </div>
              <p className="text-[11px] text-neutral-600 font-['Manrope'] mt-1">
                In-depth route blueprints with toll breakdown, highway checkpoints, and booking steps.
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
                <option value="Delhi">Delhi NCR (Gurugram, Okhla, Kundli)</option>
                <option value="Mumbai">Mumbai (Bhiwandi, JNPT, Panvel)</option>
                <option value="Ahmedabad">Ahmedabad (Sanand, Changodar)</option>
                <option value="Pune">Pune (Chakan, Bhosari, Talegaon)</option>
                <option value="Surat">Surat (Sachin GIDC, Ring Road)</option>
                <option value="Jodhpur">Jodhpur (Basni, Boronada SEZ)</option>
                <option value="Ajmer">Ajmer / Kishangarh Marble Zone</option>
                <option value="Bhiwadi">Bhiwadi / Neemrana Auto Hub</option>
                <option value="Udaipur">Udaipur (Sukher, Madri GIDC)</option>
                <option value="Kota">Kota (Ranpur, DCM Road)</option>
                <option value="Indore">Indore (Pithampur, Dewas)</option>
                <option value="Agra">Agra / Mathura UP Zone</option>
                <option value="Kanpur">Kanpur Industrial Area</option>
                <option value="Lucknow">Lucknow Transport Nagar</option>
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
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold font-['Space_Mono'] uppercase text-[#0B3A66] mb-1">
              <Truck size={14} />
              <span>Published Route Guides</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold uppercase font-['Archivo_Narrow'] text-[#1a1f1b]">
              Complete Transport Corridors Directory
            </h2>
            <span className="font-['Space_Mono'] text-xs uppercase font-bold text-neutral-500">
              Showing {filteredRoutes.length} of {routes.length} Published Route Guides
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={15} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search route, cargo, or city..."
                className="pl-9 pr-3 py-2 rounded-xl border border-[#d8d0c3] bg-white text-xs font-['Manrope'] focus:outline-none focus:border-[#0B3A66] w-56"
              />
            </div>

            <div className="flex items-center gap-1.5 text-xs font-['Manrope']">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="px-3 py-2 rounded-xl border border-[#d8d0c3] bg-white text-xs font-bold focus:outline-none focus:border-[#0B3A66]"
              >
                <option value="all">All Destinations</option>
                <option value="Delhi">Delhi NCR</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Ahmedabad">Ahmedabad</option>
                <option value="Jodhpur">Jodhpur</option>
                <option value="Ajmer">Ajmer</option>
                <option value="Pune">Pune</option>
                <option value="Surat">Surat</option>
                <option value="Bhiwadi">Bhiwadi</option>
                <option value="Kota">Kota</option>
                <option value="Udaipur">Udaipur</option>
                <option value="Indore">Indore</option>
                <option value="Jaipur">Jaipur (Inbound)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Route Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoutes.map((route) => (
            <div
              key={route.slug}
              className="bg-white rounded-2xl p-6 border border-[#e2dacd] shadow-sm hover:shadow-lg transition-all hover:border-[#0B3A66] flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#EBF2F9] text-[#0B3A66] text-[10px] font-bold font-['Space_Mono'] uppercase">
                    Daily Scheduled Linehaul
                  </span>
                  <span className="text-xs font-['Space_Mono'] font-bold text-neutral-500">
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
                  <div className="flex items-center justify-between">
                    <span>Indicative Freight:</span>
                    <span className="font-bold text-[#B8860B] font-['Space_Mono']">
                      {route.priceEstimates[0]?.priceRange || 'On Request'}
                    </span>
                  </div>
                </div>

                {/* Explicit Industry Pills */}
                <div className="mb-4">
                  <span className="text-[10px] font-bold text-neutral-400 font-['Space_Mono'] uppercase tracking-wider block mb-1.5">
                    Best For:
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
