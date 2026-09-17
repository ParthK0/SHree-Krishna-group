import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../lib/constants';

export const FloatingWhatsApp: React.FC = () => {
  const [tooltipDismissed, setTooltipDismissed] = useState(false);

  const defaultMessage = encodeURIComponent(
    'Hello Shree Krishna Transport, I would like to get an instant quotation for freight transport / parcel booking.'
  );

  return (
    <aside 
      aria-label="Instant WhatsApp Help" 
      className="fixed bottom-20 md:bottom-7 right-4 md:right-7 z-40 flex items-end gap-2.5 pointer-events-auto"
    >
      
      {/* Floating Tooltip Bubble */}
      {!tooltipDismissed && (
        <div className="hidden sm:flex items-center gap-2 bg-[#1C201D] text-white px-3.5 py-2 rounded-xl shadow-xl border border-neutral-700 animate-in fade-in slide-in-from-right-3 duration-300">
          <div className="text-left">
            <div className="font-['Manrope'] font-bold text-xs text-white">
              Instant WhatsApp Helpline
            </div>
            <div className="font-['Space_Mono'] text-[10px] text-[#85B7EB]">
              Active • Average reply &lt; 15 min
            </div>
          </div>
          <button
            onClick={() => setTooltipDismissed(true)}
            className="text-neutral-400 hover:text-white p-1 ml-1"
            aria-label="Dismiss message"
          >
            <X size={13} />
          </button>
        </div>
      )}

      {/* Floating Pulse Button */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${defaultMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Shree Krishna Transport on WhatsApp"
        className="relative group w-13 h-13 md:w-14 md:h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
      >
        {/* Animated Pulse Rings */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none" />
        <span className="absolute -inset-2 rounded-full border-2 border-[#25D366]/40 pointer-events-none" />

        <MessageCircle size={28} className="drop-shadow-sm" />
      </a>

    </aside>
  );
};
