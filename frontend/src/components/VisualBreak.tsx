import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Truck, Clock, ShieldCheck, ArrowRight, MessageCircle, Route, Zap } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../lib/constants';

interface DestinationInfo {
  city: string;
  state: string;
  distanceKm: number;
  transitHours: string;
  highway: string;
  region: string;
}

const DESTINATIONS: DestinationInfo[] = [
  { city: 'Delhi NCR', state: 'Delhi/Haryana', distanceKm: 280, transitHours: '6–8 hrs', highway: 'NE-4 / NH-48 Expressway', region: 'North' },
  { city: 'Mumbai', state: 'Maharashtra', distanceKm: 1150, transitHours: '28–36 hrs', highway: 'NH-48 Golden Corridor', region: 'West' },
  { city: 'Ahmedabad', state: 'Gujarat', distanceKm: 660, transitHours: '14–18 hrs', highway: 'NH-48 Express Freight', region: 'West' },
  { city: 'Pune', state: 'Maharashtra', distanceKm: 1240, transitHours: '32–40 hrs', highway: 'NH-48 via Mumbai Bypass', region: 'West' },
  { city: 'Bengaluru', state: 'Karnataka', distanceKm: 2020, transitHours: '50–60 hrs', highway: 'NH-48 South Trunk', region: 'South' },
  { city: 'Kolkata', state: 'West Bengal', distanceKm: 1520, transitHours: '40–48 hrs', highway: 'NH-19 Eastern Trunk', region: 'East' },
  { city: 'Indore', state: 'Madhya Pradesh', distanceKm: 590, transitHours: '12–16 hrs', highway: 'NH-52 Central Corridor', region: 'Central' },
  { city: 'Surat', state: 'Gujarat', distanceKm: 900, transitHours: '20–24 hrs', highway: 'NH-48 Textile Belt', region: 'West' },
  { city: 'Hyderabad', state: 'Telangana', distanceKm: 1480, transitHours: '36–44 hrs', highway: 'NH-44 Central-South', region: 'South' },
  { city: 'Ludhiana', state: 'Punjab', distanceKm: 510, transitHours: '11–14 hrs', highway: 'NH-44 North Trunk', region: 'North' },
];

interface VehicleOption {
  id: string;
  name: string;
  capacity: string;
  badge: string;
  isParcel?: boolean;
}

const VEHICLE_OPTIONS: VehicleOption[] = [
  { id: '14ft', name: '14 ft Canter', capacity: 'Up to 4.5 Tons', badge: 'Light Industrial' },
  { id: '19ft', name: '19 ft Truck', capacity: 'Up to 7–8 Tons', badge: 'Medium Freight' },
  { id: '22ft', name: '22 ft Heavy', capacity: 'Up to 10 Tons', badge: 'High Volume' },
  { id: '32ft', name: '32 ft MXL Container', capacity: 'Up to 15 Tons', badge: 'All-Weather Closed' },
  { id: 'parcel', name: 'Express Parcel', capacity: '0–150 kg', badge: 'Small Batch Part-Load', isParcel: true },
];

