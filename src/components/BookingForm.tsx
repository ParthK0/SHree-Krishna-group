import React, { useState } from 'react';
import { sendAutomatedForm, sendWhatsAppMessage } from '../lib/whatsapp';
import { Truck, Loader2, CheckCircle2, MessageCircle, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';

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

const stepMessages: Record<LoadingStep, string> = {
  idle: '',
  checking: 'Checking available trucks...',
  matching: 'Sending booking details to dispatcher...',
  preparing: 'Sending notification to email...',
  done: '',
};

const stepIcons: Partial<Record<LoadingStep, React.ReactNode>> = {
  checking: <Loader2 size={16} className="spinner text-[#0F6A37]" />,
  matching: <CheckCircle2 size={16} className="text-[#0F6A37]" />,
  preparing: <CheckCircle2 size={16} className="text-[#0F6A37]" />,
};

// Validation helpers
const validatePhone = (phone: string) => /^[6-9]\d{9}$/.test(phone.trim());
const validateName = (name: string) => /^[a-zA-Z\s\.]{3,50}$/.test(name.trim());
const validateLocation = (loc: string) => loc.trim().length >= 2 && /[a-zA-Z]/.test(loc);
const validateGoodsType = (goods: string) => goods.trim().length >= 2 && /[a-zA-Z]/.test(goods);
const validateGST = (gst: string) => !gst || /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/i.test(gst.trim());

export const BookingForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loadingStep, setLoadingStep] = useState<LoadingStep>('idle');
  const [waUrl, setWaUrl] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
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
      newErrors.goods = 'Enter a valid Goods Type (e.g. Marble, Steel, Cement)';
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
      'Pickup Location': formData.pickup,
      'Drop Location': formData.drop,
      'Goods Type': formData.goods,
      'Loading Type': formData.loadType,
      'Approx Weight': formData.weight || 'N/A',
    };

    if (formData.materialValue) {
      payload['Est. Material Value'] = formData.materialValue;
    }

    payload['Truck Type'] = formData.truck === 'Other' ? (formData.customTruck || 'Other') : formData.truck;
    payload['Pickup Date'] = formData.date || 'Flexible';
    payload['Customer Name'] = formData.name;
    payload['Mobile Number'] = formData.phone;

    if (formData.company) {
      payload['Company Name'] = formData.company;
    }
    if (formData.gst) {
      payload['GST Number'] = formData.gst;
    }

    const result = await sendAutomatedForm('SHREE KRISHNA TRANSPORT — NEW BOOKING', payload);

    setWaUrl(result.waUrl);
    setLoadingStep('done');

    sendWhatsAppMessage('SHREE KRISHNA TRANSPORT — NEW BOOKING', payload);
  };

  const isLoading = loadingStep !== 'idle' && loadingStep !== 'done';

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-lg bg-[#EBF5EE] flex items-center justify-center text-[#0F6A37]">
          <Truck size={18} />
        </div>
        <p className="font-['Manrope'] text-[10px] font-bold text-[#6b786d] uppercase tracking-widest">Truck Booking</p>
      </div>
      <h2 className="font-['Archivo_Narrow'] text-2xl md:text-3xl font-bold mb-4 uppercase text-[#1a1f1b]">
        Book a Truck
      </h2>

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
          <span>1. Pickup &amp; Goods</span>
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
          <span>2. Vehicle &amp; Contact</span>
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
              <Field label="Goods Type" name="goods" value={formData.goods} onChange={handleChange} placeholder="E.G., MARBLE, CEMENT, MACHINERY" required error={errors.goods} />
              <Field label="Loading Type" name="loadType" value={formData.loadType} onChange={handleChange}>
                <select id="loadType" name="loadType" value={formData.loadType} onChange={handleChange} className={inputClass}>
                  <option value="Full Load (FTL)">Full Load (FTL)</option>
                  <option value="Part Load (PTL)">Part Load (PTL)</option>
                </select>
              </Field>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Approx Weight" name="weight" value={formData.weight} onChange={handleChange} placeholder="E.G., 5 TON / 10 TON" />
              <Field label="Est. Material Value (Optional)" name="materialValue" value={formData.materialValue} onChange={handleChange} placeholder="E.G., ₹2 LAKH" />
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="btn-brand w-full justify-center py-4 text-sm mt-4 uppercase tracking-wider"
            >
              <span>Next: Vehicle &amp; Contact Details</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* STEP 2: Truck Type, Pickup Date, Name, Mobile, Company (Optional), GST (Optional) */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Truck Type" name="truck" value={formData.truck} onChange={handleChange}>
                <select id="truck" name="truck" value={formData.truck} onChange={handleChange} className={inputClass}>
                  <option value="Not sure">Not sure</option>
                  <option value="Mini Truck / Pickup">Mini Truck / Pickup</option>
                  <option value="Tata 407 / 14 ft">Tata 407 / 14 ft</option>
                  <option value="17–20 ft Container">17–20 ft Container</option>
                  <option value="22–24 ft Container">22–24 ft Container</option>
                  <option value="32 ft MXL / Multi-Axle">32 ft MXL / Multi-Axle</option>
                  <option value="Open Body Trailer">Open Body Trailer</option>
                  <option value="Other">Other (Specify below)</option>
                </select>
              </Field>
              <Field label="Pickup Date" name="date" type="date" value={formData.date} onChange={handleChange} />
            </div>

            {formData.truck === 'Other' && (
              <div>
                <Field label="Specify Truck Type" name="customTruck" value={formData.customTruck || ''} onChange={handleChange} placeholder="ENTER YOUR VEHICLE TYPE" required error={errors.customTruck} />
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
            {loadingStep !== 'idle' && loadingStep !== 'done' && (
              <div className="bg-[#EBF5EE] border border-[#b8c9bb] rounded-lg px-4 py-3 flex flex-col gap-2">
                {(['checking', 'matching', 'preparing'] as LoadingStep[]).map((step, i) => {
                  const stepOrder = ['checking', 'matching', 'preparing'];
                  const currentIdx = stepOrder.indexOf(loadingStep);
                  const isActive = i === currentIdx;
                  const isDone = i < currentIdx;
                  return (
                    <div key={step} className={`flex items-center gap-2.5 font-[#Manrope] text-xs font-bold transition-all duration-300 ${isActive ? 'text-[#0F6A37]' : isDone ? 'text-[#6b786d]' : 'text-[#b8c9bb]'}`}>
                      {isDone ? <CheckCircle2 size={14} className="text-[#0F6A37]" /> : isActive ? stepIcons[step] : <div className="w-3.5 h-3.5 rounded-full border-2 border-current" />}
                      {stepMessages[step]}
                    </div>
                  );
                })}
              </div>
            )}

            {loadingStep === 'done' && (
              <div className="bg-[#EBF5EE] border border-[#0F6A37]/30 rounded-lg p-4 flex flex-col gap-3">
                <div className="flex items-center gap-2 font-[#Manrope] text-xs font-bold text-[#0F6A37]">
                  <CheckCircle2 size={18} className="text-[#0F6A37] shrink-0" />
                  <span>Booking details automatically sent to email &amp; WhatsApp! We will call you shortly.</span>
                </div>
                {waUrl && (
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-[#Manrope] text-xs font-bold text-[#0F6A37] hover:underline"
                  >
                    <MessageCircle size={14} />
                    Click here if WhatsApp didn't open automatically
                  </a>
                )}
              </div>
            )}

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
                disabled={isLoading}
                className="btn-brand flex-1 justify-center py-4 text-sm disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none uppercase tracking-wider"
              >
                {isLoading ? <Loader2 size={16} className="spinner" /> : <Truck size={16} />}
                {isLoading ? 'Processing...' : 'Send Booking on WhatsApp'}
              </button>
            </div>

            <p className="font-['Inter'] text-xs text-[#6b786d] text-center">
              No payment is collected through this form.
            </p>
          </div>
        )}
      </form>
    </div>
  );
};
