import React from "react";
import SalesProcessInfo from "@/components/sell/SalesProcessInfo";
import { FadeIn, FadeUp, SlideIn } from "@/components/ui/motion";
import PropertySellForm from "@/components/PropertySellForm";
import { TextShimmer } from '@/components/ui/text-shimmer';

const SellPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16" delay={0.2}>
            <TextShimmer 
              as="h1"
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 [--base-color:theme(colors.red.900)] [--base-gradient-color:theme(colors.red.500)]"
              duration={3}
            >
              Продай своя имот с Trendimo
            </TextShimmer>
            <p className="text-xl text-neutral-dark max-w-3xl mx-auto">
              Нашите експерти ще ви помогнат да постигнете най-добрата цена на пазара с персонализиран план за продажба на вашия имот.
            </p>
          </FadeUp>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <SlideIn className="lg:col-span-7" delay={0.3}>
              <div className="glass-effect rounded-xl overflow-hidden shadow-elegant p-0.5">
                <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-t-lg p-8">
                  <TextShimmer 
                    as="h2"
                    className="text-2xl md:text-3xl font-bold mb-2 [--base-color:theme(colors.white)] [--base-gradient-color:theme(colors.red.200)]"
                    duration={2.5}
                  >
                    Вашите данни
                  </TextShimmer>
                  <p className="text-white/90 text-lg">Попълнете формата, за да започнем процеса</p>
                </div>
                <div className="bg-white p-0 rounded-b-lg">
                  <div className="p-8">
                    <PropertySellForm />
                  </div>
                </div>
              </div>
            </SlideIn>
            
            <FadeIn className="lg:col-span-5" delay={0.6}>
              <div className="sticky top-4 bg-white rounded-xl overflow-hidden shadow-elegant border border-gray-100">
                <div className="bg-gradient-to-r from-secondary/80 to-secondary p-8">
                  <TextShimmer 
                    as="h2"
                    className="text-2xl md:text-3xl font-bold mb-2 [--base-color:theme(colors.white)] [--base-gradient-color:theme(colors.red.200)]"
                    duration={2.5}
                  >
                    Процес на продажба
                  </TextShimmer>
                  <p className="text-white/90 text-lg">Как работим с продавачите</p>
                </div>
                <SalesProcessInfo />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellPage;
