import React, { useState } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Star, 
  Eye, 
  EyeOff,
  ChevronDown,
  Check,
  X
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/hooks/auth/use-user';
import ImageUploader from '@/components/ImageUploader';
import { supabase } from '@/integrations/supabase/client';
import { cities, propertyTypes } from '@/data/content';
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
    images: []
  });
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [tempId] = useState<string>(`temp_${Date.now()}`);

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
      images: []
    });
    setUploadedImages([]);
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
      images: property.images || []
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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Всички имоти</h2>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus size={16} />
              <span>Нов имот</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Добавяне на нов имот</DialogTitle>
              <DialogDescription>
                Попълнете данните за новия имот. Кликнете върху "Създай", когато сте готови.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Заглавие</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Цена (лв.)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Описание</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Адрес</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Град</Label>
                  <select
                    id="city"
                    name="city"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.city}
                    onChange={handleInputChange}
                  >
                    <option value="">Изберете град</option>
                    {cities.map((city, index) => (
                      <option key={index} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Спални</Label>
                  <Input
                    id="bedrooms"
                    name="bedrooms"
                    type="number"
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Бани</Label>
                  <Input
                    id="bathrooms"
                    name="bathrooms"
                    type="number"
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="area">Площ (кв.м)</Label>
                  <Input
                    id="area"
                    name="area"
                    type="number"
                    value={formData.area}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="property_type">Тип имот</Label>
                  <select
                    id="property_type"
                    name="property_type"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.property_type}
                    onChange={handleInputChange}
                  >
                    {propertyTypes.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="listing_type">Тип обява</Label>
                  <select
                    id="listing_type"
                    name="listing_type"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.listing_type}
                    onChange={handleInputChange}
                  >
                    <option value="sale">Продажба</option>
                    <option value="rent">Наем</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is_featured"
                    name="is_featured"
                    checked={formData.is_featured || false}
                    onChange={(e) => setFormData({...formData, is_featured: e.target.checked})}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <Label htmlFor="is_featured">Препоръчан имот</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is_published"
                    name="is_published"
                    checked={formData.is_published || false}
                    onChange={(e) => setFormData({...formData, is_published: e.target.checked})}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <Label htmlFor="is_published">Публикуван</Label>
                </div>
              </div>

              <div>
                <Label htmlFor="images" className="block mb-2">Снимки на имота</Label>
                <ImageUploader
                  bucketName="trendimo"
                  folderPath={`property_media/${tempId}/`}
                  onUploadComplete={handleImageUpload}
                  maxFiles={5}
                  className="mb-2"
                />
                
                {uploadedImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
                    {uploadedImages.map((url, index) => (
                      <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
                        <img
                          src={url}
                          alt={`Uploaded image ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsCreateDialogOpen(false)}
              >
                Отказ
              </Button>
              <Button 
                onClick={handleCreateProperty}
                disabled={createProperty.isPending}
              >
                {createProperty.isPending ? 'Създаване...' : 'Създай'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties && properties.map((property) => (
          <Card key={property.id} className="overflow-hidden">
            <CardHeader className="pb-3">
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
                    <DropdownMenuItem onClick={() => handleEditClick(property)}>
                      <Edit size={14} className="mr-2" />
                      Редактирай
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleToggleFeatured(property)}>
                      <Star size={14} className="mr-2" fill={property.is_featured ? "currentColor" : "none"} />
                      {property.is_featured ? "Премахни от препоръчани" : "Добави в препоръчани"}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleTogglePublished(property)}>
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
                    <DropdownMenuItem onClick={() => handleDeleteClick(property)} className="text-red-600">
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
            <CardContent>
              <div className="space-y-2 text-sm">
                {property.images && property.images.length > 0 && (
                  <div className="aspect-video overflow-hidden rounded-md mb-3">
                    <img 
                      src={property.images[0]} 
                      alt={property.title}
                      className="h-full w-full object-cover" 
                    />
                  </div>
                )}
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
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Площ:</span>
                  <span>{property.area} м²</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Спални:</span>
                  <span>{property.bedrooms}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <div className="text-xs text-muted-foreground">
                Създаден на: {new Date(property.created_at || '').toLocaleDateString('bg-BG')}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Edit Property Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Редактиране на имот</DialogTitle>
            <DialogDescription>
              Актуализирайте информацията за имота. Кликнете върху "Запази", когато сте готови.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Заглавие</Label>
                <Input
                  id="edit-title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-price">Цена (лв.)</Label>
                <Input
                  id="edit-price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">Описание</Label>
              <Textarea
                id="edit-description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-address">Адрес</Label>
                <Input
                  id="edit-address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-city">Град</Label>
                <select
                  id="edit-city"
                  name="city"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.city}
                  onChange={handleInputChange}
                >
                  <option value="">Изберете град</option>
                  {cities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-bedrooms">Спални</Label>
                <Input
                  id="edit-bedrooms"
                  name="bedrooms"
                  type="number"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-bathrooms">Бани</Label>
                <Input
                  id="edit-bathrooms"
                  name="bathrooms"
                  type="number"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-area">Площ (кв.м)</Label>
                <Input
                  id="edit-area"
                  name="area"
                  type="number"
                  value={formData.area}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-property_type">Тип имот</Label>
                <select
                  id="edit-property_type"
                  name="property_type"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.property_type}
                  onChange={handleInputChange}
                >
                  {propertyTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-listing_type">Тип обява</Label>
                <select
                  id="edit-listing_type"
                  name="listing_type"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.listing_type}
                  onChange={handleInputChange}
                >
                  <option value="sale">Продажба</option>
                  <option value="rent">Наем</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="edit-is_featured"
                  name="is_featured"
                  checked={formData.is_featured || false}
                  onChange={(e) => setFormData({...formData, is_featured: e.target.checked})}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <Label htmlFor="edit-is_featured">Препоръчан имот</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="edit-is_published"
                  name="is_published"
                  checked={formData.is_published || false}
                  onChange={(e) => setFormData({...formData, is_published: e.target.checked})}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <Label htmlFor="edit-is_published">Публикуван</Label>
              </div>
            </div>

            <div>
              <Label htmlFor="edit-images" className="block mb-2">Снимки на имота</Label>
              <ImageUploader
                bucketName="trendimo"
                folderPath={`property_media/${currentProperty?.id || tempId}/`}
                onUploadComplete={handleImageUpload}
                maxFiles={5}
                className="mb-2"
              />
              
              {uploadedImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
                  {uploadedImages.map((url, index) => (
                    <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
                      <img
                        src={url}
                        alt={`Uploaded image ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsEditDialogOpen(false)}
            >
              Отказ
            </Button>
            <Button 
              onClick={handleUpdateProperty}
              disabled={updateProperty.isPending}
            >
              {updateProperty.isPending ? 'Запазване...' : 'Запази'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Изтриване на имот</DialogTitle>
            <DialogDescription>
              Сигурни ли сте, че искате да изтриете този имот? Това действие не може да бъде отменено.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <p className="text-sm font-medium">
              Имот: {currentProperty?.title}
            </p>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Отказ
            </Button>
            <Button 
              variant="destructive"
              onClick={handleDeleteProperty}
              disabled={deleteProperty.isPending}
            >
              {deleteProperty.isPending ? 'Изтриване...' : 'Изтрий'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {properties && properties.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground mb-4">Все още нямате добавени имоти</p>
          <Button 
            onClick={() => setIsCreateDialogOpen(true)}
            className="flex items-center gap-2"
          >
            <Plus size={16} />
            <span>Добавете първия имот</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default PropertiesManagement; 