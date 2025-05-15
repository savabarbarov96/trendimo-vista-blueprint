import React, { useState } from 'react';
import { Mail, Calendar, Phone } from 'lucide-react';
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
    <Card className="sticky top-4 border-red-100 bg-gradient-to-b from-white to-red-50">
      <CardHeader>
        <h2 className="text-xl font-semibold text-red-800">Интересувате се от този имот?</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          className="w-full bg-red-700 hover:bg-red-800"
          onClick={() => window.location.href = "tel:+35929876543"}
        >
          <Phone className="mr-2 h-4 w-4" />
          Обадете се на брокер
        </Button>

        <Button 
          className="w-full" 
          variant="outline"
          onClick={() => setShowInquiryForm(!showInquiryForm)}
        >
          <Mail className="mr-2 h-4 w-4" />
          Запитване за имота
        </Button>
        
        <Button 
          className="w-full"
          variant="outline"
          onClick={() => setShowInquiryForm(true)}
        >
          <Calendar className="mr-2 h-4 w-4" />
          Запазете оглед
        </Button>
        
        {showInquiryForm && propertyId && (
          <div className="mt-4">
            <PropertyInquiryForm propertyId={propertyId} propertyTitle={propertyTitle} />
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex flex-col items-start">
        <p className="text-muted-foreground text-sm">
          Ще се свържем с вас до 24 часа
        </p>
      </CardFooter>
    </Card>
  );
};

export default PropertyInquirySidebar;
