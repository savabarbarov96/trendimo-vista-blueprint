
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import HeroCarousel from '@/components/HeroCarousel';
import SearchBar from '@/components/SearchBar';
import FeaturedProperties from '@/components/FeaturedProperties';
import ViberBanner from '@/components/ViberBanner';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import BlogPreview from '@/components/BlogPreview';
import PropertySellForm from '@/components/PropertySellForm';
import Footer from '@/components/Footer';

const Index = () => {
  const [searchMode, setSearchMode] = useState<'buy' | 'rent'>('buy');

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section with Property Image Carousel */}
      <section className="relative h-screen flex items-center justify-center text-white">
        <HeroCarousel />
        
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg animate-fade-in">
            Намерете своя перфектен дом
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto drop-shadow-lg">
            Trendimo предлага най-добрите имоти в България. Независимо дали търсите нов дом или инвестиция, ние имаме решение за вас.
          </p>
          
          {/* Toggle and Search Bar */}
          <div className="max-w-4xl mx-auto glass-effect rounded-lg p-4 animate-fade-in">
            <div className="bg-gradient-to-r from-blue-600/20 to-blue-500/30 p-2 rounded-t-lg inline-flex mb-0">
              <button 
                onClick={() => setSearchMode('buy')}
                className={`px-6 py-3 font-medium rounded-lg transition-colors ${
                  searchMode === 'buy' 
                    ? 'bg-primary text-white shadow-md' 
                    : 'text-white hover:bg-white/20'
                }`}
              >
                Купи
              </button>
              <button 
                onClick={() => setSearchMode('rent')}
                className={`px-6 py-3 font-medium rounded-lg transition-colors ${
                  searchMode === 'rent' 
                    ? 'bg-primary text-white shadow-md' 
                    : 'text-white hover:bg-white/20'
                }`}
              >
                Под наем
              </button>
            </div>
            
            <SearchBar />
          </div>
          
          <div className="mt-12">
            <Link to="/properties">
              <Button size="lg" className="bg-gradient-to-r from-secondary/90 to-secondary hover:from-secondary hover:to-secondary-dark transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border border-secondary-light/30">
                Разгледай всички имоти
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Viber Community Banner */}
      <ViberBanner />
      
      {/* Featured Properties Section */}
      <FeaturedProperties />
      
      {/* Testimonials Section */}
      <section className="bg-blue-600 bg-opacity-10">
        <TestimonialsCarousel />
      </section>
      
      {/* Blog Preview Section */}
      <section className="bg-gradient-to-r from-gray-50 to-white">
        <BlogPreview />
      </section>
      
      {/* Sell Your Property CTA Form */}
      <section className="bg-gradient-to-b from-white to-gray-50">
        <PropertySellForm />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
