import { ShieldCheck, Award, Smartphone, Users } from 'lucide-react';

const cards = [
  {
    image: '/images/team_logistics.jpg',
    title: 'Expert Logistics Team',
    subtitle: 'From local departures in Jaipur, Jodhpur & Kota to nationwide destinations, our experienced fleet desk and verified drivers keep your shipments moving smoothly.',
    badge: 'Verified Drivers',
    badgeIcon: Users,
  },
  {
    image: '/images/warehouse_delivery.jpg',
    title: 'Reliable Linehaul Delivery',
    subtitle: 'Transparent contracting, 100% GST & E-Way bill compliance, and scheduled commercial dispatches with guaranteed quotes delivered within 60 minutes.',
    badge: '100% Compliant',
    badgeIcon: ShieldCheck,
  },
  {
    image: '/images/smart_tracking.jpg',
    title: 'Smart Milestone Tracking',
    subtitle: 'Direct WhatsApp milestones, driver contact sharing, and proactive dispatch updates ensuring complete peace of mind from pickup to POD delivery.',
    badge: 'Live Coordination',
    badgeIcon: Smartphone,
  },
];

export const WhyChooseUsVisual: React.FC = () => {
  return (
    <section className="px-4 sm:px-6 md:px-12 py-8 sm:py-12 bg-[#ECE6DD] border-t border-[#e2dacd]/60">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 border border-[#c5beb4]/50 text-[#0B3A66] font-['Space_Mono'] text-xs font-bold mb-2.5 shadow-xs">
            <Award size={13} className="text-[#F5B51B]" />
            <span>Why Choose Us</span>
          </div>
          <h2 className="font-['Archivo_Narrow'] text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase text-[#1a1f1b] tracking-tight leading-tight mb-2.5">
            Delivering Excellence Through Reliability and Trust
          </h2>
          <p className="font-['Manrope'] text-xs sm:text-sm text-[#5a665c] leading-relaxed">
            Combining real-world contracting discipline with responsive communication to elevate logistics standards for businesses across Rajasthan and India.
          </p>
        </div>

        {/* 3-Card Visual Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {cards.map((card, idx) => {
            const BadgeIcon = card.badgeIcon;
            return (
              <div
                key={idx}
                className="relative rounded-[28px] overflow-hidden min-h-[380px] sm:min-h-[420px] flex flex-col justify-between p-6 sm:p-7 shadow-xl border border-white/60 group hover:-translate-y-1.5 transition-all duration-300"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${card.image}')` }}
                />

                {/* Multilayer Gradient Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/30 pointer-events-none" />

                {/* Top Badge */}
                <div className="relative z-10 self-start">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white font-['Space_Mono'] text-[10px] sm:text-xs font-bold border border-white/30 shadow-sm">
                    <BadgeIcon size={12} className="text-[#F5B51B]" />
                    <span>{card.badge}</span>
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="relative z-10">
                  <h3 className="font-['Archivo_Narrow'] text-xl sm:text-2xl font-bold uppercase tracking-tight text-white mb-2 leading-tight">
                    {card.title}
                  </h3>
                  <p className="font-['Manrope'] text-xs text-neutral-200 leading-relaxed line-clamp-3">
                    {card.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
