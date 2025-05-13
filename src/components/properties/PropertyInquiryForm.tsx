
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().min(6, { message: 'Phone number is required' }),
  message: z.string().optional(),
  viewingDate: z.date().optional(),
  isViewing: z.boolean().default(false)
});

type FormValues = z.infer<typeof formSchema>;

interface PropertyInquiryFormProps {
  propertyId: string;
  propertyTitle: string;
}

const PropertyInquiryForm: React.FC<PropertyInquiryFormProps> = ({ propertyId, propertyTitle }) => {
  const { user } = useAuth();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: user?.email || '',
      phone: '',
      message: `I'm interested in this property: ${propertyTitle}`,
      isViewing: false
    },
  });

  const submitInquiry = useMutation({
    mutationFn: async (data: FormValues) => {
      const { isViewing, viewingDate, ...inquiryData } = data;
      
      if (isViewing && viewingDate) {
        // Submit as a viewing request
        const { error } = await supabase
          .from('viewings')
          .insert({
            property_id: propertyId,
            name: inquiryData.name,
            email: inquiryData.email,
            phone: inquiryData.phone,
            message: inquiryData.message || '',
            viewing_date: viewingDate.toISOString(),
            user_id: user?.id || null
          });
          
        if (error) throw error;
        return { type: 'viewing' };
      } else {
        // Submit as a general inquiry
        const { error } = await supabase
          .from('inquiries')
          .insert({
            property_id: propertyId,
            name: inquiryData.name,
            email: inquiryData.email,
            phone: inquiryData.phone,
            message: inquiryData.message || '',
            user_id: user?.id || null
          });
          
        if (error) throw error;
        return { type: 'inquiry' };
      }
    },
    onSuccess: (data) => {
      if (data.type === 'viewing') {
        toast.success('Your viewing request has been scheduled!');
      } else {
        toast.success('Your inquiry has been sent!');
      }
      form.reset();
    },
    onError: (error) => {
      console.error('Error submitting form:', error);
      toast.error('There was an error sending your request. Please try again.');
    }
  });

  const onSubmit = (data: FormValues) => {
    submitInquiry.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="your@email.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="Your phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Your message" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="isViewing"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>I want to schedule a viewing</FormLabel>
              </div>
            </FormItem>
          )}
        />
        
        {form.watch('isViewing') && (
          <FormField
            control={form.control}
            name="viewingDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Preferred Viewing Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => 
                        date < new Date() || // Can't select dates in the past
                        date > new Date(new Date().setMonth(new Date().getMonth() + 3)) // Limit to 3 months in the future
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        
        <Button 
          type="submit" 
          className="w-full" 
          disabled={submitInquiry.isPending}
        >
          {submitInquiry.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            'Submit Request'
          )}
        </Button>
      </form>
    </Form>
  );
};

export default PropertyInquiryForm;
