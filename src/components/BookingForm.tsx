import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { sendAutomatedForm } from '../lib/whatsapp';
import { Truck, Loader2, CheckCircle2, ArrowRight, ArrowLeft, AlertCircle, Clock, Package, Sparkles } from 'lucide-react';

type LoadingStep = 'idle' | 'checking' | 'matching' | 'preparing' | 'done';

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

const Field: React.FC<FieldProps> = ({ label, name, value, onChange, placeholder, type = 'text', required, inputMode, error, children }) => (
  <div>
    <label htmlFor={name} className={labelClass}>
      {label}{required && <span className="text-[#0F6A37] ml-0.5">*</span>}
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
        className={`${inputClass} ${error ? 'border-red-500 bg-red-50/40 focus:border-red-600 focus:ring-red-500/20' : ''}`}
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
const validateGST = (gst: string) => !gst || /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/i.test(gst.trim());

// Helper to parse weight in kg for parcel validation (0 - 150 kg)
const validateParcelWeight = (weightStr: string): { valid: boolean; error?: string } => {
  if (!weightStr || !weightStr.trim()) {
    return { valid: false, error: 'Please enter parcel weight (0.1 to 150 kg)' };
  }
  const clean = weightStr.trim().toLowerCase();
  
  if (clean.includes('ton') || clean.includes('tonne')) {
    return { valid: false, error: 'Parcel limit is 150 kg max. For tons, please select Full Load (FTL) or Part Load (PTL).' };
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
    return { valid: false, error: `Weight is ${weightVal} kg. Parcel limit is 150 kg max. Please switch to Part Load (PTL) or Full Load.` };
  }
  
  return { valid: true };
};

export const BookingForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const isInitialParcel = searchParams.get('type') === 'parcel' || searchParams.get('service') === 'parcel';

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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loadingStep, setLoadingStep] = useState<LoadingStep>('idle');
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
      truck: newLoadType === 'Book a Parcel (0 to 150 kg)' ? 'Parcel Express / Small Courier Van' : (prev.truck.includes('Parcel') ? 'Not sure' : prev.truck),
      weight: newLoadType === 'Book a Parcel (0 to 150 kg)' && prev.weight.includes('ton') ? '' : prev.weight,
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

  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!validateLocation(formData.pickup)) {
      newErrors.pickup = 'Enter a valid Pickup city/location (e.g. Jaipur)';
    }
    if (!validateLocation(formData.drop)) {
      newErrors.drop = 'Enter a valid Drop city/location (e.g. Jodhpur)';
    }
    if (!validateGoodsType(formData.goods)) {
      newErrors.goods = isParcel
        ? 'Enter parcel contents (e.g. Spare Parts, Documents, Box/Carton, Samples)'
        : 'Enter a valid Goods Type (e.g. Marble, Steel, Cement)';
    }

    // Strict validation for parcel weight limit
    if (isParcel) {
      const weightCheck = validateParcelWeight(formData.weight);
      if (!weightCheck.valid) {
        newErrors.weight = weightCheck.error || 'Parcel weight must be between 0 and 150 kg';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!validateName(formData.name)) {
      newErrors.name = 'Enter a valid full name (at least 3 letters)';
    }
    if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Enter a valid 10-digit mobile number starting with 6-9';
    }
    if (formData.truck === 'Other' && (!formData.customTruck || formData.customTruck.trim().length < 2)) {
      newErrors.customTruck = 'Please specify your vehicle type';
    }
    if (formData.gst && !validateGST(formData.gst)) {
      newErrors.gst = 'Enter a valid 15-character GSTIN format (e.g. 08AAAAA0000A1Z5)';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep1()) {
      setCurrentStep(1);
      return;
    }
    if (!validateStep2()) {
      return;
    }

    setLoadingStep('checking');
    setTimeout(() => setLoadingStep('matching'), 400);
    setTimeout(() => setLoadingStep('preparing'), 800);

    const payload: Record<string, string> = {
      'Booking Type': isParcel ? 'Parcel Booking (0–150 kg)' : 'Freight Truck Booking',
      'Pickup Location': formData.pickup,
      'Drop Location': formData.drop,
      'Goods / Cargo Details': formData.goods,
      'Loading Type': formData.loadType,
      'Weight': formData.weight ? (isParcel && !formData.weight.toLowerCase().includes('kg') ? `${formData.weight} kg` : formData.weight) : 'N/A',
    };

    if (formData.materialValue) {
      payload['Est. Material Value'] = formData.materialValue;
    }

    payload['Vehicle Preference'] = formData.truck === 'Other' ? (formData.customTruck || 'Other') : formData.truck;
    payload['Pickup Date'] = formData.date || 'Flexible / Urgent';
    payload['Customer Name'] = formData.name;
    payload['Mobile Number'] = formData.phone;

    if (formData.company) {
      payload['Company Name'] = formData.company;
    }
    if (formData.gst) {
      payload['GST Number'] = formData.gst;
    }

    const emailSubject = isParcel
      ? 'SHREE KRISHNA TRANSPORT — NEW PARCEL BOOKING (0–150 KG)'
      : 'SHREE KRISHNA TRANSPORT — NEW TRUCK BOOKING';

    await sendAutomatedForm(emailSubject, payload);

    setRefId(isParcel ? 'SKT-PCL-' + Math.floor(10000 + Math.random() * 90000) : 'SKT-BK-' + Math.floor(10000 + Math.random() * 90000));
    setLoadingStep('done');
  };

  const isLoading = loadingStep !== 'idle' && loadingStep !== 'done';

  if (loadingStep === 'done') {
    return (
      <div className="bg-white border border-[#c5beb4] rounded-2xl p-6 sm:p-10 shadow-lg text-center space-y-6 animate-fadeIn">
        <div className="w-16 h-16 rounded-full bg-[#EBF5EE] border border-[#0F6A37]/30 flex items-center justify-center text-[#0F6A37] mx-auto">
          <CheckCircle2 size={36} />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0F6A37]/10 border border-[#0F6A37]/30 text-[#0F6A37] font-['Space_Mono'] text-xs font-bold">
            <span>Reference ID: {refId}</span>
          </div>
          <h2 className="font-['Archivo_Narrow'] text-2xl sm:text-3xl font-bold uppercase text-[#1a1f1b]">
            {isParcel ? 'Parcel Booking Request Received!' : 'Booking Request Received!'}
          </h2>
          <p className="font-['Manrope'] text-xs sm:text-sm text-[#4A554C] max-w-md mx-auto">
            Thank you, <strong className="text-[#1a1f1b]">{formData.name}</strong>. Your {isParcel ? 'parcel consignment' : 'freight booking'} request has been submitted directly to our dispatch desk via email.
          </p>
        </div>

        {/* Summary Box */}
        <div className="bg-[#f9f6f2] border border-[#e2dad0] rounded-xl p-4 text-left max-w-lg mx-auto space-y-2.5 font-['Manrope'] text-xs text-[#3d4a3f]">
          <div className="font-['Archivo_Narrow'] text-xs font-bold text-[#1a1f1b] uppercase tracking-wider border-b border-[#e2dad0] pb-1.5 flex items-center justify-between">
            <span>{isParcel ? 'Parcel Booking Summary' : 'Booking Request Summary'}</span>
            <span className="text-[#0F6A37] font-['Space_Mono'] font-bold text-[11px]">{formData.loadType}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div><span className="text-neutral-500">Route:</span> <strong className="text-[#1a1f1b] block font-['Space_Mono']">{formData.pickup} → {formData.drop}</strong></div>
            <div><span className="text-neutral-500">{isParcel ? 'Parcel Items:' : 'Goods Type:'}</span> <strong className="text-[#1a1f1b] block">{formData.goods}</strong></div>
            <div><span className="text-neutral-500">Weight:</span> <strong className="text-[#1a1f1b] block">{formData.weight || 'Standard'}</strong></div>
            <div><span className="text-neutral-500">Contact Number:</span> <strong className="text-[#1a1f1b] block font-['Space_Mono']">{formData.phone}</strong></div>
          </div>
        </div>

        {/* Response Promise Callout */}
        <div className="bg-[#EBF5EE] border border-[#0F6A37]/30 rounded-xl p-4 max-w-lg mx-auto flex items-center gap-3 text-left">
          <Clock size={20} className="text-[#0F6A37] shrink-0" />
          <p className="font-['Manrope'] text-xs text-[#134E3A] leading-snug">
            <strong>1-Hour Response Promise:</strong> Our dispatch team is reviewing your route &amp; {isParcel ? 'parcel capacity' : 'vehicle availability'}. We will contact you at <span className="font-['Space_Mono'] font-bold">{formData.phone}</span> within 60 minutes with the best rate.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2 max-w-md mx-auto">
          <button
            onClick={() => {
              setFormData({ pickup: '', drop: '', goods: '', weight: '', materialValue: '', loadType: 'Full Load (FTL)', truck: 'Not sure', customTruck: '', date: '', name: '', phone: '', company: '', gst: '' });
              setCurrentStep(1);
              setLoadingStep('idle');
              setDeclared(false);
            }}
            className="btn-brand justify-center py-3 px-6 text-xs uppercase tracking-wider"
          >
            Book Another Shipment
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-[#c5beb4] font-['Manrope'] font-bold text-xs uppercase tracking-wider text-[#3d4a3f] hover:bg-[#f4f0ea] transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-lg bg-[#EBF5EE] flex items-center justify-center text-[#0F6A37]">
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
                ? 'bg-[#0F6A37] border-[#0F6A37] text-white shadow-sm'
                : 'bg-[#f4f0ea] border-[#e2dad0] text-[#3d4a3f] hover:bg-[#eae3d9]'
            }`}
          >
            <div className="flex items-center justify-between w-full mb-1">
              <span className="font-['Archivo_Narrow'] font-bold text-xs uppercase">Full Load (FTL)</span>
              <Truck size={15} className={formData.loadType === 'Full Load (FTL)' ? 'text-white' : 'text-[#0F6A37]'} />
            </div>
            <span className={`text-[10px] font-['Manrope'] ${formData.loadType === 'Full Load (FTL)' ? 'text-[#cbe8d5]' : 'text-neutral-500'}`}>
              Full dedicated truck
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleLoadTypeChange('Part Load (PTL)')}
            className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
              formData.loadType === 'Part Load (PTL)'
                ? 'bg-[#0F6A37] border-[#0F6A37] text-white shadow-sm'
                : 'bg-[#f4f0ea] border-[#e2dad0] text-[#3d4a3f] hover:bg-[#eae3d9]'
            }`}
          >
            <div className="flex items-center justify-between w-full mb-1">
              <span className="font-['Archivo_Narrow'] font-bold text-xs uppercase">Part Load (PTL)</span>
              <Truck size={15} className={formData.loadType === 'Part Load (PTL)' ? 'text-white' : 'text-[#0F6A37]'} />
            </div>
            <span className={`text-[10px] font-['Manrope'] ${formData.loadType === 'Part Load (PTL)' ? 'text-[#cbe8d5]' : 'text-neutral-500'}`}>
              Shared truck space
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleLoadTypeChange('Book a Parcel (0 to 150 kg)')}
            className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between relative overflow-hidden ${
              formData.loadType === 'Book a Parcel (0 to 150 kg)'
                ? 'bg-[#0F6A37] border-[#0F6A37] text-white shadow-sm'
                : 'bg-[#f4f0ea] border-[#e2dad0] text-[#3d4a3f] hover:bg-[#eae3d9]'
            }`}
          >
            <div className="flex items-center justify-between w-full mb-1">
              <span className="font-['Archivo_Narrow'] font-bold text-xs uppercase flex items-center gap-1">
                <span>Book a Parcel</span>
                <span className={`text-[9px] px-1.5 py-0.2 rounded font-['Space_Mono'] font-bold ${
                  formData.loadType === 'Book a Parcel (0 to 150 kg)' ? 'bg-[#F4B400] text-[#6c5000]' : 'bg-[#0F6A37]/15 text-[#0F6A37]'
                }`}>
                  0-150 KG
                </span>
              </span>
              <Package size={15} className={formData.loadType === 'Book a Parcel (0 to 150 kg)' ? 'text-[#F4B400]' : 'text-[#0F6A37]'} />
            </div>
            <span className={`text-[10px] font-['Manrope'] ${formData.loadType === 'Book a Parcel (0 to 150 kg)' ? 'text-[#cbe8d5]' : 'text-neutral-500'}`}>
              Boxes, cartons &amp; small parcels
            </span>
          </button>
        </div>
      </div>

      {/* Parcel Notice Banner */}
      {isParcel && (
        <div className="mb-5 bg-[#EBF5EE] border border-[#0F6A37]/30 rounded-xl p-3.5 flex items-start gap-2.5 animate-fadeIn">
          <Sparkles size={16} className="text-[#0F6A37] shrink-0 mt-0.5" />
          <div className="font-['Manrope'] text-xs text-[#134E3A] leading-relaxed">
            <strong className="text-[#0F6A37]">Parcel Service (0 to 150 kg):</strong> Ideal for boxes, machine parts, commercial samples, carton packs, and urgent small shipments across Rajasthan &amp; All-India.
          </div>
        </div>
      )}

      {/* 2-Step Progress Indicator */}
      <div className="flex items-center gap-3 mb-6 bg-[#f4f0ea] p-1.5 rounded-xl border border-[#e2dad0]">
        <button
          type="button"
          onClick={() => setCurrentStep(1)}
          className={`flex-1 py-2 px-3 rounded-lg font-['Manrope'] text-xs font-extrabold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
            currentStep === 1
              ? 'bg-[#0F6A37] text-white shadow-sm'
              : 'text-[#5a665c] hover:text-[#1a1f1b]'
          }`}
        >
          <span className={`w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-bold ${currentStep === 1 ? 'bg-white text-[#0F6A37]' : 'bg-[#e2dad0] text-[#5a665c]'}`}>
            1
          </span>
          <span>1. Pickup &amp; {isParcel ? 'Parcel Info' : 'Goods'}</span>
        </button>

        <button
          type="button"
          onClick={() => {
            if (validateStep1()) {
              setCurrentStep(2);
            }
          }}
          className={`flex-1 py-2 px-3 rounded-lg font-['Manrope'] text-xs font-extrabold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
            currentStep === 2
              ? 'bg-[#0F6A37] text-white shadow-sm'
              : 'text-[#5a665c] hover:text-[#1a1f1b]'
          }`}
        >
          <span className={`w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-bold ${currentStep === 2 ? 'bg-white text-[#0F6A37]' : 'bg-[#e2dad0] text-[#5a665c]'}`}>
            2
          </span>
          <span>2. {isParcel ? 'Delivery & Contact' : 'Vehicle & Contact'}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* STEP 1: Pickup, Drop, Goods Type, Approx Weight, Material Value, Load Type */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Pickup Location" name="pickup" value={formData.pickup} onChange={handleChange} placeholder="E.G., JAIPUR" required error={errors.pickup} />
              <Field label="Drop Location" name="drop" value={formData.drop} onChange={handleChange} placeholder="E.G., JODHPUR" required error={errors.drop} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field
                label={isParcel ? 'Parcel Contents / Items' : 'Goods Type'}
                name="goods"
                value={formData.goods}
                onChange={handleChange}
                placeholder={isParcel ? 'E.G., CARTON BOXES, MACHINE PARTS, CLOTH BUNDLE' : 'E.G., MARBLE, CEMENT, MACHINERY'}
                required
                error={errors.goods}
              />
              <Field label="Service / Loading Type" name="loadType" value={formData.loadType} onChange={handleChange}>
                <select id="loadType" name="loadType" value={formData.loadType} onChange={handleChange} className={inputClass}>
                  <option value="Full Load (FTL)">Full Load (FTL) — Dedicated Truck</option>
                  <option value="Part Load (PTL)">Part Load (PTL) — Shared Space</option>
                  <option value="Book a Parcel (0 to 150 kg)">Book a Parcel (0 to 150 kg) — Small Consignments</option>
                </select>
              </Field>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field
                label={isParcel ? 'Parcel Weight (Limit: 0 to 150 kg)' : 'Approx Weight'}
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder={isParcel ? 'E.G., 25 KG (MAX 150 KG)' : 'E.G., 5 TON / 10 TON'}
                required={isParcel}
                error={errors.weight}
              />
              <Field label="Est. Material Value (Optional)" name="materialValue" value={formData.materialValue} onChange={handleChange} placeholder="E.G., ₹25,000" />
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="btn-brand w-full justify-center py-4 text-sm mt-4 uppercase tracking-wider"
            >
              <span>Next: {isParcel ? 'Delivery & Contact Details' : 'Vehicle & Contact Details'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* STEP 2: Truck Type, Pickup Date, Name, Mobile, Company (Optional), GST (Optional) */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label={isParcel ? 'Preferred Transport / Vehicle' : 'Truck Type'} name="truck" value={formData.truck} onChange={handleChange}>
                <select id="truck" name="truck" value={formData.truck} onChange={handleChange} className={inputClass}>
                  {isParcel ? (
                    <>
                      <option value="Parcel Express / Small Courier Van">Parcel Express / Small Courier Van</option>
                      <option value="Mini Truck / 3-Wheeler / Tata Ace">Mini Truck / 3-Wheeler / Tata Ace</option>
                      <option value="Not sure (Auto-assign best vehicle)">Not sure (Auto-assign best vehicle)</option>
                      <option value="Other">Other (Specify below)</option>
                    </>
                  ) : (
                    <>
                      <option value="Not sure">Not sure</option>
                      <option value="Mini Truck / Pickup">Mini Truck / Pickup</option>
                      <option value="Tata 407 / 14 ft">Tata 407 / 14 ft</option>
                      <option value="17–20 ft Container">17–20 ft Container</option>
                      <option value="22–24 ft Container">22–24 ft Container</option>
                      <option value="32 ft MXL / Multi-Axle">32 ft MXL / Multi-Axle</option>
                      <option value="Open Body Trailer">Open Body Trailer</option>
                      <option value="Other">Other (Specify below)</option>
                    </>
                  )}
                </select>
              </Field>
              <Field label="Pickup Date" name="date" type="date" value={formData.date} onChange={handleChange} />
            </div>

            {formData.truck === 'Other' && (
              <div>
                <Field label="Specify Vehicle Type" name="customTruck" value={formData.customTruck || ''} onChange={handleChange} placeholder="ENTER YOUR VEHICLE PREFERENCE" required error={errors.customTruck} />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Your Name" name="name" value={formData.name} onChange={handleChange} placeholder="FULL NAME" required error={errors.name} />
              <Field label="Mobile Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="10-DIGIT WHATSAPP NUMBER" inputMode="tel" required error={errors.phone} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Company Name (Optional)" name="company" value={formData.company} onChange={handleChange} placeholder="COMPANY OR FIRM NAME" />
              <Field label="GST Number (Optional)" name="gst" value={formData.gst} onChange={handleChange} placeholder="E.G., 08AAAAA0000A1Z5" error={errors.gst} />
            </div>

            {/* Loading status */}
            {isLoading && (
              <div className="bg-[#EBF5EE] border border-[#b8c9bb] rounded-lg px-4 py-3 flex flex-col gap-2">
                <div className="flex items-center gap-2.5 font-['Manrope'] text-xs font-bold text-[#0F6A37]">
                  <Loader2 size={16} className="spinner text-[#0F6A37]" />
                  <span>Submitting {isParcel ? 'parcel' : 'booking'} request to dispatch desk...</span>
                </div>
              </div>
            )}

            <label className="flex items-start gap-3 p-4 rounded-xl border border-[#e2dad0] bg-[#f9f6f2] cursor-pointer hover:border-[#0F6A37] transition-colors">
              <input
                type="checkbox"
                checked={declared}
                onChange={(e) => setDeclared(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-[#0F6A37] focus:ring-[#0F6A37] shrink-0"
              />
              <div className="font-['Manrope'] text-xs text-[#3d4a3f] leading-relaxed space-y-1">
                <p className="font-bold text-[#1a1f1b]">I confirm that:</p>
                <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                  <li>Shipment &amp; weight details are accurate.</li>
                  <li>Goods / parcels are legal for transportation.</li>
                  <li>Applicable invoice / GST / documentation requirements are fulfilled.</li>
                  <li>
                    I agree to the{' '}
                    <Link to="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="text-[#0F6A37] underline font-bold">Terms &amp; Conditions</Link>{' '}and{' '}
                    <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#0F6A37] underline font-bold">Privacy Policy</Link>.
                  </li>
                </ul>
              </div>
            </label>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg border-2 border-[#d0c8be] hover:border-[#1a1f1b] font-[#Manrope] font-bold text-xs uppercase tracking-wider text-[#3d4a3f] transition-all"
              >
                <ArrowLeft size={16} />
                <span>Back to Step 1</span>
              </button>

              <button
                type="submit"
                disabled={isLoading || !declared}
                className="btn-brand flex-1 justify-center py-4 text-sm disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none uppercase tracking-wider"
              >
                {isLoading ? <Loader2 size={16} className="spinner" /> : (isParcel ? <Package size={16} /> : <Truck size={16} />)}
                {isLoading ? 'Submitting...' : (isParcel ? 'Submit Parcel Booking (0-150 kg)' : 'Submit Booking Request')}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

