import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Truck, ArrowRight, Search, Sparkles } from 'lucide-react';
import { getPublishedRoutes } from '../data/routeRegistry';
import { RouteMapSection } from '../components/RouteMapSection';

export const RoutesIndexPage: React.FC = () => {
  const routes = getPublishedRoutes();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');

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
      {/* Top Header */}
      <section className="bg-gradient-to-b from-[#E4DDD3] to-[#ECE6DD] py-12 md:py-16 px-4 md:px-12 border-b border-[#d8d0c3]">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F6A37]/10 text-[#0F6A37] font-['Space_Mono'] text-xs font-bold border border-[#0F6A37]/20">
            <Sparkles size={14} className="text-[#F4B400]" />
            PAN INDIA TRANSPORT CORRIDORS & RATE CARDS
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase font-['Archivo_Narrow'] text-[#1a1f1b]">
            Verified Transport Routes & Official Rate Cards
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 font-['Manrope'] max-w-2xl mx-auto">
            Explore verified daily scheduled freight routes and transparent rate cards across Rajasthan, Delhi NCR, Gujarat, Maharashtra, and Central India.
          </p>
        </div>
      </section>

      {/* Interactive Route Map & Official Rate Card Explorer */}
      <RouteMapSection />

      {/* Main Catalog Grid */}
      <section className="py-12 px-4 md:px-12 max-w-7xl mx-auto border-t border-[#d8d0c3]">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold uppercase font-['Archivo_Narrow'] text-[#1a1f1b]">
              Browse All Route Corridors
            </h2>
            <span className="font-['Space_Mono'] text-xs uppercase font-bold text-neutral-500">
              Showing {filteredRoutes.length} Active Corridors
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={15} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search route or city..."
                className="pl-9 pr-3 py-1.5 rounded-lg border border-[#d8d0c3] bg-white text-xs font-['Manrope'] focus:outline-none focus:border-[#0F6A37]"
              />
            </div>

            <div className="flex items-center gap-1.5 text-xs font-['Manrope']">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-[#d8d0c3] bg-white text-xs font-bold"
              >
                <option value="all">All Destinations</option>
                <option value="Delhi">Delhi NCR</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Ahmedabad">Ahmedabad</option>
                <option value="Jodhpur">Jodhpur</option>
                <option value="Ajmer">Ajmer</option>
                <option value="Pune">Pune</option>
                <option value="Surat">Surat</option>
                <option value="Jaipur">Jaipur (Inbound)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoutes.map((route) => (
            <div
              key={route.slug}
              className="bg-white rounded-2xl p-6 border border-[#e2dacd] shadow-sm hover:shadow-lg transition-all hover:border-[#0F6A37] flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#EBF5EE] text-[#0F6A37] text-[10px] font-bold font-['Space_Mono'] uppercase">
                    Daily Scheduled Linehaul
                  </span>
                  <span className="text-xs font-['Space_Mono'] font-bold text-neutral-500">
                    {route.distanceKm} km
                  </span>
                </div>

                <h2 className="text-xl font-bold uppercase font-['Archivo_Narrow'] text-[#1a1f1b] group-hover:text-[#0F6A37] transition-colors mb-2">
                  {route.fromCity} ➔ {route.toCity}
                </h2>

                <p className="text-xs text-neutral-600 font-['Manrope'] mb-4 line-clamp-2">
                  {route.heroSubheading}
                </p>

                <div className="space-y-1.5 text-xs text-neutral-500 font-['Manrope'] mb-4 border-t border-b border-[#ECE6DD] py-3">
                  <div className="flex items-center justify-between">
                    <span>Transit Time:</span>
                    <span className="font-bold text-[#0F6A37]">{route.transitTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Fleet:</span>
                    <span className="font-semibold text-neutral-800">Pickup to 32ft / Trailer</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Starting Price:</span>
                    <span className="font-bold text-[#F4B400] font-['Space_Mono']">
                      {route.priceEstimates[0]?.priceRange || 'On Request'}
                    </span>
                  </div>
                </div>

                {/* Industries Pills */}
                <div className="flex flex-wrap gap-1 mb-4">
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

              <div className="pt-2">
                <Link
                  to={`/${route.slug}`}
                  className="w-full py-2.5 rounded-xl bg-[#0F6A37] text-white font-['Manrope'] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-[#0c562c] transition-colors"
                >
                  <span>View Route & Rates</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Can't find route banner */}
        <div className="mt-12 bg-white rounded-3xl p-8 border border-[#e2dacd] text-center max-w-3xl mx-auto shadow-sm">
          <Truck className="w-10 h-10 text-[#0F6A37] mx-auto mb-3" />
          <h3 className="text-xl font-bold uppercase font-['Archivo_Narrow'] text-[#1a1f1b] mb-2">
            Need a Custom Route Not Listed Here?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 font-['Manrope'] mb-5 max-w-xl mx-auto">
            We provide Full Truck Load (FTL) and Part Truck Load (PTL) across all 28 states and union territories in India. Send us your route requirement for instant quotation.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link
              to="/book-truck"
              className="px-6 py-3 rounded-xl bg-[#0F6A37] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#0c562c] transition-colors"
            >
              Book Custom Truck
            </Link>
            <a
              href="tel:+919784800833"
              className="px-6 py-3 rounded-xl bg-[#ECE6DD] text-[#1a1f1b] font-bold text-xs uppercase tracking-wider hover:bg-[#ded6ca] transition-colors"
            >
              Call Dispatch Desk
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
