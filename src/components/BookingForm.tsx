import React, { useState } from 'react';
import { sendDualFormSubmission } from '../lib/whatsapp';
import { Truck, Loader2, CheckCircle2 } from 'lucide-react';

type LoadingStep = 'idle' | 'checking' | 'matching' | 'preparing' | 'done';

const inputClass =
  'sk-input';
const labelClass =
  "block font-['Manrope'] text-[10px] font-bold text-[#6b786d] uppercase tracking-widest mb-1.5";

interface FieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
  children?: React.ReactNode;
}

const Field: React.FC<FieldProps> = ({ label, name, value, onChange, placeholder, type = 'text', required, inputMode, children }) => (
  <div>
    <label className={labelClass}>{label}{required && <span className="text-[#0F6A37] ml-0.5">*</span>}</label>
    {children ?? (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        inputMode={inputMode}
        className={inputClass}
      />
    )}
  </div>
);

const stepMessages: Record<LoadingStep, string> = {
  idle: '',
  checking: 'Checking available trucks...',
  matching: 'Finding best match...',
  preparing: 'Preparing WhatsApp message...',
  done: '',
};

const stepIcons: Partial<Record<LoadingStep, React.ReactNode>> = {
  checking: <Loader2 size={16} className="spinner text-[#0F6A37]" />,
  matching: <CheckCircle2 size={16} className="text-[#0F6A37]" />,
  preparing: <CheckCircle2 size={16} className="text-[#0F6A37]" />,
};

export const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    pickup: '', drop: '', goods: '', weight: '',
    truck: 'Not sure', date: '', name: '', phone: '',
  });
  const [loadingStep, setLoadingStep] = useState<LoadingStep>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.pickup || !formData.drop || !formData.goods || !formData.name || !formData.phone) {
      alert('Please fill in all required fields.');
      return;
    }

    // Animated loading sequence
    setLoadingStep('checking');
    setTimeout(() => setLoadingStep('matching'), 450);
    setTimeout(() => setLoadingStep('preparing'), 850);
    setTimeout(() => {
      setLoadingStep('done');
      sendDualFormSubmission('SHREE KRISHNA TRANSPORT — NEW BOOKING', {
        'Pickup': formData.pickup,
        'Drop': formData.drop,
        'Goods': formData.goods,
        'Weight': formData.weight,
        'Truck Type': formData.truck,
        'Date': formData.date,
        'Customer': formData.name,
        'Mobile': formData.phone,
      });
      setTimeout(() => setLoadingStep('idle'), 4000);
    }, 1200);
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
      <h2 className="font-['Archivo_Narrow'] text-2xl md:text-3xl font-bold mb-6 uppercase text-[#1a1f1b]">
        Book a Truck
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5 border-t-2 border-[#e5ebe7] pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Pickup Location" name="pickup" value={formData.pickup} onChange={handleChange} placeholder="E.G., JAIPUR" required />
          <Field label="Drop Location" name="drop" value={formData.drop} onChange={handleChange} placeholder="E.G., JODHPUR" required />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Goods Type" name="goods" value={formData.goods} onChange={handleChange} placeholder="E.G., MARBLE" required />
          <Field label="Approx. Weight" name="weight" value={formData.weight} onChange={handleChange} placeholder="E.G., 5 TON" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Truck Type" name="truck" value={formData.truck} onChange={handleChange}>
            <select name="truck" value={formData.truck} onChange={handleChange} className={inputClass}>
              <option>Not sure</option>
              <option>Mini Truck / Pickup</option>
              <option>Tata 407 / 14 ft</option>
              <option>17–20 ft</option>
              <option>22–24 ft</option>
              <option>32 ft / Multi-axle</option>
            </select>
          </Field>
          <Field label="Pickup Date" name="date" type="date" value={formData.date} onChange={handleChange} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Your Name" name="name" value={formData.name} onChange={handleChange} placeholder="FULL NAME" required />
          <Field label="Mobile Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="10-DIGIT NUMBER" inputMode="tel" required />
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
                <div key={step} className={`flex items-center gap-2.5 font-['Manrope'] text-xs font-bold transition-all duration-300 ${isActive ? 'text-[#0F6A37]' : isDone ? 'text-[#6b786d]' : 'text-[#b8c9bb]'}`}>
                  {isDone ? <CheckCircle2 size={14} className="text-[#0F6A37]" /> : isActive ? stepIcons[step] : <div className="w-3.5 h-3.5 rounded-full border-2 border-current" />}
                  {stepMessages[step]}
                </div>
              );
            })}
          </div>
        )}

        {loadingStep === 'done' && (
          <div className="bg-[#EBF5EE] border border-[#0F6A37]/30 rounded-lg px-4 py-3 flex items-center gap-2 font-['Manrope'] text-xs font-bold text-[#0F6A37]">
            <CheckCircle2 size={16} className="text-[#0F6A37]" />
            Booking request sent on WhatsApp! Check your app.
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="btn-brand w-full justify-center py-4 text-sm disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? <Loader2 size={16} className="spinner" /> : <Truck size={16} />}
          {isLoading ? 'Processing...' : 'Send Booking on WhatsApp'}
        </button>
        <p className="font-['Inter'] text-xs text-[#6b786d] text-center">
          No payment is collected through this form.
        </p>
      </form>
    </div>
  );
};
