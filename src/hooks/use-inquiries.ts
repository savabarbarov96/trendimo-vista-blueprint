import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Inquiry {
  id: string;
  property_id: string;
  user_id: string | null;
  name: string;
  email: string;
  phone: string;
  message: string | null;
  created_at: string;
  responded: boolean;
  properties?: {
    title: string;
  };
}

// Hook to fetch all inquiries
export const useInquiries = () => {
  return useQuery({
    queryKey: ['inquiries'],
    queryFn: async () => {
      try {
        // First, try to fetch inquiries with property join
        const { data, error } = await supabase
          .from('inquiries')
          .select('*, properties:property_id(title)')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Error fetching inquiries with join:', error);
          
          // If that fails, try without the join
          const { data: basicData, error: basicError } = await supabase
            .from('inquiries')
            .select('*')
            .order('created_at', { ascending: false });
            
          if (basicError) {
            console.error('Error fetching basic inquiries:', basicError);
            throw new Error(`Failed to fetch inquiries: ${basicError.message}`);
          }
          
          return basicData;
        }

        return data;
      } catch (err) {
        console.error('Unhandled error in useInquiries:', err);
        throw new Error('Failed to fetch inquiries. Please check your access permissions.');
      }
    },
    retry: 1,
  });
};

// Hook to mark an inquiry as responded
export const useMarkInquiryResponded = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, responded }: { id: string, responded: boolean }) => {
      const { data, error } = await supabase
        .from('inquiries')
        .update({ responded })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error marking inquiry as responded:', error);
        throw new Error(`Failed to mark inquiry as responded: ${error.message}`);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
    },
  });
};

// Hook to delete an inquiry
export const useDeleteInquiry = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('inquiries')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting inquiry:', error);
        throw new Error(`Failed to delete inquiry: ${error.message}`);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
    },
  });
}; 