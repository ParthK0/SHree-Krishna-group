import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { sendAutomatedForm } from '../lib/whatsapp';
import { useToast } from '../lib/useToast';
import { calculateFreightEstimate, calculateParcelEstimate } from '../lib/freightCalculator';
import {
  Truck,
  Loader2,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  Clock,
  Package,
  Sparkles,
  ChevronDown,
  ChevronUp,
  PhoneCall,
  ShieldCheck,
} from 'lucide-react';

const inputClass = 'sk-input';
const labelClass =
  "block font-['Manrope'] text-[10px] font-bold text-[#4A554C] uppercase tracking-widest mb-1.5";

interface FieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
  error?: string;
  children?: React.ReactNode;
}

const Field: React.FC<FieldProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
  required,
  inputMode,
  error,
  children,
}) => (
  <div>
    <label htmlFor={name} className={labelClass}>
      {label}
      {required && <span className="text-[#0B3A66] ml-0.5">*</span>}
    </label>
    {children ?? (
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        inputMode={inputMode}
        className={`${inputClass} ${
          error ? 'border-red-500 bg-red-50/40 focus:border-red-600 focus:ring-red-500/20' : ''
        }`}
      />
    )}
    {error && (
      <p className="mt-1 text-[11px] font-['Manrope'] font-bold text-red-600 flex items-center gap-1">
        <AlertCircle size={12} className="shrink-0" />
        <span>{error}</span>
      </p>
    )}
  </div>
);

// Validation helpers
const validatePhone = (phone: string) => /^[6-9]\d{9}$/.test(phone.trim());
const validateName = (name: string) => /^[a-zA-Z\s.]{3,50}$/.test(name.trim());
const validateLocation = (loc: string) => loc.trim().length >= 2 && /[a-zA-Z]/.test(loc);
const validateGoodsType = (goods: string) => goods.trim().length >= 2 && /[a-zA-Z]/.test(goods);
const validateGST = (gst: string) =>
  !gst || /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/i.test(gst.trim());

const validateParcelWeight = (weightStr: string): { valid: boolean; error?: string } => {
  if (!weightStr || !weightStr.trim()) {
    return { valid: false, error: 'Please enter parcel weight (0.1 to 150 kg)' };
  }
  const clean = weightStr.trim().toLowerCase();

  if (clean.includes('ton') || clean.includes('tonne')) {
    return {
      valid: false,
      error: 'Parcel limit is 150 kg max. For tons, please select Full Load (FTL) or Part Load (PTL).',
    };
  }

  const numMatch = clean.match(/([0-9]+(?:\.[0-9]+)?)/);
  if (!numMatch) {
    return { valid: false, error: 'Please enter a valid weight number in kg (0 to 150 kg)' };
  }

  const weightVal = parseFloat(numMatch[1]);
  if (isNaN(weightVal) || weightVal <= 0) {
    return { valid: false, error: 'Weight must be greater than 0 kg' };
  }
  if (weightVal > 150) {
    return {
      valid: false,
      error: `Weight is ${weightVal} kg. Parcel limit is 150 kg max. Please switch to Part Load (PTL) or Full Load.`,
    };
  }

  return { valid: true };
};

