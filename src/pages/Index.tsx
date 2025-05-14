
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
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn, FadeUp, MotionButton } from '@/components/ui/motion';
import AnimatedCursor from '@/components/ui/animated-cursor';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { useAnimationSettings } from '@/lib/animations/motion';

const Index = () => {
  const [searchMode, setSearchMode] = useState<'buy' | 'rent'>('buy');
  const { shouldAnimate = true } = useAnimationSettings() ?? {};
  
  // Get scroll progress for parallax effects
  const { scrollYProgress } = useScroll();
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  
  // Handle mode toggle animation
  const tabVariants = {
    active: {
      backgroundColor: "#fff",
      color: "#1e3a8a", // blue-900
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
    },
    inactive: {
      backgroundColor: "rgba(0,0,0,0)",
      color: "#fff"
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {shouldAnimate && <AnimatedCursor />}
      
      {/* Navbar */}
      <Navbar />

      {/* Hero Section with Property Image Carousel */}
      <section className="relative h-screen flex items-center justify-center text-white">
        <HeroCarousel />
        
        <motion.div 
          className="container mx-auto px-4 z-10 text-center"
          style={shouldAnimate ? { y: titleY } : undefined}
        >
          <FadeUp className="mb-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg bg-gradient-to-r from-white to-blue-100 text-transparent bg-clip-text">
              Намерете своя перфектен дом
            </h1>
          </FadeUp>
          
          <FadeUp className="mb-8" delay={0.1}>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto drop-shadow-lg">
              Trendimo предлага най-добрите имоти в България. Независимо дали търсите нов дом или инвестиция, ние имаме решение за вас.
            </p>
          </FadeUp>
          
          {/* Toggle and Search Bar */}
          <FadeUp className="max-w-4xl mx-auto" delay={0.2}>
            <div className="rounded-lg p-4 animate-fade-in bg-white/5 backdrop-blur-md border border-white/20 shadow-lg">
              <div className="bg-gradient-to-r from-blue-700 to-blue-900 p-2 rounded-t-lg inline-flex mb-0">
                <motion.button 
                  onClick={() => setSearchMode('buy')}
                  variants={tabVariants}
                  animate={searchMode === 'buy' ? "active" : "inactive"}
                  whileHover={searchMode !== 'buy' ? { backgroundColor: "rgba(255,255,255,0.2)" } : {}}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 font-medium rounded-lg transition-colors"
                >
                  Купи
                </motion.button>
                <motion.button 
                  onClick={() => setSearchMode('rent')}
                  variants={tabVariants}
                  animate={searchMode === 'rent' ? "active" : "inactive"}
                  whileHover={searchMode !== 'rent' ? { backgroundColor: "rgba(255,255,255,0.2)" } : {}}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 font-medium rounded-lg transition-colors"
                >
                  Под наем
                </motion.button>
              </div>
              
              <SearchBar />
            </div>
          </FadeUp>
          
          <FadeIn className="mt-12" delay={0.4}>
            <Link to="/properties">
              <MagneticButton className="bg-gradient-to-r from-blue-600 to-primary hover:from-blue-700 hover:to-primary-dark transform transition-all duration-300 shadow-lg hover:shadow-xl border border-blue-400/30 text-white px-6 py-3 rounded-lg font-medium">
                Разгледай всички имоти
                <ArrowRight className="ml-2 h-5 w-5" />
              </MagneticButton>
            </Link>
          </FadeIn>
        </motion.div>
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
