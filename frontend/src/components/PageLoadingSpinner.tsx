import React from 'react';

export const PageLoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-8">
      <div className="w-10 h-10 border-3 border-[#0B3A66]/20 border-t-[#F5B51B] rounded-full animate-spin mb-4" />
      <span className="text-xs font-bold font-['Space_Mono'] uppercase tracking-widest text-[#0B3A66]">
        Loading Freight Services...
      </span>
    </div>
  );
};
