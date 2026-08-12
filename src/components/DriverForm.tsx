import React, { useState } from 'react';
import { sendWhatsAppMessage } from '../lib/whatsapp';

export const DriverForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    license: '',
    experience: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    sendWhatsAppMessage("SHREE KRISHNA LOGISTICS — DRIVER REGISTRATION", {
      "Driver Full Name": formData.name,
      "Commercial License Number": formData.license,
      "Years of Experience": formData.experience,
    });

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div id="careers" className="bg-[#EEF2F6] border border-gray-300 p-6 md:p-8">
      <h3 className="text-lg font-extrabold text-[#1A202C] mb-6">
        Driver Registration
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-[#475569] mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Driver name"
            className="input-flat"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#475569] mb-1">
            Commercial License Number
          </label>
          <input
            type="text"
            name="license"
            required
            value={formData.license}
            onChange={handleChange}
            placeholder="License #"
            className="input-flat"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#475569] mb-1">
            Years of Experience
          </label>
          <input
            type="text"
            name="experience"
            required
            value={formData.experience}
            onChange={handleChange}
            placeholder="Experience in years"
            className="input-flat"
          />
        </div>

        <button
          type="submit"
          className="btn-dark-charcoal w-full py-3.5 text-xs uppercase tracking-wider font-extrabold cursor-pointer mt-4"
        >
          Register
        </button>

        {submitted && (
          <p className="text-xs text-green-700 font-bold text-center mt-2">
            ✓ Driver details submitted on WhatsApp!
          </p>
        )}
      </form>
    </div>
  );
};
