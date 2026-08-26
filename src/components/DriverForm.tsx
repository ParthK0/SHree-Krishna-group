import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendAutomatedForm } from '../lib/whatsapp';
import { Navigation, CheckCircle2, ArrowRight, ArrowLeft, AlertCircle, Clock } from 'lucide-react';

const inputClass = 'sk-input';
const labelClass = "block font-['Manrope'] text-[10px] font-bold text-[#4A554C] uppercase tracking-widest mb-1.5";

// Validation helpers
const validatePhone = (phone: string) => /^[6-9]\d{9}$/.test(phone.trim());
const validateName = (name: string) => /^[a-zA-Z\s.]{3,50}$/.test(name.trim());
const validateLocation = (loc: string) => loc.trim().length >= 2 && /[a-zA-Z]/.test(loc);

// Indian Driving Licence (DL) format validator (e.g., RJ14 2021 0000123 or RJ14-20210000123)
const validateDL = (dl: string) => {
  const cleanDL = dl.trim().replace(/[\s-]/g, '').toUpperCase();
  const indianStateCodes = /^(AN|AP|AR|AS|BR|CG|CH|DD|DL|DN|GA|GJ|HR|HP|JH|JK|KA|KL|LA|LD|MH|ML|MN|MP|MZ|NL|OD|PB|PY|RJ|SK|TN|TR|TS|UK|UP|WB)/;
  if (!indianStateCodes.test(cleanDL)) return false;
  return cleanDL.length >= 13 && cleanDL.length <= 16 && /^[A-Z]{2}[0-9]{11,14}$/.test(cleanDL);
};

const validateVehicleNo = (vNo: string) => /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{4}$/i.test(vNo.replace(/\s+/g, ''));
const validateCapacity = (cap: string) => cap.trim().length >= 1 && /\d/.test(cap);

