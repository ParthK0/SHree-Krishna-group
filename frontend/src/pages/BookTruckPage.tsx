import React from 'react';
import { Link } from 'react-router-dom';
import { BookingForm } from '../components/BookingForm';
import { FadeUp } from '../components/FadeUp';
import { ArrowLeft, Truck } from 'lucide-react';

export const BookTruckPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#ECE6DD] py-10 md:py-16 px-4 md:px-12">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumb & Back Link */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-['Manrope'] text-xs font-bold text-[#0F6A37] hover:text-[#134E3A] uppercase tracking-wider transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
                    <div className="font-['Space_Mono'] text-xs text-[#5a665c]">
            <span>Home</span> / <span className="text-[#0F6A37] font-bold">Book Freight &amp; Parcel</span>
          </div>
        </div>

        {/* Page Header */}
        <div className="bg-white border border-[#c5beB4] rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#EBF5EE] flex items-center justify-center text-[#0F6A37]">
              <Truck size={18} />
            </div>
            <span className="font-['Manrope'] text-xs font-bold text-[#0F6A37] uppercase tracking-widest">
              Instant Freight &amp; Parcel Dispatch
            </span>
          </div>
          <h1 className="font-['Archivo_Narrow'] text-3xl md:text-4xl font-bold uppercase text-[#1a1f1b]">
            Book Freight &amp; Parcel Delivery
          </h1>
          <p className="font-['Manrope'] text-xs md:text-sm text-[#4A554C] mt-1 max-w-2xl">
            Choose Full Load (FTL), Part Load (PTL), or express Parcel Delivery (0 to 150 kg). Receive an accurate freight quote within 1 hour directly via WhatsApp or Phone.
          </p>
        </div>

        {/* Main Content Grid */}
        <FadeUp>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
            
            {/* Left: Booking Form Container (7 cols) */}
            <div className="lg:col-span-7 bg-white border border-[#c5beB4] rounded-2xl p-6 md:p-8 shadow-lg">
              <BookingForm />
            </div>

            {/* Right: Visual Image Card (5 cols) */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-[#c5beB4] rounded-2xl p-4 shadow-md overflow-hidden">
                <img
                  src="/images/dropdelivery.webp"
                  alt="Book a Truck Delivery - Shree Krishna Transport"
                  className="w-full h-72 sm:h-80 md:h-96 object-cover rounded-xl border border-[#e2dad0]"
                />
                <div className="p-4 space-y-2">
                  <h3 className="font-['Archivo_Narrow'] text-lg font-bold uppercase text-[#1a1f1b]">
                    Rajasthan to All-India Route Network
                  </h3>
                  <p className="font-['Manrope'] text-xs text-[#5a665c] leading-relaxed">
                    Full Truck Load (FTL), Part Truck Load (PTL), and Express Parcel Service (0–150 kg) available across Jaipur, Jodhpur, Udaipur, Kota, and all major interstate industrial corridors.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </FadeUp>

      </div>
    </div>
  );
};
