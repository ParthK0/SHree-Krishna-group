import React from 'react';
import { Link } from 'react-router-dom';
import { EnquiryForm } from '../components/EnquiryForm';
import { FadeUp } from '../components/FadeUp';
import { ArrowLeft } from 'lucide-react';

export const EnquiryPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#ECE6DD] py-10 md:py-16 px-4 md:px-12">
      <div className="max-w-4xl mx-auto space-y-8">
        
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
            <span>Home</span> / <span className="text-[#0F6A37] font-bold">General Enquiry</span>
          </div>
        </div>

        {/* Dedicated Enquiry Container */}
        <FadeUp>
          <EnquiryForm />
        </FadeUp>

      </div>
    </div>
  );
};
