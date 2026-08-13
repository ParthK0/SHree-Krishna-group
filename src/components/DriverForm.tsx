import React, { useState } from 'react';
import { sendAutomatedForm, sendWhatsAppMessage } from '../lib/whatsapp';
import { Navigation, CheckCircle2, MessageCircle } from 'lucide-react';

const inputClass = 'sk-input';
const labelClass = "block font-['Manrope'] text-[10px] font-bold text-[#6b786d] uppercase tracking-widest mb-1.5";

export const DriverForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '', phone: '', vehicleNumber: '',
    vehicleType: '', capacity: '', location: '', routes: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [waUrl, setWaUrl] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.vehicleNumber || !formData.vehicleType || !formData.location) {
      alert('Please fill in all required fields.');
      return;
    }

    const result = await sendAutomatedForm('SHREE KRISHNA TRANSPORT — DRIVER REGISTRATION', {
      'Name': formData.name,
      'Mobile': formData.phone,
      'Vehicle Number': formData.vehicleNumber,
      'Vehicle Type': formData.vehicleType,
      'Capacity': formData.capacity,
      'Current Location': formData.location,
      'Preferred Routes': formData.routes,
    });

    setWaUrl(result.waUrl);
    setSubmitted(true);

    sendWhatsAppMessage('SHREE KRISHNA TRANSPORT — DRIVER REGISTRATION', {
      'Name': formData.name,
      'Mobile': formData.phone,
      'Vehicle Number': formData.vehicleNumber,
      'Vehicle Type': formData.vehicleType,
      'Capacity': formData.capacity,
      'Current Location': formData.location,
      'Preferred Routes': formData.routes,
    });
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-lg bg-[#F1F5F2] border border-[#e5ebe7] flex items-center justify-center text-[#3d4a3f]">
          <Navigation size={18} />
        </div>
        <p className="font-['Manrope'] text-[10px] font-bold text-[#6b786d] uppercase tracking-widest">Truck Owner / Driver</p>
      </div>
      <h2 className="font-['Archivo_Narrow'] text-2xl md:text-3xl font-bold mb-6 uppercase text-[#1a1f1b]">
        Register for Loads
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5 border-t-2 border-[#e5ebe7] pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Name<span className="text-[#0F6A37] ml-0.5">*</span></label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="FULL NAME" required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Mobile Number<span className="text-[#0F6A37] ml-0.5">*</span></label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="10-DIGIT NUMBER" inputMode="tel" required className={inputClass} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Vehicle Number<span className="text-[#0F6A37] ml-0.5">*</span></label>
            <input type="text" name="vehicleNumber" value={formData.vehicleNumber} onChange={handleChange} placeholder="RJ14XX0000" required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Vehicle Type<span className="text-[#0F6A37] ml-0.5">*</span></label>
            <input type="text" name="vehicleType" value={formData.vehicleType} onChange={handleChange} placeholder="E.G., 14 FT" required className={inputClass} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Capacity</label>
            <input type="text" name="capacity" value={formData.capacity} onChange={handleChange} placeholder="E.G., 5 TON" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Current Location<span className="text-[#0F6A37] ml-0.5">*</span></label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="E.G., JAIPUR" required className={inputClass} />
          </div>
        </div>
        <div>
          <label className={labelClass}>Preferred Routes</label>
          <input type="text" name="routes" value={formData.routes} onChange={handleChange} placeholder="E.G., JAIPUR–JODHPUR, JAIPUR–DELHI" className={inputClass} />
        </div>

        {submitted && (
          <div className="bg-[#EBF5EE] border border-[#0F6A37]/30 rounded-lg p-4 flex flex-col gap-3">
            <div className="flex items-center gap-2 font-['Manrope'] text-xs font-bold text-[#0F6A37]">
              <CheckCircle2 size={18} className="shrink-0" />
              <span>Registration details automatically sent to email &amp; WhatsApp! We will reach out shortly.</span>
            </div>
            {waUrl && (
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-['Manrope'] text-xs font-bold text-[#0F6A37] hover:underline"
              >
                <MessageCircle size={14} />
                Click here if WhatsApp didn't open automatically
              </a>
            )}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-[#F8FAF9] text-[#1a1f1b] font-['Manrope'] text-xs font-bold uppercase py-4 rounded-xs flex items-center justify-center gap-2 hover:bg-[#EBF5EE] hover:text-[#0F6A37] hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 border-2 border-[#2a2f2b] hover:border-[#0F6A37] cursor-pointer tracking-wider"
        >
          <Navigation size={16} />
          Register on WhatsApp
        </button>
      </form>
    </div>
  );
};
