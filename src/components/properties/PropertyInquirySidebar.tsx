
import React, { useState } from 'react';
import { Mail, Calendar } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PropertyInquiryForm from '@/components/properties/PropertyInquiryForm';

interface PropertyInquirySidebarProps {
  propertyId: string;
  propertyTitle: string;
}

const PropertyInquirySidebar: React.FC<PropertyInquirySidebarProps> = ({ 
  propertyId, 
  propertyTitle 
}) => {
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  
  return (
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
        
        {showInquiryForm && propertyId && (
          <div className="mt-4">
            <PropertyInquiryForm propertyId={propertyId} propertyTitle={propertyTitle} />
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex flex-col items-start">
        <p className="text-muted-foreground text-sm">
          We'll get back to you within 24 hours
        </p>
      </CardFooter>
    </Card>
  );
};

export default PropertyInquirySidebar;
