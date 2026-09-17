import React from 'react';
import { Star, ShieldCheck, Quote, CheckCircle2 } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  designation: string;
  company: string;
  location: string;
  sector: string;
  rating: number;
  review: string;
  loadType: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Rajesh Agarwal',
    designation: 'Managing Director',
    company: 'Agarwal Stone & Marble Industries',
    location: 'Kishangarh & Jaipur',
    sector: 'Marble & Granite',
    rating: 5,
    review:
      'We regularly move heavy 20-ton polished granite slabs from Kishangarh to Delhi NCR and Bengaluru. Shree Krishna Transport has provided drivers who understand delicate cargo lashing. Zero slab breakages in over 40 dispatches.',
    loadType: 'Heavy Multi-Axle FTL',
  },
  {
    id: '2',
    name: 'Sunil Mehta',
    designation: 'Head of Supply Chain',
    company: 'Jaipur Heritage Textile Prints',
    location: 'Sanganer, Jaipur',
    sector: 'Textiles & Apparel',
    rating: 5,
    review:
      'Our export consignments require moisture-tight containers. Deepesh and his team dispatch 32ft MXL containers to Mumbai Nhava Sheva and Surat like clockwork. Direct WhatsApp updates save our logistics team hours each day.',
    loadType: '32ft Container & 19ft Closed',
  },
  {
    id: '3',
    name: 'Vikram Shekhawat',
    designation: 'Director of Operations',
    company: 'Shekhawat Precision Engineering',
    location: 'Sitapura Industrial Area, Jaipur',
    sector: 'Machinery & Tools',
    rating: 5,
    review:
      'Getting a verified truck within 60 minutes with full GST invoicing and instant E-Way bill support has transformed our dispatch speed. Transparent pricing with no surprise toll or detention charges.',
    loadType: '14ft & 17ft Canters',
  },
  {
    id: '4',
    name: 'Pooja Sharma',
    designation: 'Logistics Coordinator',
    company: 'CraftVogue Export House',
    location: 'Mansarovar, Jaipur',
    sector: 'Handicrafts & Decor',
    rating: 5,
    review:
      'Their 0–150 kg parcel service is a game-changer for commercial samples. We dispatch sample cartons to Delhi and Ahmedabad without booking an entire truck, yet get full door-to-door courier speed and tracking.',
    loadType: 'Express Parcel (0–150 kg)',
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section className="px-4 md:px-12 py-12 md:py-16 bg-[#ECE6DD] border-b border-[#e2dad0]">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header with Google Rating Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#062448]/15 border border-[#062448]/30 text-[#062448] font-['Space_Mono'] text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck size={13} />
              <span>Verified Client Feedback</span>
            </div>
            <h2 className="font-['Archivo_Narrow'] text-2xl md:text-4xl font-bold uppercase text-[#1a1f1b]">
              Trusted by 100+ Manufacturers &amp; Traders
            </h2>
            <p className="font-['Manrope'] text-xs md:text-sm text-[#4A554C] mt-1 max-w-xl">
              See why Rajasthan's prominent industrial enterprises rely on Shree Krishna Transport for their critical supply chain dispatches.
            </p>
          </div>

          {/* Google Reviews Badge */}
          <div className="bg-white border border-[#c5beb4] rounded-2xl p-4 shadow-sm flex items-center gap-4 shrink-0">
            <div className="w-12 h-12 rounded-xl bg-[#FFF8E1] border border-[#E9A015]/40 flex flex-col items-center justify-center">
              <span className="font-['Space_Mono'] text-lg font-bold text-[#b07d00] leading-none">4.9</span>
              <div className="flex text-[#E9A015] text-[9px] mt-0.5">
                {'★'.repeat(5)}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1 font-['Manrope'] font-bold text-xs text-[#1a1f1b]">
                <span>Google Verified Rating</span>
                <CheckCircle2 size={13} className="text-[#25D366]" />
              </div>
              <p className="font-['Space_Mono'] text-[11px] text-[#6b786d]">
                120+ B2B Client Reviews
              </p>
            </div>
          </div>
        </div>

        {/* 4-Card Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white border border-[#c5beb4] rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md hover:border-[#062448]/50 transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div className="space-y-4">
                
                {/* Header: Stars & Sector Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#E9A015]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="#E9A015" />
                    ))}
                  </div>

                  <span className="text-[10px] font-['Space_Mono'] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#FAF7F2] text-[#062448] border border-[#e2dad0]">
                    {t.sector}
                  </span>
                </div>

                {/* Review Text */}
                <div className="relative">
                  <Quote size={24} className="text-[#062448]/15 absolute -top-2 -left-1 pointer-events-none" />
                  <p className="font-['Manrope'] text-xs sm:text-sm text-[#2E3630] leading-relaxed relative z-10 pl-4 border-l-2 border-[#062448]">
                    "{t.review}"
                  </p>
                </div>

              </div>

              {/* Author Details Footer */}
              <div className="pt-5 mt-5 border-t border-[#e5ebe7] flex items-center justify-between">
                <div>
                  <h4 className="font-['Archivo_Narrow'] text-sm sm:text-base font-bold uppercase text-[#1a1f1b]">
                    {t.name}
                  </h4>
                  <div className="font-['Manrope'] text-[11px] text-[#6b786d]">
                    {t.designation}, <span className="font-semibold text-[#1a1f1b]">{t.company}</span>
                  </div>
                  <div className="font-['Space_Mono'] text-[10px] text-[#6b786d]">
                    📍 {t.location}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[9px] font-['Space_Mono'] font-bold text-[#062448] bg-[#EBF2F9] px-2 py-1 rounded">
                    {t.loadType}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
