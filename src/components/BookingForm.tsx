import React, { useState } from 'react';
import { sendWhatsAppMessage } from '../lib/whatsapp';

export const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    payload: 'Raw Materials',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    sendWhatsAppMessage("SHREE KRISHNA LOGISTICS — REQUEST A QUOTE", {
      "Origin Location": formData.origin,
      "Destination Location": formData.destination,
      "Payload Type": formData.payload,
    });

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="bg-[#EEF2F6] border border-gray-300 p-6 md:p-8">
      <h3 className="text-lg font-extrabold text-[#1A202C] mb-6">
        Request a Quote
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-[#475569] mb-1">
            Origin Location
          </label>
          <input
            type="text"
            name="origin"
            required
            value={formData.origin}
            onChange={handleChange}
            placeholder="Enter origin"
            className="input-flat"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#475569] mb-1">
            Destination Location
          </label>
          <input
            type="text"
            name="destination"
            required
            value={formData.destination}
            onChange={handleChange}
            placeholder="Enter destination"
            className="input-flat"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#475569] mb-1">
            Payload Type
          </label>
          <select
            name="payload"
            value={formData.payload}
            onChange={handleChange}
            className="input-flat bg-white"
          >
            <option value="Raw Materials">Raw Materials</option>
            <option value="Construction Steel">Construction Steel</option>
            <option value="Cement & Concrete">Cement & Concrete</option>
            <option value="Finished Industrial Goods">Finished Industrial Goods</option>
            <option value="Heavy Machinery">Heavy Machinery</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn-dark-navy w-full py-3.5 text-xs uppercase tracking-wider font-extrabold cursor-pointer mt-4"
        >
          Submit Request
        </button>

        {submitted && (
          <p className="text-xs text-green-700 font-bold text-center mt-2">
            ✓ Quote request generated on WhatsApp!
          </p>
        )}
      </form>
    </div>
  );
};
