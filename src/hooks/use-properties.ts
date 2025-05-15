import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

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
      // Make sure we have a valid images array
      const sanitizedProperty = {
        ...property,
        images: property.images && Array.isArray(property.images) && property.images.length > 0
          ? property.images
          : []
      };
      
      // Create a property record
      const { data, error } = await supabase
        .from('properties')
        .insert(sanitizedProperty)
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
      // Make sure we have a valid images array if it's being updated
      const sanitizedProperty = { ...property };
      if ('images' in sanitizedProperty) {
        sanitizedProperty.images = sanitizedProperty.images && Array.isArray(sanitizedProperty.images) && sanitizedProperty.images.length > 0
          ? sanitizedProperty.images
          : [];
      }
      
      const { data, error } = await supabase
        .from('properties')
        .update(sanitizedProperty)
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