import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Property } from '@/hooks/use-properties';
import { TeamMember } from '@/integrations/supabase/types';
import PropertyCard from './PropertyCard';

interface PropertyGridProps {
  properties: Property[];
  teamMembers: TeamMember[];
  isLoading: boolean;
  error: Error | null;
  onCreateClick: () => void;
  onEditClick: (property: Property) => void;
  onDeleteClick: (property: Property) => void;
  onToggleFeatured: (property: Property) => void;
  onTogglePublished: (property: Property) => void;
}

const PropertyGrid: React.FC<PropertyGridProps> = ({
  properties,
  teamMembers,
  isLoading,
  error,
  onCreateClick,
  onEditClick,
  onDeleteClick,
  onToggleFeatured,
  onTogglePublished
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4">
        <p className="text-red-500">Грешка при зареждане на имотите: {error.message}</p>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground mb-4">Все още нямате добавени имоти</p>
        <Button 
          onClick={onCreateClick}
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          <span>Добавете първия имот</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          teamMembers={teamMembers}
          onEdit={onEditClick}
          onDelete={onDeleteClick}
          onToggleFeatured={onToggleFeatured}
          onTogglePublished={onTogglePublished}
        />
      ))}
    </div>
  );
};

export default PropertyGrid; 