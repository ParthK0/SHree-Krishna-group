import React from 'react';
import { Hero } from '../components/Hero';
import { Stats } from '../components/Stats';
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

      <FadeUp>
        <Stats />
      </FadeUp>

      <FadeUp>
        <HowItWorks />
      </FadeUp>

      <FadeUp>
        <TwoPathSplit />
      </FadeUp>

      <FadeUp>
        <AboutUs />
      </FadeUp>

      <TrustStrip />

      <VisualBreak />
    </>
  );
};
