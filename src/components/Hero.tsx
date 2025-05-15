
import React from 'react';
import { siteContent } from '../data/content';
import SearchBar from './SearchBar';
import HeroCarousel from './HeroCarousel';

const Hero = () => {
  const { home } = siteContent;

  return (
    <div className="relative bg-white min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
      <div className="container mx-auto px-4 z-10 relative">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left column with content */}
          <div className="py-12">
            <p className="text-primary font-medium mb-2 animate-fade-in">Недвижими имоти</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-6 animate-fade-in">
              Намерете своя перфектен дом
            </h1>
            <p className="text-xl text-secondary/80 mb-8 max-w-lg animate-fade-in [animation-delay:0.1s]">
              Trendimo предлага най-добрите имоти в България. Независимо дали търсите нов дом или инвестиция, ние имаме решение за вас.
            </p>

            <div className="bg-white shadow-lg rounded-xl p-6 animate-fade-in [animation-delay:0.2s]">
              <SearchBar />
            </div>
            
            {/* Stats section */}
            <div className="mt-12 grid grid-cols-3 gap-4 animate-fade-in [animation-delay:0.3s]">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">#1</p>
                <p className="text-sm text-secondary/70">платформа за имоти</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">24/7</p>
                <p className="text-sm text-secondary/70">обслужване</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">15%</p>
                <p className="text-sm text-secondary/70">повече оферти</p>
              </div>
            </div>
          </div>
          
          {/* Right column with image */}
          <div className="hidden md:block relative h-full">
            <div className="rounded-2xl overflow-hidden h-[500px] shadow-xl">
              <HeroCarousel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