export const BookingForm: React.FC = () => {
  const toast = useToast();
  const [searchParams] = useSearchParams();
  const isInitialParcel =
    searchParams.get('type') === 'parcel' || searchParams.get('service') === 'parcel';

  const [formData, setFormData] = useState({
    pickup: '',
    drop: '',
    goods: '',
    weight: '',
    materialValue: '',
    loadType: isInitialParcel ? 'Book a Parcel (0 to 150 kg)' : 'Full Load (FTL)',
    truck: isInitialParcel ? 'Parcel Express / Small Courier Van' : 'Not sure',
    customTruck: '',
    date: '',
    name: '',
    phone: '',
    company: '',
    gst: '',
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [declared, setDeclared] = useState(false);
  const [refId, setRefId] = useState('');

  useEffect(() => {
    const typeParam = searchParams.get('type') || searchParams.get('service');
    if (typeParam === 'parcel') {
      handleLoadTypeChange('Book a Parcel (0 to 150 kg)');
    }
  }, [searchParams]);

  const isParcel = formData.loadType === 'Book a Parcel (0 to 150 kg)';

  const handleLoadTypeChange = (newLoadType: string) => {
    setFormData((prev) => ({
      ...prev,
      loadType: newLoadType,
      truck:
        newLoadType === 'Book a Parcel (0 to 150 kg)'
          ? 'Parcel Express / Small Courier Van'
          : prev.truck.includes('Parcel')
          ? 'Not sure'
          : prev.truck,
      weight:
        newLoadType === 'Book a Parcel (0 to 150 kg)' && prev.weight.includes('ton')
          ? ''
          : prev.weight,
    }));
    if (errors.weight) {
      setErrors((prev) => ({ ...prev, weight: '' }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'loadType') {
      handleLoadTypeChange(value);
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Live Freight / Parcel Price Estimation
  const liveEstimate = useMemo(() => {
    if (formData.pickup.trim().length < 2 || formData.drop.trim().length < 2) return null;
    try {
      if (isParcel) {
        const weightNum = parseFloat(formData.weight) || 10;
        return calculateParcelEstimate(formData.pickup, formData.drop, weightNum);
      }
      return calculateFreightEstimate(formData.pickup, formData.drop, 'truck-14ft');
    } catch {
      return null;
    }
  }, [formData.pickup, formData.drop, isParcel, formData.weight]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!validateLocation(formData.pickup)) {
      newErrors.pickup = 'Enter a valid Pickup city/location (e.g. Jaipur)';
    }
    if (!validateLocation(formData.drop)) {
      newErrors.drop = 'Enter a valid Drop city/location (e.g. Delhi)';
    }
    if (!validateGoodsType(formData.goods)) {
      newErrors.goods = isParcel
        ? 'Enter parcel contents (e.g. Spare Parts, Box, Samples)'
        : 'Enter a valid Goods Type (e.g. Marble, Steel, Tiles)';
    }

    if (isParcel) {
      const weightCheck = validateParcelWeight(formData.weight);
      if (!weightCheck.valid) {
        newErrors.weight = weightCheck.error || 'Parcel weight must be between 0 and 150 kg';
      }
    }

    if (!validateName(formData.name)) {
      newErrors.name = 'Enter a valid contact name (at least 3 letters)';
    }
    if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Enter a valid 10-digit mobile number starting with 6-9';
    }

    if (
      formData.truck === 'Other' &&
      (!formData.customTruck || formData.customTruck.trim().length < 2)
    ) {
      newErrors.customTruck = 'Please specify your vehicle type';
    }

    if (formData.gst && !validateGST(formData.gst)) {
      newErrors.gst = 'Enter a valid 15-character GSTIN format (e.g. 08AAAAA0000A1Z5)';
    }

    if (!declared) {
      newErrors.declaration = 'Please confirm details to submit request';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.warning('Please check required fields highlighted in red.', 'Incomplete Form');
      return;
    }

    setIsSubmitting(true);

    const payload: Record<string, string> = {
      'Booking Type': isParcel ? 'Parcel Booking (0–150 kg)' : 'Freight Truck Booking',
      'Pickup Location': formData.pickup,
      'Drop Location': formData.drop,
      'Goods / Cargo Details': formData.goods,
      'Loading Type': formData.loadType,
      Weight: formData.weight
        ? isParcel && !formData.weight.toLowerCase().includes('kg')
          ? `${formData.weight} kg`
          : formData.weight
        : 'N/A',
      'Customer Name': formData.name,
      'Mobile Number': formData.phone,
    };

    if (liveEstimate) {
      payload['Est. Rate Range'] = liveEstimate.priceFormatted;
      payload['Est. Distance'] = `~${liveEstimate.distanceKm} km`;
    }

    if (formData.materialValue) {
      payload['Est. Material Value'] = formData.materialValue;
    }
    if (formData.truck && formData.truck !== 'Not sure') {
      payload['Vehicle Preference'] =
        formData.truck === 'Other' ? formData.customTruck || 'Other' : formData.truck;
    }
    if (formData.date) {
      payload['Pickup Date'] = formData.date;
    }
    if (formData.company) {
      payload['Company Name'] = formData.company;
    }
    if (formData.gst) {
      payload['GST Number'] = formData.gst;
    }

    const emailSubject = isParcel
      ? 'SHREE KRISHNA TRANSPORT — NEW PARCEL BOOKING (0–150 KG)'
      : 'SHREE KRISHNA TRANSPORT — NEW TRUCK BOOKING';

    const generatedRefId = isParcel
      ? 'SKT-PCL-' + Math.floor(10000 + Math.random() * 90000)
      : 'SKT-BK-' + Math.floor(10000 + Math.random() * 90000);

    setRefId(generatedRefId);

    try {
      const res = await sendAutomatedForm(emailSubject, payload);
      if (res.success) {
        toast.success('Your booking request was submitted successfully!', 'Booking Received');
      } else {
        toast.warning(
          'Request received by dispatch! Our team will contact you shortly.',
          'Submission Received'
        );
      }
    } catch (err: any) {
      console.error('Booking submission error:', err);
      toast.error(
        'Online submission failed. Please call our 24/7 dispatch desk directly.',
        'Submission Notice'
      );
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white border border-[#c5beb4] rounded-3xl p-6 sm:p-10 shadow-lg text-center space-y-6 animate-fadeIn">
        <div className="w-16 h-16 rounded-full bg-[#EBF2F9] border border-[#0B3A66]/30 flex items-center justify-center text-[#0B3A66] mx-auto">
          <CheckCircle2 size={36} />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0B3A66]/10 border border-[#0B3A66]/30 text-[#0B3A66] font-['Space_Mono'] text-xs font-bold">
            <span>Reference ID: {refId}</span>
          </div>
          <h2 className="font-['Archivo_Narrow'] text-2xl sm:text-3xl font-bold uppercase text-[#1a1f1b]">
            {isParcel ? 'Parcel Booking Request Received!' : 'Booking Request Received!'}
          </h2>
          <p className="font-['Manrope'] text-xs sm:text-sm text-[#4A554C] max-w-md mx-auto">
            Thank you, <strong className="text-[#1a1f1b]">{formData.name}</strong>. Your freight booking request has been submitted directly to our dispatch desk.
          </p>
        </div>

        {/* Summary Box */}
        <div className="bg-[#f9f6f2] border border-[#e2dad0] rounded-2xl p-5 text-left max-w-lg mx-auto space-y-3 font-['Manrope'] text-xs text-[#3d4a3f]">
          <div className="font-['Archivo_Narrow'] text-xs font-bold text-[#1a1f1b] uppercase tracking-wider border-b border-[#e2dad0] pb-2 flex items-center justify-between">
            <span>Booking Request Summary</span>
            <span className="text-[#0B3A66] font-['Space_Mono'] font-bold text-[11px]">
              {formData.loadType}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <span className="text-neutral-500 block text-[10px] uppercase">Route</span>
              <strong className="text-[#1a1f1b] font-['Space_Mono'] text-xs">
                {formData.pickup} → {formData.drop}
              </strong>
            </div>
            <div>
              <span className="text-neutral-500 block text-[10px] uppercase">Cargo / Goods</span>
              <strong className="text-[#1a1f1b] text-xs">{formData.goods}</strong>
            </div>
            <div>
              <span className="text-neutral-500 block text-[10px] uppercase">Weight</span>
              <strong className="text-[#1a1f1b] text-xs">{formData.weight || 'Flexible'}</strong>
            </div>
            <div>
              <span className="text-neutral-500 block text-[10px] uppercase">Contact Number</span>
              <strong className="text-[#1a1f1b] font-['Space_Mono'] text-xs">
                {formData.phone}
              </strong>
            </div>
          </div>
          {liveEstimate && (
            <div className="mt-2 pt-2 border-t border-[#e2dad0] flex items-center justify-between text-xs">
              <span className="text-neutral-500">Estimated Tariff Range:</span>
              <strong className="text-[#0B3A66] font-['Space_Mono'] font-bold">
                {liveEstimate.priceFormatted}
              </strong>
            </div>
          )}
        </div>

        {/* Response Promise Callout */}
        <div className="bg-[#EBF2F9] border border-[#0B3A66]/30 rounded-2xl p-4 max-w-lg mx-auto flex items-center gap-3 text-left">
          <Clock size={22} className="text-[#0B3A66] shrink-0" />
          <p className="font-['Manrope'] text-xs text-[#071F35] leading-snug">
            <strong>Fast Dispatch Response:</strong> Our booking desk reviews vehicle availability and calculates binding route tariffs within <strong>60 minutes</strong> during working hours.
          </p>
        </div>

        {/* Direct Call to Dispatch */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2 max-w-md mx-auto">
          <a
            href="tel:+919784800833"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#0B3A66] text-white font-['Manrope'] font-bold text-xs uppercase tracking-wider shadow-md hover:bg-[#072442] transition-colors"
          >
            <PhoneCall size={16} className="text-[#F5B51B]" />
            <span>Call Dispatch Now</span>
          </a>
          <button
            onClick={() => {
              setFormData({
                pickup: '',
                drop: '',
                goods: '',
                weight: '',
                materialValue: '',
                loadType: 'Full Load (FTL)',
                truck: 'Not sure',
                customTruck: '',
                date: '',
                name: '',
                phone: '',
                company: '',
                gst: '',
              });
              setSubmitted(false);
              setDeclared(false);
            }}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-[#c5beb4] font-['Manrope'] font-bold text-xs uppercase tracking-wider text-[#3d4a3f] hover:bg-[#f4f0ea] transition-colors"
          >
            Book Another Route
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-lg bg-[#EBF2F9] flex items-center justify-center text-[#0B3A66]">
          {isParcel ? <Package size={18} /> : <Truck size={18} />}
        </div>
        <p className="font-['Manrope'] text-[10px] font-bold text-[#6b786d] uppercase tracking-widest">
          {isParcel ? 'Parcel & Package Booking' : 'Freight & Truck Booking'}
        </p>
      </div>
      <h2 className="font-['Archivo_Narrow'] text-2xl md:text-3xl font-bold mb-4 uppercase text-[#1a1f1b]">
        {isParcel ? 'Book a Parcel (0 - 150 kg)' : 'Book Freight / Truck'}
      </h2>

      {/* Service Type Switcher Tabs */}
      <div className="mb-5">
        <label className={labelClass}>Select Booking Service</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handleLoadTypeChange('Full Load (FTL)')}
            className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
              formData.loadType === 'Full Load (FTL)'
                ? 'bg-[#0B3A66] border-[#0B3A66] text-white shadow-sm'
                : 'bg-[#f4f0ea] border-[#e2dad0] text-[#3d4a3f] hover:bg-[#eae3d9]'
            }`}
          >
            <div className="flex items-center justify-between w-full mb-1">
              <span className="font-['Archivo_Narrow'] font-bold text-xs uppercase">
                Full Load (FTL)
              </span>
              <Truck
                size={15}
                className={formData.loadType === 'Full Load (FTL)' ? 'text-white' : 'text-[#0B3A66]'}
              />
            </div>
            <span
              className={`text-[10px] font-['Manrope'] ${
                formData.loadType === 'Full Load (FTL)' ? 'text-[#cbe8d5]' : 'text-neutral-500'
              }`}
            >
              Full dedicated truck
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleLoadTypeChange('Part Load (PTL)')}
            className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
              formData.loadType === 'Part Load (PTL)'
                ? 'bg-[#0B3A66] border-[#0B3A66] text-white shadow-sm'
                : 'bg-[#f4f0ea] border-[#e2dad0] text-[#3d4a3f] hover:bg-[#eae3d9]'
            }`}
          >
            <div className="flex items-center justify-between w-full mb-1">
              <span className="font-['Archivo_Narrow'] font-bold text-xs uppercase">
                Part Load (PTL)
              </span>
              <Truck
                size={15}
                className={formData.loadType === 'Part Load (PTL)' ? 'text-white' : 'text-[#0B3A66]'}
              />
            </div>
            <span
              className={`text-[10px] font-['Manrope'] ${
                formData.loadType === 'Part Load (PTL)' ? 'text-[#cbe8d5]' : 'text-neutral-500'
              }`}
            >
              Shared truck space
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleLoadTypeChange('Book a Parcel (0 to 150 kg)')}
            className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
              formData.loadType === 'Book a Parcel (0 to 150 kg)'
                ? 'bg-[#0B3A66] border-[#0B3A66] text-white shadow-sm'
                : 'bg-[#f4f0ea] border-[#e2dad0] text-[#3d4a3f] hover:bg-[#eae3d9]'
            }`}
          >
            <div className="flex items-center justify-between w-full mb-1">
              <span className="font-['Archivo_Narrow'] font-bold text-xs uppercase">
                Parcel (0-150 kg)
              </span>
              <Package
                size={15}
                className={
                  formData.loadType === 'Book a Parcel (0 to 150 kg)'
                    ? 'text-white'
                    : 'text-[#0B3A66]'
                }
              />
            </div>
            <span
              className={`text-[10px] font-['Manrope'] ${
                formData.loadType === 'Book a Parcel (0 to 150 kg)'
                  ? 'text-[#cbe8d5]'
                  : 'text-neutral-500'
              }`}
            >
              Box &amp; carton courier
            </span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Row 1: Pickup and Drop Locations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field
            label="Pickup Location / City"
            name="pickup"
            value={formData.pickup}
            onChange={handleChange}
            placeholder="e.g. Jaipur, Rajasthan"
            required
            error={errors.pickup}
          />
          <Field
            label="Drop Location / City"
            name="drop"
            value={formData.drop}
            onChange={handleChange}
            placeholder="e.g. Delhi NCR, Mumbai, Ahmedabad"
            required
            error={errors.drop}
          />
        </div>

        {/* Live Estimated Price Card */}
        {liveEstimate && (
          <div className="bg-[#EBF2F9] border border-[#85B7EB]/60 rounded-2xl p-4 transition-all duration-300 shadow-sm animate-fadeIn">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-[#0B3A66]" />
                <span className="font-['Manrope'] font-bold text-xs uppercase tracking-wider text-[#0B3A66]">
                  Estimated Rate Range
                </span>
              </div>
              <span className="font-['Space_Mono'] font-bold text-base text-[#071F35] bg-white px-3 py-1 rounded-xl border border-[#85B7EB]/40 shadow-xs">
                {liveEstimate.priceFormatted}
              </span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-neutral-600 font-['Manrope'] mt-2">
              <span>Distance: ~{liveEstimate.distanceKm} km</span>
              <span>•</span>
              <span>Transit: {liveEstimate.transitTime}</span>
            </div>
            <p className="text-[10px] text-neutral-500 font-['Manrope'] mt-1">
              *Indicative corridor tariff. Binding quote provided by dispatch team after reviewing cargo specs.
            </p>
          </div>
        )}

        {/* Row 2: Customer Name & Phone Number */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field
            label="Your Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Rajesh Sharma"
            required
            error={errors.name}
          />
          <Field
            label="10-Digit Mobile Number"
            name="phone"
            type="tel"
            inputMode="numeric"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. 9829012345"
            required
            error={errors.phone}
          />
        </div>

        {/* Row 3: Goods Description & Weight */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field
            label={isParcel ? 'Parcel Contents' : 'Goods / Cargo Details'}
            name="goods"
            value={formData.goods}
            onChange={handleChange}
            placeholder={
              isParcel
                ? 'e.g. Auto Spare Parts, Garments, Documents'
                : 'e.g. Marble, Steel Pipes, Tiles, FMCG'
            }
            required
            error={errors.goods}
          />
          <Field
            label={isParcel ? 'Approx Weight (kg) [Max 150 kg]' : 'Approx Weight (Tons/Kg)'}
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            placeholder={isParcel ? 'e.g. 25 kg' : 'e.g. 7 Tons, 12 Tons'}
            error={errors.weight}
          />
        </div>

        {/* Collapsible Accordion: Additional Cargo & Billing Details */}
        <div className="border border-[#e2dad0] rounded-2xl overflow-hidden bg-white/70">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full px-4 py-3 bg-[#f8f5f0] hover:bg-[#f1ebe2] text-left flex items-center justify-between text-xs font-['Manrope'] font-bold uppercase tracking-wider text-[#3d4a3f] transition-colors"
          >
            <div className="flex items-center gap-2">
              <span>Additional Details (Vehicle, Date, GSTIN)</span>
              <span className="text-[10px] text-neutral-500 normal-case font-normal">
                (Optional)
              </span>
            </div>
            {showAdvanced ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {showAdvanced && (
            <div className="p-4 space-y-4 border-t border-[#e2dad0] bg-white">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="Vehicle Preference"
                  name="truck"
                  value={formData.truck}
                  onChange={handleChange}
                >
                  <select
                    id="truck"
                    name="truck"
                    value={formData.truck}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    {isParcel ? (
                      <>
                        <option value="Parcel Express / Small Courier Van">
                          Parcel Express / Small Courier Van (0–150 kg)
                        </option>
                        <option value="Pickup / Bolero Maxi (Intra-State)">
                          Pickup / Bolero Maxi (Intra-State)
                        </option>
                      </>
                    ) : (
                      <>
                        <option value="Not sure">Not sure (Recommend best truck for me)</option>
                        <option value="14 Feet (Tata 407 / Eicher) - 4 Tons">
                          14 Feet (Tata 407 / Eicher) — 4 Tons
                        </option>
                        <option value="17 Feet (Eicher Pro) - 6.5 Tons">
                          17 Feet (Eicher Pro) — 6.5 Tons
                        </option>
                        <option value="19-22 Feet Open Truck - 7-9 Tons">
                          19-22 Feet Open Truck — 7–9 Tons
                        </option>
                        <option value="32 Feet Single Axle Container - 7.5 Tons">
                          32 Feet Container (Single Axle) — 7.5 Tons
                        </option>
                        <option value="32 Feet Multi Axle Container - 14 Tons">
                          32 Feet Container (Multi Axle) — 14 Tons
                        </option>
                        <option value="Taurus (10-12 Wheeler) - 16-25 Tons">
                          Taurus 10/12 Wheeler — 16–25 Tons
                        </option>
                        <option value="Trailer (40-50 Feet Heavy) - 30+ Tons">
                          Trailer (40–50 ft Heavy) — 30+ Tons
                        </option>
                        <option value="Other">Other (Specify manually)</option>
                      </>
                    )}
                  </select>
                </Field>

                <Field
                  label="Preferred Pickup Date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>

              {formData.truck === 'Other' && (
                <Field
                  label="Specify Vehicle Type"
                  name="customTruck"
                  value={formData.customTruck}
                  onChange={handleChange}
                  placeholder="e.g. 24ft Open Taurus, Reefer Cold Truck"
                  error={errors.customTruck}
                />
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="Company / Firm Name"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="e.g. Shree Krishna Industries"
                />
                <Field
                  label="GST Number (GSTIN)"
                  name="gst"
                  value={formData.gst}
                  onChange={handleChange}
                  placeholder="e.g. 08AAAAA0000A1Z5"
                  error={errors.gst}
                />
              </div>

              <Field
                label="Approx Material Value (INR)"
                name="materialValue"
                value={formData.materialValue}
                onChange={handleChange}
                placeholder="e.g. ₹5,00,000 (used for transit insurance allocation)"
              />
            </div>
          )}
        </div>

        {/* Simplified Declaration Checkbox */}
        <div className="pt-1">
          <label className="flex items-start gap-2.5 cursor-pointer text-xs font-['Manrope'] text-[#3d4a3f] select-none">
            <input
              type="checkbox"
              checked={declared}
              onChange={(e) => {
                setDeclared(e.target.checked);
                if (errors.declaration) setErrors((prev) => ({ ...prev, declaration: '' }));
              }}
              className="mt-0.5 w-4 h-4 rounded border-[#c5beb4] text-[#0B3A66] focus:ring-[#0B3A66]"
            />
            <span>
              I confirm the shipment details are accurate and agree to the{' '}
              <Link to="/terms-and-conditions" className="text-[#0B3A66] font-bold underline">
                Terms &amp; Conditions
              </Link>
              .
            </span>
          </label>
          {errors.declaration && (
            <p className="mt-1 text-[11px] font-['Manrope'] font-bold text-red-600 flex items-center gap-1">
              <AlertCircle size={12} className="shrink-0" />
              <span>{errors.declaration}</span>
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2.5 bg-[#F5B51B] hover:bg-[#E0A212] text-[#071F35] font-['Manrope'] font-extrabold text-sm uppercase tracking-wider py-4 rounded-2xl shadow-md hover:shadow-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed group cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin text-[#071F35]" />
                <span>Submitting Booking Request...</span>
              </>
            ) : (
              <>
                <span>Submit Booking Request</span>
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1 text-[#071F35]"
                />
              </>
            )}
          </button>

          <p className="text-[11px] text-center text-neutral-500 font-['Manrope'] mt-2 flex items-center justify-center gap-1.5">
            <ShieldCheck size={14} className="text-[#0B3A66]" />
            <span>100% verified vehicle partners • Direct quote within 60 minutes</span>
          </p>
        </div>
      </form>
    </div>
  );
};
