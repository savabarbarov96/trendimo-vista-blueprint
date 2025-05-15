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
}

// Hook to fetch all inquiries
export const useInquiries = () => {
  return useQuery({
    queryKey: ['inquiries'],
    queryFn: async (): Promise<Inquiry[]> => {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*, properties:property_id(title)')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching inquiries:', error);
        throw new Error('Failed to fetch inquiries');
      }

      return data as unknown as Inquiry[];
    },
  });
};

// Hook to mark an inquiry as responded
export const useMarkInquiryResponded = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, responded }: { id: string, responded: boolean }): Promise<Inquiry> => {
      const { data, error } = await supabase
        .from('inquiries')
        .update({ responded })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error marking inquiry as responded:', error);
        throw new Error('Failed to mark inquiry as responded');
      }

      return data as Inquiry;
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
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase
        .from('inquiries')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting inquiry:', error);
        throw new Error('Failed to delete inquiry');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
    },
  });
}; 