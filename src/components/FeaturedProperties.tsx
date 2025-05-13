
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import PropertyCard from './PropertyCard';
import { siteContent } from '../data/content';
import { getFeaturedProperties } from '../data/properties';

const FeaturedProperties = () => {
  const { home } = siteContent;
  const featuredProperties = getFeaturedProperties();

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">{home.featured.title}</h2>
            <p className="text-lg text-neutral">{home.featured.subtitle}</p>
          </div>
          <Link to="/properties">
            <Button variant="outline" className="mt-4 md:mt-0">
              {home.featured.viewAll}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
