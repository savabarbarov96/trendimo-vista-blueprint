import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import HeroCarousel from '@/components/HeroCarousel';
import SearchBar from '@/components/SearchBar';
import FeaturedProperties from '@/components/FeaturedProperties';
import ViberBanner from '@/components/ViberBanner';
import { InfiniteMovingCards } from '@/components/infinite-moving-cards';
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

      {/* Hero Section with Property Image Carousel */}
      <section className="relative h-screen flex items-center justify-center text-white">
        <HeroCarousel />
        
        <div 
          className="container mx-auto px-4 z-10 text-center"
          style={shouldAnimate ? { transform: `translateY(${-scrollY * 0.1}px)` } : undefined}
        >
          <div className="mb-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg gradient-text-light">
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
              <div className="bg-gradient-to-r from-red-700 to-red-900 p-2 rounded-t-lg inline-flex mb-0">
                <button 
                  onClick={() => setSearchMode('buy')}
                  className={`px-6 py-3 font-medium rounded-lg transition-all duration-300 ${
                    searchMode === 'buy' 
                      ? "bg-white text-red-900 shadow-md" 
                      : "text-white hover:bg-white/20"
                  }`}
                >
                  Купи
                </button>
                <button 
                  onClick={() => setSearchMode('rent')}
                  className={`px-6 py-3 font-medium rounded-lg transition-all duration-300 ${
                    searchMode === 'rent' 
                      ? "bg-white text-red-900 shadow-md" 
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
              <Button className="group bg-gradient-to-r from-red-600 to-primary hover:from-red-700 hover:to-primary-dark transform transition-all duration-300 shadow-lg hover:shadow-xl border border-red-400/30 text-white px-6 py-3 rounded-lg font-medium">
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
      <section className="py-16 bg-gradient-to-r from-red-50 to-red-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-red-900">Какво казват нашите клиенти</h2>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-3 text-red-900">Продай своя имот с нас</h2>
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
