import React from 'react';
import HeroSection from './HeroSection';
import FeatureSection from './FeatureSection';
import HeroShowcase from './HeroShowcase';
import Footer from './Footer';
import Quiz from './Quiz';
import './App.css';
import HeroStatsCalculator from './HeroStatsCalculator';

const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <FeatureSection />
      <HeroShowcase />
      <HeroStatsCalculator />
      <Quiz />
      <Footer />
    </div>
  );
};

export default LandingPage;
