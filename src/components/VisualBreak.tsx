import React from 'react';

export const VisualBreak: React.FC = () => {
  return (
    <section className="w-full relative h-[50vh] md:h-[60vh] min-h-[350px]">
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=1600')" 
        }}
      />
      <div className="absolute inset-0 bg-[#31312c]/40" />
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-12">
        <span className="font-['Space_Mono'] bg-[#31312c] text-[#f3f0e9] px-4 py-2 uppercase tracking-widest text-xs font-bold inline-block">
          ROAD • LOAD • ROUTE
        </span>
      </div>
    </section>
  );
};
