import React, { useState } from 'react';
import { Mail, Calendar, Phone, User } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PropertyInquiryForm from '@/components/properties/PropertyInquiryForm';
import { Badge } from '@/components/ui/badge';

interface PropertyInquirySidebarProps {
  propertyId: string;
  propertyTitle: string;
  agent?: any;  // Using any type for agent since the original agent object varies
  formatPhoneForLink?: (phone: string) => string;
}

const PropertyInquirySidebar: React.FC<PropertyInquirySidebarProps> = ({ 
  propertyId, 
  propertyTitle,
  agent,
  formatPhoneForLink = (phone: string) => phone.replace(/[^0-9+]/g, '')
}) => {
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  
  return (
    <div className="space-y-4">
      <Card className="sticky top-4 border-red-100 bg-gradient-to-b from-white to-red-50">
        <CardHeader>
          <h2 className="text-xl font-semibold text-red-800">Интересувате се от този имот?</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          {agent && agent.phone_number ? (
            <Button 
              className="w-full bg-red-700 hover:bg-red-800"
              onClick={() => window.location.href = `tel:${formatPhoneForLink(agent.phone_number)}`}
            >
              <Phone className="mr-2 h-4 w-4" />
              Обадете се на брокер
            </Button>
          ) : (
            <Button 
              className="w-full bg-red-700 hover:bg-red-800"
              onClick={() => window.location.href = "tel:+35929876543"}
            >
              <Phone className="mr-2 h-4 w-4" />
              Обадете се на брокер
            </Button>
          )}

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

      {agent && (
        <Card className="overflow-hidden border border-red-100 bg-white shadow-elegant rounded-xl">
          <CardHeader className="bg-gradient-to-r from-red-50 to-white pb-4">
            <CardTitle className="flex items-center text-red-800">
              <User className="h-5 w-5 mr-2" />
              Агент на имота
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-4">
                {agent.image_url ? (
                  <div className="h-16 w-16 rounded-full overflow-hidden">
                    <img 
                      src={agent.image_url} 
                      alt={agent.name}
                      className="h-full w-full object-cover" 
                    />
                  </div>
                ) : (
                  <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
                    <span className="text-xl font-bold text-red-800">
                      {agent.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-red-900">{agent.name}</h3>
                  <Badge variant="outline">{agent.position}</Badge>
                </div>
              </div>
              
              <div className="space-y-3 mt-2">
                {agent.phone_number && (
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-red-600" />
                    <div className="flex flex-wrap gap-2">
                      <a 
                        href={`tel:${formatPhoneForLink(agent.phone_number)}`}
                        className="text-neutral-800 hover:text-red-700 transition-colors"
                      >
                        {agent.phone_number}
                      </a>
                      
                      <div className="flex space-x-2">
                        <a 
                          href={`https://wa.me/${formatPhoneForLink(agent.phone_number)}`}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs hover:bg-green-200 transition-colors"
                        >
                          WhatsApp
                        </a>
                        <a 
                          href={`viber://chat?number=${formatPhoneForLink(agent.phone_number)}`}
                          className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs hover:bg-purple-200 transition-colors"
                        >
                          Viber
                        </a>
                      </div>
                    </div>
                  </div>
                )}
                
                {agent.email && (
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-red-600" />
                    <a 
                      href={`mailto:${agent.email}`}
                      className="text-neutral-800 hover:text-red-700 transition-colors"
                    >
                      {agent.email}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PropertyInquirySidebar;
