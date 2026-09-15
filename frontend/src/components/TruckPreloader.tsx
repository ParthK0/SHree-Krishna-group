import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Clock, Zap, ArrowRight } from 'lucide-react';

interface TruckPreloaderProps {
  onComplete?: () => void;
  durationMs?: number; // default 3000ms (3 seconds)
}

export const TruckPreloader: React.FC<TruckPreloaderProps> = ({
  onComplete,
  durationMs = 3000,
}) => {
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState((durationMs / 1000).toFixed(1));
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const startTime = performance.now();
    let animationFrameId: number;

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const pct = Math.min(100, Math.round((elapsed / durationMs) * 100));
      const remainingSeconds = Math.max(0, (durationMs - elapsed) / 1000).toFixed(1);

      setProgress(pct);
      setTimeLeft(remainingSeconds);

      if (elapsed < durationMs) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        setTimeLeft('0.0');
        // Brief pause at 100% for satisfying visual closure before smooth fade-out
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 450);
        }, 200);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => cancelAnimationFrame(animationFrameId);
  }, [durationMs, onComplete]);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 200);
  };

  // Dynamic status messages based on percentage
  const getStatusText = (pct: number) => {
    if (pct < 25) return 'Initializing Fleet Management Systems...';
    if (pct < 55) return 'Connecting Pan-India Route Network...';
    if (pct < 85) return 'Syncing Freight Rates & Live GPS...';
    if (pct < 100) return 'Finalizing Real-time Dispatch Board...';
    return 'Welcome to Shree Krishna Group!';
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          className="fixed inset-0 z-[99999] flex flex-col justify-between bg-gradient-to-b from-[#111814] via-[#0b120e] to-[#060a08] text-white select-none overflow-hidden"
          role="dialog"
          aria-label="Loading Shree Krishna Group Transport"
        >
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#0F6A37]/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-[#F4B400]/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Top Header Bar */}
          <div className="w-full px-6 py-6 sm:px-12 flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0F6A37] to-[#15803d] flex items-center justify-center shadow-lg shadow-[#0F6A37]/30 border border-[#22c55e]/30">
                <img
                  src="/images/logo.png"
                  alt="SKG Logo"
                  className="w-7 h-7 object-contain drop-shadow"
                  onError={(e) => {
                    // Fallback to text icon if logo image fails
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-['Archivo_Narrow'] font-extrabold tracking-wider text-white text-base sm:text-lg uppercase">
                    Shree Krishna Group
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold bg-[#F4B400]/15 text-[#F4B400] border border-[#F4B400]/30 px-2 py-0.5 rounded-full">
                    <ShieldCheck size={11} /> 100% Verified
                  </span>
                </div>
                <p className="text-xs text-gray-400 font-medium">Pan-India Heavy Logistics & Transportation</p>
              </div>
            </div>

            {/* Skip Button */}
            <button
              onClick={handleSkip}
              className="group flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10 transition-all duration-200 cursor-pointer"
            >
              Skip
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </button>
          </div>

          {/* Main Visual Stage: Animated Truck, Road, and Side Percentage Display */}
          <div className="flex-1 flex flex-col items-center justify-center px-4 z-10">
            <div className="w-full max-w-2xl">
              
              {/* Truck Animation Arena */}
              <div className="relative w-full h-44 flex items-end justify-center overflow-hidden">
                
                {/* Speed lines in background */}
                <div className="absolute inset-x-0 top-6 h-20 overflow-hidden pointer-events-none opacity-40">
                  <div className="speed-line speed-line-1" />
                  <div className="speed-line speed-line-2" />
                  <div className="speed-line speed-line-3" />
                </div>

                {/* Animated Truck Container */}
                <div className="relative z-10 flex flex-col items-center truck-suspension">
                  
                  {/* Headlight beam */}
                  <div className="absolute -right-28 bottom-7 w-32 h-14 bg-gradient-to-r from-[#F4B400]/40 to-transparent blur-[6px] transform -skew-y-3 pointer-events-none rounded-r-full" />

                  {/* SVG Heavy Cargo Truck */}
                  <svg
                    width="260"
                    height="100"
                    viewBox="0 0 260 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-[0_12px_20px_rgba(0,0,0,0.6)]"
                  >
                    {/* Cargo Box (Trailer) */}
                    <rect x="10" y="18" width="155" height="58" rx="4" fill="#0F6A37" stroke="#15803d" strokeWidth="2" />
                    
                    {/* Trailer Corrugation Lines */}
                    <line x1="28" y1="24" x2="28" y2="70" stroke="#0b522a" strokeWidth="2.5" />
                    <line x1="46" y1="24" x2="46" y2="70" stroke="#0b522a" strokeWidth="2.5" />
                    <line x1="64" y1="24" x2="64" y2="70" stroke="#0b522a" strokeWidth="2.5" />
                    <line x1="82" y1="24" x2="82" y2="70" stroke="#0b522a" strokeWidth="2.5" />
                    <line x1="100" y1="24" x2="100" y2="70" stroke="#0b522a" strokeWidth="2.5" />
                    <line x1="118" y1="24" x2="118" y2="70" stroke="#0b522a" strokeWidth="2.5" />
                    <line x1="136" y1="24" x2="136" y2="70" stroke="#0b522a" strokeWidth="2.5" />
                    <line x1="154" y1="24" x2="154" y2="70" stroke="#0b522a" strokeWidth="2.5" />

                    {/* Gold Brand Striping on Trailer */}
                    <rect x="10" y="44" width="155" height="7" fill="#F4B400" />
                    <text x="87" y="49.5" fill="#1a1f1b" fontSize="5.5" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1">
                      SHREE KRISHNA GROUP
                    </text>

                    {/* Skirts & Underbody */}
                    <rect x="15" y="74" width="145" height="5" fill="#1f2937" rx="1" />

                    {/* Truck Cabin Connection */}
                    <rect x="165" y="52" width="8" height="24" fill="#374151" />

                    {/* Cabin Body */}
                    <path
                      d="M172 32 C172 26 176 22 182 22 L212 22 C222 22 232 29 237 38 L246 54 C248 57 249 60 249 64 L249 76 C249 78 247 80 245 80 L172 80 Z"
                      fill="#ECE6DD"
                      stroke="#d1d5db"
                      strokeWidth="1.5"
                    />

                    {/* Cabin Aerodynamic Top Fairing */}
                    <path d="M172 22 L165 14 L175 12 L198 22 Z" fill="#0F6A37" />

                    {/* Cabin Front Windshield */}
                    <path
                      d="M214 26 L233 42 C235 44 235 46 235 48 L210 48 C208 48 206 46 206 44 L206 28 C206 26.5 208 26 210 26 Z"
                      fill="#1E293B"
                      stroke="#475569"
                      strokeWidth="1"
                    />

                    {/* Side Door Window */}
                    <path
                      d="M180 28 L202 28 C203 28 204 29 204 30 L204 46 C204 47 203 48 202 48 L180 48 C179 48 178 47 178 46 L178 30 C178 29 179 28 180 28 Z"
                      fill="#334155"
                    />

                    {/* Side Mirror */}
                    <rect x="206" y="36" width="3" height="9" rx="1" fill="#111827" />

                    {/* Headlight Housing & Bulb */}
                    <rect x="242" y="60" width="7" height="8" rx="2" fill="#F4B400" />
                    <circle cx="245" cy="64" r="2.5" fill="#FFFBEB" />

                    {/* Front Chrome Bumper & Grille */}
                    <rect x="238" y="70" width="13" height="8" rx="2" fill="#9CA3AF" />
                    <line x1="240" y1="72" x2="249" y2="72" stroke="#4B5563" strokeWidth="1" />
                    <line x1="240" y1="75" x2="249" y2="75" stroke="#4B5563" strokeWidth="1" />

                    {/* Wheels Assembly with Spinning Rims */}
                    {/* Rear Wheel 1 */}
                    <g className="wheel-spin" style={{ transformOrigin: '38px 80px' }}>
                      <circle cx="38" cy="80" r="14" fill="#111827" stroke="#374151" strokeWidth="2" />
                      <circle cx="38" cy="80" r="8" fill="#4B5563" />
                      <circle cx="38" cy="80" r="3" fill="#D1D5DB" />
                      <line x1="38" y1="72" x2="38" y2="88" stroke="#9CA3AF" strokeWidth="1.5" />
                      <line x1="30" y1="80" x2="46" y2="80" stroke="#9CA3AF" strokeWidth="1.5" />
                    </g>

                    {/* Rear Wheel 2 */}
                    <g className="wheel-spin" style={{ transformOrigin: '68px 80px' }}>
                      <circle cx="68" cy="80" r="14" fill="#111827" stroke="#374151" strokeWidth="2" />
                      <circle cx="68" cy="80" r="8" fill="#4B5563" />
                      <circle cx="68" cy="80" r="3" fill="#D1D5DB" />
                      <line x1="68" y1="72" x2="68" y2="88" stroke="#9CA3AF" strokeWidth="1.5" />
                      <line x1="60" y1="80" x2="76" y2="80" stroke="#9CA3AF" strokeWidth="1.5" />
                    </g>

                    {/* Trailer Tandem Wheel 3 */}
                    <g className="wheel-spin" style={{ transformOrigin: '136px 80px' }}>
                      <circle cx="136" cy="80" r="14" fill="#111827" stroke="#374151" strokeWidth="2" />
                      <circle cx="136" cy="80" r="8" fill="#4B5563" />
                      <circle cx="136" cy="80" r="3" fill="#D1D5DB" />
                      <line x1="136" y1="72" x2="136" y2="88" stroke="#9CA3AF" strokeWidth="1.5" />
                      <line x1="128" y1="80" x2="144" y2="80" stroke="#9CA3AF" strokeWidth="1.5" />
                    </g>

                    {/* Front Steer Wheel */}
                    <g className="wheel-spin" style={{ transformOrigin: '216px 80px' }}>
                      <circle cx="216" cy="80" r="14" fill="#111827" stroke="#374151" strokeWidth="2" />
                      <circle cx="216" cy="80" r="8" fill="#4B5563" />
                      <circle cx="216" cy="80" r="3" fill="#D1D5DB" />
                      <line x1="216" y1="72" x2="216" y2="88" stroke="#9CA3AF" strokeWidth="1.5" />
                      <line x1="208" y1="80" x2="224" y2="80" stroke="#9CA3AF" strokeWidth="1.5" />
                    </g>
                  </svg>
                </div>
              </div>

              {/* Moving Road Track */}
              <div className="relative w-full h-8 bg-gradient-to-b from-[#1c2420] to-[#121815] rounded-xl overflow-hidden border-t border-[#374151]/50 shadow-inner flex items-center">
                {/* Moving Road Dashed Line */}
                <div className="road-stripes" />
              </div>

              {/* Percentage & Time Indicator Side-by-Side Panel */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-white/[0.03] p-5 rounded-2xl border border-white/10 backdrop-blur-md">
                
                {/* Left Side: Live Percentage Counter */}
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Loading Experience</span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-['Archivo_Narrow'] text-5xl sm:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#F4B400] tabular-nums">
                        {progress}
                      </span>
                      <span className="text-2xl sm:text-3xl font-bold text-[#F4B400]">%</span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Live Countdown & ETA Badge */}
                <div className="flex flex-col sm:items-end justify-center">
                  <div className="inline-flex items-center gap-2 bg-[#0F6A37]/30 border border-[#0F6A37]/60 text-emerald-300 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-sm">
                    <Clock size={13} className="text-[#F4B400] animate-spin" style={{ animationDuration: '3s' }} />
                    <span>Opening in <strong className="text-white font-mono text-sm">{timeLeft}s</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-400">
                    <Zap size={12} className="text-[#F4B400]" />
                    <span>Optimized 3s Fast-Start Engine</span>
                  </div>
                </div>

              </div>

              {/* Glowing Visual Progress Bar */}
              <div className="mt-4">
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden p-[1px]">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#F4B400] via-[#22c55e] to-[#0F6A37] rounded-full shadow-[0_0_12px_rgba(34,197,94,0.6)]"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: 'linear' }}
                  />
                </div>

                {/* Dynamic Status Notification */}
                <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
                  <p className="flex items-center gap-2 font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#F4B400] animate-pulse" />
                    <span>{getStatusText(progress)}</span>
                  </p>
                  <span className="hidden sm:inline-block font-mono text-gray-500">
                    {progress === 100 ? 'Ready!' : `${progress}/100`}
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Footer Info */}
          <div className="w-full px-6 py-4 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-white/5 text-[11px] text-gray-500 z-10">
            <p>© {new Date().getFullYear()} Shree Krishna Group. All rights reserved.</p>
            <p className="flex items-center gap-2">
              <span>GPS Fleet Tracking</span>
              <span>•</span>
              <span>Full Truckload & Parcel</span>
              <span>•</span>
              <span>Verified Drivers</span>
            </p>
          </div>

          {/* Embedded Custom Styles for Road & Suspension Motion */}
          <style>{`
            /* Suspension Bouncing */
            @keyframes truckBounce {
              0%, 100% {
                transform: translateY(0px);
              }
              50% {
                transform: translateY(-2px);
              }
            }
            .truck-suspension {
              animation: truckBounce 0.28s infinite ease-in-out;
            }

            /* Wheel Spinning */
            @keyframes wheelRotate {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
            .wheel-spin {
              animation: wheelRotate 0.35s infinite linear;
            }

            /* Road Movement */
            @keyframes roadMove {
              0% {
                background-position: 0 0;
              }
              100% {
                background-position: -80px 0;
              }
            }
            .road-stripes {
              width: 100%;
              height: 4px;
              background-image: repeating-linear-gradient(
                90deg,
                #ffffff,
                #ffffff 35px,
                transparent 35px,
                transparent 70px
              );
              background-size: 80px 4px;
              animation: roadMove 0.25s infinite linear;
            }

            /* Speed lines in air */
            @keyframes speedMove {
              0% {
                transform: translateX(120%);
                opacity: 0;
              }
              30% {
                opacity: 0.8;
              }
              70% {
                opacity: 0.8;
              }
              100% {
                transform: translateX(-120%);
                opacity: 0;
              }
            }
            .speed-line {
              position: absolute;
              height: 1.5px;
              background: linear-gradient(90deg, transparent, #ffffff, transparent);
              border-radius: 9999px;
            }
            .speed-line-1 {
              top: 20%;
              width: 120px;
              animation: speedMove 0.6s infinite linear;
            }
            .speed-line-2 {
              top: 50%;
              width: 160px;
              animation: speedMove 0.45s infinite linear 0.15s;
            }
            .speed-line-3 {
              top: 75%;
              width: 90px;
              animation: speedMove 0.5s infinite linear 0.3s;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TruckPreloader;
