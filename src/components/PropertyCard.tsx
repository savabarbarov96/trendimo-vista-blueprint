import React from 'react';
import { MapPin, Bed, Bath, Maximize } from 'lucide-react';
import { Property, formatPrice } from '../data/properties';
import { useIntersectionObserver } from '@/lib/animations/intersection-observer';
import { MotionImage } from '@/components/ui/motion';
import { AnimatedSkeleton } from '@/components/ui/animated-skeleton';
import { usePropertyModal } from '@/components/properties/PropertyModalProvider';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });
  const { openPropertyModal } = usePropertyModal();

  // Explicitly cast the ref to allow it to work with both element types
  const safeRef = (node: HTMLDivElement | null) => {
    if (node) ref.current = node;
  };

  const handlePropertyClick = () => {
    openPropertyModal(property.id.toString());
  };

  return (
    <div
      ref={safeRef}
      className={`bg-white rounded-lg overflow-hidden property-card-shadow transition-all duration-500 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} hover:-translate-y-1 h-full cursor-pointer`}
      onClick={handlePropertyClick}
    >
      <div className="relative">
        <MotionImage
          src={property.imageUrl}
          alt={property.title}
          className="w-full h-56 object-cover"
          loadingComponent={<AnimatedSkeleton className="w-full h-56" />}
        />
        <div 
          className={`absolute top-4 right-4 bg-red-600 text-white px-2 py-1 rounded text-sm font-medium transition-all duration-300 ${isIntersecting ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
          style={{ transitionDelay: '0.2s' }}
        >
          {formatPrice(property.price)}
        </div>
      </div>

      <div className="p-4">
        <h3 
          className={`text-xl font-semibold mb-2 hover:text-red-700 transition-colors transition-opacity duration-300 ${isIntersecting ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: '0.1s' }}
        >
          {property.title}
        </h3>
        
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

        {/* Property features */}
        <div className={`grid grid-cols-3 gap-2 transition-opacity duration-300 ${isIntersecting ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: '0.4s' }}
        >
          <div className="flex items-center text-sm">
            <Bed className="h-4 w-4 mr-1 text-primary" />
            <span>{property.bedrooms} bd</span>
          </div>
          <div className="flex items-center text-sm">
            <Bath className="h-4 w-4 mr-1 text-primary" />
            <span>{property.bathrooms} ba</span>
          </div>
          <div className="flex items-center text-sm">
            <Maximize className="h-4 w-4 mr-1 text-primary" />
            <span>{property.area} m²</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
