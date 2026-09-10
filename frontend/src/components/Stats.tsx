import React, { useEffect, useRef, useState } from 'react';
import { Truck, PackageCheck, MapPin } from 'lucide-react';

interface Stat {
  icon: React.ReactNode;
  end: number;
  suffix: string;
  label: string;
  sublabel: string;
}

function useCountUp(end: number, duration: number, triggered: boolean) {
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
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [triggered, end, duration]);
  return count;
}

const StatCard: React.FC<Stat & { triggered: boolean; delay: number }> = ({
  icon, end, suffix, label, sublabel, triggered, delay,
}) => {
  const count = useCountUp(end, 1200, triggered);
  return (
    <div
      className="flex flex-col items-center text-center px-5 py-4 sm:py-5 bg-white rounded-lg border border-[#e5ebe7] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-10 h-10 rounded-full bg-[#EBF5EE] flex items-center justify-center mb-2 text-[#0F6A37]">
        {icon}
      </div>
      <div className="font-['Archivo_Narrow'] text-3xl font-bold text-[#1a1f1b] leading-none mb-1">
        {count}{suffix}
      </div>
      <div className="font-['Manrope'] text-xs font-bold text-[#1a1f1b] uppercase tracking-wider mb-0.5">
        {label}
      </div>
      <div className="font-['Inter'] text-[11px] sm:text-xs text-[#6b786d]">{sublabel}</div>
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
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const stats: Stat[] = [
    { icon: <Truck size={20} />, end: 50, suffix: '+', label: 'Active Trucks', sublabel: 'In our verified network' },
    { icon: <PackageCheck size={20} />, end: 100, suffix: '+', label: 'Deliveries Completed', sublabel: 'Successful freight loads' },
    { icon: <MapPin size={20} />, end: 12, suffix: '+', label: 'Cities Covered', sublabel: 'Across India' },
  ];

  return (
    <section ref={ref} className="px-4 md:px-12 py-5 md:py-8 bg-[#ECE6DD]">
      <div className="text-center mb-5">
        <p className="font-['Manrope'] text-[10px] font-bold text-[#6b786d] uppercase tracking-widest mb-1">
          By the numbers
        </p>
        <h2 className="font-['Archivo_Narrow'] text-xl md:text-2xl font-bold uppercase text-[#1a1f1b]">
          A growing transport network.
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-5 max-w-3xl mx-auto">
        {stats.map((s, i) => (
          <StatCard key={s.label} {...s} triggered={triggered} delay={i * 100} />
        ))}
      </div>
    </section>
  );
};
