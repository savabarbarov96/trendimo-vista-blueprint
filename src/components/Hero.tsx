
import React from 'react';
import { siteContent } from '../data/content';
import SearchBar from './SearchBar';

const Hero = () => {
  const { home } = siteContent;

  return (
    <div className="relative bg-gradient-to-r from-blue-500 to-blue-700 h-[600px] md:h-[700px] flex items-center">
      {/* Background pattern overlay */}
      <div 
        className="absolute inset-0 opacity-20" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Hero content */}
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-2xl mx-auto md:mx-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-play">
            {home.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 font-play">
            {home.hero.subtitle}
          </p>

          <SearchBar />
        </div>
      </div>

      {/* Decorative cityscape silhouette */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            fill="#ffffff" 
            fillOpacity="1"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
