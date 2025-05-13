
import React from "react";
import { Helmet } from "react-helmet";
import CareersList from "@/components/careers/CareersList";
import CareerApplicationForm from "@/components/careers/CareerApplicationForm";
import CompanyCulture from "@/components/careers/CompanyCulture";
import EmployeeTestimonials from "@/components/careers/EmployeeTestimonials";
import CareersFAQ from "@/components/careers/CareersFAQ";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CareersPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
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
        <div className="text-center mb-16 bg-gradient-to-r from-blue-100 to-white p-8 rounded-xl shadow-elegant border border-blue-100">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-700 to-primary bg-clip-text text-transparent">Кариери в Trendimo</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Присъединете се към нашия екип от професионалисти в сферата на недвижимите имоти и бъдете част от 
            изграждането на бъдещето на имотния пазар в България.
          </p>
        </div>

        {/* Company Culture Section with Photo Gallery */}
        <CompanyCulture />

        {/* Employee Testimonials */}
        <section className="mb-20 bg-gradient-to-r from-blue-50 to-indigo-50 py-12 rounded-xl shadow-elegant">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-700 to-primary bg-clip-text text-transparent">Нашите служители споделят</h2>
          <EmployeeTestimonials />
        </section>

        {/* Open Positions */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-700 to-primary bg-clip-text text-transparent">Отворени позиции</h2>
          <div className="bg-white rounded-xl shadow-elegant p-6 border border-blue-100">
            <CareersList />
          </div>
        </section>

        {/* Apply Form */}
        <section className="mb-20 bg-gradient-to-r from-blue-100 to-white rounded-xl shadow-elegant p-8 border border-blue-100">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-700 to-primary bg-clip-text text-transparent">Кандидатствайте</h2>
          <CareerApplicationForm />
        </section>

        {/* FAQ Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-700 to-primary bg-clip-text text-transparent">Често задавани въпроси</h2>
          <div className="bg-white rounded-xl shadow-elegant p-6 border border-blue-100">
            <CareersFAQ />
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default CareersPage;
