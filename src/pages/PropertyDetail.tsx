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
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

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
  const [isPropertyLoading, setIsPropertyLoading] = useState(true);
  
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
          setIsPropertyLoading(true);
          const mappedProperty = await mapSupabasePropertyToProperty(propertyData);
          setProperty(mappedProperty);
        } catch (error) {
          console.error('Error mapping property:', error);
          toast.error('Не можахме да заредим данните за имота');
        } finally {
          setIsPropertyLoading(false);
        }
      };
      
      loadProperty();
    }
  }, [propertyData, mapSupabasePropertyToProperty]);
  
  if (isLoading || isPropertyLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-red-600" />
      </div>
    );
  }
  
  if (error && !isPropertyLoading) {
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
  
  if (!property) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-red-600" />
      </div>
    );
  }
  
  const isAgent = userRole === 'agent';
  
  // Format phone number for links
  const formatPhoneForLink = (phone: string) => {
    if (!phone) return '';
    return phone.replace(/[^0-9+]/g, '');
  };
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Sticky header with back button and actions */}
        <PropertyDetailHeader property={property} isAgent={isAgent} />
        
        {/* Main content area with image gallery and tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
          {/* Left column with property details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Enhanced image carousel */}
            <Card className="p-0 overflow-hidden shadow-sm border border-neutral-200">
              {property && <PropertyCarousel images={property.images} />}
            </Card>
            
            {/* Tabbed interface for property details */}
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="details">Детайли</TabsTrigger>
                <TabsTrigger value="location">Локация</TabsTrigger>
                <TabsTrigger value="features">Характеристики</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="mt-0">
                <PropertyDetailsCard property={property} />
              </TabsContent>
              
              <TabsContent value="location" className="mt-0">
                <PropertyLocationCard 
                  address={property.address} 
                  location={property.location} 
                  city={property.city} 
                  latitude={property.latitude}
                  longitude={property.longitude}
                />
              </TabsContent>
              
              <TabsContent value="features" className="mt-0">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Характеристики на имота</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center p-3 bg-red-50 rounded-lg">
                      <div className="h-2 w-2 rounded-full bg-red-600 mr-2"></div>
                      <span>Тип имот: {property.propertyType}</span>
                    </div>
                    <div className="flex items-center p-3 bg-red-50 rounded-lg">
                      <div className="h-2 w-2 rounded-full bg-red-600 mr-2"></div>
                      <span>Град: {property.city}</span>
                    </div>
                    <div className="flex items-center p-3 bg-red-50 rounded-lg">
                      <div className="h-2 w-2 rounded-full bg-red-600 mr-2"></div>
                      <span>Локация: {property.location}</span>
                    </div>
                    <div className="flex items-center p-3 bg-red-50 rounded-lg">
                      <div className="h-2 w-2 rounded-full bg-red-600 mr-2"></div>
                      <span>Статус: {property.status === 'available' ? 'Наличен' : 'Продаден'}</span>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right column with inquiry form */}
          <div>
            <PropertyInquirySidebar 
              propertyId={property.id.toString()}
              propertyTitle={property.title} 
              agent={property.agent}
              formatPhoneForLink={formatPhoneForLink}
            />
          </div>
        </div>
        
        {/* Similar Properties section */}
        <div className="mt-16 bg-neutral-50 py-10 px-6 rounded-xl border border-neutral-100">
          <PropertySimilarListings 
            propertyId={parseInt(property.id.toString())} 
            location={property.location}
            city={property.city}
          />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PropertyDetail;
