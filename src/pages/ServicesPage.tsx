import React from 'react';
import { Helmet } from 'react-helmet';
import ServiceCard from '@/components/services/ServiceCard';
import ServicesContactCTA from '@/components/services/ServicesContactCTA';
import { useServices } from '@/hooks/use-services';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { TextShimmer } from '@/components/ui/text-shimmer';

const ServicesPage = () => {
  const { data: services, isLoading, error } = useServices();
  
  const highlightedService = services?.find(service => service.is_highlighted);
  const regularServices = services?.filter(service => !service.is_highlighted);

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <Helmet>
        <title>Услуги | Trendimo</title>
        <meta name="description" content="Професионални услуги в областта на недвижимите имоти от Trendimo. Продажба, отдаване под наем, консултации и още." />
      </Helmet>

      <Navbar />

      <div className="container mx-auto py-12 px-4">
        {/* Hero section */}
        <div className="text-center mb-16">
          <TextShimmer 
            as="h1"
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 [--base-color:theme(colors.red.900)] [--base-gradient-color:theme(colors.red.500)]"
            duration={3}
          >
            Нашите услуги
          </TextShimmer>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Предлагаме пълен набор от професионални услуги, за да ви помогнем на всеки етап 
            от вашето пътуване в света на недвижимите имоти.
          </p>
        </div>

        {/* Highlighted service */}
        {highlightedService && (
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-8 justify-center">
              <TextShimmer 
                as="h2"
                className="text-2xl md:text-3xl font-bold [--base-color:theme(colors.red.800)] [--base-gradient-color:theme(colors.red.400)]"
                duration={2.5}
              >
                Специална услуга
              </TextShimmer>
              <Badge variant="default" className="bg-gradient-to-r from-primary to-red-700">Препоръчано</Badge>
            </div>
            <div className="max-w-4xl mx-auto">
              <ServiceCard
                name={highlightedService.name}
                description={highlightedService.description}
                icon={highlightedService.icon}
                isHighlighted={true}
              />
            </div>
          </div>
        )}

        {/* Regular services */}
        <div className="mb-16">
          <TextShimmer 
            as="h2"
            className="text-2xl md:text-3xl font-bold mb-8 text-center [--base-color:theme(colors.red.800)] [--base-gradient-color:theme(colors.red.400)]"
            duration={2.5}
          >
            Всички услуги
          </TextShimmer>
          
          {isLoading && (
            <div className="text-center py-8 bg-white/50 backdrop-blur-sm rounded-xl shadow-elegant p-6 border border-red-100">
              <p className="text-muted-foreground">Зареждане на услуги...</p>
            </div>
          )}
          
          {error && (
            <div className="text-center py-8 bg-white/50 backdrop-blur-sm rounded-xl shadow-elegant p-6 border border-red-100">
              <p className="text-destructive">
                Възникна грешка при зареждане на услугите. Моля, опитайте отново по-късно.
              </p>
            </div>
          )}
          
          {!isLoading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularServices?.map((service) => (
                <ServiceCard
                  key={service.id}
                  name={service.name}
                  description={service.description}
                  icon={service.icon}
                />
              ))}
            </div>
          )}
        </div>

        {/* Contact CTA section */}
        <ServicesContactCTA />
      </div>

      <Footer />
    </div>
  );
};

export default ServicesPage;
