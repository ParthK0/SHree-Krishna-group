import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calculator,
  Truck,
  Package,
  ArrowRight,
  Clock,
  MapPin,
  ShieldCheck,
  FileCheck,
  CheckCircle2,
  Info,
} from 'lucide-react';
import {
  VEHICLE_OPTIONS,
  POPULAR_ORIGINS,
  POPULAR_DESTINATIONS,
  calculateFreightEstimate,
  calculateParcelEstimate,
} from '../lib/freightCalculator';

interface FreightRateCalculatorProps {
  initialFrom?: string;
  initialTo?: string;
  initialType?: 'truck' | 'parcel';
  compact?: boolean;
}

export const FreightRateCalculator: React.FC<FreightRateCalculatorProps> = ({
  initialFrom = 'Jaipur',
  initialTo = 'Delhi',
  initialType = 'truck',
  compact = false,
}) => {
  const navigate = useNavigate();

  const [mode, setMode] = useState<'truck' | 'parcel'>(initialType);
  const [fromCity, setFromCity] = useState<string>(initialFrom);
  const [toCity, setToCity] = useState<string>(initialTo);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('truck-14ft');
  const [parcelWeight, setParcelWeight] = useState<number>(25);

  // Computed results
  const freightEstimate = useMemo(() => {
    return calculateFreightEstimate(fromCity, toCity, selectedVehicleId);
  }, [fromCity, toCity, selectedVehicleId]);

  const parcelEstimate = useMemo(() => {
    return calculateParcelEstimate(fromCity, toCity, parcelWeight);
  }, [fromCity, toCity, parcelWeight]);

  const handleSwapCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const handleProceedToBooking = () => {
    const params = new URLSearchParams();
    params.set('pickup', fromCity);
    params.set('drop', toCity);

    if (mode === 'parcel') {
      params.set('type', 'parcel');
      params.set('weight', `${parcelWeight} kg`);
      params.set('truck', 'Parcel Express / Small Courier Van');
    } else {
      const v = VEHICLE_OPTIONS.find((opt) => opt.id === selectedVehicleId);
      params.set('type', 'truck');
      params.set('truck', v ? v.name : '14 ft Truck');
      params.set('weight', v ? v.capacity : 'Up to 4.5 Tons');
    }

    navigate(`/book-truck?${params.toString()}`);
  };

  return (
    <div className={`w-full max-w-5xl mx-auto bg-white border border-[#c5beb4] rounded-2xl shadow-xl overflow-hidden ${compact ? 'p-4 sm:p-6' : 'p-6 sm:p-8 md:p-10'}`}>
      {/* Header Eyebrow */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5ded5] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#062448]/10 text-[#062448] font-['Space_Mono'] text-xs font-bold uppercase tracking-wider mb-2">
            <Calculator size={14} className="text-[#E9A015]" />
            <span>Instant Rate Estimation Tool</span>
          </div>
          <h2 className="font-['Archivo_Narrow'] text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase text-[#1a1f1b] tracking-tight">
            Freight &amp; Parcel Rate Calculator
          </h2>
          <p className="font-['Manrope'] text-xs sm:text-sm text-[#5a665c] mt-1">
            Get instant indicative freight rates, road distances, and transit commitments for Rajasthan and All-India corridors.
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="inline-flex p-1 rounded-xl bg-[#ECE6DD] border border-[#d8d0c5] shrink-0 self-start sm:self-center">
          <button
            type="button"
            onClick={() => setMode('truck')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-['Manrope'] font-bold uppercase tracking-wider transition-all duration-200 ${mode === 'truck'
                ? 'bg-[#062448] text-white shadow-md'
                : 'text-[#3d4a3f] hover:text-[#1a1f1b]'
              }`}
          >
            <Truck size={16} />
            <span>Full / Part Load</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('parcel')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-['Manrope'] font-bold uppercase tracking-wider transition-all duration-200 ${mode === 'parcel'
                ? 'bg-[#062448] text-white shadow-md'
                : 'text-[#3d4a3f] hover:text-[#1a1f1b]'
              }`}
          >
            <Package size={16} />
            <span>Parcel (0–150 kg)</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Inputs Left, Result Card Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        {/* Left Column: Form Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Origin & Destination Pickers */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="font-['Archivo_Narrow'] text-xs font-bold uppercase tracking-wider text-[#1a1f1b] flex items-center gap-1.5">
                <MapPin size={15} className="text-[#062448]" />
                <span>Route Corridor</span>
              </label>
              <button
                type="button"
                onClick={handleSwapCities}
                className="text-xs text-[#062448] hover:text-[#0A3366] font-bold font-['Space_Mono'] underline flex items-center gap-1"
                title="Swap Origin and Destination"
              >
                <span>⇄ Swap Cities</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Origin */}
              <div>
                <span className="block text-[11px] font-['Space_Mono'] font-bold text-neutral-500 uppercase mb-1">
                  Origin (Pickup Hub)
                </span>
                <input
                  type="text"
                  list="origins-list"
                  value={fromCity}
                  onChange={(e) => setFromCity(e.target.value)}
                  placeholder="e.g. Jaipur"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#c5beb4] bg-[#fdfcfb] font-['Manrope'] text-sm font-semibold text-[#1a1f1b] focus:outline-none focus:ring-2 focus:ring-[#062448]"
                />
                <datalist id="origins-list">
                  {POPULAR_ORIGINS.map((city) => (
                    <option key={city} value={city} />
                  ))}
                </datalist>
              </div>

              {/* Destination */}
              <div>
                <span className="block text-[11px] font-['Space_Mono'] font-bold text-neutral-500 uppercase mb-1">
                  Destination (Drop Hub)
                </span>
                <input
                  type="text"
                  list="destinations-list"
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                  placeholder="e.g. Delhi"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#c5beb4] bg-[#fdfcfb] font-['Manrope'] text-sm font-semibold text-[#1a1f1b] focus:outline-none focus:ring-2 focus:ring-[#062448]"
                />
                <datalist id="destinations-list">
                  {POPULAR_DESTINATIONS.map((city) => (
                    <option key={city} value={city} />
                  ))}
                </datalist>
              </div>
            </div>

            {/* Quick Popular Corridors Pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] font-['Space_Mono'] text-neutral-500 uppercase mr-1">Popular:</span>
              {[
                ['Jaipur', 'Delhi'],
                ['Jaipur', 'Mumbai'],
                ['Jaipur', 'Ahmedabad'],
                ['Jaipur', 'Bangalore'],
                ['Jaipur', 'Surat'],
              ].map(([org, dst]) => (
                <button
                  key={`${org}-${dst}`}
                  type="button"
                  onClick={() => {
                    setFromCity(org);
                    setToCity(dst);
                  }}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border font-['Space_Mono'] font-medium transition-colors ${fromCity.toLowerCase() === org.toLowerCase() && toCity.toLowerCase() === dst.toLowerCase()
                      ? 'bg-[#062448] text-white border-[#062448]'
                      : 'bg-[#f4f0ea] border-[#d8d0c5] text-[#3d4a3f] hover:bg-[#e8e2d8]'
                    }`}
                >
                  {org} → {dst}
                </button>
              ))}
            </div>
          </div>

          {/* Mode 1: Truck Selector */}
          {mode === 'truck' ? (
            <div className="space-y-3">
              <label className="font-['Archivo_Narrow'] text-xs font-bold uppercase tracking-wider text-[#1a1f1b] flex items-center gap-1.5">
                <Truck size={15} className="text-[#062448]" />
                <span>Select Commercial Vehicle Type</span>
              </label>

              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                {VEHICLE_OPTIONS.map((v) => {
                  const isSelected = selectedVehicleId === v.id;
                  return (
                    <div
                      key={v.id}
                      onClick={() => setSelectedVehicleId(v.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-150 flex items-center justify-between gap-3 ${isSelected
                          ? 'bg-[#EBF2F9] border-[#062448] shadow-sm'
                          : 'bg-[#fdfcfb] border-[#e2dad0] hover:border-[#c5beb4]'
                        }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-['Manrope'] font-bold text-sm text-[#1a1f1b]">{v.name}</span>
                          <span className="text-[11px] font-['Space_Mono'] px-2 py-0.5 rounded bg-neutral-200/80 text-neutral-800 font-bold">
                            {v.capacity}
                          </span>
                        </div>
                        <p className="font-['Manrope'] text-xs text-[#5a665c]">{v.description}</p>
                      </div>

                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${isSelected ? 'border-[#062448] bg-[#062448] text-white' : 'border-[#c5beb4]'
                          }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Mode 2: Parcel Weight Slider */
            <div className="space-y-4 bg-[#f9f6f2] border border-[#e2dad0] rounded-xl p-5">
              <div className="flex items-center justify-between">
                <label className="font-['Archivo_Narrow'] text-xs font-bold uppercase tracking-wider text-[#1a1f1b] flex items-center gap-1.5">
                  <Package size={15} className="text-[#062448]" />
                  <span>Parcel Consignment Weight</span>
                </label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min="0.5"
                    max="150"
                    step="0.5"
                    value={parcelWeight}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value) || 1;
                      setParcelWeight(Math.max(0.5, Math.min(150, val)));
                    }}
                    className="w-20 px-2.5 py-1 text-center font-['Space_Mono'] font-bold text-base rounded-lg border border-[#c5beb4] bg-white text-[#062448] focus:outline-none focus:ring-2 focus:ring-[#062448]"
                  />
                  <span className="font-['Space_Mono'] text-xs font-bold text-neutral-600">kg</span>
                </div>
              </div>

              {/* Slider */}
              <input
                type="range"
                min="1"
                max="150"
                step="1"
                value={parcelWeight}
                onChange={(e) => setParcelWeight(parseInt(e.target.value, 10))}
                className="w-full accent-[#062448] cursor-pointer"
              />

              <div className="flex justify-between text-[11px] font-['Space_Mono'] text-neutral-500">
                <span>1 kg (Sample / Documents)</span>
                <span>50 kg (Boxes)</span>
                <span>150 kg (Max Express)</span>
              </div>

              <div className="p-3 bg-white border border-[#e2dad0] rounded-lg text-xs text-[#3d4a3f] font-['Manrope'] flex items-start gap-2">
                <Info size={16} className="text-[#062448] shrink-0 mt-0.5" />
                <p>
                  Express parcel consignments (0–150 kg) travel via our daily express hub-to-hub network. For weights exceeding 150 kg, please switch to <strong>Full / Part Load</strong> above.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Live Result Card (5 cols) */}
        <div className="lg:col-span-5">
          <div className="bg-[#181d19] text-white rounded-2xl p-6 sm:p-7 shadow-xl border border-neutral-800 flex flex-col justify-between h-full space-y-6">
            {/* Top Badge */}
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <span className="font-['Space_Mono'] text-[11px] font-bold text-[#85B7EB] uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-[#E9A015]" />
                {mode === 'truck' && freightEstimate.isCorridorVerified
                  ? 'Verified Master Corridor'
                  : 'Indicative Mileage Rate'}
              </span>
              <span className="font-['Space_Mono'] text-xs text-neutral-400">
                {fromCity} → {toCity}
              </span>
            </div>

            {/* Estimated Price Range */}
            <div className="space-y-1">
              <span className="font-['Space_Mono'] text-[11px] text-neutral-400 uppercase tracking-widest block">
                Estimated Freight Tariff
              </span>
              <div className="font-['Space_Mono'] text-3xl sm:text-4xl font-extrabold text-[#E9A015] tracking-tight">
                {mode === 'truck' ? freightEstimate.priceFormatted : parcelEstimate.priceFormatted}
              </div>
              <p className="font-['Manrope'] text-xs text-neutral-400 pt-1">
                {mode === 'truck'
                  ? `For ${freightEstimate.vehicleName} (${freightEstimate.vehicleCapacity})`
                  : `For ${parcelEstimate.weightKg} kg parcel (${parcelEstimate.ratePerKg})`}
              </p>
            </div>

            {/* Corridor Metrics */}
            <div className="grid grid-cols-2 gap-3 bg-neutral-900/80 border border-neutral-800 rounded-xl p-3.5 font-['Space_Mono'] text-xs">
              <div>
                <span className="text-neutral-400 block text-[10px] uppercase">Road Distance</span>
                <span className="text-white font-bold text-sm">
                  ~{mode === 'truck' ? freightEstimate.distanceKm : parcelEstimate.distanceKm} km
                </span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px] uppercase">Transit Time</span>
                <span className="text-[#85B7EB] font-bold text-sm">
                  {mode === 'truck' ? freightEstimate.transitTime : parcelEstimate.transitTime}
                </span>
              </div>
            </div>

            {/* Trust Inclusions */}
            <div className="space-y-2 text-xs font-['Manrope'] text-neutral-300">
              <div className="flex items-center gap-2">
                <FileCheck size={14} className="text-[#85B7EB] shrink-0" />
                <span>100% Tax Invoice with GSTIN: 08KEYPK3684A1ZV</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-[#E9A015] shrink-0" />
                <span>Transit Insurance Assistance on Demand</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-[#85B7EB] shrink-0" />
                <span>Confirmed Quotation within 60 Mins on WhatsApp</span>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-2 space-y-3">
              <button
                type="button"
                onClick={handleProceedToBooking}
                className="w-full flex items-center justify-center gap-2 bg-[#E9A015] hover:bg-[#D08C0A] text-[#4A2E00] font-['Manrope'] font-extrabold text-sm py-4 px-6 rounded-xl shadow-lg transition-all duration-200 uppercase tracking-wider group"
              >
                <span>Request 1-Hour WhatsApp Quote</span>
                <ArrowRight size={18} className="arrow-slide ml-0.5 transition-transform group-hover:translate-x-1.5" />
              </button>

              <p className="font-['Manrope'] text-[11px] text-neutral-400 text-center leading-relaxed">
                *Indicative estimation only. When you request a quote, our dispatch team receives your specs via email, calculates verified carrier rates with return-truck discounts, and messages your WhatsApp in 60 minutes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
