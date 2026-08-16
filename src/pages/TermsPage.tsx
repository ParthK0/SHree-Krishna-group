import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { BUSINESS_NAME, CONTACT_EMAIL, PHONE_DISPLAY, ADDRESS_FULL, GSTIN } from '../lib/constants';

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
            <p className="font-['Manrope'] text-xs text-[#6b786d] mt-2">Last updated: February 2026</p>
          </div>

          <Section title="1. About Shree Krishna Transport">
            <p>
              <strong>Shree Krishna Transport</strong> is a transportation service provider and freight facilitator based in Jaipur, Rajasthan (GSTIN: <span className="font-['Space_Mono'] font-bold text-[#0F6A37]">{GSTIN}</span>). We connect customers with our network of independent transport partners to arrange transportation services across India. Unless expressly agreed otherwise in writing, Shree Krishna Transport does not own or operate the vehicles used for transportation.
            </p>
            <p className="text-xs text-[#6b786d]">Registered Address: {ADDRESS_FULL}</p>
          </Section>

          <Section title="2. Quotations & Pricing">
            <p>All freight quotations provided through our website, telephone, or WhatsApp are estimates based on details submitted. Final pricing is subject to vehicle availability, route conditions, cargo weight/volume verification, and confirmation by our operations team.</p>
            <p>No payment is collected directly on this website. Pricing and terms are agreed upon directly between the customer and {BUSINESS_NAME} prior to vehicle dispatch.</p>
          </Section>

          <Section title="3. Customer Responsibilities & Dangerous Goods">
            <p>By submitting a booking request, you confirm that:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>The shipment details, weight, and goods classification provided are accurate and complete.</li>
              <li>The goods are legal for road transportation under applicable state and central Indian laws.</li>
              <li>Applicable GST, E-Way Bill, and government transportation documentation requirements have been fulfilled.</li>
              <li>You have full authority to request transportation of the specified consignment.</li>
            </ul>
            <p className="font-semibold text-[#1a1f1b] pt-1">Prohibited & Restricted Cargo:</p>
            <p className="bg-[#FFF8E1] border border-[#FFE082] p-3 rounded-lg text-xs font-['Manrope'] text-[#5D4037]">
              <strong>Dangerous Goods Notice:</strong> We currently do not arrange transportation of hazardous, explosive, illegal, or restricted goods unless specifically agreed in writing.
            </p>
          </Section>

          <Section title="4. Lorry Receipt (LR) & Booking Reference">
            <p>
              <strong>Consignment Note / LR:</strong> The independent transporter assigned to your shipment issues the Lorry Receipt (LR) / consignment note for cargo delivery.
            </p>
            <p>
              <strong>Booking Reference ID:</strong> Shree Krishna Transport provides a unique Booking Reference ID (e.g., <code className="bg-[#f4f0ea] px-1.5 py-0.5 rounded font-['Space_Mono'] text-xs text-[#0F6A37]">SKT-BK-12345</code>) for your request to facilitate direct tracking and communication with our dispatch desk.
            </p>
          </Section>

          <Section title="5. Vehicle Availability & Cancellation">
            <p>Cancellations requested before vehicle dispatch/confirmation are free of charge.</p>
            <p>If a confirmed transporter becomes unavailable due to unforeseen operational issues, Shree Krishna Transport will make reasonable efforts to arrange an alternate vehicle. Availability cannot be guaranteed.</p>
            <p>See our full <Link to="/cancellation-refund-policy" className="text-[#0F6A37] underline font-bold">Cancellation & Refund Policy</Link> for details.</p>
          </Section>

          <Section title="6. Force Majeure">
            <p>Neither party shall be liable for delays, failure in performance, or loss caused by natural disasters, strikes, severe weather, road closures, government restrictions, accidents, or other events beyond reasonable control.</p>
          </Section>

          <Section title="7. Transporter & Driver Obligations">
            <p>Truck owners and fleet operators registering on this platform confirm that:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>They are the owner or authorized operator of the registered vehicle.</li>
              <li>All statutory vehicle documentation (RC, Commercial Permit, Fitness Certificate, PUC, and Insurance) is valid and compliant.</li>
              <li>Drivers hold a valid Commercial Driving Licence for the vehicle class operated.</li>
            </ul>
          </Section>

          <Section title="8. Liability & Insurance">
            <p>{BUSINESS_NAME} acts as a freight service facilitator and is not liable for loss, damage, delay, or transit claims unless a separate written agreement specifying liability is executed.</p>
            <p>Shippers are advised to obtain transit insurance for valuable or fragile cargo.</p>
          </Section>

          <Section title="9. Terms Updates">
            <p>We may update these Terms & Conditions from time to time. Updated versions will be published on this website.</p>
          </Section>

          <Section title="10. Governing Law">
            <p>These Terms & Conditions are governed by the laws of India. Any legal disputes shall be subject to the exclusive jurisdiction of courts in Jaipur, Rajasthan.</p>
          </Section>

          <Section title="11. Contact & Legal Details">
            <p>For any operational or legal inquiries regarding these terms:</p>
            <p><strong>Business Name:</strong> {BUSINESS_NAME} (Parent Entity: Shree Krishna Buildtech)</p>
            <p><strong>GSTIN:</strong> <span className="font-['Space_Mono'] font-bold text-[#0F6A37]">{GSTIN}</span></p>
            <p><strong>Email:</strong> <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#0F6A37] underline">{CONTACT_EMAIL}</a></p>
            <p><strong>Phone / WhatsApp:</strong> {PHONE_DISPLAY}</p>
          </Section>
        </div>

      </div>
    </div>
  );
};

