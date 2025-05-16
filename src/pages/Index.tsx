import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import HeroSlideshow from '@/components/HeroSlideshow';
import SearchBar from '@/components/SearchBar';
import FeaturedProperties from '@/components/FeaturedProperties';
import ViberBanner from '@/components/ViberBanner';
import { InfiniteMovingCards } from '@/components/infinite-moving-cards';
import BlogPreview from '@/components/BlogPreview';
import PropertySellForm from '@/components/PropertySellForm';
import Footer from '@/components/Footer';
import { useAnimationSettings } from '@/lib/animations/motion';
import { TextShimmer } from '@/components/ui/text-shimmer';

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

  // Testimonials data
  const testimonials = [
    {
      quote: "Trendimo ми помогна да намеря перфектния дом за моето семейство. Техният екип беше изключително отзивчив и професионален през целия процес.",
      name: "Георги Иванов",
      title: "Купувач"
    },
    {
      quote: "Продадох апартамента си за по-малко от месец с помощта на Trendimo. Получих отлична цена и сделката премина безпроблемно.",
      name: "Мария Петрова",
      title: "Продавач" 
    },
    {
      quote: "Като инвеститор в недвижими имоти, високо ценя експертизата на Trendimo. Те винаги намират най-добрите възможности за инвестиция.",
      name: "Стоян Димитров",
      title: "Инвеститор"
    },
    {
      quote: "Сътрудничеството с Trendimo беше страхотно решение за нашия бизнес. Намериха ни идеалния офис на отлична локация.",
      name: "Петър Николов",
      title: "Бизнес клиент"
    },
    {
      quote: "Агентите на Trendimo са истински професионалисти. Отзивчиви, информирани и винаги готови да помогнат. Горещо ги препоръчвам!",
      name: "Елена Тодорова",
      title: "Клиент"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-red-50 to-white">
      
      {/* Navbar */}
      <Navbar />

      {/* Hero Section with Slideshow */}
      <section className="relative h-screen">
        <HeroSlideshow 
          searchMode={searchMode} 
          setSearchMode={setSearchMode} 
          scrollY={scrollY}
          shouldAnimate={shouldAnimate}
        />
      </section>

      {/* Viber Community Banner */}
      <ViberBanner />
      
      {/* Featured Properties Section */}
      <FeaturedProperties />
      
      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-r from-red-50 to-red-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <TextShimmer 
              as="h2"
              className="text-3xl md:text-4xl font-bold mb-3 [--base-color:theme(colors.red.900)] [--base-gradient-color:theme(colors.red.500)]"
              duration={2.5}
            >
              Какво казват нашите клиенти
            </TextShimmer>
            <p className="text-lg text-neutral-700 max-w-2xl mx-auto">Вижте какво споделят клиентите за опита си с Trendimo</p>
          </div>
          
          <div className="relative">
            <InfiniteMovingCards 
              items={testimonials} 
              direction="left" 
              speed="normal" 
              pauseOnHover={true}
              className="py-4"
            />
          </div>
        </div>
      </section>
      
      {/* Blog Preview Section */}
      <section className="bg-gradient-to-r from-white to-red-50">
        <BlogPreview />
      </section>
      
      {/* Sell Your Property CTA Form */}
      <section className="bg-gradient-to-b from-red-50 to-red-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-floating p-8 border border-red-100">
            <div className="text-center mb-8">
              <TextShimmer 
                as="h2"
                className="text-3xl md:text-4xl font-bold mb-3 [--base-color:theme(colors.red.900)] [--base-gradient-color:theme(colors.red.500)]"
                duration={2.5}
              >
                Продай своя имот с нас
              </TextShimmer>
              <p className="text-lg text-neutral-700">Попълни формата и наш агент ще се свърже с теб за безплатна консултация</p>
            </div>
            <PropertySellForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
