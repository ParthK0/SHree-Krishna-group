import React, { useEffect, useRef, useState } from 'react';
import { Truck, PackageCheck, MapPin, ShieldCheck, Clock, TrendingUp } from 'lucide-react';

interface StatItem {
  icon: React.ReactNode;
  end: number;
  decimals?: number;
  suffix: string;
  prefix?: string;
  label: string;
  sublabel: string;
  sparkline: string; // SVG path data for micro-trend
  accentColor: string;
}

function useCountUp(end: number, duration: number, triggered: boolean, decimals = 0) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!triggered) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(decimals > 0 ? parseFloat(start.toFixed(decimals)) : Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [triggered, end, duration, decimals]);
  return count;
}

const StatCardItem: React.FC<{ item: StatItem; triggered: boolean }> = ({ item, triggered }) => {
  const count = useCountUp(item.end, 1200, triggered, item.decimals);

  return (
    <div className="bg-[#1C201D] border border-neutral-800 hover:border-[#062448] p-4 sm:p-5 rounded-xl shadow-lg transition-all duration-300 flex flex-col justify-between group">
      {/* Top Row: Icon + Micro Sparkline */}
      <div className="flex items-center justify-between mb-3">
        <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center text-[#85B7EB] border border-neutral-800 group-hover:border-[#062448] transition-colors">
          {item.icon}
        </div>

        {/* Micro Sparkline Curve */}
        <svg className="w-14 h-5 overflow-visible opacity-60 group-hover:opacity-100 transition-opacity" viewBox="0 0 60 20">
          <path
            d={item.sparkline}
            fill="none"
            stroke={item.accentColor}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Number Count-up */}
      <div>
        <div className="font-['Space_Mono'] text-2xl sm:text-3xl font-bold text-white tracking-tight leading-none mb-1 group-hover:text-[#85B7EB] transition-colors">
          {item.prefix || ''}{item.decimals ? count.toFixed(1) : count}{item.suffix}
        </div>

        <div className="font-['Manrope'] text-xs font-bold text-neutral-200 uppercase tracking-wider mb-0.5">
          {item.label}
        </div>

        <div className="font-['Manrope'] text-[10px] sm:text-[11px] text-neutral-400 leading-snug">
          {item.sublabel}
        </div>
      </div>
    </div>
  );
};

export const Stats: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const stats: StatItem[] = [
    {
      icon: <Truck size={18} />,
      end: 50,
      suffix: '+',
      label: 'Active Fleet',
      sublabel: 'Verified trucks & containers',
      sparkline: 'M0,15 Q15,8 30,12 T60,5',
      accentColor: '#062448',
    },
    {
      icon: <PackageCheck size={18} />,
      end: 1200,
      suffix: '+',
      label: 'Loads Dispatched',
      sublabel: 'Safe deliveries delivered',
      sparkline: 'M0,18 Q20,14 40,8 T60,3',
      accentColor: '#E9A015',
    },
    {
      icon: <MapPin size={18} />,
      end: 45,
      suffix: '+',
      label: 'Industrial Hubs',
      sublabel: 'Rajasthan ➔ Pan-India',
      sparkline: 'M0,16 Q18,10 35,14 T60,4',
      accentColor: '#062448',
    },
    {
      icon: <ShieldCheck size={18} />,
      end: 99.4,
      decimals: 1,
      suffix: '%',
      label: 'On-Time Transit',
      sublabel: 'Verified corridor tracking',
      sparkline: 'M0,12 Q20,6 40,8 T60,2',
      accentColor: '#25D366',
    },
    {
      icon: <Clock size={18} />,
      end: 45,
      prefix: '< ',
      suffix: ' min',
      label: 'Quote Response',
      sublabel: 'Direct WhatsApp turnaround',
      sparkline: 'M0,5 Q15,10 30,8 T60,18',
      accentColor: '#E9A015',
    },
  ];

  return (
    <section ref={ref} className="px-4 md:px-12 py-10 md:py-14 bg-[#141715] text-white border-y border-neutral-800">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-neutral-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#062448]/20 border border-[#062448]/40 text-[#85B7EB] font-['Space_Mono'] text-[10px] font-bold uppercase tracking-wider mb-2">
              <TrendingUp size={12} />
              <span>Operations Metrics</span>
            </div>
            <h2 className="font-['Archivo_Narrow'] text-2xl md:text-3xl font-bold uppercase tracking-tight text-white">
              Data-Driven Transport Performance
            </h2>
          </div>
          <div className="font-['Space_Mono'] text-[11px] text-neutral-400">
            Real-Time Network Telemetry • Updated Daily
          </div>
        </div>

        {/* 5-Metric Command Center Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 md:gap-4">
          {stats.map((s) => (
            <StatCardItem key={s.label} item={s} triggered={triggered} />
          ))}
        </div>

      </div>
    </section>
  );
};
