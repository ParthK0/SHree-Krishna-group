import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TruckPreloaderProps {
  onComplete?: () => void;
  durationMs?: number; // ~1600ms (1.6s fast & snappy)
}

export const TruckPreloader: React.FC<TruckPreloaderProps> = ({
  onComplete,
  durationMs = 1600,
}) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Check if user already saw preloader in this session
    if (sessionStorage.getItem('skt_visited')) {
      if (onComplete) onComplete();
      return;
    }
    sessionStorage.setItem('skt_visited', 'true');

    const startTime = performance.now();
    let animationFrameId: number;

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const pct = Math.min(100, Math.round((elapsed / durationMs) * 100));

      setProgress(pct);

      if (elapsed < durationMs) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 350);
        }, 150);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => cancelAnimationFrame(animationFrameId);
  }, [durationMs, onComplete]);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 150);
  };

  // Dynamic cycle requested by user
  const getCycleText = (pct: number) => {
    if (pct < 28) return 'BUILDING THE ROUTE';
    if (pct < 55) return 'MATCHING THE LOAD';
    if (pct < 82) return 'CONNECTING THE NETWORK';
    return 'GETTING YOU MOVING';
  };

  // Progression phases for the network drawing (0 to 1)
  const trunkProgress = Math.min(1, progress / 45); // 0 to 45% draws Jaipur to junction
  const branchProgress = Math.max(0, Math.min(1, (progress - 40) / 45)); // 40% to 85% branches to cities
  const truckX = 80 + (progress / 100) * 380; // travels from x=80 to x=460

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="skt-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[9999] flex flex-col justify-between items-center bg-[#071F35] text-[#F2EFEB] select-none overflow-hidden p-6 sm:p-10 font-['Inter']"
        >
          {/* Top Bar: Minimal Badge + Instant Skip */}
          <div className="w-full max-w-4xl flex items-center justify-between">
            <div className="flex items-center gap-2 font-['Space_Mono'] text-[11px] uppercase tracking-widest text-[#85B7EB]">
              <span className="w-2 h-2 rounded-full bg-[#60A5FA]" />
              <span>RAJASTHAN FREIGHT COMMAND</span>
            </div>

            <button
              onClick={handleSkip}
              className="font-['Space_Mono'] text-[11px] text-neutral-400 hover:text-[#F5B51B] transition-colors uppercase tracking-widest py-1 px-2.5 rounded border border-[#0B3A66] hover:border-[#F5B51B] cursor-pointer"
            >
              SKIP [ESC] &rarr;
            </button>
          </div>

          {/* Main Content Area */}
          <div className="w-full max-w-2xl flex flex-col items-center text-center my-auto">
            
            {/* 1. SKT Brand Block (Solid & Clean) */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center mb-6 sm:mb-8"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-[#0B3A66]/30 border border-[#0B3A66]/60 flex items-center justify-center p-2 mb-3.5 shadow-sm">
                <img
                  src="/images/logo.png"
                  alt="Shree Krishna Transport"
                  className="w-full h-full object-contain"
                />
              </div>

              <h1 className="font-['Archivo_Narrow'] text-2xl sm:text-4xl font-bold tracking-tight uppercase text-white leading-tight">
                SHREE KRISHNA TRANSPORT
              </h1>

              <div className="font-['Space_Mono'] text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-[#F5B51B] mt-1.5">
                ROAD &bull; LOAD &bull; ROUTE
              </div>

              <p className="font-['Manrope'] text-xs text-neutral-400 mt-1">
                Connecting Rajasthan to India
              </p>
            </motion.div>

            {/* 2. "The Road Is Loading" — Solid Interactive Route Canvas */}
            <div className="w-full max-w-xl bg-[#05182B] border border-[#0B3A66]/60 rounded-xl p-4 sm:p-6 mb-6">
              <div className="relative w-full aspect-[2.7/1]">
                <svg
                  viewBox="0 0 580 210"
                  className="w-full h-full"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Background Grid Accent Lines (Solid Dark) */}
                  <line x1="0" y1="105" x2="580" y2="105" stroke="#0B3A66" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
                  <line x1="280" y1="20" x2="280" y2="190" stroke="#0B3A66" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />

                  {/* Highway Base Rails */}
                  <line x1="80" y1="100" x2="280" y2="100" stroke="#0B3A66" strokeWidth="2" opacity="0.5" />
                  <line x1="80" y1="110" x2="280" y2="110" stroke="#0B3A66" strokeWidth="2" opacity="0.5" />

                  {/* 1. Main Trunk Route: Jaipur -> Junction (x: 80 to 280, y: 105) */}
                  <line
                    x1="80"
                    y1="105"
                    x2={80 + trunkProgress * 200}
                    y2="105"
                    stroke="#0B3A66"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />

                  {/* 2. Branch Route North: Junction (280, 105) -> DELHI (480, 45) */}
                  {trunkProgress >= 0.9 && (
                    <path
                      d="M 280 105 Q 360 105, 480 45"
                      stroke={progress >= 50 ? '#0B3A66' : '#232B25'}
                      strokeWidth="3"
                      strokeDasharray="250"
                      strokeDashoffset={250 - branchProgress * 250}
                      fill="none"
                    />
                  )}

                  {/* 3. Branch Route Central: Junction (280, 105) -> MUMBAI (480, 105) */}
                  {trunkProgress >= 0.9 && (
                    <line
                      x1="280"
                      y1="105"
                      x2={280 + branchProgress * 200}
                      y2="105"
                      stroke={progress >= 45 ? '#0B3A66' : '#232B25'}
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  )}

                  {/* 4. Branch Route South: Junction (280, 105) -> AHMEDABAD (480, 165) */}
                  {trunkProgress >= 0.9 && (
                    <path
                      d="M 280 105 Q 360 105, 480 165"
                      stroke={progress >= 55 ? '#0B3A66' : '#232B25'}
                      strokeWidth="3"
                      strokeDasharray="250"
                      strokeDashoffset={250 - branchProgress * 250}
                      fill="none"
                    />
                  )}

                  {/* Origin Node: JAIPUR (Solid Green + Amber Hub) */}
                  <g>
                    <circle cx="80" cy="105" r="9" fill="#0B3A66" />
                    <circle cx="80" cy="105" r="4" fill="#F5B51B" />
                    {/* Pulsing ring without blur/glow (pure solid border) */}
                    <circle cx="80" cy="105" r="14" stroke="#0B3A66" strokeWidth="1.5" opacity="0.6" />
                    
                    <text x="80" y="80" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold" fontFamily="Space Mono">
                      JAIPUR
                    </text>
                    <text x="80" y="133" textAnchor="middle" fill="#85B7EB" fontSize="9" fontWeight="bold" fontFamily="Space Mono">
                      [ORIGIN]
                    </text>
                  </g>

                  {/* Junction Node (appears as trunk finishes) */}
                  {trunkProgress >= 0.8 && (
                    <circle cx="280" cy="105" r="5" fill="#F5B51B" />
                  )}

                  {/* Destination Node: DELHI */}
                  <g opacity={progress > 60 ? 1 : 0.25} style={{ transition: 'opacity 0.2s' }}>
                    <circle cx="480" cy="45" r="7" fill={progress > 60 ? '#0B3A66' : '#232B25'} />
                    <circle cx="480" cy="45" r="3" fill="#F5B51B" />
                    <text x="496" y="49" fill={progress > 60 ? '#FFFFFF' : '#68776D'} fontSize="11" fontWeight="bold" fontFamily="Space Mono">
                      DELHI
                    </text>
                  </g>

                  {/* Destination Node: MUMBAI */}
                  <g opacity={progress > 70 ? 1 : 0.25} style={{ transition: 'opacity 0.2s' }}>
                    <circle cx="480" cy="105" r="7" fill={progress > 70 ? '#0B3A66' : '#232B25'} />
                    <circle cx="480" cy="105" r="3" fill="#F5B51B" />
                    <text x="496" y="109" fill={progress > 70 ? '#FFFFFF' : '#68776D'} fontSize="11" fontWeight="bold" fontFamily="Space Mono">
                      MUMBAI
                    </text>
                  </g>

                  {/* Destination Node: AHMEDABAD */}
                  <g opacity={progress > 80 ? 1 : 0.25} style={{ transition: 'opacity 0.2s' }}>
                    <circle cx="480" cy="165" r="7" fill={progress > 80 ? '#0B3A66' : '#232B25'} />
                    <circle cx="480" cy="165" r="3" fill="#F5B51B" />
                    <text x="496" y="169" fill={progress > 80 ? '#FFFFFF' : '#68776D'} fontSize="11" fontWeight="bold" fontFamily="Space Mono">
                      AHMEDABAD
                    </text>
                  </g>

                  {/* Minimal Solid Vector Truck Travelling Along Route */}
                  <g transform={`translate(${truckX}, 93)`}>
                    {/* Cargo Box */}
                    <rect x="0" y="2" width="26" height="15" rx="1.5" fill="#F5B51B" />
                    {/* Cabin */}
                    <path d="M 26 7 L 34 7 L 37 12 L 37 17 L 26 17 Z" fill="#0B3A66" />
                    {/* Window */}
                    <polygon points="28,9 33,9 35,12 28,12" fill="#101412" />
                    {/* Wheels */}
                    <circle cx="6" cy="18" r="3" fill="#101412" stroke="#FFFFFF" strokeWidth="1" />
                    <circle cx="18" cy="18" r="3" fill="#101412" stroke="#FFFFFF" strokeWidth="1" />
                    <circle cx="32" cy="18" r="3" fill="#101412" stroke="#FFFFFF" strokeWidth="1" />
                  </g>
                </svg>
              </div>

              {/* Highway Route Meta Bar */}
              <div className="flex items-center justify-between border-t border-[#0B3A66]/50 pt-3 mt-1 text-[10px] sm:text-xs font-['Space_Mono'] text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <span className="text-white font-bold">FROM RAJASTHAN</span>
                  <span className="text-[#F5B51B]">&rarr;</span>
                  <span className="text-white font-bold">ACROSS INDIA</span>
                </div>
                <div className="text-[#85B7EB] font-bold">
                  NH-48 &bull; NH-52 CORRIDORS
                </div>
              </div>
            </div>

            {/* 3. Dynamic Cycling Text & Percentage */}
            <div className="w-full max-w-xl flex items-center justify-between text-xs font-['Space_Mono'] mb-2">
              <span className="text-[#85B7EB] font-bold tracking-wider">
                {getCycleText(progress)}
              </span>
              <span className="text-white font-bold">
                {progress}%
              </span>
            </div>

            {/* 4. Solid Progress Bar (No Glow, Clean Precision Fill) */}
            <div className="w-full max-w-xl h-1.5 bg-[#05182B] rounded-full overflow-hidden border border-[#0B3A66]/60">
              <div
                className="h-full bg-[#F5B51B] transition-all duration-75 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>

          </div>

          {/* Bottom Dispatch Footer */}
          <div className="w-full max-w-4xl flex items-center justify-between text-[10px] font-['Space_Mono'] text-neutral-500 border-t border-[#0B3A66]/50 pt-3">
            <span>DISPATCH DESK &bull; JAIPUR CENTRAL</span>
            <span>DIRECT FTL &bull; PTL &bull; PARCEL SERVICES</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
