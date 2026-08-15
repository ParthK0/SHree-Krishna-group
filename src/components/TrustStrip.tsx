import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const trustItems = [
  'GST Registered',
  'Rajasthan Based',
  'PAN India Transport Network',
  'Quote Within 1 Hour',
  'Verified Transport Partners',
  'WhatsApp Business Support',
];

export const TrustStrip: React.FC = () => {
  return (
    <section className="bg-[#1C201D] border-y border-neutral-800 py-7 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        <p className="font-['Manrope'] text-[10px] font-bold text-[#8ad7a0] uppercase tracking-widest mb-4 text-center">
          Why Choose Shree Krishna Transport
        </p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
          {trustItems.map((item) => (
            <div key={item} className="flex items-center gap-2 text-neutral-200">
              <CheckCircle2 size={15} className="text-[#0F6A37] shrink-0" />
              <span className="font-['Manrope'] text-xs font-semibold">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
