import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { SupabaseProperty } from '@/components/properties/types';
import { usePropertyMapper } from '@/components/properties/usePropertyMapper';
import { useAuth } from '@/hooks/use-auth';
import { Property } from '@/data/properties';

// Components
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PropertyCarousel } from '@/components/properties/PropertyCarousel';
import { toast } from "sonner";

// Refactored components
import PropertyDetailHeader from '@/components/properties/PropertyDetailHeader';
import PropertyDetailsCard from '@/components/properties/PropertyDetailsCard';
import PropertyLocationCard from '@/components/properties/PropertyLocationCard';
import PropertyInquirySidebar from '@/components/properties/PropertyInquirySidebar';
import PropertySimilarListings from '@/components/properties/PropertySimilarListings';

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { mapSupabasePropertyToProperty } = usePropertyMapper();
  const { user } = useAuth();
  const [property, setProperty] = useState<Property | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  
  // Fetch property data
  const { data: propertyData, isLoading, error } = useQuery({
    queryKey: ['property', id],
    queryFn: async () => {
      if (!id) throw new Error('Property ID is required');
      
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      
      if (error) throw error;
      if (!data) throw new Error('Property not found');
      
      return data as SupabaseProperty;
    },
  });

  // Fetch user role if user is logged in
  useEffect(() => {
    if (user?.id) {
      const fetchUserRole = async () => {
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
        
        if (!error && data) {
          setUserRole(data.role);
        }
      };
      
      fetchUserRole();
    }
  }, [user]);
  
  // Map Supabase property to our application's Property type
  useEffect(() => {
    if (propertyData) {
      const loadProperty = async () => {
        try {
          const mappedProperty = await mapSupabasePropertyToProperty(propertyData);
          setProperty(mappedProperty);
        } catch (error) {
          console.error('Error mapping property:', error);
          toast.error('Не можахме да заредим данните за имота');
        }
      };
      
      loadProperty();
    }
  }, [propertyData, mapSupabasePropertyToProperty]);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-red-600" />
      </div>
    );
  }
  
  if (error || !property) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Грешка при зареждане на имота</h1>
        <p className="text-muted-foreground mb-6">
          {error instanceof Error ? error.message : 'Не можахме да намерим данни за този имот'}
        </p>
        <Button asChild className="bg-red-700 hover:bg-red-800">
          <Link to="/properties"><ArrowLeft size={16} /> Обратно към имотите</Link>
        </Button>
      </div>
    );
  }
  
  const isAgent = userRole === 'agent';
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Property header section */}
        <PropertyDetailHeader property={property} isAgent={isAgent} />
        
        {/* Image carousel */}
        <div className="mb-8">
          {property && <PropertyCarousel images={property.images} />}
        </div>
        
        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column with property details */}
          <div className="lg:col-span-2">
            {/* Basic info */}
            <PropertyDetailsCard property={property} />
            
            {/* Map */}
            <PropertyLocationCard 
              address={property.address} 
              location={property.location} 
              city={property.city} 
            />
          </div>
          
          {/* Right column with inquiry form */}
          <div>
            <PropertyInquirySidebar 
              propertyId={property.id.toString()}
              propertyTitle={property.title} 
            />
          </div>
        </div>
        
        {/* Similar Properties */}
        <PropertySimilarListings 
          propertyId={parseInt(property.id.toString())} 
          location={property.location}
          city={property.city}
        />
      </div>
    </div>
  );
};

export default PropertyDetail;
