
import React from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious 
} from '@/components/ui/carousel';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface PropertyCarouselProps {
  images: string[];
}

export const PropertyCarousel: React.FC<PropertyCarouselProps> = ({ images }) => {
  // If there are no images, use a placeholder
  if (!images || images.length === 0) {
    return (
      <div className="rounded-lg overflow-hidden border">
        <AspectRatio ratio={16 / 9}>
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <p className="text-muted-foreground">No images available</p>
          </div>
        </AspectRatio>
      </div>
    );
  }

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="rounded-lg overflow-hidden">
              <AspectRatio ratio={16 / 9}>
                <img 
                  src={image} 
                  alt={`Property image ${index + 1}`} 
                  className="object-cover w-full h-full"
                />
              </AspectRatio>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  );
};
