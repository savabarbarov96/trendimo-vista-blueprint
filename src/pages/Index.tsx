
import React, { useState, useEffect } from 'react';
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
import { useAnimationSettings } from '@/lib/animations/motion';

const Index = () => {
  const [searchMode, setSearchMode] = useState<'buy' | 'rent'>('buy');
  const { shouldAnimate = true } = useAnimationSettings() ?? {};
  const [scrollY, setScrollY] = useState(0);
  
  // Track scroll position for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-neutral-light to-white">
      
      {/* Navbar */}
      <Navbar />

      {/* Hero Section with Property Image Carousel */}
      <section className="relative h-screen flex items-center justify-center text-white">
        <HeroCarousel />
        
        <div 
          className="container mx-auto px-4 z-10 text-center"
          style={shouldAnimate ? { transform: `translateY(${-scrollY * 0.1}px)` } : undefined}
        >
          <div className="mb-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg bg-gradient-to-r from-white to-neutral-light text-transparent bg-clip-text">
              Намерете своя перфектен дом
            </h1>
          </div>
          
          <div className="mb-8 animate-fade-in [animation-delay:0.1s]">
            <p className="text-xl md:text-2xl max-w-3xl mx-auto drop-shadow-lg">
              Trendimo предлага най-добрите имоти в България. Независимо дали търсите нов дом или инвестиция, ние имаме решение за вас.
            </p>
          </div>
          
          {/* Toggle and Search Bar */}
          <div className="max-w-4xl mx-auto animate-fade-in [animation-delay:0.2s]">
            <div className="rounded-lg p-4 bg-white/5 backdrop-blur-md border border-white/20 shadow-lg">
              <div className="bg-gradient-to-r from-primary-dark to-primary p-2 rounded-t-lg inline-flex mb-0">
                <button 
                  onClick={() => setSearchMode('buy')}
                  className={`px-6 py-3 font-medium rounded-lg transition-all duration-300 ${
                    searchMode === 'buy' 
                      ? "bg-white text-secondary shadow-md" 
                      : "text-white hover:bg-white/20"
                  }`}
                >
                  Купи
                </button>
                <button 
                  onClick={() => setSearchMode('rent')}
                  className={`px-6 py-3 font-medium rounded-lg transition-all duration-300 ${
                    searchMode === 'rent' 
                      ? "bg-white text-secondary shadow-md" 
                      : "text-white hover:bg-white/20"
                  }`}
                >
                  Под наем
                </button>
              </div>
              
              <SearchBar />
            </div>
          </div>
          
          <div className="mt-12 animate-fade-in [animation-delay:0.4s]">
            <Link to="/properties">
              <Button variant="modern" className="group px-6 py-3 rounded-lg font-medium">
                Разгледай всички имоти
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
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
      <section className="bg-gradient-to-r from-neutral-light to-white">
        <TestimonialsCarousel />
      </section>
      
      {/* Blog Preview Section */}
      <section className="bg-gradient-to-r from-white to-neutral-light">
        <BlogPreview />
      </section>
      
      {/* Sell Your Property CTA Form */}
      <section className="bg-gradient-to-b from-neutral-light to-white">
        <PropertySellForm />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
