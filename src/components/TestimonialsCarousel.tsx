
import React, { useRef, useEffect } from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import TestimonialCard from './TestimonialCard';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/lib/animations/intersection-observer';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion';

const testimonials = [
  {
    quote: "Trendimo ми помогна да намеря перфектния дом за моето семейство. Техният екип беше изключително отзивчив и професионален през целия процес.",
    author: "Георги Иванов",
    position: "Купувач"
  },
  {
    quote: "Продадох апартамента си за по-малко от месец с помощта на Trendimo. Получих отлична цена и сделката премина безпроблемно.",
    author: "Мария Петрова",
    position: "Продавач" 
  },
  {
    quote: "Като инвеститор в недвижими имоти, високо ценя експертизата на Trendimo. Те винаги намират най-добрите възможности за инвестиция.",
    author: "Стоян Димитров",
    position: "Инвеститор"
  },
  {
    quote: "Сътрудничеството с Trendimo беше страхотно решение за нашия бизнес. Намериха ни идеалния офис на отлична локация.",
    author: "Петър Николов",
    position: "Бизнес клиент"
  },
  {
    quote: "Агентите на Trendimo са истински професионалисти. Отзивчиви, информирани и винаги готови да помогнат. Горещо ги препоръчвам!",
    author: "Елена Тодорова",
    position: "Клиент"
  }
];

const TestimonialsCarousel = () => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true,
  });
  
  return (
    <section 
      className="py-16 bg-gray-50" 
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="container mx-auto px-4">
        <FadeIn className="text-center mb-12" animate={isIntersecting}>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Какво казват нашите клиенти</h2>
          <p className="text-lg text-neutral">Мнения от реални клиенти на Trendimo</p>
        </FadeIn>

        <div className="px-8 md:px-16 relative">
          <Carousel 
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
          >
            <StaggerContainer 
              animate={isIntersecting}
              className="w-full"
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <StaggerItem delay={index * 0.1}>
                      <TestimonialCard {...testimonial} />
                    </StaggerItem>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </StaggerContainer>
            <div className="flex justify-center mt-8 gap-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <CarouselPrevious className="relative inset-auto" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <CarouselNext className="relative inset-auto" />
              </motion.div>
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
