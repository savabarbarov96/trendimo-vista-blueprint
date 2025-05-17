import React, { useState } from 'react';
import { Mail, Phone, User, MessageSquare, Clock } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PropertyInquiryForm from '@/components/properties/PropertyInquiryForm';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

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

  const toggleInquiryForm = () => {
    setShowInquiryForm(!showInquiryForm);
  };

  return (
    <div className="space-y-6">
      {/* Agent Card - Removed sticky positioning for better mobile experience */}
      {agent && (
        <Card className="overflow-hidden border border-red-100 bg-white shadow-md rounded-lg">
          <CardHeader className="bg-gradient-to-r from-red-50 to-white pb-4">
            <CardTitle className="flex items-center text-red-800 text-lg">
              <User className="h-5 w-5 mr-2" />
              Агент на имота
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-4">
                {agent.image_url ? (
                  <div className="h-16 w-16 rounded-full overflow-hidden ring-2 ring-red-100">
                    <img 
                      src={agent.image_url} 
                      alt={agent.name}
                      className="h-full w-full object-cover" 
                    />
                  </div>
                ) : (
                  <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center ring-2 ring-red-200">
                    <span className="text-xl font-bold text-red-800">
                      {agent.name?.charAt(0) || 'A'}
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-red-900">{agent.name}</h3>
                  <Badge variant="outline" className="mt-1 bg-red-50">{agent.position}</Badge>
                </div>
              </div>
              
              <div className="space-y-3 mt-2">
                {agent.phone_number && (
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-red-600 flex-shrink-0" />
                    <div className="flex flex-wrap gap-2 w-full">
                      <a 
                        href={`tel:${formatPhoneForLink(agent.phone_number)}`}
                        className="text-neutral-800 hover:text-red-700 transition-colors font-medium"
                      >
                        {agent.phone_number}
                      </a>
                      
                      <div className="flex space-x-2 ml-auto">
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
                    <Mail className="h-4 w-4 text-red-600 flex-shrink-0" />
                    <a 
                      href={`mailto:${agent.email}`}
                      className="text-neutral-800 hover:text-red-700 transition-colors font-medium"
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

      <Card className="overflow-hidden border border-red-100 shadow-md rounded-lg">
        {/* Card header with fancy gradient */}
        <CardHeader className="bg-gradient-to-r from-red-50 to-white pb-4">
          <CardTitle className="text-xl font-bold text-red-900">
            Интересувате се от този имот?
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-5">
          <div className="space-y-5">
            {/* Contact buttons */}
            <div className="flex flex-col space-y-3">
              {agent && agent.phone_number ? (
                <Button 
                  className="w-full bg-red-700 hover:bg-red-800"
                  onClick={() => window.location.href = `tel:${formatPhoneForLink(agent.phone_number)}`}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Обадете се сега
                </Button>
              ) : (
                <Button 
                  className="w-full bg-red-700 hover:bg-red-800"
                  onClick={() => window.location.href = "tel:+35929876543"}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Обадете се сега
                </Button>
              )}
              
              <Button 
                variant="outline" 
                className="w-full border-red-200 text-red-700 hover:bg-red-50"
                onClick={toggleInquiryForm}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Изпратете запитване
              </Button>
            </div>

            {/* Conditional Inquiry Form */}
            {showInquiryForm && (
              <div className="mt-4" id="inquiry-form">
                <Separator className="my-4" />
                <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Изпратете запитване
                </h3>
                <PropertyInquiryForm 
                  propertyId={propertyId} 
                  propertyTitle={propertyTitle} 
                />
              </div>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="bg-neutral-50 p-4 text-center">
          <p className="text-neutral-500 text-sm flex items-center justify-center w-full">
            <Clock className="h-4 w-4 mr-2 text-red-700" />
            Ще се свържем с вас до 24 часа
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PropertyInquirySidebar;
