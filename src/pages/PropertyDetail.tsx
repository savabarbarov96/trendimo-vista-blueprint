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
import TeamMemberCard from '@/components/about/TeamMemberCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, User } from 'lucide-react';

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
  
  // Format phone number for links
  const formatPhoneForLink = (phone: string) => {
    if (!phone) return '';
    return phone.replace(/[^0-9+]/g, '');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <Navbar />
      
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
            
            {/* Agent information */}
            {property.agent && (
              <Card className="mt-6 overflow-hidden border border-red-100 bg-white shadow-elegant rounded-xl">
                <CardHeader className="bg-gradient-to-r from-red-50 to-white pb-4">
                  <CardTitle className="flex items-center text-red-800">
                    <User className="h-5 w-5 mr-2" />
                    Агент на имота
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="aspect-square rounded-xl overflow-hidden md:col-span-1">
                      {property.agent.image_url ? (
                        <img 
                          src={property.agent.image_url} 
                          alt={property.agent.name}
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <div className="w-full h-full bg-red-50 flex items-center justify-center">
                          <div className="h-20 w-20 rounded-full bg-red-100 flex items-center justify-center">
                            <span className="text-2xl font-bold text-red-800">
                              {property.agent.name.charAt(0)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="md:col-span-2">
                      <h3 className="text-xl font-bold text-red-900 mb-1">{property.agent.name}</h3>
                      <Badge variant="outline" className="mb-4">{property.agent.position}</Badge>
                      
                      <div className="space-y-3 mt-4">
                        {property.agent.phone_number && (
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-red-600" />
                            <div className="flex flex-wrap gap-2">
                              <a 
                                href={`tel:${formatPhoneForLink(property.agent.phone_number)}`}
                                className="text-neutral-800 hover:text-red-700 transition-colors"
                              >
                                {property.agent.phone_number}
                              </a>
                              
                              <div className="flex space-x-2">
                                <a 
                                  href={`https://wa.me/${formatPhoneForLink(property.agent.phone_number)}`}
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs hover:bg-green-200 transition-colors"
                                >
                                  WhatsApp
                                </a>
                                <a 
                                  href={`viber://chat?number=${formatPhoneForLink(property.agent.phone_number)}`}
                                  className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs hover:bg-purple-200 transition-colors"
                                >
                                  Viber
                                </a>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {property.agent.email && (
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-red-600" />
                            <a 
                              href={`mailto:${property.agent.email}`}
                              className="text-neutral-800 hover:text-red-700 transition-colors"
                            >
                              {property.agent.email}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
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
      
      <Footer />
    </div>
  );
};

export default PropertyDetail;
