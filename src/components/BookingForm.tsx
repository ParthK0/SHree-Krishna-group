import React, { useState } from 'react';
import { sendWhatsAppMessage } from '../lib/whatsapp';

export const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    pickup: '',
    drop: '',
    goods: '',
    weight: '',
    truck: 'Open Body',
    date: '',
    name: '',
    phone: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    sendWhatsAppMessage("SHREE KRISHNA TRANSPORT — NEW BOOKING ENQUIRY", {
      "Pickup Location": formData.pickup,
      "Drop Location": formData.drop,
      "Goods Type": formData.goods,
      "Approx Weight (Tons)": formData.weight,
      "Truck Type": formData.truck,
      "Pickup Date": formData.date,
      "Customer Name": formData.name,
      "Mobile Number": formData.phone,
    });

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="bg-white border border-gray-300 p-6 md:p-8 flex flex-col justify-between shadow-xs">
      <div>
        <div className="border-b border-gray-300 pb-3 mb-6 flex items-center justify-between">
          <h3 className="text-lg font-extrabold text-[#022448] uppercase">Client: Request a Quote</h3>
          <span className="material-symbols-outlined text-[#022448]">local_shipping</span>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-xs font-bold uppercase tracking-wider mb-1 text-[#022448]">Pickup Location *</label>
              <input
                type="text"
                name="pickup"
                required
                value={formData.pickup}
                onChange={handleChange}
                placeholder="City or Pincode (e.g. Jaipur)"
                className="input-field p-2.5 text-xs w-full min-h-[44px]"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-bold uppercase tracking-wider mb-1 text-[#022448]">Drop Location *</label>
              <input
                type="text"
                name="drop"
                required
                value={formData.drop}
                onChange={handleChange}
                placeholder="City or Pincode (e.g. Delhi NCR)"
                className="input-field p-2.5 text-xs w-full min-h-[44px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label className="text-xs font-bold uppercase tracking-wider mb-1 text-[#022448]">Goods Type *</label>
              <input
                type="text"
                name="goods"
                required
                value={formData.goods}
                onChange={handleChange}
                placeholder="e.g. Steel / Tiles"
                className="input-field p-2.5 text-xs w-full min-h-[44px]"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-bold uppercase tracking-wider mb-1 text-[#022448]">Weight (Tons)</label>
              <input
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="0.0"
                className="input-field p-2.5 text-xs w-full min-h-[44px]"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-bold uppercase tracking-wider mb-1 text-[#022448]">Truck Type</label>
              <select
                name="truck"
                value={formData.truck}
                onChange={handleChange}
                className="input-field p-2.5 text-xs w-full min-h-[44px] bg-white"
              >
                <option value="Open Body">Open Body</option>
                <option value="Container">Container</option>
                <option value="Trailer">Trailer / Multi-axle</option>
                <option value="Pickup / Bolero">Mini Truck / Pickup</option>
                <option value="Tata 407 / 14ft">Tata 407 / 14 ft</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label className="text-xs font-bold uppercase tracking-wider mb-1 text-[#022448]">Pickup Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="input-field p-2.5 text-xs w-full min-h-[44px]"
              />
            </div>
            <div className="flex flex-col md:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider mb-1 text-[#022448]">Contact Details *</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="input-field p-2.5 text-xs w-1/2 min-h-[44px]"
                />
                <input
                  type="tel"
                  name="phone"
                  required
                  inputMode="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="input-field p-2.5 text-xs w-1/2 min-h-[44px]"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary w-full py-3.5 mt-2 font-bold text-xs uppercase tracking-wider min-h-[44px] cursor-pointer flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">send</span>
            Submit Request on WhatsApp
          </button>

          {submitted && (
            <p className="text-xs text-green-700 font-bold text-center mt-1">
              ✓ Redirected to WhatsApp with your quote enquiry!
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
