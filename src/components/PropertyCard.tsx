
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize } from 'lucide-react';
import { Property, formatPrice } from '../data/properties';
import { useIntersectionObserver } from '@/lib/animations/intersection-observer';
import { MotionImage } from '@/components/ui/motion';
import { AnimatedSkeleton } from '@/components/ui/animated-skeleton';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Explicitly cast the ref to allow it to work with both element types
  const safeRef = (node: HTMLDivElement | null) => {
    if (node) ref.current = node;
  };

  return (
    <div
      ref={safeRef}
      className={`bg-white rounded-lg overflow-hidden property-card-shadow transition-all duration-500 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} hover:-translate-y-1 h-full`}
    >
      <Link to={`/properties/${property.id}`}>
        <div className="relative">
          <MotionImage
            src={property.imageUrl}
            alt={property.title}
            className="w-full h-56 object-cover"
            loadingComponent={<AnimatedSkeleton className="w-full h-56" />}
          />
          <div 
            className={`absolute top-4 right-4 bg-secondary text-white px-2 py-1 rounded text-sm font-medium transition-all duration-300 ${isIntersecting ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
            style={{ transitionDelay: '0.2s' }}
          >
            {formatPrice(property.price)}
          </div>
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/properties/${property.id}`}>
          <h3 
            className={`text-xl font-semibold mb-2 hover:text-primary transition-colors transition-opacity duration-300 ${isIntersecting ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '0.1s' }}
          >
            {property.title}
          </h3>
        </Link>
        
        <div 
          className={`flex items-center text-neutral mb-2 transition-opacity duration-300 ${isIntersecting ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: '0.2s' }}
        >
          <MapPin className="h-4 w-4 mr-1" />
          <span>{property.location}, {property.city}</span>
        </div>

        <p 
          className={`text-neutral-dark mb-4 line-clamp-2 transition-opacity duration-300 ${isIntersecting ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: '0.3s' }}
        >
          {property.description}
        </p>

        <div 
          className={`flex justify-between text-neutral-dark border-t pt-4 transition-all duration-300 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '0.4s' }}
        >
          <div 
            className="flex items-center hover:scale-105 transition-transform duration-200"
          >
            <Bed className="h-4 w-4 mr-1" />
            <span>{property.bedrooms} спални</span>
          </div>
          <div 
            className="flex items-center hover:scale-105 transition-transform duration-200"
          >
            <Bath className="h-4 w-4 mr-1" />
            <span>{property.bathrooms} бани</span>
          </div>
          <div 
            className="flex items-center hover:scale-105 transition-transform duration-200"
          >
            <Maximize className="h-4 w-4 mr-1" />
            <span>{property.area} кв.м</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
