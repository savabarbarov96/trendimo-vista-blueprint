
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth';
import { InquiryFormData } from './types';

export const useInquirySubmission = (propertyId: string) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isViewingRequest, setIsViewingRequest] = useState(false);
  const [viewingDate, setViewingDate] = useState<Date | undefined>(undefined);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<InquiryFormData>();
  
  const onSubmit = async (data: InquiryFormData) => {
    setIsLoading(true);
    
    try {
      const formData = {
        property_id: propertyId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        user_id: user?.id || null,
      };
      
      let result;
      
      if (isViewingRequest && viewingDate) {
        // Create a viewing request
        const { data: viewingData, error: viewingError } = await supabase
          .from('viewings')
          .insert({
            ...formData,
            viewing_date: viewingDate.toISOString(),
          })
          .select();
        
        if (viewingError) throw viewingError;
        result = viewingData;
        toast({
          title: "Success",
          description: "Viewing request submitted successfully!"
        });
      } else {
        // Create a regular inquiry
        const { data: inquiryData, error: inquiryError } = await supabase
          .from('inquiries')
          .insert(formData)
          .select();
        
        if (inquiryError) throw inquiryError;
        result = inquiryData;
        toast({
          title: "Success",
          description: "Inquiry sent successfully!"
        });
      }
      
      reset();
      setViewingDate(undefined);
      setIsViewingRequest(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Failed to submit your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    isLoading,
    isViewingRequest,
    setIsViewingRequest,
    viewingDate,
    setViewingDate,
    register,
    handleSubmit,
    errors,
    onSubmit
  };
};
