import React from 'react';
import { Link } from 'react-router-dom';
import { DriverForm } from '../components/DriverForm';
import { FadeUp } from '../components/FadeUp';
import { ArrowLeft, Calendar } from 'lucide-react';

export const RegisterTruckPage: React.FC = () => {
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
            <span>Home</span> / <span className="text-[#0F6A37] font-bold">Register Vehicle</span>
          </div>
        </div>

        {/* Page Header */}
        <div className="bg-white border border-[#c5beB4] rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#EBF5EE] flex items-center justify-center text-[#0F6A37]">
              <Calendar size={18} />
            </div>
            <span className="font-['Manrope'] text-xs font-bold text-[#0F6A37] uppercase tracking-widest">
              Fleet Partner Network
            </span>
          </div>
          <h1 className="font-['Archivo_Narrow'] text-3xl md:text-4xl font-bold uppercase text-[#1a1f1b]">
            Register Your Truck or Fleet
          </h1>
          <p className="font-['Manrope'] text-xs md:text-sm text-[#4A554C] mt-1 max-w-2xl">
            Are you a truck owner, driver, or fleet operator? Join our verified network to receive consistent Rajasthan and pan-India load offers with prompt payments.
          </p>
        </div>

        {/* Main Content Grid */}
        <FadeUp>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
            
            {/* Left: Driver Visual (5 cols) */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-[#c5beB4] rounded-2xl p-4 shadow-md overflow-hidden">
                <img
                  src="/images/register-truck.webp"
                  alt="Register Your Truck - Shree Krishna Transport Fleet"
                  className="w-full h-72 sm:h-80 md:h-96 object-cover rounded-xl border border-[#e2dad0]"
                />
                <div className="p-4 space-y-2">
                  <h3 className="font-['Archivo_Narrow'] text-lg font-bold uppercase text-[#1a1f1b]">
                    Growing Network of Verified Carriers
                  </h3>
                  <p className="font-['Manrope'] text-xs text-[#5a665c] leading-relaxed">
                    Whether you own 1 pickup truck or manage a fleet of 20+ multi-axle trailers, register today to secure high-demand commercial contracts.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Driver Registration Form (7 cols) */}
            <div className="lg:col-span-7 bg-white border border-[#c5beB4] rounded-2xl p-6 md:p-8 shadow-lg">
              <DriverForm />
            </div>

          </div>
        </FadeUp>

      </div>
    </div>
  );
};
