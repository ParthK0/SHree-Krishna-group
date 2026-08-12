import React, { useState } from 'react';
import { sendWhatsAppMessage } from '../lib/whatsapp';

export const DriverForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    vehicle: '',
    capacity: '',
    routes: '',
    licenseAccepted: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    sendWhatsAppMessage("SHREE KRISHNA TRANSPORT — FLEET DRIVER REGISTRATION", {
      "Driver Full Name": formData.name,
      "Mobile Phone": formData.phone,
      "Vehicle Number": formData.vehicle,
      "Capacity (Tons)": formData.capacity,
      "Preferred Routes": formData.routes,
      "Commercial License Verified": formData.licenseAccepted ? "Yes" : "Pending Verification",
    });

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div id="careers" className="bg-white border border-gray-300 p-6 md:p-8 flex flex-col justify-between shadow-xs">
      <div>
        <div className="border-b border-gray-300 pb-3 mb-6 flex items-center justify-between">
          <h3 className="text-lg font-extrabold text-[#022448] uppercase">Fleet: Driver Registration</h3>
          <span className="material-symbols-outlined text-[#022448]">badge</span>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-xs font-bold uppercase tracking-wider mb-1 text-[#022448]">Full Name *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="As per license"
                className="input-field p-2.5 text-xs w-full min-h-[44px]"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-bold uppercase tracking-wider mb-1 text-[#022448]">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                required
                inputMode="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="10-digit mobile"
                className="input-field p-2.5 text-xs w-full min-h-[44px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col md:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider mb-1 text-[#022448]">Vehicle Number *</label>
              <input
                type="text"
                name="vehicle"
                required
                value={formData.vehicle}
                onChange={handleChange}
                placeholder="e.g. RJ14XX0000"
                className="input-field p-2.5 text-xs w-full min-h-[44px]"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-bold uppercase tracking-wider mb-1 text-[#022448]">Capacity</label>
              <input
                type="text"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                placeholder="Tons (e.g. 10)"
                className="input-field p-2.5 text-xs w-full min-h-[44px]"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-bold uppercase tracking-wider mb-1 text-[#022448]">Preferred Routes</label>
            <input
              type="text"
              name="routes"
              value={formData.routes}
              onChange={handleChange}
              placeholder="e.g. Jaipur to Delhi, Jaipur to Jodhpur"
              className="input-field p-2.5 text-xs w-full min-h-[44px]"
            />
          </div>

          <div className="flex items-center gap-2 mt-1 mb-2">
            <input
              type="checkbox"
              id="terms"
              name="licenseAccepted"
              checked={formData.licenseAccepted}
              onChange={handleChange}
              className="border-gray-300 bg-white w-4 h-4 rounded-none text-[#022448]"
            />
            <label htmlFor="terms" className="text-xs text-[#43474E] cursor-pointer">
              I have a valid commercial driving license.
            </label>
          </div>

          <button
            type="submit"
            className="btn-primary w-full py-3.5 mt-auto font-bold text-xs uppercase tracking-wider min-h-[44px] cursor-pointer flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">how_to_reg</span>
            Register Now on WhatsApp
          </button>

          {submitted && (
            <p className="text-xs text-green-700 font-bold text-center mt-1">
              ✓ Registration details sent to WhatsApp!
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
