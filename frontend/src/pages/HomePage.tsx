import React from 'react';
import { Hero } from '../components/Hero';
import { LiveActivityFeed } from '../components/LiveActivityFeed';
import { Stats } from '../components/Stats';
import { IndustryStrip } from '../components/IndustryStrip';
import { HowItWorks } from '../components/HowItWorks';
import { TwoPathSplit } from '../components/TwoPathSplit';
import { AboutUs } from '../components/AboutUs';
import { TrustStrip } from '../components/TrustStrip';
import { VisualBreak } from '../components/VisualBreak';
import { FadeUp } from '../components/FadeUp';

export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />

      {/* Real-Time Dispatch Activity Ticker */}
      <LiveActivityFeed />

      {/* Command Center Operations Metrics */}
      <FadeUp>
        <Stats />
      </FadeUp>

      {/* Rajasthan Core Specialized Sectors */}
      <FadeUp>
        <IndustryStrip />
      </FadeUp>

      {/* How It Works 4-Step Process */}
      <FadeUp>
        <HowItWorks />
      </FadeUp>

      {/* Dual Path Service Cards */}
      <FadeUp>
        <TwoPathSplit />
      </FadeUp>

      {/* About Shree Krishna Transport */}
      <FadeUp>
        <AboutUs />
      </FadeUp>

      {/* Trust Strip */}
      <TrustStrip />

      {/* Interactive Transit Corridor & Rate Hub */}
      <VisualBreak />
    </>
  );
};
