
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Loader2, MapPin, Bed, Bath, Maximize, Calendar, Mail, ArrowLeft, Edit } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { SupabaseProperty } from '@/components/properties/types';
import { usePropertyMapper } from '@/components/properties/usePropertyMapper';
import { useAuth } from '@/hooks/use-auth';
import { Property, formatPrice } from '@/data/properties';

// Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { PropertyCarousel } from '@/components/properties/PropertyCarousel';
import PropertyMap from '@/components/properties/PropertyMap';
import SimilarProperties from '@/components/properties/SimilarProperties';
import PropertyInquiryForm from '@/components/properties/PropertyInquiryForm';
import { Separator } from '@/components/ui/separator';
import { toast } from "sonner";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { mapSupabasePropertyToProperty } = usePropertyMapper();
  const { user } = useAuth();
  const [property, setProperty] = useState<Property | null>(null);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
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
          toast.error('Could not load property details');
        }
      };
      
      loadProperty();
    }
  }, [propertyData, mapSupabasePropertyToProperty]);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  if (error || !property) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Error Loading Property</h1>
        <p className="text-muted-foreground mb-6">
          {error instanceof Error ? error.message : 'Could not find property details'}
        </p>
        <Button asChild>
          <Link to="/properties"><ArrowLeft size={16} /> Back to Properties</Link>
        </Button>
      </div>
    );
  }
  
  const isAgent = userRole === 'agent';
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back button and edit controls */}
        <div className="flex justify-between items-center mb-6">
          <Button variant="outline" asChild>
            <Link to="/properties">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Properties
            </Link>
          </Button>
          
          {isAgent && (
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit Property
            </Button>
          )}
        </div>
        
        {/* Property title and price */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold">{property.title}</h1>
          <div className="flex items-center mt-2">
            <MapPin className="h-5 w-5 text-neutral" />
            <span className="ml-2 text-lg text-neutral-dark">
              {property.address}
            </span>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-bold text-primary">
              {formatPrice(property.price)}
            </span>
          </div>
        </div>
        
        {/* Image carousel */}
        <div className="mb-8">
          <PropertyCarousel images={property.images} />
        </div>
        
        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column with property details */}
          <div className="lg:col-span-2">
            {/* Basic info */}
            <Card className="mb-8">
              <CardHeader>
                <h2 className="text-2xl font-semibold">Property Details</h2>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center">
                    <Bed className="h-5 w-5 mr-2 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Bedrooms</p>
                      <p className="font-medium">{property.bedrooms}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-5 w-5 mr-2 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Bathrooms</p>
                      <p className="font-medium">{property.bathrooms}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Maximize className="h-5 w-5 mr-2 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Area</p>
                      <p className="font-medium">{property.area} sq.m</p>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                {/* Description */}
                <div>
                  <h3 className="font-medium mb-2">Description</h3>
                  <p className="text-neutral-dark whitespace-pre-line">
                    {property.description}
                  </p>
                </div>
                
                <Separator className="my-6" />
                
                {/* Features and amenities */}
                <div>
                  <h3 className="font-medium mb-3">Features & Amenities</h3>
                  <div className="grid grid-cols-2 gap-y-2">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                      <span>Property Type: {property.propertyType}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                      <span>City: {property.city}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                      <span>Location: {property.location}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                      <span>Status: {property.status}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Map */}
            <Card className="mb-8">
              <CardHeader>
                <h2 className="text-2xl font-semibold">Location</h2>
              </CardHeader>
              <CardContent>
                <PropertyMap 
                  address={property.address} 
                  location={property.location} 
                  city={property.city} 
                />
              </CardContent>
            </Card>
          </div>
          
          {/* Right column with inquiry form */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <h2 className="text-xl font-semibold">Interested in this property?</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  className="w-full" 
                  onClick={() => setShowInquiryForm(!showInquiryForm)}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Inquire About This Property
                </Button>
                
                <Button 
                  className="w-full"
                  variant="outline"
                  onClick={() => setShowInquiryForm(true)}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule a Viewing
                </Button>
                
                {showInquiryForm && (
                  <div className="mt-4">
                    <PropertyInquiryForm propertyId={id || ''} propertyTitle={property.title} />
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="flex flex-col items-start">
                <p className="text-muted-foreground text-sm">
                  We'll get back to you within 24 hours
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
        
        {/* Similar Properties */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Similar Properties in {property.location}</h2>
          <SimilarProperties 
            currentPropertyId={parseInt(property.id.toString())} 
            location={property.location}
            city={property.city}
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
