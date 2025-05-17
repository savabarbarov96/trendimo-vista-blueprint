import React from 'react';
import SimilarProperties from '@/components/properties/SimilarProperties';
import { BuildingIcon, MapPin } from 'lucide-react';

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
    <div>
      <div className="flex items-center mb-6">
        <BuildingIcon className="h-6 w-6 text-red-700 mr-3" />
        <h2 className="text-2xl font-bold text-neutral-900">
          Подобни имоти
          {location && (
            <span className="flex items-center text-base font-normal ml-2 text-red-600">
              <MapPin className="h-4 w-4 mr-1" />
              в {city}
            </span>
          )}
        </h2>
      </div>
      
      <SimilarProperties 
        currentPropertyId={propertyId} 
        location={location}
        city={city}
      />
    </div>
  );
};

export default PropertySimilarListings;
