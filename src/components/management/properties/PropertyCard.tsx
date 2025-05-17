import React from 'react';
import { 
  Edit, 
  Trash2, 
  Star, 
  Eye, 
  EyeOff,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Property } from '@/hooks/use-properties';
import { TeamMember } from '@/integrations/supabase/types';

interface PropertyCardProps {
  property: Property;
  teamMembers: TeamMember[];
  onEdit: (property: Property) => void;
  onDelete: (property: Property) => void;
  onToggleFeatured: (property: Property) => void;
  onTogglePublished: (property: Property) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  teamMembers,
  onEdit,
  onDelete,
  onToggleFeatured,
  onTogglePublished
}) => {
  return (
    <Card className="overflow-hidden flex flex-col">
      <CardHeader className="pb-3 border-b">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold truncate pr-2">
            {property.title}
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(property)}>
                <Edit size={14} className="mr-2" />
                Редактирай
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onToggleFeatured(property)}>
                <Star size={14} className="mr-2" fill={property.is_featured ? "currentColor" : "none"} />
                {property.is_featured ? "Премахни от препоръчани" : "Добави в препоръчани"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onTogglePublished(property)}>
                {property.is_published ? (
                  <>
                    <EyeOff size={14} className="mr-2" />
                    Скрий имота
                  </>
                ) : (
                  <>
                    <Eye size={14} className="mr-2" />
                    Публикувай имота
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(property)} className="text-red-600">
                <Trash2 size={14} className="mr-2" />
                Изтрий
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription className="flex flex-wrap gap-2 mt-2">
          <Badge variant={property.is_published ? "default" : "outline"}>
            {property.is_published ? "Публикуван" : "Скрит"}
          </Badge>
          {property.is_featured && (
            <Badge variant="secondary">
              <Star size={12} className="mr-1" />
              Препоръчан
            </Badge>
          )}
          <Badge variant="outline" className="capitalize">
            {property.listing_type === 'sale' ? 'Продажба' : 'Наем'}
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-4 text-sm">
          {property.images && property.images.length > 0 && (
            <div className="aspect-video overflow-hidden rounded-md mb-3">
              <img 
                src={property.images[0]} 
                alt={property.title}
                className="h-full w-full object-cover" 
              />
            </div>
          )}
          
          <div className="bg-gray-50 p-3 rounded-md space-y-2">
            <h3 className="font-medium text-gray-700 border-b pb-1 mb-1">Основни данни</h3>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Цена:</span>
              <span className="font-medium">{property.price.toLocaleString('bg-BG')} лв.</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Тип:</span>
              <span>{property.property_type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Локация:</span>
              <span>{property.city}</span>
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-md space-y-2">
            <h3 className="font-medium text-gray-700 border-b pb-1 mb-1">Детайли</h3>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Площ:</span>
              <span>{property.area} м²</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Стаи:</span>
              <span>{property.bedrooms}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Бани:</span>
              <span>{property.bathrooms}</span>
            </div>
          </div>
          
          {property.agent_id && (
            <div className="bg-blue-50 p-3 rounded-md space-y-1">
              <h3 className="font-medium text-gray-700 border-b pb-1 mb-1">Отговорен агент</h3>
              <div className="text-sm">
                {teamMembers.find(m => m.id === property.agent_id)?.name || 'Неизвестен агент'}
              </div>
            </div>
          )}
          
          {property.virtual_tour_url && (
            <div className="mt-2">
              <a
                href={property.virtual_tour_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1.5 w-full justify-center text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Виртуална обиколка
              </a>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0 border-t mt-auto">
        <div className="text-xs text-muted-foreground">
          Създаден на: {new Date(property.created_at || '').toLocaleDateString('bg-BG')}
        </div>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard; 