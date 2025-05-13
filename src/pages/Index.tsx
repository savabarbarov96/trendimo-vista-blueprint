
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section with Property Image Carousel */}
      <section className="relative h-screen flex items-center justify-center text-white">
        <HeroCarousel />
        
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg animate-fade-in bg-gradient-to-r from-white to-blue-100 text-transparent bg-clip-text">
            Намерете своя перфектен дом
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto drop-shadow-lg">
            Trendimo предлага най-добрите имоти в България. Независимо дали търсите нов дом или инвестиция, ние имаме решение за вас.
          </p>
          
          {/* Toggle and Search Bar */}
          <div className="max-w-4xl mx-auto rounded-lg p-4 animate-fade-in bg-white/5 backdrop-blur-md border border-white/20 shadow-lg">
            <div className="bg-gradient-to-r from-blue-700 to-blue-900 p-2 rounded-t-lg inline-flex mb-0">
              <button 
                onClick={() => setSearchMode('buy')}
                className={`px-6 py-3 font-medium rounded-lg transition-colors ${
                  searchMode === 'buy' 
                    ? 'bg-white text-blue-900 shadow-md' 
                    : 'text-white hover:bg-white/20'
                }`}
              >
                Купи
              </button>
              <button 
                onClick={() => setSearchMode('rent')}
                className={`px-6 py-3 font-medium rounded-lg transition-colors ${
                  searchMode === 'rent' 
                    ? 'bg-white text-blue-900 shadow-md' 
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
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-primary hover:from-blue-700 hover:to-primary-dark transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border border-blue-400/30 text-white">
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
      <section className="bg-gradient-to-r from-blue-50 to-blue-100">
        <TestimonialsCarousel />
      </section>
      
      {/* Blog Preview Section */}
      <section className="bg-gradient-to-r from-white to-blue-50">
        <BlogPreview />
      </section>
      
      {/* Sell Your Property CTA Form */}
      <section className="bg-gradient-to-b from-blue-50 to-blue-100">
        <PropertySellForm />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
