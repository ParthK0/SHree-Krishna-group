import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Truck, Package, Navigation, ChevronDown, ArrowRight, ShieldCheck } from 'lucide-react';

interface ServiceItem {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  desc: string;
  specs: string[];
  cta: string;
  link: string;
  icon: React.ElementType;
}

const services: ServiceItem[] = [
  {
    id: 'ftl',
    num: '01',
    title: 'Full Truckload (FTL) Freight',
    subtitle: 'Dedicated 14ft to 32ft multi-axle trailers with direct origin-to-destination linehaul.',
    desc: 'Ideal for industrial consignments, bulk agricultural cargo, marble, and full commercial shipments. Guaranteed direct vehicle placement with dedicated driver coordination.',
    specs: ['14ft / 19ft / 22ft / 32ft Containers', '100% Verified Drivers', 'Real-Time Dispatch WhatsApp Support'],
    cta: 'Book a Full Truck',
    link: '/book-truck',
    icon: Truck,
  },
  {
    id: 'ptl',
    num: '02',
    title: 'Part Truckload (PTL) Shared Cargo',
    subtitle: 'Cost-effective shared payload space on regular daily scheduled commercial departures.',
    desc: 'Move medium-size shipments, pallets, and bulk cartons without paying for an entire vehicle. Scheduled departures from Jaipur, Jodhpur, and Kota to major Indian cities.',
    specs: ['Economical Per-Ton / Per-Kg Rates', 'Safe Consignment Stacking', 'Scheduled Daily Departures'],
    cta: 'Book Part Load',
    link: '/book-truck',
    icon: Package,
  },
  {
    id: 'parcel',
    num: '03',
    title: 'Express Parcel Delivery (0–150 kg)',
    subtitle: 'Urgent commercial samples, spare parts, and cartons dispatched with fast transit.',
    desc: 'Fast transport for cartons, machine spare parts, business samples, and packages up to 150 kg across Rajasthan and to Delhi NCR, Mumbai, Ahmedabad, and beyond.',
    specs: ['Weight: 0 to 150 kg', 'Express Dispatch Within 24-48 Hours', 'Live WhatsApp Milestone Updates'],
    cta: 'Book a Parcel (0-150 kg)',
    link: '/book-truck?type=parcel',
    icon: Package,
  },
  {
    id: 'fleet',
    num: '04',
    title: 'Fleet & Vehicle Partner Onboarding',
    subtitle: 'Register your commercial truck or fleet to receive high-paying return loads.',
    desc: 'Connecting vehicle owners, drivers, and fleet operators with verified shippers. Minimize empty runs from Rajasthan to Delhi, Gujarat, Maharashtra, and South India.',
    specs: ['Timely Trip Payments', 'Verified Corporate Loads', 'Zero Middlemen Commission Fees'],
    cta: 'Register Your Vehicle',
    link: '/register-truck',
    icon: Navigation,
  },
];

export const TwoPathSplit: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string>('ftl');

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? '' : id));
  };

  return (
    <section id="services" className="px-4 sm:px-6 md:px-12 py-8 sm:py-12 bg-[#ECE6DD] border-t border-[#e2dacd]/60">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 border border-[#c5beb4]/50 text-[#0B3A66] font-['Space_Mono'] text-xs font-bold mb-2.5 shadow-xs">
              <ShieldCheck size={13} className="text-[#F5B51B]" />
              <span>Tailored Logistics Solutions</span>
            </div>
            <h2 className="font-['Archivo_Narrow'] text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase text-[#1a1f1b] tracking-tight leading-tight">
              Our Core Transportation Services
            </h2>
          </div>
          <p className="font-['Manrope'] text-xs sm:text-sm text-[#5a665c] max-w-md">
            Whether you need a dedicated 32-ft container, shared part-load, or express 0–150 kg parcel dispatch, we deliver with speed and transparency.
          </p>
        </div>

        {/* Numbered Service Accordion List */}
        <div className="space-y-3">
          {services.map((svc) => {
            const isExpanded = expandedId === svc.id;
            const Icon = svc.icon;

            return (
              <div
                key={svc.id}
                className={`bg-white rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden ${isExpanded
                    ? 'border-[#0B3A66]/40 shadow-xl ring-1 ring-[#0B3A66]/10'
                    : 'border-[#e2dacd] shadow-sm hover:border-[#0B3A66]/30 hover:shadow-md'
                  }`}
              >
                {/* Header Bar (Clickable) */}
                <button
                  onClick={() => toggleExpand(svc.id)}
                  aria-expanded={isExpanded}
                  className="w-full text-left p-5 sm:p-7 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-3 sm:gap-5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[#EBF2F9] flex items-center justify-center text-[#0B3A66] shrink-0 border border-[#0B3A66]/10">
                      <Icon size={20} />
                    </div>
                    <span className="font-['Space_Mono'] text-lg sm:text-xl font-extrabold text-[#F5B51B] shrink-0">
                      {svc.num}.
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-['Archivo_Narrow'] text-lg sm:text-2xl font-bold uppercase tracking-tight text-[#1a1f1b] truncate">
                        {svc.title}
                      </h3>
                      <p className="font-['Manrope'] text-xs sm:text-sm text-neutral-500 line-clamp-1 mt-0.5">
                        {svc.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${isExpanded
                        ? 'bg-[#0B3A66] text-white border-[#0B3A66]'
                        : 'bg-[#f9f7f4] text-neutral-600 border-[#e2dacd]'
                      }`}>
                      <ChevronDown size={18} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                </button>

                {/* Expanded Details Body */}
                {isExpanded && (
                  <div className="px-5 sm:px-7 pb-6 sm:pb-8 pt-2 border-t border-neutral-100 animate-in fade-in duration-200">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      <div className="md:col-span-8 space-y-4">
                        <p className="font-['Manrope'] text-xs sm:text-sm text-[#4A554C] leading-relaxed">
                          {svc.desc}
                        </p>

                        {/* Specs Pills */}
                        <div className="flex flex-wrap gap-2 pt-1">
                          {svc.specs.map((spec) => (
                            <span
                              key={spec}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#EBF2F9] text-[#0B3A66] font-['Manrope'] text-xs font-bold border border-[#0B3A66]/10"
                            >
                              <ShieldCheck size={13} className="text-[#F5B51B]" />
                              <span>{spec}</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="md:col-span-4 flex justify-start md:justify-end">
                        <Link
                          to={svc.link}
                          className="inline-flex items-center gap-2 bg-[#0B3A66] hover:bg-[#072D54] text-white font-['Manrope'] font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 group"
                        >
                          <span>{svc.cta}</span>
                          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1 text-[#F5B51B]" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
