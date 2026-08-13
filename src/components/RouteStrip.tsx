import React, { useEffect, useState } from 'react';

const steps = ['PICKUP', 'DROP', 'GOODS', 'TRUCK', 'CONFIRM'];

export const RouteStrip: React.FC = () => {
  const [activeArrow, setActiveArrow] = useState(0);

  /* Cycle through arrows 0-3 (4 arrows between 5 steps) */
  useEffect(() => {
    const id = setInterval(() => {
      setActiveArrow((prev) => (prev + 1) % (steps.length - 1));
    }, 900);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="border-y border-[#e5ebe7] bg-white py-3 overflow-x-auto">
      <div className="px-4 md:px-12 flex items-center justify-start md:justify-center gap-2 md:gap-3 whitespace-nowrap min-w-max mx-auto">
        {steps.map((step, idx) => (
          <React.Fragment key={step}>
            {/* Step label */}
            <div className="flex items-center gap-1.5">
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx <= activeArrow ? 'bg-[#0F6A37] scale-125' : 'bg-[#b8c9bb]'
                }`}
                style={{ animation: idx <= activeArrow ? 'pulse-dot 1.2s ease-in-out infinite' : 'none' }}
              />
              <span
                className={`font-['Space_Mono'] text-xs md:text-sm font-bold uppercase tracking-wider transition-colors duration-300 ${
                  idx <= activeArrow ? 'text-[#0F6A37]' : 'text-[#6b786d]'
                }`}
              >
                {step}
              </span>
            </div>

            {/* Arrow between steps */}
            {idx < steps.length - 1 && (
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, dIdx) => (
                  <div
                    key={dIdx}
                    className={`h-0.5 w-3 md:w-5 rounded-full transition-all duration-200 ${
                      idx < activeArrow
                        ? 'bg-[#0F6A37]'
                        : idx === activeArrow
                        ? dIdx / 4 <= (Date.now() % 900) / 900
                          ? 'bg-[#0F6A37]'
                          : 'bg-[#e5ebe7]'
                        : 'bg-[#e5ebe7]'
                    }`}
                    style={{
                      transitionDelay: idx === activeArrow ? `${dIdx * 60}ms` : '0ms',
                    }}
                  />
                ))}
                <span
                  className={`text-sm font-bold transition-colors duration-300 ${
                    idx < activeArrow ? 'text-[#0F6A37]' : 'text-[#b8c9bb]'
                  }`}
                >
                  ▶
                </span>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
