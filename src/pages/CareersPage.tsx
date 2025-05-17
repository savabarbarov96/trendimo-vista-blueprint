import React from "react";
import { Helmet } from "react-helmet";
import CareersList from "@/components/careers/CareersList";
import CareerApplicationForm from "@/components/careers/CareerApplicationForm";
import CompanyCulture from "@/components/careers/CompanyCulture";
import EmployeeTestimonials from "@/components/careers/EmployeeTestimonials";
import CareersFAQ from "@/components/careers/CareersFAQ";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TextShimmer } from '@/components/ui/text-shimmer';

const CareersPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Кариери | Trendimo</title>
        <meta 
          name="description" 
          content="Станете част от екипа на Trendimo - кариерни възможности и отворени позиции." 
        />
      </Helmet>
      
      <Navbar />
      
      <div className="container mx-auto py-12 px-4">
        {/* Hero Section */}
        <div className="text-center mb-16 bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
          <TextShimmer 
            as="h1"
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 [--base-color:theme(colors.red.900)] [--base-gradient-color:theme(colors.red.500)]"
            duration={3}
          >
            Кариери в Trendimo
          </TextShimmer>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Присъединете се към нашия екип от професионалисти в сферата на недвижимите имоти и бъдете част от 
            изграждането на бъдещето на имотния пазар в България.
          </p>
        </div>

        {/* Company Culture Section with Photo Gallery */}
        <CompanyCulture />

        {/* Employee Testimonials */}
        <section className="mb-20 bg-white py-12 rounded-xl shadow-lg border border-gray-200">
          <TextShimmer 
            as="h2"
            className="text-2xl md:text-3xl font-bold mb-8 text-center [--base-color:theme(colors.red.800)] [--base-gradient-color:theme(colors.red.400)]"
            duration={2.5}
          >
            Нашите служители споделят
          </TextShimmer>
          <div className="px-6">
            <EmployeeTestimonials />
          </div>
        </section>

        {/* Open Positions */}
        <section id="open-positions" className="mb-20">
          <TextShimmer 
            as="h2"
            className="text-2xl md:text-3xl font-bold mb-8 text-center [--base-color:theme(colors.red.800)] [--base-gradient-color:theme(colors.red.400)]"
            duration={2.5}
          >
            Отворени позиции
          </TextShimmer>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <CareersList />
          </div>
        </section>

        {/* Apply Form */}
        <section className="mb-20 bg-white rounded-xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
          <TextShimmer 
            as="h2"
            className="text-2xl md:text-3xl font-bold mb-8 text-center [--base-color:theme(colors.red.800)] [--base-gradient-color:theme(colors.red.400)]"
            duration={2.5}
          >
            Кандидатствайте
          </TextShimmer>
          <CareerApplicationForm />
        </section>

        {/* FAQ Section */}
        <section className="mb-20">
          <TextShimmer 
            as="h2"
            className="text-2xl md:text-3xl font-bold mb-8 text-center [--base-color:theme(colors.red.800)] [--base-gradient-color:theme(colors.red.400)]"
            duration={2.5}
          >
            Често задавани въпроси
          </TextShimmer>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <CareersFAQ />
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default CareersPage;
