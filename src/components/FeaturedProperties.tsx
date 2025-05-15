import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import PropertyCard from './PropertyCard';
import { siteContent } from '../data/content';
import { useFeaturedProperties } from '@/hooks/use-properties';

const FeaturedProperties = () => {
  const { home } = siteContent;
  const { data: featuredProperties, isLoading, error } = useFeaturedProperties();

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-blue-700">{home.featured.title}</h2>
            <p className="text-lg text-neutral">{home.featured.subtitle}</p>
          </div>
          <Link to="/properties">
            <Button variant="outline" className="mt-4 md:mt-0 hover:bg-blue-50 border-blue-300">
              {home.featured.viewAll}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center p-4">
            <p className="text-red-500">Грешка при зареждане на имотите</p>
          </div>
        ) : featuredProperties && featuredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={{
                id: Number(property.id),
                title: property.title,
                description: property.description || '',
                price: property.price,
                area: property.area || 0,
                bedrooms: property.bedrooms || 0,
                bathrooms: property.bathrooms || 0,
                location: '',
                city: property.city,
                address: property.address,
                propertyType: property.property_type,
                status: 'available',
                featured: true,
                imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
                images: ['https://images.unsplash.com/photo-1580587771525-78b9dba3b914'],
                createdAt: property.created_at || new Date().toISOString()
              }} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">В момента няма препоръчани имоти</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProperties;
