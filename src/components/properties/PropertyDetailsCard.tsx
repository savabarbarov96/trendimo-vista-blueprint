
import React from 'react';
import { Bed, Bath, Maximize } from 'lucide-react';
import { Property } from '@/data/properties';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface PropertyDetailsCardProps {
  property: Property;
}

const PropertyDetailsCard: React.FC<PropertyDetailsCardProps> = ({ property }) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <h2 className="text-2xl font-semibold">Property Details</h2>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center">
            <Bed className="h-5 w-5 mr-2 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Bedrooms</p>
              <p className="font-medium">{property.bedrooms}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Bath className="h-5 w-5 mr-2 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Bathrooms</p>
              <p className="font-medium">{property.bathrooms}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Maximize className="h-5 w-5 mr-2 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Area</p>
              <p className="font-medium">{property.area} sq.m</p>
            </div>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        {/* Description */}
        <div>
          <h3 className="font-medium mb-2">Description</h3>
          <p className="text-neutral-dark whitespace-pre-line">
            {property.description}
          </p>
        </div>
        
        <Separator className="my-6" />
        
        {/* Features and amenities */}
        <div>
          <h3 className="font-medium mb-3">Features & Amenities</h3>
          <div className="grid grid-cols-2 gap-y-2">
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
              <span>Property Type: {property.propertyType}</span>
            </div>
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
              <span>City: {property.city}</span>
            </div>
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
              <span>Location: {property.location}</span>
            </div>
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
              <span>Status: {property.status}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyDetailsCard;
