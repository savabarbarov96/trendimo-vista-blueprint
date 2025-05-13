
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import VideoBackground from '@/components/VideoBackground';
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
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center text-white">
        <VideoBackground />
        
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Намерете своя перфектен дом
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Trendimo предлага най-добрите имоти в България. Независимо дали търсите нов дом или инвестиция, ние имаме решение за вас.
          </p>
          
          {/* Toggle and Search Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-2 rounded-t-lg inline-flex mb-0">
              <button 
                onClick={() => setSearchMode('buy')}
                className={`px-6 py-3 font-medium rounded-lg transition-colors ${
                  searchMode === 'buy' 
                    ? 'bg-primary text-white' 
                    : 'text-neutral-dark hover:bg-gray-100'
                }`}
              >
                Купи
              </button>
              <button 
                onClick={() => setSearchMode('rent')}
                className={`px-6 py-3 font-medium rounded-lg transition-colors ${
                  searchMode === 'rent' 
                    ? 'bg-primary text-white' 
                    : 'text-neutral-dark hover:bg-gray-100'
                }`}
              >
                Под наем
              </button>
            </div>
            
            <SearchBar />
          </div>
          
          <div className="mt-12">
            <Link to="/properties">
              <Button size="lg" className="bg-secondary hover:bg-secondary-dark">
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
      <TestimonialsCarousel />
      
      {/* Blog Preview Section */}
      <BlogPreview />
      
      {/* Sell Your Property CTA Form */}
      <PropertySellForm />

      {/* Footer with placeholders */}
      <Footer />
    </div>
  );
};

export default Index;
