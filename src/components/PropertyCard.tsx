
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize } from 'lucide-react';
import { Property, formatPrice } from '../data/properties';
import { motion } from 'framer-motion';
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
    <motion.div
      ref={safeRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg overflow-hidden property-card-shadow transition-transform duration-300 hover:-translate-y-1 h-full"
    >
      <Link to={`/properties/${property.id}`}>
        <div className="relative">
          <MotionImage
            src={property.imageUrl}
            alt={property.title}
            className="w-full h-56 object-cover"
            loadingComponent={<AnimatedSkeleton className="w-full h-56" />}
          />
          <motion.div 
            className="absolute top-4 right-4 bg-secondary text-white px-2 py-1 rounded text-sm font-medium"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isIntersecting ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {formatPrice(property.price)}
          </motion.div>
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/properties/${property.id}`}>
          <motion.h3 
            className="text-xl font-semibold mb-2 hover:text-primary transition-colors"
            initial={{ opacity: 0 }}
            animate={isIntersecting ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {property.title}
          </motion.h3>
        </Link>
        
        <motion.div 
          className="flex items-center text-neutral mb-2"
          initial={{ opacity: 0 }}
          animate={isIntersecting ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <MapPin className="h-4 w-4 mr-1" />
          <span>{property.location}, {property.city}</span>
        </motion.div>

        <motion.p 
          className="text-neutral-dark mb-4 line-clamp-2"
          initial={{ opacity: 0 }}
          animate={isIntersecting ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          {property.description}
        </motion.p>

        <motion.div 
          className="flex justify-between text-neutral-dark border-t pt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <Bed className="h-4 w-4 mr-1" />
            <span>{property.bedrooms} спални</span>
          </motion.div>
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <Bath className="h-4 w-4 mr-1" />
            <span>{property.bathrooms} бани</span>
          </motion.div>
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <Maximize className="h-4 w-4 mr-1" />
            <span>{property.area} кв.м</span>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
