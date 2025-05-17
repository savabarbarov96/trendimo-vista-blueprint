import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Edit, Share2, Printer, Heart, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Property, formatPrice } from '@/data/properties';
import { MapPin, Calendar, Tag } from 'lucide-react';
import { useAgent } from './usePropertyMapper';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

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
  
  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Вижте този имот: ${property.title}`,
        url: window.location.href,
      }).catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast.success('Линкът е копиран в клипборда');
    }
  };
  
  const handlePrintClick = () => {
    window.print();
  };

  const formatPricePerSqm = (price: number, area: number) => {
    if (!area) return null;
    const pricePerSqm = price / area;
    return new Intl.NumberFormat('bg-BG', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(pricePerSqm)
      .replace('EUR', '€');
  };

  return (
    <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-neutral-100 pt-4 pb-4 shadow-sm">
      <div className="flex flex-wrap justify-between items-start gap-4">
        {/* Left side: Back button and property title */}
        <div className="flex flex-col space-y-3">
          <Button variant="outline" size="sm" asChild className="w-fit hover:bg-red-50">
            <Link to="/properties">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span>Обратно към имоти</span>
            </Link>
          </Button>
          
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight">{property.title}</h1>
          
          <div className="flex items-center text-neutral-600">
            <MapPin className="h-4 w-4 mr-1 text-red-600" />
            <span className="text-sm md:text-base">
              {property.location}, {property.city}
            </span>
          </div>
        </div>
        
        {/* Right side: Price and Action buttons */}
        <div className="flex flex-col space-y-4 items-end">
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-neutral-700 hover:text-red-700 hover:bg-red-50"
              onClick={handleShareClick}
            >
              <Share2 className="h-4 w-4 mr-2" />
              <span>Споделяне</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-neutral-700 hover:text-red-700 hover:bg-red-50"
              onClick={handlePrintClick}
            >
              <Printer className="h-4 w-4 mr-2 md:block hidden" />
              <span className="md:block hidden">Принтиране</span>
              <Printer className="h-4 w-4 md:hidden" />
            </Button>
          </div>
          
          <div className="flex flex-col items-end">
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold text-red-800">
                {formatPrice(property.price)}
              </span>
              <Badge variant="outline" className="bg-red-50">
                {property.listing_type === 'rent' ? 'Под наем' : 'Продажба'}
              </Badge>
            </div>
            
            <div className="flex items-center mt-1 text-neutral-500 text-sm">
              {property.area && (
                <>
                  <Tag className="h-3 w-3 mr-1 text-red-600" />
                  <span>{formatPricePerSqm(property.price, property.area)}/м²</span>
                </>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-red-50 border-red-100">
              {property.propertyType}
            </Badge>
            {property.bedrooms > 0 && (
              <Badge variant="outline" className="bg-red-50 border-red-100">
                {property.bedrooms} {property.bedrooms === 1 ? 'стая' : 'стаи'}
              </Badge>
            )}
            {property.area && (
              <Badge variant="outline" className="bg-red-50 border-red-100">
                {property.area} м²
              </Badge>
            )}
          </div>
        </div>
      </div>
      
      {/* Agent edit button - only shown to agents */}
      {isAgent && (
        <div className="mt-4 flex justify-end">
          <Button variant="outline" size="sm" className="text-neutral-700 border-neutral-200 hover:bg-red-50 hover:text-red-700">
            <Edit className="h-4 w-4 mr-2" />
            <span>Редактиране на имота</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default PropertyDetailHeader;
