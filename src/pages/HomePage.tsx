import React from 'react';
import { Hero } from '../components/Hero';
import { Stats } from '../components/Stats';
import { HowItWorks } from '../components/HowItWorks';
import { TwoPathSplit } from '../components/TwoPathSplit';
import { AboutUs } from '../components/AboutUs';
import { VisualBreak } from '../components/VisualBreak';
import { FadeUp } from '../components/FadeUp';

export const HomePage: React.FC = () => {
  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Growing Transport Network (Stats) */}
      <FadeUp>
        <Stats />
      </FadeUp>

      {/* 3. How It Works */}
      <FadeUp>
        <HowItWorks />
      </FadeUp>

      {/* 4. Which side are you on? (Two Path Split) */}
      <FadeUp>
        <TwoPathSplit />
      </FadeUp>

      {/* 5. About Us */}
      <FadeUp>
        <AboutUs />
      </FadeUp>

      {/* 6. Visual Break Banner */}
      <VisualBreak />
    </>
  );
};
