
import React, { useEffect, useState } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Loader2 } from 'lucide-react';

interface PropertyMapProps {
  address: string;
  location: string;
  city: string;
}

const PropertyMap: React.FC<PropertyMapProps> = ({ address, location, city }) => {
  const [loading, setLoading] = useState(true);
  
  // Create a Google Maps embed URL with the address
  const encodedAddress = encodeURIComponent(`${address}, ${location}, ${city}, Bulgaria`);
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBMH3v7YdXV-jbSGGgRXXsgRRaOr-nrD0U&q=${encodedAddress}&zoom=15`;
  
  // Handle iframe loading
  const handleIframeLoad = () => {
    setLoading(false);
  };

  return (
    <div className="relative rounded-lg overflow-hidden border">
      <AspectRatio ratio={16 / 9}>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        <iframe
          title="Property Location"
          src={mapUrl}
          className="w-full h-full"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          onLoad={handleIframeLoad}
        ></iframe>
      </AspectRatio>
    </div>
  );
};

export default PropertyMap;
