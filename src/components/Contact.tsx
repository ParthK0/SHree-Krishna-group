import React from 'react';
import { WHATSAPP_NUMBER } from '../lib/whatsapp';

export const Contact: React.FC = () => {
  return (
    <section className="w-full border-t border-gray-300" id="contact">
      <div 
        className="h-80 md:h-96 w-full relative bg-cover bg-center" 
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000')` 
        }}
      >
        <div className="absolute inset-0 bg-[#022448]/85 flex items-center justify-center p-4">
          <div className="bg-white p-6 md:p-8 border border-gray-300 text-center w-full max-w-md shadow-2xl">
            <span className="text-[10px] font-extrabold text-[#1E3A5F] uppercase tracking-widest block mb-1">
              DIRECT DISPATCH & INQUIRIES
            </span>
            <h3 className="text-xl font-extrabold text-[#022448] uppercase mb-4">
              Operations Command
            </h3>
            
            <div className="space-y-2 text-xs text-[#121c2a] mb-6 text-left border-t border-b border-gray-200 py-3">
              <div className="flex justify-between items-center">
                <span className="font-bold uppercase text-[#43474E]">LEAD PROFESSIONAL:</span>
                <span className="font-extrabold text-[#022448]">Deepesh Kumar</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold uppercase text-[#43474E]">HEADQUARTERS:</span>
                <span className="font-bold">Jaipur, Rajasthan, India</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold uppercase text-[#43474E]">TEL / WHATSAPP:</span>
                <a href="tel:+919784800833" className="font-extrabold text-[#022448] hover:underline">+91 97848 00833</a>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold uppercase text-[#43474E]">DIRECT EMAIL:</span>
                <a href="mailto:deepesh3052@gmail.com" className="font-bold text-[#1E3A5F] hover:underline">deepesh3052@gmail.com</a>
              </div>
            </div>

            <div className="flex gap-2">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-1/2 py-3 inline-block text-xs font-bold uppercase tracking-wider text-center"
              >
                WhatsApp Direct
              </a>
              <a
                href="tel:+919784800833"
                className="btn-ghost w-1/2 py-3 inline-block text-xs font-bold uppercase tracking-wider text-center"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