export const DriverForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    dlNumber: '',
    vehicleNumber: '',
    vehicleType: '',
    customVehicleType: '',
    capacity: '',
    location: '',
    isOwner: true,
    ownerName: '',
    // Step 2 optional fields
    routes: '',
    permitExpiry: '',
    fitnessExpiry: '',
    insuranceExpiry: '',
    pucExpiry: '',
    emergencyContact: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [declared, setDeclared] = useState(false);
  const [refId, setRefId] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!validateName(formData.name)) {
      newErrors.name = 'Enter a valid full name (at least 3 letters)';
    }
    if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Enter a valid 10-digit mobile number starting with 6-9';
    }
    if (!validateDL(formData.dlNumber)) {
      newErrors.dlNumber = 'Enter a valid Indian DL Number (e.g. RJ1420210000123)';
    }
    if (!validateVehicleNo(formData.vehicleNumber)) {
      newErrors.vehicleNumber = 'Enter a valid Vehicle Registration No. (e.g. RJ14GB1234)';
    }
    if (!formData.vehicleType) {
      newErrors.vehicleType = 'Please select a Vehicle Type';
    }
    if (formData.vehicleType === 'Other' && (!formData.customVehicleType || formData.customVehicleType.trim().length < 2)) {
      newErrors.customVehicleType = 'Please specify your custom vehicle type';
    }
    if (!validateCapacity(formData.capacity)) {
      newErrors.capacity = 'Enter a valid capacity (e.g. 5 Ton or 20 Ton)';
    }
    if (!validateLocation(formData.location)) {
      newErrors.location = 'Enter a valid current location (e.g. Jaipur)';
    }
    if (!formData.isOwner && !validateName(formData.ownerName)) {
      newErrors.ownerName = 'Enter a valid owner full name';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (formData.emergencyContact && !validatePhone(formData.emergencyContact)) {
      newErrors.emergencyContact = 'Enter a valid 10-digit mobile number starting with 6-9';
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

    const payload: Record<string, string> = {
      'Full Name': formData.name,
      'Mobile Number': formData.phone,
      'Driving Licence No': formData.dlNumber,
      'Vehicle Number': formData.vehicleNumber,
      'Vehicle Type': formData.vehicleType === 'Other' ? (formData.customVehicleType || 'Other') : formData.vehicleType,
      'Capacity': formData.capacity,
      'Current Location': formData.location,
      'Driver is Owner': formData.isOwner ? 'Yes' : 'No',
    };

    if (!formData.isOwner && formData.ownerName) {
      payload['Vehicle Owner Name'] = formData.ownerName;
    }

    if (formData.routes) payload['Preferred Routes'] = formData.routes;
    if (formData.permitExpiry) payload['Permit Valid Until'] = formData.permitExpiry;
    if (formData.fitnessExpiry) payload['Fitness Valid Until'] = formData.fitnessExpiry;
    if (formData.insuranceExpiry) payload['Insurance Valid Until'] = formData.insuranceExpiry;
    if (formData.pucExpiry) payload['PUC Valid Until'] = formData.pucExpiry;
    if (formData.emergencyContact) payload['Emergency Contact'] = formData.emergencyContact;

    await sendAutomatedForm('SHREE KRISHNA TRANSPORT — DRIVER REGISTRATION', payload);

    setRefId('SKT-DR-' + Math.floor(10000 + Math.random() * 90000));
    setSubmitted(true);
  };

  if (submitted) {
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
            Vehicle Registration Submitted!
          </h2>
          <p className="font-['Manrope'] text-xs sm:text-sm text-[#4A554C] max-w-md mx-auto">
            Thank you, <strong className="text-[#1a1f1b]">{formData.name}</strong>. Your truck registration has been received by our fleet onboarding desk.
          </p>
        </div>

        {/* Summary Box */}
        <div className="bg-[#f9f6f2] border border-[#e2dad0] rounded-xl p-4 text-left max-w-lg mx-auto space-y-2.5 font-['Manrope'] text-xs text-[#3d4a3f]">
          <div className="font-['Archivo_Narrow'] text-xs font-bold text-[#1a1f1b] uppercase tracking-wider border-b border-[#e2dad0] pb-1.5">
            Registration Summary
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div><span className="text-neutral-500">Vehicle No:</span> <strong className="text-[#1a1f1b] block font-['Space_Mono'] uppercase">{formData.vehicleNumber}</strong></div>
            <div><span className="text-neutral-500">Vehicle Type:</span> <strong className="text-[#1a1f1b] block">{formData.vehicleType === 'Other' ? formData.customVehicleType : formData.vehicleType} ({formData.capacity})</strong></div>
            <div><span className="text-neutral-500">Base Location:</span> <strong className="text-[#1a1f1b] block">{formData.location}</strong></div>
            <div><span className="text-neutral-500">Mobile Number:</span> <strong className="text-[#1a1f1b] block font-['Space_Mono']">{formData.phone}</strong></div>
          </div>
        </div>

        {/* Response Callout */}
        <div className="bg-[#EBF5EE] border border-[#0F6A37]/30 rounded-xl p-4 max-w-lg mx-auto flex items-center gap-3 text-left">
          <Clock size={20} className="text-[#0F6A37] shrink-0" />
          <p className="font-['Manrope'] text-xs text-[#134E3A] leading-snug">
            <strong>Onboarding Desk:</strong> Our load dispatchers will review your truck specs and contact you at <span className="font-['Space_Mono'] font-bold">{formData.phone}</span> to assign available freight loads.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2 max-w-md mx-auto">
          <button
            onClick={() => {
              setFormData({ name: '', phone: '', dlNumber: '', vehicleNumber: '', vehicleType: '', customVehicleType: '', capacity: '', location: '', isOwner: true, ownerName: '', routes: '', permitExpiry: '', fitnessExpiry: '', insuranceExpiry: '', pucExpiry: '', emergencyContact: '' });
              setCurrentStep(1);
              setSubmitted(false);
              setDeclared(false);
            }}
            className="btn-brand justify-center py-3 px-6 text-xs uppercase tracking-wider"
          >
            Register Another Vehicle
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
          <Navigation size={18} />
        </div>
        <p className="font-['Manrope'] text-[10px] font-bold text-[#6b786d] uppercase tracking-widest">Truck Owner / Driver</p>
      </div>
      <h2 className="font-['Archivo_Narrow'] text-2xl md:text-3xl font-bold mb-4 uppercase text-[#1a1f1b]">
        Register Vehicle
      </h2>

      {/* 2-Step Progress Tabs */}
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
          <span>1. Driver &amp; Vehicle Essentials</span>
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
          <span>2. Routes &amp; Documents (Optional)</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* STEP 1: Non-Negotiable Core Driver & Vehicle Fields */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="driver_name" className={labelClass}>Full Name<span className="text-[#0F6A37] ml-0.5">*</span></label>
                <input id="driver_name" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="DRIVER / OWNER NAME" required className={`${inputClass} ${errors.name ? 'border-red-500 bg-red-50/40' : ''}`} />
                {errors.name && <p className="mt-1 text-[11px] font-['Manrope'] font-bold text-red-600 flex items-center gap-1"><AlertCircle size={12} /><span>{errors.name}</span></p>}
              </div>
              <div>
                <label htmlFor="driver_phone" className={labelClass}>Mobile Number<span className="text-[#0F6A37] ml-0.5">*</span></label>
                <input id="driver_phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="10-DIGIT WHATSAPP NO." inputMode="tel" required className={`${inputClass} ${errors.phone ? 'border-red-500 bg-red-50/40' : ''}`} />
                {errors.phone && <p className="mt-1 text-[11px] font-['Manrope'] font-bold text-red-600 flex items-center gap-1"><AlertCircle size={12} /><span>{errors.phone}</span></p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="driver_dlNumber" className={labelClass}>Driving Licence Number<span className="text-[#0F6A37] ml-0.5">*</span></label>
                <input id="driver_dlNumber" type="text" name="dlNumber" value={formData.dlNumber} onChange={handleChange} placeholder="E.G., RJ1420210000000" required className={`${inputClass} ${errors.dlNumber ? 'border-red-500 bg-red-50/40' : ''}`} />
                {errors.dlNumber && <p className="mt-1 text-[11px] font-['Manrope'] font-bold text-red-600 flex items-center gap-1"><AlertCircle size={12} /><span>{errors.dlNumber}</span></p>}
              </div>
              <div>
                <label htmlFor="driver_vehicleNumber" className={labelClass}>Vehicle Number<span className="text-[#0F6A37] ml-0.5">*</span></label>
                <input id="driver_vehicleNumber" type="text" name="vehicleNumber" value={formData.vehicleNumber} onChange={handleChange} placeholder="E.G., RJ14GB1234" required className={`${inputClass} ${errors.vehicleNumber ? 'border-red-500 bg-red-50/40' : ''}`} />
                {errors.vehicleNumber && <p className="mt-1 text-[11px] font-['Manrope'] font-bold text-red-600 flex items-center gap-1"><AlertCircle size={12} /><span>{errors.vehicleNumber}</span></p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="driver_vehicleType" className={labelClass}>Vehicle Type<span className="text-[#0F6A37] ml-0.5">*</span></label>
                <select id="driver_vehicleType" name="vehicleType" value={formData.vehicleType} onChange={handleChange} required className={`${inputClass} ${errors.vehicleType ? 'border-red-500 bg-red-50/40' : ''}`}>
                  <option value="">SELECT VEHICLE TYPE</option>
                  <option value="Mini Truck / Pickup">Mini Truck / Pickup</option>
                  <option value="Tata 407 / 14 ft">Tata 407 / 14 ft</option>
                  <option value="17–20 ft Container">17–20 ft Container</option>
                  <option value="22–24 ft Container">22–24 ft Container</option>
                  <option value="32 ft MXL / Multi-Axle">32 ft MXL / Multi-Axle</option>
                  <option value="Open Body Trailer">Open Body Trailer</option>
                  <option value="Tanker / Tipper">Tanker / Tipper</option>
                  <option value="Other">Other (Specify below)</option>
                </select>
                {errors.vehicleType && <p className="mt-1 text-[11px] font-['Manrope'] font-bold text-red-600 flex items-center gap-1"><AlertCircle size={12} /><span>{errors.vehicleType}</span></p>}
              </div>
              <div>
                <label htmlFor="driver_capacity" className={labelClass}>Capacity (in Tons)<span className="text-[#0F6A37] ml-0.5">*</span></label>
                <input id="driver_capacity" type="text" name="capacity" value={formData.capacity} onChange={handleChange} placeholder="E.G., 5 TON / 20 TON" required className={`${inputClass} ${errors.capacity ? 'border-red-500 bg-red-50/40' : ''}`} />
                {errors.capacity && <p className="mt-1 text-[11px] font-['Manrope'] font-bold text-red-600 flex items-center gap-1"><AlertCircle size={12} /><span>{errors.capacity}</span></p>}
              </div>
            </div>

            {formData.vehicleType === 'Other' && (
              <div>
                <label htmlFor="driver_customVehicleType" className={labelClass}>Specify Vehicle Type<span className="text-[#0F6A37] ml-0.5">*</span></label>
                <input id="driver_customVehicleType" type="text" name="customVehicleType" value={formData.customVehicleType} onChange={handleChange} placeholder="ENTER YOUR VEHICLE TYPE" required className={`${inputClass} ${errors.customVehicleType ? 'border-red-500 bg-red-50/40' : ''}`} />
                {errors.customVehicleType && <p className="mt-1 text-[11px] font-['Manrope'] font-bold text-red-600 flex items-center gap-1"><AlertCircle size={12} /><span>{errors.customVehicleType}</span></p>}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="driver_location" className={labelClass}>Current Location<span className="text-[#0F6A37] ml-0.5">*</span></label>
                <input id="driver_location" type="text" name="location" value={formData.location} onChange={handleChange} placeholder="E.G., JAIPUR, KOTA" required className={`${inputClass} ${errors.location ? 'border-red-500 bg-red-50/40' : ''}`} />
                {errors.location && <p className="mt-1 text-[11px] font-['Manrope'] font-bold text-red-600 flex items-center gap-1"><AlertCircle size={12} /><span>{errors.location}</span></p>}
              </div>

              <div className="flex flex-col justify-end">
                <label className="flex items-center gap-2 text-xs font-['Manrope'] font-bold text-[#3d4a3f] cursor-pointer py-3">
                  <input
                    type="checkbox"
                    name="isOwner"
                    checked={formData.isOwner}
                    onChange={handleChange}
                    className="w-4 h-4 rounded text-[#0F6A37] focus:ring-[#0F6A37]"
                  />
                  <span>I am the owner of this vehicle</span>
                </label>
              </div>
            </div>

            {/* Conditional Vehicle Owner Name field if driver != owner */}
            {!formData.isOwner && (
              <div>
                <label htmlFor="driver_ownerName" className={labelClass}>Vehicle Owner Name<span className="text-[#0F6A37] ml-0.5">*</span></label>
                <input id="driver_ownerName" type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} placeholder="OWNER FULL NAME" required className={`${inputClass} ${errors.ownerName ? 'border-red-500 bg-red-50/40' : ''}`} />
                {errors.ownerName && <p className="mt-1 text-[11px] font-['Manrope'] font-bold text-red-600 flex items-center gap-1"><AlertCircle size={12} /><span>{errors.ownerName}</span></p>}
              </div>
            )}

            <button
              type="button"
              onClick={handleNext}
              className="btn-brand w-full justify-center py-4 text-sm mt-4 uppercase tracking-wider"
            >
              <span>Next: Routes &amp; Documents (Optional)</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* STEP 2: Optional Routes & Deferred Compliance Documents */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <div>
              <label htmlFor="driver_routes" className={labelClass}>Preferred Routes (Optional)</label>
              <input id="driver_routes" type="text" name="routes" value={formData.routes} onChange={handleChange} placeholder="E.G., JAIPUR–DELHI, ALL INDIA" className={inputClass} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="driver_permit" className={labelClass}>Permit Valid Until (Optional)</label>
                <input id="driver_permit" type="date" name="permitExpiry" value={formData.permitExpiry} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label htmlFor="driver_fitness" className={labelClass}>Fitness Valid Until (Optional)</label>
                <input id="driver_fitness" type="date" name="fitnessExpiry" value={formData.fitnessExpiry} onChange={handleChange} className={inputClass} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="driver_insurance" className={labelClass}>Insurance Valid Until (Optional)</label>
                <input id="driver_insurance" type="date" name="insuranceExpiry" value={formData.insuranceExpiry} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label htmlFor="driver_puc" className={labelClass}>PUC Valid Until (Optional)</label>
                <input id="driver_puc" type="date" name="pucExpiry" value={formData.pucExpiry} onChange={handleChange} className={inputClass} />
              </div>
            </div>

            <div>
              <label htmlFor="driver_emergencyContact" className={labelClass}>Emergency Contact Number (Optional)</label>
              <input id="driver_emergencyContact" type="tel" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} placeholder="EMERGENCY MOBILE NO." inputMode="tel" className={`${inputClass} ${errors.emergencyContact ? 'border-red-500 bg-red-50/40' : ''}`} />
              {errors.emergencyContact && <p className="mt-1 text-[11px] font-['Manrope'] font-bold text-red-600 flex items-center gap-1"><AlertCircle size={12} /><span>{errors.emergencyContact}</span></p>}
            </div>

            {submitted && (
              <div className="bg-[#EBF5EE] border border-[#0F6A37]/30 rounded-lg p-4 flex items-center gap-2 font-['Manrope'] text-xs font-bold text-[#0F6A37]">
                <CheckCircle2 size={18} className="shrink-0" />
                <span>Vehicle registration details submitted successfully via email! Our team will reach out shortly.</span>
              </div>
            )}

            {/* Declaration Checkbox */}
            <label className="flex items-start gap-3 p-4 rounded-xl border border-[#e2dad0] bg-[#f9f6f2] cursor-pointer hover:border-[#0F6A37] transition-colors">
              <input
                type="checkbox"
                checked={declared}
                onChange={(e) => setDeclared(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-[#0F6A37] focus:ring-[#0F6A37] shrink-0"
              />
              <span className="font-['Manrope'] text-xs text-[#3d4a3f] leading-relaxed">
                I declare that: I am the owner or authorized operator of this vehicle; my RC, Insurance, Permit, Fitness and Driving Licence are valid. I agree to the{' '}
                <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="text-[#0F6A37] underline font-bold">Terms & Conditions</a>{' '}and{' '}
                <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#0F6A37] underline font-bold">Privacy Policy</a>.
              </span>
            </label>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg border-2 border-[#d0c8be] hover:border-[#1a1f1b] font-['Manrope'] font-bold text-xs uppercase tracking-wider text-[#3d4a3f] transition-all"
              >
                <ArrowLeft size={16} />
                <span>Back to Step 1</span>
              </button>

              <button
                type="submit"
                disabled={!declared}
                className="btn-brand flex-1 justify-center py-4 text-sm uppercase tracking-wider disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <Navigation size={16} />
                <span>Submit Vehicle Registration</span>
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
