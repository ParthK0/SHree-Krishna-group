import React from 'react';
import { Hero } from '../components/Hero';
import { PartnerMarquee } from '../components/PartnerMarquee';
import { AboutUs } from '../components/AboutUs';
import { TwoPathSplit } from '../components/TwoPathSplit';
import { HowItWorks } from '../components/HowItWorks';
import { WhyChooseUsVisual } from '../components/WhyChooseUsVisual';
import { Testimonials } from '../components/Testimonials';
import { TextTickerMarquee } from '../components/TextTickerMarquee';
import { TrustStrip } from '../components/TrustStrip';
import { HomeCTA } from '../components/HomeCTA';
import { FadeUp } from '../components/FadeUp';

export const HomePage: React.FC = () => {
  return (
    <>
      {/* 1. Hero with Curved Card, Inline Photo Pills & Floating Badges */}
      <Hero />

      {/* 2. Trusted Industrial Partners Infinite Marquee */}
      <PartnerMarquee />

      {/* 3. Split About Us: Brand Value Cards + Quick Route Dispatch Card */}
      <FadeUp>
        <AboutUs />
      </FadeUp>

      {/* 4. Numbered Core Services Accordion (01. FTL, 02. PTL, 03. Parcel, 04. Fleet) */}
      <FadeUp>
        <TwoPathSplit />
      </FadeUp>

      {/* 5. How It Works — For Businesses (4-step process) */}
      <FadeUp>
        <HowItWorks />
      </FadeUp>

      {/* 6. Why Choose Us: 3-Card Visual Photo Grid */}
      <FadeUp>
        <WhyChooseUsVisual />
      </FadeUp>

      {/* 7. Client Trust & Verified Feedback */}
      <FadeUp>
        <Testimonials />
      </FadeUp>

      {/* 8. Massive Typography Marquee Strip with Photo Badges */}
      <TextTickerMarquee />

      {/* 8. Verified Compliance Trust Bar */}
      <TrustStrip />

      {/* 9. Floating Quote CTA Card & Brand Watermark */}
      <FadeUp>
        <HomeCTA />
      </FadeUp>
    </>
  );
};
