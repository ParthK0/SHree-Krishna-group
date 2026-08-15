import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { BUSINESS_NAME, CONTACT_EMAIL, PHONE_DISPLAY, ADDRESS_FULL } from '../lib/constants';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="space-y-3 pb-6 border-b border-[#e2dad0] last:border-0 last:pb-0">
    <h2 className="font-['Archivo_Narrow'] text-xl font-bold uppercase text-[#1a1f1b]">{title}</h2>
    <div className="font-['Manrope'] text-sm text-[#4A554C] leading-relaxed space-y-2">{children}</div>
  </div>
);

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#ECE6DD] py-10 md:py-16 px-4 md:px-12">
      <div className="max-w-3xl mx-auto space-y-8">

        <div className="flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 font-['Manrope'] text-xs font-bold text-[#0F6A37] hover:text-[#134E3A] uppercase tracking-wider transition-colors">
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
          <div className="font-['Space_Mono'] text-xs text-[#5a665c]">
            Home / <span className="text-[#0F6A37] font-bold">Terms & Conditions</span>
          </div>
        </div>

        <div className="bg-white border border-[#c5beb4] rounded-2xl p-6 md:p-10 shadow-sm space-y-8">
          <div>
            <h1 className="font-['Archivo_Narrow'] text-3xl md:text-4xl font-bold uppercase text-[#1a1f1b]">
              Terms & Conditions
            </h1>
            <p className="font-['Manrope'] text-xs text-[#6b786d] mt-2">Last updated: August 2025</p>
          </div>

          <Section title="1. About Us">
            <p>{BUSINESS_NAME} ("we", "us", "our") is a road transportation service provider based in Jaipur, Rajasthan, operating under the parent entity Shree Krishna Buildtech. We provide freight booking, vehicle registration, and logistics enquiry services across Rajasthan and Pan India.</p>
            <p>Registered Address: {ADDRESS_FULL}</p>
          </Section>

          <Section title="2. Quotations">
            <p>All quotations provided through our website or WhatsApp are estimates based on information submitted. Final pricing is subject to vehicle availability, route conditions, load type, and confirmation by our operations team.</p>
            <p>No payment is collected through this website. Pricing is agreed directly between the customer and {BUSINESS_NAME} before any transportation begins.</p>
          </Section>

          <Section title="3. Customer Responsibilities">
            <p>By submitting a booking request, you confirm that:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>The shipment details provided are accurate and complete.</li>
              <li>The goods are legal for road transportation under applicable Indian laws.</li>
              <li>Any GST, E-Way Bill, or government documentation required for the shipment is your responsibility.</li>
              <li>You have the legal right to ship the goods specified.</li>
            </ul>
          </Section>

          <Section title="4. Transporter Responsibilities">
            <p>Truck owners and drivers registering on this platform confirm that:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>They are the owner or duly authorized operator of the registered vehicle.</li>
              <li>All vehicle documents (RC, Insurance, Permit, Fitness Certificate, PUC) are valid and current.</li>
              <li>Their Driving Licence is valid for the vehicle class operated.</li>
              <li>{BUSINESS_NAME} reserves the right to verify submitted documents before assigning loads.</li>
            </ul>
          </Section>

          <Section title="5. Cancellation">
            <p>Cancellations before vehicle confirmation are free of charge.</p>
            <p>Cancellations after vehicle confirmation may attract a cancellation fee depending on the distance committed by the transporter. Details will be communicated at the time of booking confirmation.</p>
            <p>See our full <Link to="/cancellation-refund-policy" className="text-[#0F6A37] underline">Cancellation & Refund Policy</Link> for details.</p>
          </Section>

          <Section title="6. Liability">
            <p>{BUSINESS_NAME} acts as a freight intermediary and is not liable for loss, damage, delay, or any claim arising from the actual transportation of goods unless a separate written agreement specifying liability is in place.</p>
            <p>We recommend shippers obtain appropriate cargo insurance for high-value consignments.</p>
          </Section>

          <Section title="7. Governing Law">
            <p>These Terms & Conditions are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Jaipur, Rajasthan.</p>
          </Section>

          <Section title="8. Contact">
            <p>For any queries regarding these terms, contact us:</p>
            <p>Email: <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#0F6A37] underline">{CONTACT_EMAIL}</a></p>
            <p>Phone: {PHONE_DISPLAY}</p>
          </Section>
        </div>

      </div>
    </div>
  );
};
