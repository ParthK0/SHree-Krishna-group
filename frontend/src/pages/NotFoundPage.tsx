import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, Truck, Phone, ArrowRight, MapPin } from 'lucide-react';
import { useMetaSEO } from '../lib/useMetaSEO';
import { getPublishedRoutes } from '../data/routeRegistry';

export const NotFoundPage: React.FC = () => {
  useMetaSEO({
    title: '404 - Page Not Found | Shree Krishna Transport',
    description: 'The requested page could not be found. Explore our transport routes or contact Shree Krishna Transport Jaipur.',
    canonicalPath: '/404',
  });

  const popularRoutes = getPublishedRoutes().slice(0, 4);

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-16 text-center max-w-4xl mx-auto">
      <div className="w-20 h-20 rounded-3xl bg-[#0F6A37]/10 border border-[#0F6A37]/20 flex items-center justify-center text-[#0F6A37] mb-6 shadow-sm">
        <Compass size={40} className="text-[#0F6A37]" />
      </div>

      <span className="font-['Space_Mono'] text-xs uppercase font-bold tracking-widest text-[#0F6A37] px-3 py-1 rounded-full bg-[#0F6A37]/10 mb-3">
        404 ERROR — PAGE NOT FOUND
      </span>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1a1f1b] font-['Archivo_Narrow'] uppercase tracking-tight mb-4">
        Looking for a Freight Route or Service?
      </h1>

      <p className="text-base text-neutral-600 font-['Manrope'] mb-8 max-w-lg mx-auto">
        The page you are looking for might have been moved, renamed, or is temporarily unavailable. Let's get your freight moving to the right place.
      </p>

      {/* Primary Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
        <Link
          to="/"
          className="px-6 py-3 rounded-2xl bg-[#0F6A37] hover:bg-[#0c532b] text-white text-sm font-bold font-['Manrope'] uppercase tracking-wider transition-all flex items-center gap-2 shadow-md hover:scale-105"
        >
          <Home size={16} />
          <span>Back to Homepage</span>
        </Link>
        <Link
          to="/book-truck"
          className="px-6 py-3 rounded-2xl bg-[#F4B400] hover:bg-[#d99f00] text-[#1a1f1b] text-sm font-bold font-['Manrope'] uppercase tracking-wider transition-all flex items-center gap-2 shadow-md hover:scale-105"
        >
          <Truck size={16} />
          <span>Book a Truck</span>
        </Link>
        <Link
          to="/contact"
          className="px-6 py-3 rounded-2xl bg-white hover:bg-neutral-50 text-neutral-800 border border-[#d8d0c3] text-sm font-bold font-['Manrope'] uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm"
        >
          <Phone size={16} />
          <span>Contact Dispatch</span>
        </Link>
      </div>

      {/* Popular Freight Routes */}
      <div className="w-full bg-white rounded-3xl p-6 md:p-8 border border-[#d8d0c3] shadow-sm text-left">
        <div className="flex items-center justify-between mb-4 border-b border-[#e2dacd] pb-3">
          <h2 className="text-base font-extrabold uppercase font-['Archivo_Narrow'] text-[#1a1f1b] flex items-center gap-2">
            <MapPin size={18} className="text-[#0F6A37]" />
            Popular Freight Corridors
          </h2>
          <Link
            to="/routes"
            className="text-xs font-bold text-[#0F6A37] hover:underline font-['Manrope'] flex items-center gap-1"
          >
            <span>View All Routes</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {popularRoutes.map((route) => (
            <Link
              key={route.slug}
              to={`/${route.slug}`}
              className="p-3.5 rounded-xl border border-neutral-200 hover:border-[#0F6A37] hover:bg-[#EBF5EE]/40 transition-all block group"
            >
              <div className="font-['Archivo_Narrow'] font-bold text-sm uppercase text-[#1a1f1b] group-hover:text-[#0F6A37]">
                {route.fromCity} ➔ {route.toCity}
              </div>
              <div className="text-xs text-neutral-500 font-['Space_Mono'] mt-1">
                {route.distanceKm} km • {route.transitTime}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
