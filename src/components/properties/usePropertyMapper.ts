import { getPropertyImages } from '@/utils/storageHelpers';
import { Property } from '@/data/properties';
import { SupabaseProperty } from './types';
import { propertyTypes } from '@/data/content';
import { supabase } from '@/integrations/supabase/client';
import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

// Cache for property images to avoid repeated fetches
const imageCache = new Map<string, string[]>();
// Cache for agent data to avoid repeated fetches
const agentCache = new Map<string, any>();

// Separate hook for fetching agent data
export const useAgent = (agentId: string | null) => {
  return useQuery({
    queryKey: ['agent', agentId],
    queryFn: async () => {
      if (!agentId) return null;
      
      // Check cache first
      if (agentCache.has(agentId)) {
        return agentCache.get(agentId);
      }
      
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('id', agentId)
        .single();
      
      if (error || !data) {
        console.error('Error fetching agent:', error);
        return null;
      }
      
      const agentData = {
        id: data.id,
        name: data.name,
        position: data.position,
        image_url: data.image_url,
        email: data.email,
        phone_number: data.phone_number
      };
      
      // Store in cache
      agentCache.set(agentId, agentData);
      
      return agentData;
    },
    enabled: !!agentId,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
  });
};

export const usePropertyMapper = () => {
  // Helper function to get placeholder images
  const getPlaceholderImages = (): string[] => {
    return [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2934&q=80",
      "https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2986&q=80"
    ];
  };

  // Helper function to get placeholder main image
  const getPlaceholderMainImage = (): string => {
    return "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80";
  };

  // Helper function to ensure property type is valid
  const getValidPropertyType = (type: string): string => {
    // If the type is valid, return it
    if (propertyTypes.includes(type)) {
      return type;
    }
    // Otherwise, return a default type
    return 'Апартамент';
  };

  // Function to convert SupabaseProperty to Property - memoized to prevent unnecessary calls
  const mapSupabasePropertyToProperty = useCallback(async (prop: SupabaseProperty): Promise<Property> => {
    // Try to get images from storage, fallback to placeholders
    let images: string[] = [];
    
    // Check cache first for images
    if (imageCache.has(prop.id)) {
      images = imageCache.get(prop.id) || [];
    } else {
      try {
        images = await getPropertyImages(prop.id);
        if (images.length === 0) {
          images = getPlaceholderImages();
        }
        // Cache the images
        imageCache.set(prop.id, images);
      } catch (err) {
        console.error('Error fetching property images:', err);
        images = getPlaceholderImages();
        // Cache the placeholder images
        imageCache.set(prop.id, images);
      }
    }

    // Fetch agent data from cache if available
    let agent = undefined;
    if (prop.agent_id) {
      // Check cache first for agent
      if (agentCache.has(prop.agent_id)) {
        agent = agentCache.get(prop.agent_id);
      } else {
        try {
          const { data, error } = await supabase
            .from('team_members')
            .select('*')
            .eq('id', prop.agent_id)
            .single();
          
          if (!error && data) {
            agent = {
              id: data.id,
              name: data.name,
              position: data.position,
              image_url: data.image_url,
              email: data.email,
              phone_number: data.phone_number
            };
            // Cache the agent data
            agentCache.set(prop.agent_id, agent);
          }
        } catch (err) {
          console.error('Error fetching agent:', err);
        }
      }
    }

    return {
      id: prop.id,
      title: prop.title,
      description: prop.description || '',
      price: prop.price,
      area: prop.area || 0,
      bedrooms: prop.bedrooms || 0,
      bathrooms: prop.bathrooms || 0,
      location: prop.address.split(',').pop()?.trim() || '',
      city: prop.city,
      address: prop.address,
      propertyType: getValidPropertyType(prop.property_type),
      status: 'available',
      featured: prop.is_featured || false,
      imageUrl: images[0] || getPlaceholderMainImage(),
      images: images,
      createdAt: prop.created_at || new Date().toISOString(),
      virtual_tour_url: prop.virtual_tour_url || null,
      agent: agent,
      latitude: prop.latitude || null,
      longitude: prop.longitude || null,
      property_type: prop.property_type,
      listing_type: prop.listing_type,
      is_featured: prop.is_featured || false,
      is_published: prop.is_published || false,
      owner_id: prop.owner_id || ''
    };
  }, []);

  return {
    mapSupabasePropertyToProperty,
    getPlaceholderImages,
    getPlaceholderMainImage,
    getValidPropertyType
  };
};
