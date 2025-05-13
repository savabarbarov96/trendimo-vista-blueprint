
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize } from 'lucide-react';
import { Property, formatPrice } from '../data/properties';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden property-card-shadow transition-transform duration-300 hover:-translate-y-1 h-full">
      <Link to={`/properties/${property.id}`}>
        <div className="relative">
          <img
            src={property.imageUrl}
            alt={property.title}
            className="w-full h-56 object-cover"
          />
          <div className="absolute top-4 right-4 bg-secondary text-white px-2 py-1 rounded text-sm font-medium">
            {formatPrice(property.price)}
          </div>
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/properties/${property.id}`}>
          <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
            {property.title}
          </h3>
        </Link>
        
        <div className="flex items-center text-neutral mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{property.location}, {property.city}</span>
        </div>

        <p className="text-neutral-dark mb-4 line-clamp-2">{property.description}</p>

        <div className="flex justify-between text-neutral-dark border-t pt-4">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            <span>{property.bedrooms} спални</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            <span>{property.bathrooms} бани</span>
          </div>
          <div className="flex items-center">
            <Maximize className="h-4 w-4 mr-1" />
            <span>{property.area} кв.м</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
