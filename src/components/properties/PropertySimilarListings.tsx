import React from 'react';
import SimilarProperties from '@/components/properties/SimilarProperties';

interface PropertySimilarListingsProps {
  propertyId: number;
  location: string;
  city: string;
}

const PropertySimilarListings: React.FC<PropertySimilarListingsProps> = ({ 
  propertyId, 
  location,
  city 
}) => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-6">Подобни имоти {location && `в ${location}`}</h2>
      <SimilarProperties 
        currentPropertyId={propertyId} 
        location={location}
        city={city}
      />
    </div>
  );
};

export default PropertySimilarListings;
