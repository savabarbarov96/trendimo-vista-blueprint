import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Property, PropertyFormData } from '@/hooks/use-properties';
import { TeamMember } from '@/integrations/supabase/types';
import PropertyForm from './PropertyForm';

interface PropertyDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  formData: Partial<PropertyFormData>;
  uploadedImages: string[];
  teamMembers: TeamMember[];
  loadingTeamMembers: boolean;
  temporaryId: string;
  isEditing: boolean;
  currentProperty: Property | null;
  isPending: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onCheckboxChange: (name: string, checked: boolean) => void;
  onImageUpload: (urls: string[], files: File[]) => void;
}

const PropertyDialog: React.FC<PropertyDialogProps> = ({
  isOpen,
  title,
  description,
  formData,
  uploadedImages,
  teamMembers,
  loadingTeamMembers,
  temporaryId,
  isEditing,
  currentProperty,
  isPending,
  onClose,
  onSubmit,
  onInputChange,
  onCheckboxChange,
  onImageUpload
}) => {
  // Handler for location changes
  const handleLocationChange = (latitude: number, longitude: number) => {
    // Manual property updating using checkbox change
    onCheckboxChange('latitude', latitude as any);
    onCheckboxChange('longitude', longitude as any);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="pb-2">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>

        <PropertyForm
          formData={formData}
          uploadedImages={uploadedImages}
          teamMembers={teamMembers}
          loadingTeamMembers={loadingTeamMembers}
          temporaryId={temporaryId}
          isEditing={isEditing}
          propertyId={currentProperty?.id}
          onInputChange={onInputChange}
          onCheckboxChange={onCheckboxChange}
          onImageUpload={onImageUpload}
          onLocationChange={handleLocationChange}
        />

        <DialogFooter className="mt-2 pt-4 border-t">
          <Button 
            variant="outline" 
            onClick={onClose}
          >
            Отказ
          </Button>
          <Button 
            onClick={onSubmit}
            disabled={isPending}
          >
            {isPending ? (isEditing ? 'Запазване...' : 'Създаване...') : (isEditing ? 'Запази' : 'Създай')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyDialog; 