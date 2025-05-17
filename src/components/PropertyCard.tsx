import React from 'react';
import { MapPin, Bed, Bath, Maximize } from 'lucide-react';
import { Property, formatPrice } from '../data/properties';
import { useIntersectionObserver } from '@/lib/animations/intersection-observer';
import { MotionImage } from '@/components/ui/motion';
import { Link } from 'react-router-dom';
import { useAgent } from '@/components/properties/usePropertyMapper';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true
  });

  // Fetch agent data
  const { data: agent } = useAgent(property.agent?.id || null);

  // Explicitly cast the ref to allow it to work with both element types
  const safeRef = (node: HTMLDivElement | null) => {
    if (node) ref.current = node;
  };

  return (
    <Link to={`/properties/${property.id}`}>
      <div 
        ref={safeRef}
        className="bg-white rounded-xl overflow-hidden shadow-elegant border border-red-100 hover:shadow-elegant-hover transition-shadow duration-300"
      >
        {/* Property image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <MotionImage
            src={property.imageUrl}
            alt={property.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {property.featured && (
            <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Препоръчан
            </div>
          )}
          <div className="absolute bottom-3 right-3 bg-white text-red-700 px-3 py-1 rounded-full font-semibold shadow-lg">
            {formatPrice(property.price)}
          </div>
        </div>

        {/* Property details */}
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
            {property.bedrooms > 0 && (
              <div className="flex items-center text-sm">
                <Bed className="h-4 w-4 mr-1 text-primary" />
                <span>{property.bedrooms}-СТАЕН</span>
              </div>
            )}
            {property.bathrooms > 0 && (
              <div className="flex items-center text-sm">
                <Bath className="h-4 w-4 mr-1 text-primary" />
                <span>{property.bathrooms} Бани</span>
              </div>
            )}
            <div className="flex items-center text-sm">
              <Maximize className="h-4 w-4 mr-1 text-primary" />
              <span>{property.area} m²</span>
            </div>
          </div>
          
          {/* Agent badge (if available) */}
          {agent && (
            <div 
              className={`mt-3 flex items-center border-t pt-3 transition-opacity duration-300 ${isIntersecting ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: '0.5s' }}
            >
              <div className="h-8 w-8 rounded-full overflow-hidden flex-shrink-0">
                {agent.image_url ? (
                  <img 
                    src={agent.image_url} 
                    alt={agent.name}
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <div className="w-full h-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                    {agent.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="ml-2 text-xs">
                <p className="font-semibold text-primary">{agent.name}</p>
                <p className="text-neutral">{agent.position}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
