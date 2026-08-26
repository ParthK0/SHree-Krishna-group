import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendAutomatedForm } from '../lib/whatsapp';
import { MessageSquare, Loader2, CheckCircle2, AlertCircle, Paperclip, FileText, Send, Clock } from 'lucide-react';

type LoadingStep = 'idle' | 'preparing' | 'done';

const inputClass = 'sk-input';
const labelClass =
  "block font-['Manrope'] text-[10px] font-bold text-[#4A554C] uppercase tracking-widest mb-1.5";

const validatePhone = (phone: string) => /^[6-9]\d{9}$/.test(phone.trim());
const validateName = (name: string) => /^[a-zA-Z\s.]{3,50}$/.test(name.trim());
const validateEmail = (email: string) => !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

const ENQUIRY_TYPES = [
  'General Enquiry',
  'Bulk & Corporate Booking',
  'Route/Service Availability',
  'Vendor/Partnership',
  'Feedback or Complaint',
  'Media & Press',
  'Other',
];

export const EnquiryForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    enquiryType: 'General Enquiry',
    message: '',
    preferredContact: 'WhatsApp',
    consent: false,
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loadingStep, setLoadingStep] = useState<LoadingStep>('idle');
  const [refId, setRefId] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!validateName(formData.name)) {
      newErrors.name = 'Please enter a valid full name (at least 3 letters)';
    }
    if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number starting with 6-9';
    }
    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Please describe your enquiry details (at least 10 characters)';
    }
    if (!formData.consent) {
      newErrors.consent = 'You must agree to the consent terms before submitting';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoadingStep('preparing');

    const payload: Record<string, string> = {
      'Full Name': formData.name,
      'Company/Organization': formData.company || 'Individual / Not Provided',
      'Phone / WhatsApp': formData.phone,
      'Email': formData.email || 'N/A',
      'Enquiry Type': formData.enquiryType,
      'Preferred Contact Method': formData.preferredContact,
      'Message Details': formData.message,
    };

    if (selectedFile) {
      payload['Attached File'] = `${selectedFile.name} (${(selectedFile.size / 1024).toFixed(1)} KB)`;
      payload['File Note'] = 'Client attached a document specs file. Please request file sent via WhatsApp chat.';
    }

    // TODO: LEGAL COPY GUIDANCE TO BE ADDED LATER
    payload['Legal Consent'] = 'Confirmed accurate details and consent to contact.';

    await sendAutomatedForm('SHREE KRISHNA TRANSPORT — NEW GENERAL ENQUIRY', payload);

    setRefId('SKT-EN-' + Math.floor(10000 + Math.random() * 90000));
    setLoadingStep('done');
  };

  const isLoading = loadingStep === 'preparing';

  if (loadingStep === 'done') {
    return (
      <div className="w-full max-w-4xl mx-auto bg-white border border-[#c5beb4] rounded-2xl p-6 sm:p-10 shadow-lg text-center space-y-6 animate-fadeIn">
        <div className="w-16 h-16 rounded-full bg-[#EBF5EE] border border-[#0F6A37]/30 flex items-center justify-center text-[#0F6A37] mx-auto">
          <CheckCircle2 size={36} />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0F6A37]/10 border border-[#0F6A37]/30 text-[#0F6A37] font-['Space_Mono'] text-xs font-bold">
            <span>Reference ID: {refId}</span>
          </div>
          <h2 className="font-['Archivo_Narrow'] text-2xl sm:text-3xl font-bold uppercase text-[#1a1f1b]">
            Enquiry Submitted Successfully!
          </h2>
          <p className="font-['Manrope'] text-xs sm:text-sm text-[#4A554C] max-w-md mx-auto">
            Thank you, <strong className="text-[#1a1f1b]">{formData.name}</strong>. Your enquiry has been routed directly to our support desk.
          </p>
        </div>

        {/* Summary Box */}
        <div className="bg-[#f9f6f2] border border-[#e2dad0] rounded-xl p-4 text-left max-w-lg mx-auto space-y-2.5 font-['Manrope'] text-xs text-[#3d4a3f]">
          <div className="font-['Archivo_Narrow'] text-xs font-bold text-[#1a1f1b] uppercase tracking-wider border-b border-[#e2dad0] pb-1.5">
            Enquiry Details Summary
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div><span className="text-neutral-500">Category:</span> <strong className="text-[#1a1f1b] block">{formData.enquiryType}</strong></div>
            <div><span className="text-neutral-500">Preferred Contact:</span> <strong className="text-[#1a1f1b] block">{formData.preferredContact}</strong></div>
            <div><span className="text-neutral-500">Mobile Number:</span> <strong className="text-[#1a1f1b] block font-['Space_Mono']">{formData.phone}</strong></div>
            <div><span className="text-neutral-500">Email:</span> <strong className="text-[#1a1f1b] block truncate">{formData.email || 'N/A'}</strong></div>
          </div>
        </div>

        {/* Response Callout */}
        <div className="bg-[#EBF5EE] border border-[#0F6A37]/30 rounded-xl p-4 max-w-lg mx-auto flex items-center gap-3 text-left">
          <Clock size={20} className="text-[#0F6A37] shrink-0" />
          <p className="font-['Manrope'] text-xs text-[#134E3A] leading-snug">
            <strong>Guaranteed 1-Hour Response:</strong> Our support desk is reviewing your message details and will get back to you via <span className="font-bold">{formData.preferredContact}</span> shortly.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2 max-w-md mx-auto">
          <button
            onClick={() => {
              setFormData({ name: '', company: '', phone: '', email: '', enquiryType: 'General Enquiry', message: '', preferredContact: 'WhatsApp', consent: false });
              setSelectedFile(null);
              setLoadingStep('idle');
            }}
            className="btn-brand justify-center py-3 px-6 text-xs uppercase tracking-wider"
          >
            Submit Another Enquiry
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
    <div className="w-full max-w-4xl mx-auto bg-white border border-[#c5beB4] rounded-2xl p-6 sm:p-10 shadow-lg">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-lg bg-[#EBF5EE] flex items-center justify-center text-[#0F6A37]">
          <MessageSquare size={18} />
        </div>
        <p className="font-['Manrope'] text-[10px] font-bold text-[#6b786d] uppercase tracking-widest">
          Get In Touch
        </p>
      </div>

      <h2 className="font-['Archivo_Narrow'] text-2xl md:text-3xl font-bold mb-2 uppercase text-[#1a1f1b]">
        General Enquiry &amp; Support
      </h2>
      <p className="font-['Manrope'] text-xs md:text-sm text-[#4A554C] mb-8">
        Have a question about routes, corporate load specs, partnerships, or press? Fill out the form below for an immediate response.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name & Company */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="enquiry-name" className={labelClass}>
              Full Name <span className="text-[#0F6A37] ml-0.5">*</span>
            </label>
            <input
              id="enquiry-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="E.G. RAMESH SHARMA"
              className={`${inputClass} ${errors.name ? 'border-red-500 bg-red-50/40' : ''}`}
            />
            {errors.name && (
              <p className="mt-1 text-[11px] font-['Manrope'] font-bold text-red-600 flex items-center gap-1">
                <AlertCircle size={12} className="shrink-0" />
                <span>{errors.name}</span>
              </p>
            )}
          </div>

          <div>
            <label htmlFor="enquiry-company" className={labelClass}>
              Company / Organization <span className="text-neutral-400 text-[9px] lowercase font-normal">(optional — signals B2B vs individual)</span>
            </label>
            <input
              id="enquiry-company"
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="E.G. SHREE KRISHNA TRADERS"
              className={inputClass}
            />
          </div>
        </div>

        {/* Phone & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="enquiry-phone" className={labelClass}>
              Phone / WhatsApp Number <span className="text-[#0F6A37] ml-0.5">*</span>
            </label>
            <input
              id="enquiry-phone"
              type="tel"
              name="phone"
              inputMode="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="10-DIGIT MOBILE NUMBER"
              className={`${inputClass} ${errors.phone ? 'border-red-500 bg-red-50/40' : ''}`}
            />
            {errors.phone && (
              <p className="mt-1 text-[11px] font-['Manrope'] font-bold text-red-600 flex items-center gap-1">
                <AlertCircle size={12} className="shrink-0" />
                <span>{errors.phone}</span>
              </p>
            )}
          </div>

          <div>
            <label htmlFor="enquiry-email" className={labelClass}>
              Email Address <span className="text-neutral-400 text-[9px] lowercase font-normal">(optional)</span>
            </label>
            <input
              id="enquiry-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="NAME@COMPANY.COM"
              className={`${inputClass} ${errors.email ? 'border-red-500 bg-red-50/40' : ''}`}
            />
            {errors.email && (
              <p className="mt-1 text-[11px] font-['Manrope'] font-bold text-red-600 flex items-center gap-1">
                <AlertCircle size={12} className="shrink-0" />
                <span>{errors.email}</span>
              </p>
            )}
          </div>
        </div>

        {/* Enquiry Type Dropdown & Preferred Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="enquiryType" className={labelClass}>
              Enquiry Type <span className="text-[#0F6A37] ml-0.5">*</span>
            </label>
            <select
              id="enquiryType"
              name="enquiryType"
              value={formData.enquiryType}
              onChange={handleChange}
              className={inputClass}
            >
              {ENQUIRY_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Preferred Contact Method</label>
            <div className="grid grid-cols-3 gap-2 mt-1">
              {['WhatsApp', 'Call', 'Email'].map((method) => (
                <label
                  key={method}
                  className={`flex items-center justify-center gap-1.5 p-2.5 rounded-lg border text-xs font-['Manrope'] font-bold cursor-pointer transition-all ${
                    formData.preferredContact === method
                      ? 'border-[#0F6A37] bg-[#EBF5EE] text-[#0F6A37]'
                      : 'border-[#C5BEB4] bg-[#F7F5F0] text-[#4A554C] hover:bg-[#e2dad0]'
                  }`}
                >
                  <input
                    type="radio"
                    name="preferredContact"
                    value={method}
                    checked={formData.preferredContact === method}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span>{method}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Message / Details Textarea */}
        <div>
          <label htmlFor="enquiry-message" className={labelClass}>
            Message / Details <span className="text-[#0F6A37] ml-0.5">*</span>
          </label>
          <textarea
            id="enquiry-message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="PLEASE SHARE SPECIFIC DETAILS REGARDING YOUR FREIGHT REQUIREMENT, ROUTE, TENDER SPECS, OR QUESTIONS..."
            className={`${inputClass} font-['Manrope'] ${errors.message ? 'border-red-500 bg-red-50/40' : ''}`}
          />
          {errors.message && (
            <p className="mt-1 text-[11px] font-['Manrope'] font-bold text-red-600 flex items-center gap-1">
              <AlertCircle size={12} className="shrink-0" />
              <span>{errors.message}</span>
            </p>
          )}
        </div>

        {/* File Attachment & Consent */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          {/* File input */}
          <div>
            <label className={labelClass}>
              Attach File <span className="text-neutral-400 text-[9px] lowercase font-normal">(optional — load specs, tenders, PDFs)</span>
            </label>
            <div className="relative">
              <input
                type="file"
                id="file-attachment"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.xlsx"
                className="sr-only"
              />
              <label
                htmlFor="file-attachment"
                className="flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-lg border-1.5 border-dashed border-[#C5BEB4] bg-[#F7F5F0] text-xs font-['Manrope'] font-medium text-[#4A554C] cursor-pointer hover:border-[#0F6A37] hover:bg-[#EBF5EE] transition-all"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <Paperclip size={16} className="text-[#0F6A37] shrink-0" />
                  <span className="truncate">
                    {selectedFile ? selectedFile.name : 'Choose file (PDF, Doc, Image)'}
                  </span>
                </div>
                {selectedFile ? (
                  <span className="text-[10px] font-bold text-[#0F6A37] bg-[#0F6A37]/10 px-2 py-0.5 rounded shrink-0">
                    {(selectedFile.size / 1024).toFixed(0)} KB
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-neutral-500 shrink-0">Browse</span>
                )}
              </label>
            </div>
            {selectedFile && (
              <p className="mt-1 text-[10px] font-['Manrope'] text-neutral-500 flex items-center gap-1">
                <FileText size={12} className="text-[#0F6A37]" />
                <span>File specs attached to request. You can also share directly on WhatsApp after submit.</span>
              </p>
            )}
          </div>

          {/* Legal Consent Checkbox */}
          <div className="flex flex-col justify-end">
            <label className="flex items-start gap-2.5 cursor-pointer p-3 rounded-xl border border-[#e2dad0] bg-[#f9f6f2] hover:border-[#0F6A37] transition-colors">
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                className="mt-0.5 rounded border-[#C5BEB4] text-[#0F6A37] focus:ring-[#0F6A37] h-4 w-4 shrink-0"
              />
              <span className="font-['Manrope'] text-xs text-[#3d4a3f] leading-relaxed">
                I confirm that the information provided is accurate and I agree to the{' '}
                <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="text-[#0F6A37] underline font-bold">Terms & Conditions</a>{' '}and{' '}
                <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#0F6A37] underline font-bold">Privacy Policy</a>.{' '}
                I authorize Shree Krishna Transport to contact me regarding this enquiry.
              </span>
            </label>
            {errors.consent && (
              <p className="mt-1 text-[11px] font-['Manrope'] font-bold text-red-600 flex items-center gap-1">
                <AlertCircle size={12} className="shrink-0" />
                <span>{errors.consent}</span>
              </p>
            )}
          </div>
        </div>

        {/* Loading / Status block */}
        {loadingStep === 'preparing' && (
          <div className="bg-[#EBF5EE] border border-[#0F6A37]/30 rounded-lg px-4 py-3 flex items-center gap-2.5 font-['Manrope'] text-xs font-bold text-[#0F6A37]">
            <Loader2 size={16} className="spinner text-[#0F6A37] shrink-0" />
            <span>Submitting enquiry and sending notification to team...</span>
          </div>
        )}


        {/* Submit button */}
        <button
          type="submit"
          disabled={isLoading}
          className="btn-brand w-full justify-center py-4 text-sm uppercase tracking-wider disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? <Loader2 size={16} className="spinner" /> : <Send size={16} />}
          {isLoading ? 'Sending Enquiry...' : 'Submit General Enquiry '}
        </button>

        <p className="font-['Inter'] text-xs text-[#6b786d] text-center">
          Guaranteed response within 1 hour. Direct email notification sent immediately.
        </p>
      </form>
    </div>
  );
};
