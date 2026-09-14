import React from 'react';
import { Truck, PackageCheck, CheckCircle, Zap } from 'lucide-react';

interface ActivityItem {
  id: string;
  icon: 'truck' | 'parcel' | 'verified' | 'quote';
  route: string;
  load: string;
  timeAgo: string;
  status: string;
}

const ACTIVITIES: ActivityItem[] = [
  { id: '1', icon: 'truck', route: 'Jaipur ➔ Mumbai Corridor', load: '32ft MXL Container (15T)', timeAgo: '14 min ago', status: 'Dispatched' },
  { id: '2', icon: 'parcel', route: 'Jaipur ➔ Delhi NCR', load: 'Express Parcel (85 kg)', timeAgo: '32 min ago', status: 'In Transit' },
  { id: '3', icon: 'quote', route: 'Jaipur ➔ Ahmedabad GIDC', load: '19ft Heavy Truck', timeAgo: '1 hr ago', status: 'Quote Sent' },
  { id: '4', icon: 'truck', route: 'Sitapura, Jaipur ➔ Pune', load: '22ft Open Taurus', timeAgo: '2 hr ago', status: 'Loaded' },
  { id: '5', icon: 'verified', route: 'Jodhpur Hub ➔ Jaipur', load: 'Fleet Partner Verified', timeAgo: '3 hr ago', status: 'Active' },
  { id: '6', icon: 'truck', route: 'Jaipur ➔ Kolkata Industrial', load: '14ft Canter (4.5T)', timeAgo: '4 hr ago', status: 'Dispatched' },
];

export const LiveActivityFeed: React.FC = () => {
  return (
    <section className="w-full bg-[#111412] text-white border-y border-neutral-800/80 py-2.5 px-4 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        
        {/* Live Badge */}
        <div className="shrink-0 flex items-center gap-2 bg-[#0F6A37]/25 border border-[#0F6A37]/50 px-2.5 py-1 rounded-md text-[#8ad7a0] font-['Space_Mono'] text-[10px] font-bold uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          <span className="hidden sm:inline">LIVE NETWORK</span>
          <span className="sm:hidden">LIVE</span>
        </div>

        {/* Scrolling Ticker Track */}
        <div className="flex-1 overflow-hidden relative">
          <div className="flex items-center gap-8 whitespace-nowrap animate-marquee hover:[animation-play-state:paused]">
            {/* Double array to create infinite loop effect */}
            {[...ACTIVITIES, ...ACTIVITIES].map((item, idx) => (
              <div 
                key={`${item.id}-${idx}`}
                className="inline-flex items-center gap-2 text-xs font-['Manrope'] text-neutral-300"
              >
                {item.icon === 'truck' && <Truck size={13} className="text-[#F4B400] shrink-0" />}
                {item.icon === 'parcel' && <PackageCheck size={13} className="text-[#8ad7a0] shrink-0" />}
                {item.icon === 'quote' && <Zap size={13} className="text-[#25D366] shrink-0" />}
                {item.icon === 'verified' && <CheckCircle size={13} className="text-[#8ad7a0] shrink-0" />}

                <span className="font-bold text-white">{item.route}</span>
                <span className="text-neutral-500">•</span>
                <span className="text-neutral-400 font-['Space_Mono'] text-[11px]">{item.load}</span>
                <span className="text-neutral-600">•</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-neutral-800 text-[#8ad7a0] font-semibold">
                  {item.status}
                </span>
                <span className="text-neutral-500 text-[10px] font-['Space_Mono']">
                  {item.timeAgo}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
