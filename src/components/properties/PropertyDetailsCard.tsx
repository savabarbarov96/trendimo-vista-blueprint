import React from 'react';
import { Bed, Bath, Maximize, Video } from 'lucide-react';
import { Property } from '@/data/properties';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface PropertyDetailsCardProps {
  property: Property;
}

// Helper function to extract YouTube video ID from various YouTube URL formats
const getYouTubeVideoId = (url: string): string | null => {
  if (!url) return null;
  
  // Regular expression to extract video ID from different YouTube URL formats
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  
  return (match && match[2].length === 11) ? match[2] : null;
};

const PropertyDetailsCard: React.FC<PropertyDetailsCardProps> = ({ property }) => {
  // Extract YouTube video ID if a virtual tour URL is available
  const videoId = property.virtual_tour_url ? getYouTubeVideoId(property.virtual_tour_url) : null;

  return (
    <Card className="mb-8">
      <CardHeader>
        <h2 className="text-2xl font-semibold">Детайли за имота</h2>
      </CardHeader>
      <CardContent>
        {/* Virtual Tour */}
        {videoId && (
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <Video className="h-5 w-5 mr-2 text-primary" />
              <h3 className="font-medium">Виртуална обиколка</h3>
            </div>
            <div className="aspect-video w-full rounded-lg overflow-hidden">
              <iframe 
                width="100%" 
                height="100%" 
                src={`https://www.youtube.com/embed/${videoId}`} 
                title="Виртуална обиколка"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            {videoId && <Separator className="my-6" />}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center">
            <Bed className="h-5 w-5 mr-2 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Стаи</p>
              <p className="font-medium">{property.bedrooms}-СТАЕН</p>
            </div>
          </div>
          {property.bathrooms > 0 && (
            <div className="flex items-center">
              <Bath className="h-5 w-5 mr-2 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Бани</p>
                <p className="font-medium">{property.bathrooms}</p>
              </div>
            </div>
          )}
          <div className="flex items-center">
            <Maximize className="h-5 w-5 mr-2 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Площ</p>
              <p className="font-medium">{property.area} м²</p>
            </div>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        {/* Description */}
        <div>
          <h3 className="font-medium mb-2">Описание</h3>
          <p className="text-neutral-dark whitespace-pre-line">
            {property.description}
          </p>
        </div>
        
        <Separator className="my-6" />
        
        {/* Features and amenities */}
        <div>
          <h3 className="font-medium mb-3">Характеристики</h3>
          <div className="grid grid-cols-2 gap-y-2">
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
              <span>Тип имот: {property.propertyType}</span>
            </div>
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
              <span>Град: {property.city}</span>
            </div>
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
              <span>Локация: {property.location}</span>
            </div>
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
              <span>Статус: {property.status === 'available' ? 'Наличен' : 'Продаден'}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyDetailsCard;
