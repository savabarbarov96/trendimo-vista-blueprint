import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/hooks/auth/use-user';
import { supabase } from '@/integrations/supabase/client';
import { 
  useProperties, 
  useCreateProperty, 
  useUpdateProperty, 
  useDeleteProperty,
  useTogglePropertyFeatured,
  useTogglePropertyPublished,
  type Property, 
  type PropertyFormData
} from '@/hooks/use-properties';
import { TeamMember } from '@/integrations/supabase/types';
import PropertyGrid from './properties/PropertyGrid';
import PropertyDialog from './properties/PropertyDialog';
import DeleteConfirmationDialog from './properties/DeleteConfirmationDialog';
import { propertyTypes } from '@/data/content';

const PropertiesManagement = () => {
  const { toast } = useToast();
  const { data: user } = useUser();
  const { data: properties, isLoading, error } = useProperties();
  const createProperty = useCreateProperty();
  const updateProperty = useUpdateProperty();
  const deleteProperty = useDeleteProperty();
  const toggleFeatured = useTogglePropertyFeatured();
  const togglePublished = useTogglePropertyPublished();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentProperty, setCurrentProperty] = useState<Property | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loadingTeamMembers, setLoadingTeamMembers] = useState(false);
  const [formData, setFormData] = useState<Partial<PropertyFormData>>({
    title: '',
    description: '',
    price: 0,
    address: '',
    city: '',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    property_type: propertyTypes[0],
    listing_type: 'sale',
    is_featured: false,
    is_published: true,
    images: [],
    agent_id: '',
    virtual_tour_url: '',
    latitude: null,
    longitude: null
  });
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [tempId] = useState<string>(`temp_${Date.now()}`);

  // Fetch team members (agents)
  useEffect(() => {
    const fetchTeamMembers = async () => {
      setLoadingTeamMembers(true);
      try {
        const { data, error } = await supabase
          .from('team_members')
          .select('*')
          .eq('is_active', true)
          .order('name');
        
        if (error) throw error;
        setTeamMembers(data || []);
      } catch (err) {
        console.error('Error fetching team members:', err);
        toast({
          title: 'Грешка при зареждане на екипа',
          description: 'Не можахме да заредим списъка с агенти.',
          variant: 'destructive'
        });
      } finally {
        setLoadingTeamMembers(false);
      }
    };

    fetchTeamMembers();
  }, [toast]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'number') {
      const numericValue = value === '' ? 0 : parseFloat(value);
      setFormData({
        ...formData,
        [name]: isNaN(numericValue) ? 0 : numericValue
      });
    } else if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Handle checkbox changes
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData({
      ...formData,
      [name]: checked
    });
  };
  
  // Handle direct value changes (like location)
  const handleValueChange = (name: string, value: any) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: 0,
      address: '',
      city: '',
      bedrooms: 0,
      bathrooms: 0,
      area: 0,
      property_type: propertyTypes[0],
      listing_type: 'sale',
      is_featured: false,
      is_published: true,
      images: [],
      agent_id: '',
      virtual_tour_url: '',
      latitude: null,
      longitude: null
    });
    setUploadedImages([]);
  };

  // Close create dialog
  const handleCloseCreateDialog = () => {
    setIsCreateDialogOpen(false);
    resetForm();
  };

  // Close edit dialog
  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setCurrentProperty(null);
    resetForm();
  };

  // Close delete dialog
  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setCurrentProperty(null);
  };

  // Open edit dialog
  const handleEditClick = (property: Property) => {
    setCurrentProperty(property);
    setFormData({
      title: property.title,
      description: property.description || '',
      price: property.price,
      address: property.address,
      city: property.city,
      bedrooms: property.bedrooms || 0,
      bathrooms: property.bathrooms || 0,
      area: property.area || 0,
      property_type: property.property_type,
      listing_type: property.listing_type,
      is_featured: property.is_featured || false,
      is_published: property.is_published || true,
      images: property.images || [],
      agent_id: property.agent_id || '',
      virtual_tour_url: property.virtual_tour_url || '',
      latitude: property.latitude,
      longitude: property.longitude
    });
    setUploadedImages(property.images || []);
    setIsEditDialogOpen(true);
  };

  // Open delete dialog
  const handleDeleteClick = (property: Property) => {
    setCurrentProperty(property);
    setIsDeleteDialogOpen(true);
  };

  // Handle image upload
  const handleImageUpload = (urls: string[], _files: File[]) => {
    setUploadedImages(urls);
    setFormData(prev => ({
      ...prev,
      images: urls
    }));
  };

  // Handle create property form submission
  const handleCreateProperty = async () => {
    try {
      // Validate form
      if (!formData.title || !formData.price || !formData.address || !formData.city) {
        toast({
          title: "Невалидна форма",
          description: "Моля, попълнете всички задължителни полета.",
          variant: "destructive",
        });
        return;
      }

      // Add owner ID and create property
      const data = {
        ...formData,
        owner_id: user?.id,
      } as PropertyFormData;

      const property = await createProperty.mutateAsync(data);

      // If we have uploaded images to a temporary folder, update their paths in the database
      if (uploadedImages.length > 0) {
        // Store the uploaded images with correct paths in the database
        // We'll keep the same URLs since we're storing public URLs that should work regardless of folder structure
        await updateProperty.mutateAsync({
          id: property.id,
          property: {
            images: uploadedImages
          }
        });
        
        // Move each image from the temporary folder to the property's permanent folder
        const { data: storageData, error: storageError } = await supabase.storage
          .from('trendimo')
          .list(`property_media/${tempId}/`);
          
        if (!storageError && storageData) {
          for (const file of storageData) {
            if (file.name) {
              // 1. Download the file
              const { data: fileData, error: downloadError } = await supabase.storage
                .from('trendimo')
                .download(`property_media/${tempId}/${file.name}`);
                
              if (!downloadError && fileData) {
                // 2. Upload to new location with property ID
                const { error: uploadError } = await supabase.storage
                  .from('trendimo')
                  .upload(`property_media/${property.id}/${file.name}`, fileData, {
                    cacheControl: '3600',
                    upsert: true
                  });
                  
                if (!uploadError) {
                  // 3. Delete the file from the temporary location (optional, but good for cleanup)
                  await supabase.storage
                    .from('trendimo')
                    .remove([`property_media/${tempId}/${file.name}`]);
                }
              }
            }
          }
        }
      }

      toast({
        title: "Имотът е създаден успешно!",
        description: "Имотът е добавен в базата данни.",
      });
      
      setIsCreateDialogOpen(false);
      resetForm();
    } catch (error: any) {
      toast({
        title: "Грешка при създаване на имота",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Handle update property
  const handleUpdateProperty = () => {
    if (!currentProperty) return;
    
    updateProperty.mutate({
      id: currentProperty.id,
      property: formData
    }, {
      onSuccess: () => {
        toast({
          title: "Имотът е обновен успешно!",
          description: "Промените бяха запазени.",
        });
        setIsEditDialogOpen(false);
        setCurrentProperty(null);
        resetForm();
      },
      onError: (error) => {
        toast({
          title: "Грешка при обновяване на имота",
          description: error.message,
          variant: "destructive",
        });
      }
    });
  };

  // Handle delete property
  const handleDeleteProperty = () => {
    if (!currentProperty) return;
    
    deleteProperty.mutate(currentProperty.id, {
      onSuccess: () => {
        toast({
          title: "Имотът е изтрит успешно!",
          description: "Имотът беше премахнат от системата.",
        });
        setIsDeleteDialogOpen(false);
        setCurrentProperty(null);
      },
      onError: (error) => {
        toast({
          title: "Грешка при изтриване на имота",
          description: error.message,
          variant: "destructive",
        });
      }
    });
  };

  // Toggle featured status
  const handleToggleFeatured = (property: Property) => {
    const newFeaturedStatus = !(property.is_featured || false);
    toggleFeatured.mutate({
      id: property.id,
      isFeatured: newFeaturedStatus
    }, {
      onSuccess: () => {
        toast({
          title: newFeaturedStatus
            ? "Имотът е отбелязан като препоръчан" 
            : "Имотът вече не е препоръчан",
          description: newFeaturedStatus
            ? "Имотът ще се показва в секцията 'Препоръчани имоти'." 
            : "Имотът няма да се показва в секцията 'Препоръчани имоти'.",
        });
      },
      onError: (error) => {
        toast({
          title: "Грешка при промяна на статуса",
          description: error.message,
          variant: "destructive",
        });
      }
    });
  };

  // Toggle published status
  const handleTogglePublished = (property: Property) => {
    togglePublished.mutate({
      id: property.id,
      isPublished: !(property.is_published || false)
    }, {
      onSuccess: () => {
        toast({
          title: property.is_published 
            ? "Имотът е скрит" 
            : "Имотът е публикуван",
          description: property.is_published 
            ? "Имотът вече не е видим за потребителите." 
            : "Имотът вече е видим за потребителите.",
        });
      }
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Всички имоти</h2>
        <Button 
          className="flex items-center gap-2"
          onClick={() => setIsCreateDialogOpen(true)}
        >
          <Plus size={16} />
          <span>Нов имот</span>
        </Button>
      </div>

      <PropertyGrid
        properties={properties || []}
        teamMembers={teamMembers}
        isLoading={isLoading}
        error={error}
        onCreateClick={() => setIsCreateDialogOpen(true)}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
        onToggleFeatured={handleToggleFeatured}
        onTogglePublished={handleTogglePublished}
      />

      {/* Create Property Dialog */}
      <PropertyDialog
        isOpen={isCreateDialogOpen}
        title="Добавяне на нов имот"
        description="Попълнете данните за новия имот. Кликнете върху 'Създай', когато сте готови."
        formData={formData}
        uploadedImages={uploadedImages}
        teamMembers={teamMembers}
        loadingTeamMembers={loadingTeamMembers}
        temporaryId={tempId}
        isEditing={false}
        currentProperty={null}
        isPending={createProperty.isPending}
        onClose={handleCloseCreateDialog}
        onSubmit={handleCreateProperty}
        onInputChange={handleInputChange}
        onCheckboxChange={(name, value) => {
          // For latitude and longitude, handle them as numeric values
          if (name === 'latitude' || name === 'longitude') {
            handleValueChange(name, value as unknown as number);
          } else {
            handleCheckboxChange(name, value as boolean);
          }
        }}
        onImageUpload={handleImageUpload}
      />

      {/* Edit Property Dialog */}
      <PropertyDialog
        isOpen={isEditDialogOpen}
        title="Редактиране на имот"
        description="Актуализирайте информацията за имота. Кликнете върху 'Запази', когато сте готови."
        formData={formData}
        uploadedImages={uploadedImages}
        teamMembers={teamMembers}
        loadingTeamMembers={loadingTeamMembers}
        temporaryId={tempId}
        isEditing={true}
        currentProperty={currentProperty}
        isPending={updateProperty.isPending}
        onClose={handleCloseEditDialog}
        onSubmit={handleUpdateProperty}
        onInputChange={handleInputChange}
        onCheckboxChange={(name, value) => {
          // For latitude and longitude, handle them as numeric values
          if (name === 'latitude' || name === 'longitude') {
            handleValueChange(name, value as unknown as number);
          } else {
            handleCheckboxChange(name, value as boolean);
          }
        }}
        onImageUpload={handleImageUpload}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        property={currentProperty}
        isOpen={isDeleteDialogOpen}
        isPending={deleteProperty.isPending}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleDeleteProperty}
      />
    </div>
  );
};

export default PropertiesManagement; 