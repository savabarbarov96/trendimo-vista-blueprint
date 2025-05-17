import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Property, formatPrice } from '@/data/properties';
import { MapPin } from 'lucide-react';
import { useAgent } from './usePropertyMapper';

interface PropertyDetailHeaderProps {
  property: Property;
  isAgent: boolean;
}

const PropertyDetailHeader: React.FC<PropertyDetailHeaderProps> = ({ 
  property, 
  isAgent 
}) => {
  // Fetch agent data
  const { data: agent } = useAgent(property.agent?.id || null);

  return (
    <>
      {/* Back button and edit controls */}
      <div className="flex justify-between items-center mb-6">
        <Button variant="outline" asChild>
          <Link to="/properties">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Properties
          </Link>
        </Button>
        
        {isAgent && (
          <Button variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Edit Property
          </Button>
        )}
      </div>
      
      {/* Property title and price */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold">{property.title}</h1>
        <div className="flex items-center mt-2">
          <MapPin className="h-5 w-5 text-neutral" />
          <span className="ml-2 text-lg text-neutral-dark">
            {property.address}
          </span>
        </div>
        <div className="mt-4">
          <span className="text-3xl font-bold text-primary">
            {formatPrice(property.price)}
          </span>
          {agent && (
            <div className="mt-2 text-neutral-dark">
              Агент: {agent.name} ({agent.position})
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PropertyDetailHeader;
