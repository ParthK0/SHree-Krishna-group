import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layers, ArrowRight, ShieldCheck, Truck } from 'lucide-react';

interface IndustryItem {
  id: string;
  icon: string;
  title: string;
  hub: string;
  recommendedFleet: string;
  description: string;
  popularRoutes: string;
}

const INDUSTRIES: IndustryItem[] = [
  {
    id: 'marble',
    icon: '🏗️',
    title: 'Marble, Granite & Tiles',
    hub: 'Kishangarh • Rajsamand • Makrana',
    recommendedFleet: '10–12 Tyre Heavy Trucks & Multi-Axle Trailers',
    description: 'Specialized heavy payload transport equipped for delicate stone slabs, marble blocks, and polished vitrified tiles with protective lashing.',
    popularRoutes: 'Jaipur ➔ Delhi NCR, Mumbai, Ahmedabad, Bengaluru',
  },
  {
    id: 'steel',
    icon: '🔩',
    title: 'Steel, Iron & Heavy Metals',
    hub: 'Jaipur • Bhiwadi • Alwar Industrial Belt',
    recommendedFleet: '20–22 ft Taurus & Open High-Deck Carriers',
    description: 'High tensile strapping and certified weight compliance for structural pipes, steel coils, angles, and heavy fabrication components.',
    popularRoutes: 'Jaipur ➔ Gujarat Ports, Pune, Hyderabad',
  },
  {
    id: 'textile',
    icon: '🧵',
    title: 'Textiles, Garments & Handicrafts',
    hub: 'Sanganer • Bhilwara • Jaipur City',
    recommendedFleet: '32 ft MXL Sealed Containers & 19 ft High-Cube',
    description: 'Moisture-proof, dust-free sealed container freight engineered for export cartons, fabric bales, block prints, and readymade apparel.',
    popularRoutes: 'Jaipur ➔ Surat, Mumbai Nhava Sheva, Delhi Cargo',
  },
  {
    id: 'fmcg',
    icon: '📦',
    title: 'FMCG, Food & Retail Distribution',
    hub: 'Sitapura • VKI Area • Delhi-NCR Hubs',
    recommendedFleet: '14 ft / 17 ft Closed Canters & Express Part-Load',
    description: 'Time-critical scheduled dispatches with daily runs for consumer goods, packaged foods, cosmetics, and seasonal retail inventory.',
    popularRoutes: 'Rajasthan Statewide & Delhi-NCR Express Corridors',
  },
  {
    id: 'machinery',
    icon: '⚙️',
    title: 'Machinery & Electrical Panels',
    hub: 'VKI Area • Sitapura • Neemrana Electronics Zone',
    recommendedFleet: '17 ft to 22 ft Open/Closed Air-Suspension Trucks',
    description: 'Shock-protected transit for control panels, precision tooling, transformers, pumps, and automation machinery with tarpaulin coverage.',
    popularRoutes: 'Jaipur ➔ Indore, Chennai, Kolkata, Pune',
  },
  {
    id: 'agro',
    icon: '🌾',
    title: 'Agro Products & Commodities',
    hub: 'Kota • Bikaner • Sri Ganganagar Mandis',
    recommendedFleet: 'Heavy Commercial Open Trucks & High Deck Trailers',
    description: 'Bulk dispatch for spices, mustard seeds, grains, pulses, and animal feed with waterproof lamination and rapid mandi clearance.',
    popularRoutes: 'Rajasthan Mandis ➔ Major Processing Hubs Pan-India',
  },
];

