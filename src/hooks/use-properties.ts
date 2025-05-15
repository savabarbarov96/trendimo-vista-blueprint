import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { propertyTypes, cities } from '@/data/content';

// Helper function to validate property type
const validatePropertyType = (type: string): string => {
  return propertyTypes.includes(type) ? type : propertyTypes[0];
};

// Helper function to validate listing type
const validateListingType = (type: string): string => {
  return ['sale', 'rent'].includes(type) ? type : 'sale';
};

// Helper function to validate city
const validateCity = (city: string): string => {
  return cities.includes(city) ? city : '';
};

export interface Property {
  id: string;
  title: string;
  description: string | null;
  price: number;
  address: string;
  city: string;
  bedrooms: number | null;
  bathrooms: number | null;
  area: number | null;
  property_type: string;
  listing_type: string;
  is_featured: boolean | null;
  is_published: boolean | null;
  owner_id: string;
  created_at: string | null;
  updated_at: string | null;
  images: string[] | null;
}

export interface PropertyFormData {
  title: string;
  description?: string;
  price: number;
  address: string;
  city: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  property_type: string;
  listing_type: string;
  is_featured?: boolean;
  is_published?: boolean;
  owner_id: string;
  images?: string[];
}

// Hook to fetch all properties (including unpublished ones for agents)
export const useProperties = () => {
  return useQuery({
    queryKey: ['properties'],
    queryFn: async (): Promise<Property[]> => {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching properties:', error);
        throw new Error('Failed to fetch properties');
      }

      return data as Property[];
    },
  });
};

// Hook to fetch featured properties
export const useFeaturedProperties = (limit = 6) => {
  return useQuery({
    queryKey: ['featured-properties', limit],
    queryFn: async (): Promise<Property[]> => {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('is_featured', true)
        .eq('is_published', true)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching featured properties:', error);
        throw new Error('Failed to fetch featured properties');
      }

      return data as Property[];
    },
  });
};

// Hook to create a new property
export const useCreateProperty = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (property: PropertyFormData): Promise<Property> => {
      // Validate property and listing types
      const validatedProperty = {
        ...property,
        property_type: validatePropertyType(property.property_type),
        listing_type: validateListingType(property.listing_type),
        city: validateCity(property.city),
        // Make sure we have a valid images array
        images: property.images && Array.isArray(property.images) && property.images.length > 0
          ? property.images
          : []
      };
      
      // Create a property record
      const { data, error } = await supabase
        .from('properties')
        .insert(validatedProperty)
        .select()
        .single();

      if (error) {
        console.error('Error creating property:', error);
        throw new Error('Failed to create property');
      }
      
      return data as Property;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      queryClient.invalidateQueries({ queryKey: ['featured-properties'] });
    },
  });
};

// Hook to update a property
export const useUpdateProperty = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, property }: { id: string, property: Partial<PropertyFormData> }): Promise<Property> => {
      // Create a validated copy of the property to update
      const validatedProperty = { ...property };
      
      // Validate property type if it's being updated
      if ('property_type' in validatedProperty) {
        validatedProperty.property_type = validatePropertyType(validatedProperty.property_type as string);
      }
      
      // Validate listing type if it's being updated
      if ('listing_type' in validatedProperty) {
        validatedProperty.listing_type = validateListingType(validatedProperty.listing_type as string);
      }
      
      // Validate city if it's being updated
      if ('city' in validatedProperty) {
        validatedProperty.city = validateCity(validatedProperty.city as string);
      }
      
      // Make sure we have a valid images array if it's being updated
      if ('images' in validatedProperty) {
        validatedProperty.images = validatedProperty.images && Array.isArray(validatedProperty.images) && validatedProperty.images.length > 0
          ? validatedProperty.images
          : [];
      }
      
      const { data, error } = await supabase
        .from('properties')
        .update(validatedProperty)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating property:', error);
        throw new Error('Failed to update property');
      }

      return data as Property;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      queryClient.invalidateQueries({ queryKey: ['featured-properties'] });
    },
  });
};

// Hook to delete a property
export const useDeleteProperty = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting property:', error);
        throw new Error('Failed to delete property');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      queryClient.invalidateQueries({ queryKey: ['featured-properties'] });
    },
  });
};

// Hook to toggle a property's featured status
export const useTogglePropertyFeatured = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, isFeatured }: { id: string, isFeatured: boolean }): Promise<Property> => {
      const { data, error } = await supabase
        .from('properties')
        .update({ is_featured: isFeatured })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating property featured status:', error);
        throw new Error('Failed to update property featured status');
      }

      return data as Property;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      queryClient.invalidateQueries({ queryKey: ['featured-properties'] });
    },
  });
};

// Hook to toggle a property's published status
export const useTogglePropertyPublished = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, isPublished }: { id: string, isPublished: boolean }): Promise<Property> => {
      const { data, error } = await supabase
        .from('properties')
        .update({ is_published: isPublished })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating property published status:', error);
        throw new Error('Failed to update property published status');
      }

      return data as Property;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      queryClient.invalidateQueries({ queryKey: ['featured-properties'] });
    },
  });
}; 