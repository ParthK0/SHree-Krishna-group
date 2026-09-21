import React from 'react';
import { Hero } from '../components/Hero';
import { PartnerMarquee } from '../components/PartnerMarquee';
import { AboutUs } from '../components/AboutUs';
import { TwoPathSplit } from '../components/TwoPathSplit';
import { HowItWorks } from '../components/HowItWorks';
import { WhyChooseUsVisual } from '../components/WhyChooseUsVisual';
import { TextTickerMarquee } from '../components/TextTickerMarquee';
import { TrustStrip } from '../components/TrustStrip';
import { HomeCTA } from '../components/HomeCTA';
import { FadeUp } from '../components/FadeUp';
import { useMetaSEO } from '../lib/useMetaSEO';

export const HomePage: React.FC = () => {
  useMetaSEO({
    title: 'Shree Krishna Transport Network | Pan-India Freight & Fleet Logistics',
    description: 'Book trucks and freight transport across 53+ Indian corridors within 60 minutes. Verified FTL, PTL & parcel services backed by 12+ years operational trust from Jaipur.',
    canonicalPath: '/',
    ogImage: '/images/homefinal.webp',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How quickly can I book a commercial truck with Shree Krishna Transport?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We provide confirmed vehicle placement and driver allocation within 60 minutes of inquiry across Jaipur and major industrial clusters via our direct WhatsApp desk (+91 97848 00833).'
          }
        },
        {
          '@type': 'Question',
          name: 'Which freight corridors do you operate from Jaipur?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We operate 53+ direct transport corridors across India, including high-volume routes like Jaipur to Delhi NCR, Mumbai, Ahmedabad, Surat, Pune, Hyderabad, Bangalore, Kolkata, Indore, and regional Rajasthan routes.'
          }
        },
        {
          '@type': 'Question',
          name: 'What types of trucks are available for booking?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Our fleet network provides 14ft to 32ft single/multi-axle closed containers, 10 to 14 tyre open trucks, trailers for heavy machinery, and temperature-controlled reefer vehicles for FTL and PTL consignments.'
          }
        },
        {
          '@type': 'Question',
          name: 'Do you provide computerized GST invoices and E-Way bill support?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, 100% of our freight consignments are backed by compliant computerized GST invoices (GSTIN: 08KEYPK3684A1ZV) and instant Part-B E-Way bill driver coordination for seamless Input Tax Credit.'
          }
        }
      ]
    }
  });

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

      {/* 7. Massive Typography Marquee Strip with Photo Badges */}
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
