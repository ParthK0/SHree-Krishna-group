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

export const RefundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#ECE6DD] py-10 md:py-16 px-4 md:px-12">
      <div className="max-w-3xl mx-auto space-y-8">

        <div className="flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 font-['Manrope'] text-xs font-bold text-[#0F6A37] hover:text-[#134E3A] uppercase tracking-wider transition-colors">
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
          <div className="font-['Space_Mono'] text-xs text-[#5a665c]">
            Home / <span className="text-[#0F6A37] font-bold">Cancellation & Refund</span>
          </div>
        </div>

        <div className="bg-white border border-[#c5beb4] rounded-2xl p-6 md:p-10 shadow-sm space-y-8">
          <div>
            <h1 className="font-['Archivo_Narrow'] text-3xl md:text-4xl font-bold uppercase text-[#1a1f1b]">
              Cancellation & Refund Policy
            </h1>
            <p className="font-['Manrope'] text-xs text-[#6b786d] mt-2">Last updated: August 2025</p>
          </div>

          <Section title="Before Vehicle Confirmation">
            <p><strong>Free cancellation.</strong></p>
            <p>If you cancel your booking request before a vehicle is confirmed and assigned to your consignment, there is no cancellation charge. Simply contact us via WhatsApp or phone to cancel.</p>
          </Section>

          <Section title="After Vehicle Confirmation">
            <p>Once a vehicle has been confirmed and the transporter has committed to the trip, a cancellation fee may apply.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>The exact fee depends on the distance the vehicle has already committed or travelled.</li>
              <li>Cancellation fees will be communicated clearly at the time of vehicle confirmation.</li>
              <li>No charge is levied without prior notice and your acknowledgement.</li>
            </ul>
          </Section>

          <Section title="Refund Timelines">
            <p>Since {BUSINESS_NAME} does not collect any advance payment through this website, refunds are only applicable in cases where payment was agreed and collected directly during a trip confirmation.</p>
            <p>Refund queries are handled on a case-by-case basis. Please contact us directly to initiate any refund request.</p>
            <p>Refunds, where applicable, will be processed within 7–10 business days via the original payment method agreed upon.</p>
          </Section>

          <Section title="Contact Us for Cancellations">
            <p>To cancel a booking or raise a refund query, please contact us directly:</p>
            <p>WhatsApp / Phone: <strong>{PHONE_DISPLAY}</strong></p>
            <p>Email: <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#0F6A37] underline">{CONTACT_EMAIL}</a></p>
            <p>Please include your name, booking details, and reason for cancellation in your message.</p>
          </Section>
        </div>

      </div>
    </div>
  );
};
