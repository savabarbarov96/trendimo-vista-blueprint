import { getPropertyImages } from '@/utils/storageHelpers';
import { Property } from '@/data/properties';
import { SupabaseProperty } from './types';
import { propertyTypes } from '@/data/content';
import { supabase } from '@/integrations/supabase/client';
import { TeamMember } from '@/integrations/supabase/types';

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

  // Function to fetch agent information
  const fetchAgent = async (agentId: string) => {
    if (!agentId) return null;
    
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('id', agentId)
        .single();
      
      if (error || !data) {
        console.error('Error fetching agent:', error);
        return null;
      }
      
      return {
        id: data.id,
        name: data.name,
        position: data.position,
        image_url: data.image_url,
        email: data.email,
        phone_number: data.phone_number
      };
    } catch (error) {
      console.error('Error fetching agent:', error);
      return null;
    }
  };

  // Function to convert SupabaseProperty to Property
  const mapSupabasePropertyToProperty = async (prop: SupabaseProperty): Promise<Property> => {
    // Try to get images from storage, fallback to placeholders
    let images: string[] = [];
    try {
      images = await getPropertyImages(prop.id);
      if (images.length === 0) {
        images = getPlaceholderImages();
      }
    } catch (err) {
      console.error('Error fetching property images:', err);
      images = getPlaceholderImages();
    }
    
    // Fetch agent info if agent_id is provided
    let agent = null;
    if (prop.agent_id) {
      agent = await fetchAgent(prop.agent_id);
    }

    return {
      id: prop.id, // Keep ID as string
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
      agent: agent || undefined
    };
  };

  return {
    mapSupabasePropertyToProperty,
    getPlaceholderImages,
    getPlaceholderMainImage,
    getValidPropertyType,
    fetchAgent
  };
};
