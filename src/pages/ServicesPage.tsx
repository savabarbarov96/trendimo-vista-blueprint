
import React from 'react';
import { Helmet } from 'react-helmet';
import ServiceCard from '@/components/services/ServiceCard';
import ServicesContactCTA from '@/components/services/ServicesContactCTA';
import { useServices } from '@/hooks/use-services';
import { Badge } from '@/components/ui/badge';

const ServicesPage = () => {
  const { data: services, isLoading, error } = useServices();
  
  const highlightedService = services?.find(service => service.is_highlighted);
  const regularServices = services?.filter(service => !service.is_highlighted);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Услуги | Trendimo</title>
        <meta name="description" content="Професионални услуги в областта на недвижимите имоти от Trendimo. Продажба, отдаване под наем, консултации и още." />
      </Helmet>

      <div className="container mx-auto py-12 px-4">
        {/* Hero section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Нашите услуги</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Предлагаме пълен набор от професионални услуги, за да ви помогнем на всеки етап 
            от вашето пътуване в света на недвижимите имоти.
          </p>
        </div>

        {/* Highlighted service */}
        {highlightedService && (
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-8 justify-center">
              <h2 className="text-3xl font-bold">Специална услуга</h2>
              <Badge variant="default">Препоръчано</Badge>
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
          <h2 className="text-3xl font-bold mb-8 text-center">Всички услуги</h2>
          
          {isLoading && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Зареждане на услуги...</p>
            </div>
          )}
          
          {error && (
            <div className="text-center py-8">
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
    </div>
  );
};

export default ServicesPage;
