
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  viewingDate?: Date;
}

interface PropertyInquiryFormProps {
  propertyId: string;
  propertyTitle: string;
}

const PropertyInquiryForm = ({ propertyId, propertyTitle }: PropertyInquiryFormProps) => {
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
        toast.success("Viewing request submitted successfully!");
      } else {
        // Create a regular inquiry
        const { data: inquiryData, error: inquiryError } = await supabase
          .from('inquiries')
          .insert(formData)
          .select();
        
        if (inquiryError) throw inquiryError;
        result = inquiryData;
        toast.success("Inquiry sent successfully!");
      }
      
      reset();
      setViewingDate(undefined);
      setIsViewingRequest(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit your request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-4">
          {isViewingRequest 
            ? `Schedule a viewing for: ${propertyTitle}` 
            : `Inquire about: ${propertyTitle}`}
        </h3>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              {...register('name', { required: 'Name is required' })}
              placeholder="Full Name"
              className={errors.name ? 'border-destructive' : ''}
            />
            {errors.name && (
              <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
            )}
          </div>
          
          <div>
            <Input
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              placeholder="Email"
              type="email"
              className={errors.email ? 'border-destructive' : ''}
            />
            {errors.email && (
              <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
            )}
          </div>
          
          <div>
            <Input
              {...register('phone', { 
                required: 'Phone number is required' 
              })}
              placeholder="Phone Number"
              type="tel"
              className={errors.phone ? 'border-destructive' : ''}
            />
            {errors.phone && (
              <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
            )}
          </div>
          
          {isViewingRequest && (
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium">Select a Date for Viewing</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !viewingDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {viewingDate ? format(viewingDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={viewingDate}
                    onSelect={setViewingDate}
                    initialFocus
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}
          
          <div>
            <Textarea
              {...register('message')}
              placeholder={isViewingRequest ? "Any specific details about your visit?" : "How can we help you?"}
              rows={4}
              className={errors.message ? 'border-destructive' : ''}
            />
            {errors.message && (
              <p className="text-sm text-destructive mt-1">{errors.message.message}</p>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              type="submit" 
              disabled={isLoading || (isViewingRequest && !viewingDate)}
              className="flex-1"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isViewingRequest ? "Schedule Viewing" : "Send Inquiry"}
            </Button>
            
            <Button 
              type="button" 
              variant="outline"
              onClick={() => {
                setIsViewingRequest(!isViewingRequest);
                if (isViewingRequest) {
                  setViewingDate(undefined);
                }
              }}
              className="flex-1"
            >
              {isViewingRequest ? "Just Send Inquiry" : "Schedule a Viewing"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PropertyInquiryForm;
