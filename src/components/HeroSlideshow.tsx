import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ImagesSlider } from '@/components/ui/images-slider';
import SearchBar from '@/components/SearchBar';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TextShimmer } from '@/components/ui/text-shimmer';
import { supabase } from '@/integrations/supabase/client';

// Use the same default images as the original HeroCarousel component
const defaultImages = [
  "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200",
  "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?auto=format&fit=crop&w=1200",
  "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?auto=format&fit=crop&w=1200",
  "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=1200",
];

interface HeroSlideshowProps {
  searchMode: 'buy' | 'rent';
  setSearchMode: (mode: 'buy' | 'rent') => void;
  scrollY: number;
  shouldAnimate?: boolean;
}

const HeroSlideshow = ({ searchMode, setSearchMode, scrollY, shouldAnimate = true }: HeroSlideshowProps) => {
  const [slideshowImages, setSlideshowImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch slideshow images from Supabase on component mount
  useEffect(() => {
    fetchSlideshowImages();
  }, []);

  const fetchSlideshowImages = async () => {
    setIsLoading(true);
    try {
      // Try to fetch images from the 'hero_slideshow' folder
      const { data: images, error } = await supabase.storage
        .from('trendimo')
        .list('hero_slideshow/', {
          sortBy: { column: 'created_at', order: 'desc' },
        });

      if (error) {
        console.error('Error fetching slideshow images:', error);
        // Fall back to default images if there's an error
        setSlideshowImages(defaultImages);
        return;
      }

      // Filter for image files only
      const imageFiles = images ? images.filter(item => 
        !item.id.endsWith('/') && 
        (item.name.match(/\.(jpg|jpeg|png|gif|webp)$/i))
      ) : [];

      // If we have images, get their public URLs
      if (imageFiles.length > 0) {
        const urls = imageFiles.map(file => {
          const { data: { publicUrl } } = supabase
            .storage
            .from('trendimo')
            .getPublicUrl('hero_slideshow/' + file.name);

          return publicUrl;
        });

        if (urls.length > 0) {
          console.log('Fetched slideshow images:', urls);
          setSlideshowImages(urls);
        } else {
          // No uploaded images found, use defaults
          console.log('No uploaded images found, using defaults');
          setSlideshowImages(defaultImages);
        }
      } else {
        // No uploaded images found, use defaults
        console.log('No uploaded images found, using defaults');
        setSlideshowImages(defaultImages);
      }
    } catch (error) {
      console.error('Error in fetchSlideshowImages:', error);
      // Fall back to default images if there's an error
      setSlideshowImages(defaultImages);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative h-screen">
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-900">
          <div className="text-white text-center">
            <div className="animate-spin h-8 w-8 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Зареждане на слайдшоу...</p>
          </div>
        </div>
      ) : slideshowImages.length > 0 ? (
        <ImagesSlider 
          images={slideshowImages} 
          className="h-screen"
          overlayClassName="bg-black/60 opacity-70 from-black/80 via-black/50 to-black/80 bg-gradient-to-b"
        >
          <div 
            className="container mx-auto px-4 z-50 text-center"
            style={shouldAnimate ? { transform: `translateY(${-scrollY * 0.1}px)` } : undefined}
          >
            <div className="mb-6 animate-fade-in">
              <TextShimmer 
                as="h1"
                className="text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg [--base-color:theme(colors.white)] [--base-gradient-color:theme(colors.red.200)]"
                duration={3}
              >
                Намерете своя перфектен дом
              </TextShimmer>
            </div>
            
            <div className="mb-8 animate-fade-in [animation-delay:0.1s]">
              <p className="text-xl md:text-2xl max-w-3xl mx-auto drop-shadow-lg text-white">
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
        </ImagesSlider>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-900">
          <div className="text-white text-center p-4">
            <p className="text-xl mb-2">Няма налични изображения за слайдшоу</p>
            <p className="text-sm opacity-70">Моля, качете изображения от административния панел</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSlideshow; 