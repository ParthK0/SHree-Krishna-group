import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, MapPin, Truck, ArrowRight, MessageCircle, 
  Clock, Sparkles, ShieldCheck 
} from 'lucide-react';
import { 
  calculateFreightEstimate, 
  POPULAR_ORIGINS, 
  POPULAR_DESTINATIONS, 
  VEHICLE_OPTIONS, 
  type FreightEstimateResult 
} from '../lib/freightCalculator';
import { WHATSAPP_NUMBER } from '../lib/constants';

export const InstantQuoteWidget: React.FC = () => {
  const [fromCity, setFromCity] = useState('Jaipur');
  const [toCity, setToCity] = useState('Delhi');
  const [vehicleId, setVehicleId] = useState('truck-14ft');
  const [result, setResult] = useState<FreightEstimateResult | null>(() => {
    return calculateFreightEstimate('Jaipur', 'Delhi', 'truck-14ft');
  });

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const estimate = calculateFreightEstimate(fromCity, toCity, vehicleId);
    setResult(estimate);
  };

  const currentVehicle = VEHICLE_OPTIONS.find((v) => v.id === vehicleId) || VEHICLE_OPTIONS[1];

  const whatsappMessage = encodeURIComponent(
    `Hello Shree Krishna Transport, I used your Instant Freight Calculator on the website:
• Origin: ${fromCity}
• Destination: ${toCity}
• Vehicle: ${currentVehicle.name} (${currentVehicle.capacity})
• Estimated Price: ${result?.priceFormatted || 'Pending'}
• Est. Distance: ${result?.distanceKm || 0} km
Please confirm vehicle availability and provide an official quotation.`
  );

  return (
    <div id="instant-quote" className="w-full max-w-5xl mx-auto px-4 sm:px-6 relative z-20 -mt-8 md:-mt-12 mb-10">
      <div className="bg-white rounded-2xl shadow-2xl border-2 border-[#0F6A37]/30 overflow-hidden">
        
        {/* Widget Header Strip */}
        <div className="bg-[#1C201D] px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-white border-b border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0F6A37] flex items-center justify-center text-[#F4B400] shadow-sm">
              <Calculator size={18} />
            </div>
            <div>
              <div className="font-['Archivo_Narrow'] font-bold text-base sm:text-lg uppercase tracking-tight flex items-center gap-2">
                <span>Instant Freight Calculator</span>
                <span className="text-[10px] bg-[#0F6A37]/50 text-[#8ad7a0] px-2 py-0.5 rounded font-['Space_Mono'] font-bold border border-[#0F6A37]">
                  REAL-TIME
                </span>
              </div>
              <p className="font-['Manrope'] text-[11px] text-neutral-400">
                Transparent rates based on highway distances and vehicle capacities.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-['Space_Mono'] text-neutral-300">
            <span className="flex items-center gap-1">
              <ShieldCheck size={14} className="text-[#8ad7a0]" /> GST Ready
            </span>
            <span className="text-neutral-600">•</span>
            <span className="flex items-center gap-1">
              <Clock size={14} className="text-[#F4B400]" /> Quote &lt; 60m
            </span>
          </div>
        </div>

        {/* 3-Field Input Form */}
        <form onSubmit={handleCalculate} className="p-5 sm:p-7 bg-[#FAF7F2]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            
            {/* Field 1: From City */}
            <div className="md:col-span-3 space-y-1.5">
              <label className="block font-['Manrope'] text-xs font-bold text-[#1a1f1b] uppercase tracking-wider flex items-center gap-1.5">
                <MapPin size={13} className="text-[#0F6A37]" />
                <span>Pickup City</span>
              </label>
              <select
                value={fromCity}
                onChange={(e) => {
                  setFromCity(e.target.value);
                  setResult(calculateFreightEstimate(e.target.value, toCity, vehicleId));
                }}
                className="w-full bg-white border border-[#c5beb4] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-[#1a1f1b] focus:outline-none focus:border-[#0F6A37] focus:ring-2 focus:ring-[#0F6A37]/20 shadow-sm"
              >
                {POPULAR_ORIGINS.map((city) => (
                  <option key={city} value={city}>
                    {city} {city === 'Jaipur' ? '(Main Hub)' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Field 2: To City */}
            <div className="md:col-span-3 space-y-1.5">
              <label className="block font-['Manrope'] text-xs font-bold text-[#1a1f1b] uppercase tracking-wider flex items-center gap-1.5">
                <MapPin size={13} className="text-[#F4B400]" />
                <span>Destination City</span>
              </label>
              <select
                value={toCity}
                onChange={(e) => {
                  setToCity(e.target.value);
                  setResult(calculateFreightEstimate(fromCity, e.target.value, vehicleId));
                }}
                className="w-full bg-white border border-[#c5beb4] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-[#1a1f1b] focus:outline-none focus:border-[#0F6A37] focus:ring-2 focus:ring-[#0F6A37]/20 shadow-sm"
              >
                {POPULAR_DESTINATIONS.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Field 3: Vehicle Type */}
            <div className="md:col-span-4 space-y-1.5">
              <label className="block font-['Manrope'] text-xs font-bold text-[#1a1f1b] uppercase tracking-wider flex items-center gap-1.5">
                <Truck size={13} className="text-[#0F6A37]" />
                <span>Vehicle / Cargo Type</span>
              </label>
              <select
                value={vehicleId}
                onChange={(e) => {
                  setVehicleId(e.target.value);
                  setResult(calculateFreightEstimate(fromCity, toCity, e.target.value));
                }}
                className="w-full bg-white border border-[#c5beb4] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-[#1a1f1b] focus:outline-none focus:border-[#0F6A37] focus:ring-2 focus:ring-[#0F6A37]/20 shadow-sm"
              >
                {VEHICLE_OPTIONS.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} ({v.capacity})
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Action */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-[#0F6A37] hover:bg-[#134E3A] text-white font-['Manrope'] font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 uppercase tracking-wider"
              >
                <Sparkles size={15} className="text-[#F4B400]" />
                <span>Estimate</span>
              </button>
            </div>

          </div>
        </form>

        {/* Calculated Results Banner */}
        {result && (
          <div className="bg-[#EBF5EE] border-t border-[#cde5d4] p-5 sm:p-6 transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
              
              {/* Output Highlights */}
              <div className="lg:col-span-7 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-['Space_Mono'] font-bold uppercase text-[#0F6A37] bg-white px-2.5 py-0.5 rounded-full border border-[#0F6A37]/20">
                    {fromCity} ➔ {toCity}
                  </span>
                  <span className="text-xs font-['Space_Mono'] text-[#4A554C]">
                    ~{result.distanceKm} km highway distance
                  </span>
                  <span className="text-xs font-['Space_Mono'] text-[#0F6A37] font-bold flex items-center gap-1">
                    <Clock size={12} /> {result.transitTime}
                  </span>
                </div>

                <div className="flex items-baseline gap-3">
                  <div className="font-['Space_Mono'] text-2xl sm:text-3xl font-bold text-[#1a1f1b]">
                    {result.priceFormatted}
                  </div>
                  <span className="text-xs font-['Manrope'] font-semibold text-[#5a665c]">
                    Estimated Freight (excl. GST)
                  </span>
                </div>

                <p className="text-[11px] font-['Manrope'] text-[#5a665c]">
                  Vehicle: <strong className="text-[#1a1f1b]">{result.vehicleName}</strong> ({result.vehicleCapacity}). Actual rate may vary slightly with specific pickup locations and loading points.
                </p>
              </div>

              {/* CTAs */}
              <div className="lg:col-span-5 flex flex-col sm:flex-row gap-2.5 justify-end">
                <Link
                  to={`/book-truck?from=${encodeURIComponent(fromCity)}&to=${encodeURIComponent(toCity)}&vehicle=${encodeURIComponent(result.vehicleName)}`}
                  className="inline-flex items-center justify-center gap-2 bg-[#0F6A37] hover:bg-[#0c562c] text-white font-['Manrope'] font-extrabold text-xs px-5 py-3 rounded-xl shadow-md transition-all uppercase tracking-wider group"
                >
                  <span>Book Online</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-neutral-50 text-[#1a1f1b] border border-[#c5beb4] font-['Manrope'] font-extrabold text-xs px-4 py-3 rounded-xl shadow-sm hover:border-[#25D366] transition-all uppercase tracking-wider group"
                >
                  <MessageCircle size={15} className="text-[#25D366]" />
                  <span>WhatsApp Quote</span>
                </a>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
