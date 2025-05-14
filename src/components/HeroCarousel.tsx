
import React, { useEffect, useState, useCallback } from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from '@/components/ui/carousel';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { motion, useMotionTemplate, useTransform, useScroll } from 'framer-motion';
import { useIntersectionObserver } from '@/lib/animations/intersection-observer';
import { useAnimationSettings } from '@/lib/animations/motion';
import { FadeIn } from '@/components/ui/motion';

// Sample property images for demonstration
const propertyImages = [
  "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200",
  "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?auto=format&fit=crop&w=1200",
  "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?auto=format&fit=crop&w=1200",
  "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=1200",
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const { shouldAnimate } = useAnimationSettings();
  const { ref: carouselRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: false,
  });
  
  // Scroll-based parallax effect for background
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, -100]);
  const backgroundScale = useTransform(scrollY, [0, 500], [1, 1.1]);
  const overlayOpacity = useTransform(scrollY, [0, 300], [0.5, 0.8]);
  
  // Format the values for use in styles
  const backgroundYStyle = useMotionTemplate`${backgroundY}px`;
  const overlayOpacityStyle = useMotionTemplate`${overlayOpacity}`;
  
  // Update current slide when API changes
  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrentSlide(api.selectedScrollSnap());
  }, [api]);

  // Subscribe to carousel changes
  useEffect(() => {
    if (!api) return;
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  // Auto-advance the carousel only when in viewport
  useEffect(() => {
    if (!api || !isIntersecting) return;
    
    const interval = setInterval(() => {
      const nextSlide = (currentSlide + 1) % propertyImages.length;
      api.scrollTo(nextSlide);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [api, currentSlide, isIntersecting]);
  
  // Helper function to handle indicator click
  const handleIndicatorClick = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <div 
      className="absolute top-0 left-0 w-full h-full overflow-hidden"
      ref={carouselRef as React.RefObject<HTMLDivElement>}
    >
      {/* Dark overlay with scroll parallax effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-[1]"
        style={shouldAnimate ? { opacity: overlayOpacityStyle } : undefined}
      />
      
      <Carousel 
        className="w-full h-full"
        setApi={setApi}>
        <CarouselContent className="h-full">
          {propertyImages.map((image, index) => (
            <CarouselItem key={index} className="h-full">
              <AspectRatio ratio={16/9} className="h-full">
                <motion.div
                  className="w-full h-full"
                  style={shouldAnimate ? { 
                    y: backgroundYStyle,
                    scale: backgroundScale
                  } : undefined}
                >
                  <motion.img 
                    src={image} 
                    alt={`Property showcase ${index + 1}`}
                    className="object-cover w-full h-full"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ 
                      opacity: currentSlide === index ? 1 : 0,
                      scale: currentSlide === index ? 1 : 1.1
                    }}
                    transition={{ 
                      opacity: { duration: 1, ease: "easeInOut" },
                      scale: { duration: 6, ease: "easeOut" }
                    }}
                  />
                </motion.div>
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      
      {/* Carousel indicators with animations */}
      <FadeIn 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10"
        animate={isIntersecting}
      >
        {propertyImages.map((_, index) => (
          <motion.button
            key={index}
            className={`w-3 h-3 rounded-full transition-all bg-white ${
              currentSlide === index ? "opacity-100" : "opacity-50"
            }`}
            onClick={() => handleIndicatorClick(index)}
            aria-label={`Go to slide ${index + 1}`}
            whileTap={{ scale: 0.9 }}
            animate={{ 
              scale: currentSlide === index ? 1.1 : 1,
            }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </FadeIn>
    </div>
  );
};

export default HeroCarousel;
