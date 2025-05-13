
import React from "react";
import { Helmet } from "react-helmet";
import CareersList from "@/components/careers/CareersList";
import CareerApplicationForm from "@/components/careers/CareerApplicationForm";
import CompanyCulture from "@/components/careers/CompanyCulture";
import EmployeeTestimonials from "@/components/careers/EmployeeTestimonials";
import CareersFAQ from "@/components/careers/CareersFAQ";

const CareersPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Кариери | Trendimo</title>
        <meta 
          name="description" 
          content="Станете част от екипа на Trendimo - кариерни възможности и отворени позиции." 
        />
      </Helmet>
      
      <div className="container mx-auto py-12 px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Кариери в Trendimo</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Присъединете се към нашия екип от професионалисти в сферата на недвижимите имоти и бъдете част от 
            изграждането на бъдещето на имотния пазар в България.
          </p>
        </div>

        {/* Company Culture Section with Photo Gallery */}
        <CompanyCulture />

        {/* Employee Testimonials */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Нашите служители споделят</h2>
          <EmployeeTestimonials />
        </section>

        {/* Open Positions */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Отворени позиции</h2>
          <CareersList />
        </section>

        {/* Apply Form */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Кандидатствайте</h2>
          <CareerApplicationForm />
        </section>

        {/* FAQ Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Често задавани въпроси</h2>
          <CareersFAQ />
        </section>
      </div>
    </div>
  );
};

export default CareersPage;
