import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../lib/constants';

export const HomeCTA: React.FC = () => {
  const [phone, setPhone] = useState('');

  const handleWhatsAppRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.trim() || 'General Freight';
    const msg = encodeURIComponent(
      `Hello Shree Krishna Transport Network, I would like to get an instant freight quotation for: ${cleanPhone}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  return (
    <section className="px-4 sm:px-6 md:px-12 pt-8 pb-8 sm:pb-12 bg-[#ECE6DD]">
      <div className="max-w-7xl mx-auto">
        
        {/* Floating CTA Card */}
        <div className="bg-white rounded-[28px] sm:rounded-[36px] p-6 sm:p-8 md:p-10 shadow-xl border border-[#e2dacd] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            
            {/* Left Side: Avatar proof + Prompt + Instant WhatsApp / Quote Input */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Stacked avatars */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-[#0B3A66] text-white flex items-center justify-center text-[10px] font-bold border-2 border-white">
                    SK
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#F5B51B] text-[#071F35] flex items-center justify-center text-[10px] font-bold border-2 border-white">
                    RJ
                  </div>
                  <div className="w-8 h-8 rounded-full bg-neutral-800 text-white flex items-center justify-center text-[10px] font-bold border-2 border-white">
                    IN
                  </div>
                </div>
                <span className="font-['Space_Mono'] text-xs font-bold text-[#0B3A66]">
                  Verified Pan-India Logistics
                </span>
              </div>

              <h2 className="font-['Archivo_Narrow'] text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase text-[#1a1f1b] tracking-tight leading-tight">
                Ready to Move Smarter?<br />
                <span className="text-[#0B3A66]">Get Your Quote Today.</span>
              </h2>

              <p className="font-['Manrope'] text-xs sm:text-sm text-[#4A554C] leading-relaxed max-w-lg">
                Enter your mobile number or route details for a guaranteed commercial freight quotation delivered within 60 minutes with full E-Way compliance.
              </p>

              {/* Form Input Bar */}
              <form onSubmit={handleWhatsAppRedirect} className="flex flex-col sm:flex-row gap-2.5 max-w-lg">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter Route (e.g. Jaipur to Delhi) or Phone..."
                  className="flex-1 bg-[#f9f7f4] border border-[#dcd3c5] rounded-full py-3.5 px-5 text-xs sm:text-sm font-['Space_Mono'] text-[#1a1f1b] focus:border-[#0B3A66] focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 bg-[#F5B51B] hover:bg-[#E0A212] text-[#071F35] font-['Manrope'] font-extrabold text-xs uppercase tracking-wider px-7 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer shrink-0"
                >
                  <span>Instant Quote</span>
                  <ArrowRight size={14} />
                </button>
              </form>
            </div>

            {/* Right Side: Quick Links Column */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-6 pt-6 lg:pt-0 lg:border-l lg:border-[#e2dacd] lg:pl-10">
              <div>
                <h4 className="font-['Archivo_Narrow'] text-xs font-bold uppercase tracking-wider text-[#0B3A66] mb-3">
                  Services
                </h4>
                <ul className="space-y-2 font-['Manrope'] text-xs text-[#5a665c]">
                  <li><Link to="/book-truck" className="hover:text-[#0B3A66] transition-colors">Full Truckload (FTL)</Link></li>
                  <li><Link to="/book-truck" className="hover:text-[#0B3A66] transition-colors">Part Load (PTL)</Link></li>
                  <li><Link to="/book-truck?type=parcel" className="hover:text-[#0B3A66] transition-colors">Express Parcel (0–150 kg)</Link></li>
                  <li><Link to="/register-truck" className="hover:text-[#0B3A66] transition-colors">Register Vehicle</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-['Archivo_Narrow'] text-xs font-bold uppercase tracking-wider text-[#0B3A66] mb-3">
                  Company
                </h4>
                <ul className="space-y-2 font-['Manrope'] text-xs text-[#5a665c]">
                  <li><Link to="/routes" className="hover:text-[#0B3A66] transition-colors">Verified Routes</Link></li>
                  <li><Link to="/blog" className="hover:text-[#0B3A66] transition-colors">Logistics Blog</Link></li>
                  <li><Link to="/contact" className="hover:text-[#0B3A66] transition-colors">Contact Desk</Link></li>
                  <li><Link to="/terms-and-conditions" className="hover:text-[#0B3A66] transition-colors">Terms &amp; GST Compliance</Link></li>
                </ul>
              </div>
            </div>

          </div>
        </div>

        {/* Brand Typography Watermark */}
        <div className="text-center pt-8 sm:pt-10 pb-4 select-none overflow-hidden">
          <div
            aria-hidden="true"
            className="font-['Archivo_Narrow'] text-xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#0B3A66]/12 uppercase tracking-wider sm:tracking-widest leading-normal whitespace-nowrap px-4"
          >
            SHREE KRISHNA TRANSPORT NETWORK
          </div>
        </div>

      </div>
    </section>
  );
};
