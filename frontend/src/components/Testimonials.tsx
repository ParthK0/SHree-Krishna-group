import React from 'react';
import { Star, Quote, MapPin, CheckCircle2 } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  city: string;
  route: string;
  quote: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Vikram Singhal',
    role: 'Managing Director',
    company: 'Singhal Stone & Marble Pvt Ltd',
    city: 'Kishangarh / Jaipur',
    route: 'Jaipur → Delhi NCR',
    quote:
      'We dispatch multi-ton marble slabs twice a week to Noida and Gurugram. Shree Krishna Transport provides verified 17ft and 22ft trucks on short notice with proper E-Way bill compliance. Zero transit damage in 8 months.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Mahesh Agarwal',
    role: 'Logistics Head',
    company: 'Maruti Metal Fabricators',
    city: 'Jaipur (VKIA)',
    route: 'Jaipur → Ahmedabad',
    quote:
      'Transparent pricing with no hidden driver claims at the unloading point. Their dispatch desk confirmed our 32ft container within 45 minutes of booking online.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Dinesh Choudhary',
    role: 'Proprietor',
    company: 'Choudhary Agro Spares',
    city: 'Jodhpur',
    route: 'Jodhpur → Jaipur',
    quote:
      'Their parcel and part-load service is great for urgent machinery spare parts. Consignment was delivered the very next day with continuous WhatsApp updates.',
    rating: 5,
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B3A66]/10 text-[#0B3A66] font-['Space_Mono'] text-xs font-bold uppercase tracking-wider mb-3">
          <span>Client Trust &amp; Verified Feedback</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-['Archivo_Narrow'] uppercase tracking-tight text-[#071F35]">
          Trusted by Businesses Across Rajasthan &amp; India
        </h2>
        <p className="mt-3 text-sm sm:text-base text-neutral-600 font-['Manrope']">
          Real feedback from manufacturing units, stone exporters, and commercial traders who rely on our fleet daily.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative group"
          >
            <div className="space-y-4">
              {/* Star Rating & Quote Icon */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-[#F5B51B]">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} fill="#F5B51B" stroke="#F5B51B" />
                  ))}
                </div>
                <Quote size={24} className="text-[#0B3A66]/20 group-hover:text-[#0B3A66]/40 transition-colors" />
              </div>

              {/* Quote Text */}
              <p className="text-sm text-neutral-700 font-['Manrope'] leading-relaxed italic">
                "{t.quote}"
              </p>
            </div>

            {/* Author Profile & Corridor Tag */}
            <div className="pt-6 mt-6 border-t border-neutral-100 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#071F35] font-['Manrope'] flex items-center gap-1.5">
                    <span>{t.name}</span>
                    <CheckCircle2 size={14} className="text-emerald-600" />
                  </h3>
                  <p className="text-[11px] text-neutral-500 font-['Manrope']">
                    {t.role}, {t.company}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] font-['Space_Mono'] text-[#0B3A66] bg-[#EBF2F9] px-2.5 py-1 rounded-lg">
                <span className="flex items-center gap-1">
                  <MapPin size={11} /> {t.city}
                </span>
                <span className="font-bold">{t.route}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
