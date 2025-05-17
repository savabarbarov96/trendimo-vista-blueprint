import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import PropertyMap from '@/components/properties/PropertyMap';

interface PropertyLocationCardProps {
  address: string;
  location: string;
  city: string;
}

const PropertyLocationCard: React.FC<PropertyLocationCardProps> = ({ 
  address, 
  location, 
  city 
}) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <h2 className="text-2xl font-semibold">Локация</h2>
      </CardHeader>
      <CardContent>
        <PropertyMap 
          address={address} 
          location={location} 
          city={city} 
        />
      </CardContent>
    </Card>
  );
};

export default PropertyLocationCard;
