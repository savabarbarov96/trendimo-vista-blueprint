
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import PropertyCard from '@/components/PropertyCard';
import PropertyFilter from '@/components/PropertyFilter';
import PropertySellForm from '@/components/PropertySellForm';
import ImageUploader from '@/components/ImageUploader';
import ImageGallery from '@/components/ImageGallery';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

// Define the Property type based on the Supabase schema
export interface SupabaseProperty {
  id: string;
  title: string;
  description: string | null;
  price: number;
  area: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  address: string;
  city: string;
  property_type: string;
  listing_type: string;
  is_featured: boolean | null;
  is_published: boolean | null;
}

// Define the filter state
export interface FilterState {
  listingType: string;
  propertyType: string;
  city: string;
  minPrice: number | null;
  maxPrice: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
}

const Properties = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<SupabaseProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    listingType: '',
    propertyType: '',
    city: '',
    minPrice: null,
    maxPrice: null,
    bedrooms: null,
    bathrooms: null
  });

  useEffect(() => {
    fetchProperties();
  }, [filters]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('properties')
        .select('*')
        .eq('is_published', true);

      // Apply filters
      if (filters.listingType) {
        query = query.eq('listing_type', filters.listingType);
      }
      if (filters.propertyType) {
        query = query.eq('property_type', filters.propertyType);
      }
      if (filters.city) {
        query = query.eq('city', filters.city);
      }
      if (filters.minPrice) {
        query = query.gte('price', filters.minPrice);
      }
      if (filters.maxPrice) {
        query = query.lte('price', filters.maxPrice);
      }
      if (filters.bedrooms) {
        query = query.gte('bedrooms', filters.bedrooms);
      }
      if (filters.bathrooms) {
        query = query.gte('bathrooms', filters.bathrooms);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      // Convert Supabase properties to the format expected by PropertyCard
      const formattedProperties = data.map(prop => ({
        id: parseInt(prop.id),
        title: prop.title,
        description: prop.description || '',
        price: prop.price,
        area: prop.area || 0,
        bedrooms: prop.bedrooms || 0,
        bathrooms: prop.bathrooms || 0,
        location: prop.address.split(',').pop()?.trim() || '',
        city: prop.city,
        address: prop.address,
        propertyType: prop.property_type,
        status: 'available',
        featured: prop.is_featured || false,
        imageUrl: getPropertyMainImage(prop.id),
        images: getPropertyImages(prop.id),
        createdAt: new Date().toISOString()
      }));

      setProperties(formattedProperties);
      setError(null);
    } catch (err) {
      console.error('Error fetching properties:', err);
      setError('Failed to load properties. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get the main image for a property
  const getPropertyMainImage = (propertyId: string) => {
    // For now, return placeholder image. This will be updated when images are uploaded
    return "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80";
  };

  // Helper function to get all images for a property
  const getPropertyImages = (propertyId: string) => {
    // For now, return placeholder images. This will be updated when images are uploaded
    return [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2934&q=80",
      "https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2986&q=80"
    ];
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 font-play">Нашите Имоти</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left sidebar with filters */}
          <div className="lg:col-span-1">
            <PropertyFilter onFilterChange={handleFilterChange} />
            
            {/* Demo section for file upload and gallery */}
            <div className="mt-8 p-4 bg-white rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Демо на галерия</h3>
              <ImageGallery 
                bucketName="trendimo" 
                folderPath="team_photos/" 
                className="mb-4"
              />
              <div className="mt-4">
                <ImageUploader 
                  bucketName="trendimo" 
                  folderPath="team_photos/" 
                  onUploadComplete={() => {
                    console.log("Upload complete!");
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right area with property listings */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="bg-red-50 p-4 rounded-md text-red-700">
                {error}
              </div>
            ) : properties.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h3 className="text-xl mb-2">Не са намерени имоти</h3>
                <p className="text-neutral mb-4">Опитайте с различни филтри или разгледайте всички наши имоти.</p>
                <Button onClick={() => setFilters({
                  listingType: '',
                  propertyType: '',
                  city: '',
                  minPrice: null,
                  maxPrice: null,
                  bedrooms: null,
                  bathrooms: null
                })}>
                  Изчистване на филтрите
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sell Your Property Form */}
        <div className="mt-16">
          <PropertySellForm />
        </div>
      </div>
    </div>
  );
};

export default Properties;