export const IndustryStrip: React.FC = () => {
  const [activeTab, setActiveTab] = useState(INDUSTRIES[0].id);
  const current = INDUSTRIES.find((i) => i.id === activeTab) || INDUSTRIES[0];

  return (
    <section className="px-4 md:px-12 py-12 md:py-16 bg-[#F4EFE6] border-b border-[#e2dad0]">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F6A37]/15 border border-[#0F6A37]/30 text-[#0F6A37] font-['Space_Mono'] text-xs font-bold uppercase tracking-wider mb-2">
              <Layers size={13} />
              <span>Specialized Freight Sectors</span>
            </div>
            <h2 className="font-['Archivo_Narrow'] text-2xl md:text-4xl font-bold uppercase text-[#1a1f1b]">
              Tailored Logistics for Core Industries
            </h2>
            <p className="font-['Manrope'] text-xs md:text-sm text-[#4A554C] mt-1 max-w-xl">
              From heavy Kishangarh marble to delicate export garments, our dedicated fleet configurations guarantee cargo safety and regulatory compliance.
            </p>
          </div>

          <Link
            to="/routes"
            className="inline-flex items-center gap-1.5 font-['Manrope'] text-xs font-extrabold text-[#0F6A37] hover:text-[#134E3A] uppercase tracking-wider transition-colors shrink-0"
          >
            <span>Explore All Industrial Corridors</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Industry Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none mb-6">
          {INDUSTRIES.map((ind) => {
            const isActive = ind.id === activeTab;
            return (
              <button
                key={ind.id}
                onClick={() => setActiveTab(ind.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-['Manrope'] font-bold text-xs uppercase tracking-wider whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-[#0F6A37] text-white border-[#0F6A37] shadow-md'
                    : 'bg-white text-[#3d4a3f] border-[#c5beb4] hover:border-[#0F6A37]'
                }`}
              >
                <span>{ind.icon}</span>
                <span>{ind.title.split(',')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Active Industry Detail Spotlight Card */}
        <div className="bg-white rounded-2xl border border-[#c5beb4] p-6 md:p-8 shadow-sm transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{current.icon}</span>
                <div>
                  <h3 className="font-['Archivo_Narrow'] text-2xl font-bold uppercase text-[#1a1f1b]">
                    {current.title}
                  </h3>
                  <p className="font-['Space_Mono'] text-xs text-[#0F6A37] font-bold">
                    Hubs: {current.hub}
                  </p>
                </div>
              </div>

              <p className="font-['Manrope'] text-sm text-[#4A554C] leading-relaxed">
                {current.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#e2dad0]">
                  <div className="font-['Manrope'] text-[10px] font-bold uppercase tracking-wider text-[#6b786d] mb-1 flex items-center gap-1.5">
                    <Truck size={12} className="text-[#0F6A37]" />
                    <span>Recommended Fleet</span>
                  </div>
                  <div className="font-['Manrope'] text-xs font-bold text-[#1a1f1b]">
                    {current.recommendedFleet}
                  </div>
                </div>

                <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#e2dad0]">
                  <div className="font-['Manrope'] text-[10px] font-bold uppercase tracking-wider text-[#6b786d] mb-1 flex items-center gap-1.5">
                    <ShieldCheck size={12} className="text-[#F4B400]" />
                    <span>Key Corridors</span>
                  </div>
                  <div className="font-['Manrope'] text-xs font-bold text-[#1a1f1b]">
                    {current.popularRoutes}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Box */}
            <div className="lg:col-span-4 bg-[#1C201D] text-white p-6 rounded-xl space-y-3 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-['Space_Mono'] text-[#8ad7a0] uppercase font-bold tracking-wider mb-1">
                  Dedicated Business Account
                </div>
                <h4 className="font-['Archivo_Narrow'] text-lg font-bold uppercase text-white leading-tight">
                  Need Contract Logistics or Bulk Dispatch?
                </h4>
                <p className="font-['Manrope'] text-xs text-neutral-400 mt-2">
                  Get preferential business freight rates, dedicated fleet availability, and centralized GST invoicing.
                </p>
              </div>

              <Link
                to="/book-truck"
                className="inline-flex items-center justify-center gap-2 bg-[#F4B400] hover:bg-[#e0a500] text-[#6c5000] font-['Manrope'] font-bold text-xs py-3 px-4 rounded-lg uppercase tracking-wider transition-all shadow-md mt-2"
              >
                <span>Request Custom Quote</span>
                <ArrowRight size={14} />
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
