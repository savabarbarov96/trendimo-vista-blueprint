import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import ServiceCard from '@/components/services/ServiceCard';
import ServicesContactCTA from '@/components/services/ServicesContactCTA';
import { useServices } from '@/hooks/use-services';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { TextShimmer } from '@/components/ui/text-shimmer';
import { Wifi, Sparkles } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemFadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const ServicesPage = () => {
  const { data: services, isLoading, error } = useServices();
  
  const highlightedService = services?.find(service => service.is_highlighted);
  const regularServices = services?.filter(service => !service.is_highlighted);

  // Refs for sections
  const processRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const processSteps = [
    {
      step: "01",
      title: "Консултация",
      description: "Започваме с разбиране на вашите нужди и цели в сферата на недвижимите имоти."
    },
    {
      step: "02",
      title: "Оценка",
      description: "Извършваме детайлна оценка на имота и пазарна анализа."
    },
    {
      step: "03",
      title: "Стратегия",
      description: "Разработваме персонализирана стратегия за постигане на вашите цели."
    },
    {
      step: "04",
      title: "Реализация",
      description: "Изпълняваме стратегията и ви водим през целия процес."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Услуги | Trendimo</title>
        <meta 
          name="description" 
          content="Професионални услуги в областта на недвижимите имоти от Trendimo. Продажба, отдаване под наем, консултации и още." 
        />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="overflow-hidden py-24 md:py-32">
        <div className="container">
          <div className="flex flex-col gap-5">
            <div className="relative flex flex-col gap-5">
              <div
                style={{
                  transform: "translate(-50%, -50%)",
                }}
                className="absolute left-1/2 top-1/2 -z-10 mx-auto size-[800px] rounded-full border p-16 [mask-image:linear-gradient(to_top,transparent,transparent,white,white,white,transparent,transparent)] md:size-[1300px] md:p-32"
              >
                <div className="size-full rounded-full border p-16 md:p-32">
                  <div className="size-full rounded-full border"></div>
                </div>
              </div>
              <span className="mx-auto flex size-16 items-center justify-center rounded-full border bg-background shadow-sm md:size-20">
                <Wifi className="size-6 text-primary" />
              </span>
              <TextShimmer 
                as="h1"
                className="mx-auto max-w-screen-lg text-balance text-center text-3xl font-medium md:text-6xl [--base-color:theme(colors.red.900)] [--base-gradient-color:theme(colors.red.500)]"
                duration={3}
              >
                Нашите услуги
              </TextShimmer>
              <p className="mx-auto max-w-screen-md text-center text-muted-foreground md:text-lg">
                Предлагаме пълен набор от професионални услуги, за да ви помогнем на всеки етап 
                от вашето пътуване в света на недвижимите имоти.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Highlighted service */}
      {highlightedService && (
        <section className="py-12">
          <div className="container">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="mb-16 bg-white rounded-xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center gap-2 mb-8 justify-center">
                <TextShimmer 
                  as="h2"
                  className="text-2xl md:text-3xl font-bold [--base-color:theme(colors.red.800)] [--base-gradient-color:theme(colors.red.400)]"
                  duration={2.5}
                >
                  Специална услуга
                </TextShimmer>
                <Badge variant="default" className="bg-gradient-to-r from-primary to-red-700">
                  Препоръчано
                </Badge>
              </div>
              <div className="max-w-4xl mx-auto">
                <ServiceCard
                  name={highlightedService.name}
                  description={highlightedService.description}
                  icon={highlightedService.icon}
                  isHighlighted={true}
                  features={[
                    "Персонализиран подход",
                    "Приоритетно обслужване",
                    "Детайлна консултация",
                    "Пълно съдействие"
                  ]}
                  onLearnMore={() => scrollToSection(processRef)}
                />
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Regular services */}
      <section className="py-12">
        <div className="container">
          <TextShimmer 
            as="h2"
            className="text-2xl md:text-3xl font-bold mb-8 text-center [--base-color:theme(colors.red.800)] [--base-gradient-color:theme(colors.red.400)]"
            duration={2.5}
          >
            Всички услуги
          </TextShimmer>
          
          {isLoading && (
            <div className="text-center py-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <p className="text-muted-foreground">Зареждане на услуги...</p>
            </div>
          )}
          
          {error && (
            <div className="text-center py-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <p className="text-destructive">
                Възникна грешка при зареждане на услугите. Моля, опитайте отново по-късно.
              </p>
            </div>
          )}
          
          {!isLoading && !error && (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {regularServices?.map((service) => (
                <motion.div
                  key={service.id}
                  variants={itemFadeIn}
                >
                  <ServiceCard
                    name={service.name}
                    description={service.description}
                    icon={service.icon}
                    features={[
                      "Професионална консултация",
                      "Индивидуален подход",
                      "Пазарна оценка",
                      "Правно съдействие"
                    ]}
                    onLearnMore={() => scrollToSection(processRef)}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Process Section */}
      <section ref={processRef} className="py-12 md:py-24 bg-muted/20">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mx-auto max-w-screen-lg text-center"
          >
            <span className="mx-auto flex size-16 items-center justify-center rounded-full border bg-background shadow-sm md:size-20 mb-6">
              <Sparkles className="size-6 text-primary" />
            </span>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Нашият процес
            </h2>
            <p className="mt-4 text-muted-foreground md:text-lg">
              Следваме утвърдена методология, за да гарантираме най-добри резултати за вас
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 md:grid-cols-4">
            {processSteps.map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-[120px] w-[120px] rounded-full bg-primary/5"></div>
                    </div>
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-background border shadow-sm">
                      <span className="text-3xl font-bold text-primary">{process.step}</span>
                    </div>
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{process.title}</h3>
                  <p className="text-muted-foreground">{process.description}</p>
                </div>
                {index < 3 && (
                  <div className="absolute right-0 top-12 hidden h-0.5 w-full translate-x-1/2 bg-gradient-to-r from-primary/50 to-transparent md:block"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA section */}
      <section ref={contactRef}>
        <ServicesContactCTA />
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;