export const VisualBreak: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>('Delhi NCR');
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('19ft');

  const currentDest = DESTINATIONS.find((d) => d.city === selectedCity) || DESTINATIONS[0];
  const currentVehicle = VEHICLE_OPTIONS.find((v) => v.id === selectedVehicleId) || VEHICLE_OPTIONS[1];

  const whatsappMessage = encodeURIComponent(
    `Hello Shree Krishna Transport, I would like to get an instant quotation for:
• Origin: Jaipur, Rajasthan
• Destination: ${currentDest.city}, ${currentDest.state} (${currentDest.distanceKm} km)
• Vehicle / Load: ${currentVehicle.name} (${currentVehicle.capacity})
Please share competitive freight rates and vehicle availability.`
  );

  const bookingUrl = currentVehicle.isParcel
    ? `/book-truck?type=parcel&to=${encodeURIComponent(currentDest.city)}`
    : `/book-truck?to=${encodeURIComponent(currentDest.city)}&vehicle=${encodeURIComponent(currentVehicle.name)}`;

  return (
    <section className="w-full bg-[#161917] text-white border-y border-neutral-800 py-12 md:py-16 px-4 md:px-12 relative overflow-hidden">
      {/* Background Decorative Subtle Grid Elements */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }} 
      />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Strip */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-neutral-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#062448]/20 border border-[#062448]/40 text-[#85B7EB] font-['Space_Mono'] text-xs font-bold uppercase tracking-wider mb-2">
              <Zap size={13} className="text-[#E9A015]" />
              <span>Interactive Route & Fleet Hub</span>
            </div>
            <h2 className="font-['Archivo_Narrow'] text-2xl md:text-3xl font-bold uppercase text-white tracking-tight">
              Instant Corridor & Transit Check
            </h2>
            <p className="font-['Manrope'] text-xs md:text-sm text-neutral-400 mt-1 max-w-xl">
              Calculate verified highway distance, expected transit window, and recommended fleet capacity originating from Jaipur & Rajasthan.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 font-['Space_Mono'] text-xs text-neutral-400 bg-neutral-900/90 px-3.5 py-2 rounded-lg border border-neutral-800">
            <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
            <span className="text-white font-bold">Jaipur Hub:</span>
            <span>Daily Express Departures</span>
          </div>
        </div>

        {/* Interactive Selector Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Selectors */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Destination Selector */}
            <div>
              <label className="block font-['Space_Mono'] text-xs uppercase tracking-widest text-[#85B7EB] mb-2.5 font-bold flex items-center gap-1.5">
                <MapPin size={14} className="text-[#E9A015]" />
                <span>1. Select Destination City (From Jaipur)</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {DESTINATIONS.map((dest) => {
                  const isSelected = dest.city === selectedCity;
                  return (
                    <button
                      key={dest.city}
                      onClick={() => setSelectedCity(dest.city)}
                      type="button"
                      className={`text-left p-2.5 rounded-lg border transition-all ${
                        isSelected
                          ? 'bg-[#062448] border-[#25D366]/60 text-white shadow-md shadow-[#062448]/30'
                          : 'bg-neutral-900/60 border-neutral-800 text-neutral-300 hover:border-neutral-700 hover:text-white'
                      }`}
                    >
                      <div className="font-['Manrope'] font-bold text-xs leading-tight">
                        {dest.city}
                      </div>
                      <div className={`font-['Space_Mono'] text-[10px] mt-1 ${isSelected ? 'text-neutral-200' : 'text-neutral-500'}`}>
                        {dest.distanceKm} km
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Vehicle / Load Selector */}
            <div>
              <label className="block font-['Space_Mono'] text-xs uppercase tracking-widest text-[#85B7EB] mb-2.5 font-bold flex items-center gap-1.5">
                <Truck size={14} className="text-[#E9A015]" />
                <span>2. Select Vehicle / Load Requirement</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {VEHICLE_OPTIONS.map((v) => {
                  const isSelected = v.id === selectedVehicleId;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVehicleId(v.id)}
                      type="button"
                      className={`flex items-center justify-between p-3 rounded-lg border text-left transition-all ${
                        isSelected
                          ? 'bg-[#062448] border-[#25D366]/60 text-white shadow-md shadow-[#062448]/30'
                          : 'bg-neutral-900/60 border-neutral-800 text-neutral-300 hover:border-neutral-700 hover:text-white'
                      }`}
                    >
                      <div>
                        <div className="font-['Manrope'] font-bold text-xs">{v.name}</div>
                        <div className={`font-['Space_Mono'] text-[10px] ${isSelected ? 'text-neutral-200' : 'text-neutral-400'}`}>
                          {v.capacity}
                        </div>
                      </div>
                      <span className={`text-[9px] px-2 py-0.5 rounded font-['Space_Mono'] uppercase font-bold tracking-wider ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-neutral-800 text-neutral-400'
                      }`}>
                        {v.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Live Calculated Transit Card */}
          <div className="lg:col-span-5">
            <div className="bg-neutral-900/95 border-2 border-[#062448]/40 rounded-2xl p-6 md:p-7 shadow-xl space-y-5 relative">
              
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <Route size={18} className="text-[#85B7EB]" />
                  <span className="font-['Space_Mono'] text-xs font-bold text-[#85B7EB] uppercase tracking-wider">
                    Corridor Profile
                  </span>
                </div>
                <span className="font-['Space_Mono'] text-[10px] px-2 py-0.5 rounded bg-[#E9A015]/20 text-[#E9A015] font-bold uppercase">
                  Verified Route
                </span>
              </div>

              {/* Route Summary */}
              <div className="space-y-3 font-['Manrope']">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400 text-xs uppercase tracking-wider">Corridor:</span>
                  <span className="text-white font-bold text-sm font-['Space_Mono']">
                    Jaipur ➔ {currentDest.city}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-neutral-400 text-xs uppercase tracking-wider">Route Highway:</span>
                  <span className="text-neutral-200 text-xs font-semibold">
                    {currentDest.highway}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-neutral-400 text-xs uppercase tracking-wider">Highway Distance:</span>
                  <span className="text-white font-bold text-sm font-['Space_Mono']">
                    ~{currentDest.distanceKm} km
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-neutral-400 text-xs uppercase tracking-wider">Estimated Transit:</span>
                  <span className="text-[#85B7EB] font-bold text-sm font-['Space_Mono'] flex items-center gap-1.5">
                    <Clock size={14} />
                    {currentDest.transitHours}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-neutral-800">
                  <span className="text-neutral-400 text-xs uppercase tracking-wider">Selected Load:</span>
                  <span className="text-[#E9A015] font-bold text-xs font-['Space_Mono']">
                    {currentVehicle.name} ({currentVehicle.capacity})
                  </span>
                </div>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-2 gap-2 pt-2 text-[10px] font-['Manrope'] text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={13} className="text-[#062448]" />
                  <span>GST Invoicing & E-Way Bill</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={13} className="text-[#062448]" />
                  <span>Doorstep Pickup Available</span>
                </div>
              </div>

              {/* Direct Actions */}
              <div className="space-y-2.5 pt-2">
                <Link
                  to={bookingUrl}
                  className="w-full flex items-center justify-center gap-2 bg-[#062448] hover:bg-[#03162C] text-white font-['Manrope'] font-bold text-xs py-3 rounded-xl uppercase tracking-wider transition-all shadow-md group"
                >
                  <span>Book This Route Online</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white font-['Manrope'] font-bold text-xs py-3 rounded-xl uppercase tracking-wider transition-colors border border-neutral-700"
                >
                  <MessageCircle size={15} className="text-[#25D366]" />
                  <span>Get WhatsApp Quote in 60 Mins</span>
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
