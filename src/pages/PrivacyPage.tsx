import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { BUSINESS_NAME, CONTACT_EMAIL, PHONE_DISPLAY } from '../lib/constants';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="space-y-3 pb-6 border-b border-[#e2dad0] last:border-0 last:pb-0">
    <h2 className="font-['Archivo_Narrow'] text-xl font-bold uppercase text-[#1a1f1b]">{title}</h2>
    <div className="font-['Manrope'] text-sm text-[#4A554C] leading-relaxed space-y-2">{children}</div>
  </div>
);

export const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#ECE6DD] py-10 md:py-16 px-4 md:px-12">
      <div className="max-w-3xl mx-auto space-y-8">

        <div className="flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 font-['Manrope'] text-xs font-bold text-[#0F6A37] hover:text-[#134E3A] uppercase tracking-wider transition-colors">
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
          <div className="font-['Space_Mono'] text-xs text-[#5a665c]">
            Home / <span className="text-[#0F6A37] font-bold">Privacy Policy</span>
          </div>
        </div>

        <div className="bg-white border border-[#c5beb4] rounded-2xl p-6 md:p-10 shadow-sm space-y-8">
          <div>
            <h1 className="font-['Archivo_Narrow'] text-3xl md:text-4xl font-bold uppercase text-[#1a1f1b]">
              Privacy Policy
            </h1>
            <p className="font-['Manrope'] text-xs text-[#6b786d] mt-2">Last updated: August 2025</p>
          </div>

          <Section title="Information We Collect">
            <p>When you use our website forms (Book a Truck, Register Vehicle, General Enquiry), we collect:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Personal details:</strong> Name, phone number, email address</li>
              <li><strong>Business details:</strong> Company name, GSTIN (if provided)</li>
              <li><strong>Shipment details:</strong> Pickup/drop locations, goods type, truck requirements</li>
              <li><strong>Vehicle details (for drivers):</strong> Driving licence number, vehicle registration number, vehicle type</li>
            </ul>
          </Section>

          <Section title="Why We Collect It">
            <p>We collect this information solely to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Process freight booking and vehicle registration requests</li>
              <li>Contact you regarding your enquiry or booking</li>
              <li>Provide freight quotations</li>
              <li>Operate and improve our transportation services</li>
            </ul>
            <p>We do not collect payment information through this website.</p>
          </Section>

          <Section title="How We Use It">
            <p>Your submitted information is:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Forwarded to our operations team via WhatsApp and email for processing</li>
              <li>Used only for the purpose stated at the time of submission</li>
              <li>Not sold or rented to third parties</li>
              <li>Not used for unsolicited marketing</li>
            </ul>
          </Section>

          <Section title="Data Security">
            <p>Your data is transmitted to our team via WhatsApp Business and email. We do not maintain a database of customer submissions on this website.</p>
            <p>We recommend you do not submit sensitive documents through the website's general enquiry form. For document sharing, use our WhatsApp number directly.</p>
          </Section>

          <Section title="Contact">
            <p>For any privacy-related queries or to request deletion of your data, contact us:</p>
            <p>Email: <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#0F6A37] underline">{CONTACT_EMAIL}</a></p>
            <p>Phone: {PHONE_DISPLAY}</p>
            <p>{BUSINESS_NAME} is committed to handling your personal data responsibly and in accordance with applicable Indian data protection laws.</p>
          </Section>
        </div>

      </div>
    </div>
  );
};
