import React from 'react';import { Input } from '@/components/ui/input';import { Label } from '@/components/ui/label';import { Textarea } from '@/components/ui/textarea';import { PropertyFormData } from '@/hooks/use-properties';import { TeamMember } from '@/integrations/supabase/types';import { cities, propertyTypes } from '@/data/content';import ImageUploader from '@/components/ImageUploader';import { ScrollArea } from '@/components/ui/scroll-area';import MapPicker from './MapPicker';

interface PropertyFormProps {
  formData: Partial<PropertyFormData>;
  uploadedImages: string[];
  teamMembers: TeamMember[];
  loadingTeamMembers: boolean;
  temporaryId: string;
  isEditing: boolean;
  propertyId?: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onCheckboxChange: (name: string, checked: boolean) => void;
  onImageUpload: (urls: string[], files: File[]) => void;
  onLocationChange?: (latitude: number, longitude: number) => void;
}

const PropertyForm: React.FC<PropertyFormProps> = ({
  formData,
  uploadedImages,
  teamMembers,
  loadingTeamMembers,
  temporaryId,
  isEditing,
  propertyId,
  onInputChange,
  onCheckboxChange,
  onImageUpload,
  onLocationChange
}) => {
  // Default location change handler updates formData directly
  const handleLocationChange = (lat: number, lng: number) => {
    if (onLocationChange) {
      onLocationChange(lat, lng);
    } else {
      // If no handler provided, use checkbox change (will be replaced)
      onCheckboxChange('latitude', lat as any);
      onCheckboxChange('longitude', lng as any);
    }
  };

  return (
    <ScrollArea className="max-h-[70vh] pr-2 pb-2">
      <div className="grid gap-5 py-4 pr-2">
        <h3 className="text-md font-semibold text-gray-700">Основна информация</h3>
        <div className="bg-gray-50 p-4 rounded-md space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Заглавие</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={onInputChange}
                className="bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Цена (лв.)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={onInputChange}
                className="bg-white"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2 border-t border-gray-100 pt-4 mt-2">
          <Label htmlFor="description" className="text-base font-medium">Описание на имота</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={onInputChange}
            rows={5}
            className="resize-none"
          />
        </div>

        <h3 className="text-md font-semibold text-gray-700 pt-2">Адрес и локация</h3>        <div className="bg-gray-50 p-4 rounded-md space-y-4">          <div className="grid grid-cols-2 gap-4">            <div className="space-y-2">              <Label htmlFor="address">Адрес</Label>              <Input                id="address"                name="address"                value={formData.address}                onChange={onInputChange}                className="bg-white"              />            </div>            <div className="space-y-2">              <Label htmlFor="city">Град</Label>              <select                id="city"                name="city"                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-white"                value={formData.city}                onChange={onInputChange}              >                <option value="">Изберете град</option>                {cities.map((city, index) => (                  <option key={index} value={city}>                    {city}                  </option>                ))}              </select>            </div>          </div>                    <div className="space-y-2 mt-4">            <Label htmlFor="location-map">Избор на локация</Label>            <MapPicker               latitude={formData.latitude || null}              longitude={formData.longitude || null}              onChange={handleLocationChange}            />            <p className="text-xs text-muted-foreground">Преместете маркера, за да зададете точната локация на имота или използвайте бутона "Моята локация"</p>          </div>        </div>

        <h3 className="text-md font-semibold text-gray-700 pt-2">Детайли за имота</h3>
        <div className="bg-gray-50 p-4 rounded-md space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bedrooms">Стаи</Label>
              <Input
                id="bedrooms"
                name="bedrooms"
                type="number"
                value={formData.bedrooms}
                onChange={onInputChange}
                className="bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bathrooms">Бани</Label>
              <Input
                id="bathrooms"
                name="bathrooms"
                type="number"
                value={formData.bathrooms}
                onChange={onInputChange}
                className="bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="area">Площ (кв.м)</Label>
              <Input
                id="area"
                name="area"
                type="number"
                value={formData.area}
                onChange={onInputChange}
                className="bg-white"
              />
            </div>
          </div>
        </div>

        <h3 className="text-md font-semibold text-gray-700 pt-2">Класификация</h3>
        <div className="bg-gray-50 p-4 rounded-md space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="property_type">Тип имот</Label>
              <select
                id="property_type"
                name="property_type"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-white"
                value={formData.property_type}
                onChange={onInputChange}
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
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-white"
                value={formData.listing_type}
                onChange={onInputChange}
              >
                <option value="sale">Продажба</option>
                <option value="rent">Наем</option>
              </select>
            </div>
          </div>
        </div>

        <h3 className="text-md font-semibold text-gray-700 pt-2">Отговорности</h3>
        <div className="space-y-2 bg-blue-50 p-4 rounded-md">
          <Label htmlFor="agent_id" className="font-medium">Отговорен агент</Label>
          <select
            id="agent_id"
            name="agent_id"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={formData.agent_id || ''}
            onChange={onInputChange}
            disabled={loadingTeamMembers}
          >
            <option value="">Няма избран агент</option>
            {teamMembers.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name} ({member.position})
              </option>
            ))}
          </select>
          <p className="text-xs text-muted-foreground">Изберете агент, който ще отговаря за този имот</p>
        </div>

        <h3 className="text-md font-semibold text-gray-700 pt-2">Виртуална обиколка</h3>
        <div className="space-y-2 bg-red-50 p-4 rounded-md">
          <Label htmlFor="virtual_tour_url" className="font-medium">YouTube линк</Label>
          <Input
            id="virtual_tour_url"
            name="virtual_tour_url"
            value={formData.virtual_tour_url || ''}
            onChange={onInputChange}
            placeholder="https://youtube.com/watch?v=..."
            className="pr-20 bg-white"
          />
          <p className="text-xs text-muted-foreground">Добавете линк към YouTube видео с виртуална обиколка на имота</p>

          {formData.virtual_tour_url && (
            <div className="mt-3">
              <a
                href={formData.virtual_tour_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Преглед в YouTube
              </a>
            </div>
          )}
        </div>

        <h3 className="text-md font-semibold text-gray-700 pt-2">Настройки</h3>
        <div className="flex space-x-4 p-3 bg-gray-50 rounded-md">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="is_featured"
              name="is_featured"
              checked={formData.is_featured || false}
              onChange={(e) => onCheckboxChange('is_featured', e.target.checked)}
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
              onChange={(e) => onCheckboxChange('is_published', e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <Label htmlFor="is_published">Публикуван</Label>
          </div>
        </div>

        <h3 className="text-md font-semibold text-gray-700 pt-2">Галерия със снимки</h3>
        <div>
          <Label htmlFor="images" className="block mb-2">Снимки на имота</Label>
          <ImageUploader
            bucketName="trendimo"
            folderPath={isEditing && propertyId ? `property_media/${propertyId}/` : `property_media/${temporaryId}/`}
            onUploadComplete={onImageUpload}
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
    </ScrollArea>
  );
};

export default PropertyForm; 