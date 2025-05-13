
import React from 'react';
import { ArrowRight, Home, DollarSign, Key, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedProperties from '@/components/FeaturedProperties';
import Footer from '@/components/Footer';
import { siteContent } from '@/data/content';

const Index = () => {
  const { home } = siteContent;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      
      <main>
        {/* Featured Properties Section */}
        <FeaturedProperties />

        {/* Services Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{home.services.title}</h2>
              <p className="text-lg text-neutral">{home.services.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-none shadow-lg">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="rounded-full bg-blue-100 p-4 mb-4">
                    <Home className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{home.services.buying.title}</h3>
                  <p className="text-neutral-dark">{home.services.buying.description}</p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="rounded-full bg-orange-100 p-4 mb-4">
                    <DollarSign className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{home.services.selling.title}</h3>
                  <p className="text-neutral-dark">{home.services.selling.description}</p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="rounded-full bg-blue-100 p-4 mb-4">
                    <Key className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{home.services.renting.title}</h3>
                  <p className="text-neutral-dark">{home.services.renting.description}</p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="rounded-full bg-orange-100 p-4 mb-4">
                    <Users className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{home.services.consulting.title}</h3>
                  <p className="text-neutral-dark">{home.services.consulting.description}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary to-blue-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{home.cta.title}</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">{home.cta.description}</p>
            <Link to="/contact">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                {home.cta.buttonText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
