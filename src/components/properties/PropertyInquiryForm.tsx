
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import InquiryFormFields from './inquiries/InquiryFormFields';
import ViewingDateSelector from './inquiries/ViewingDateSelector';
import FormActions from './inquiries/FormActions';
import { useInquirySubmission } from './inquiries/useInquirySubmission';
import { InquirySubmissionProps } from './inquiries/types';

const PropertyInquiryForm = ({ propertyId, propertyTitle }: InquirySubmissionProps) => {
  const {
    isLoading,
    isViewingRequest,
    setIsViewingRequest,
    viewingDate,
    setViewingDate,
    register,
    handleSubmit,
    errors,
    onSubmit
  } = useInquirySubmission(propertyId);
  
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-4">
          {isViewingRequest 
            ? `Schedule a viewing for: ${propertyTitle}` 
            : `Inquire about: ${propertyTitle}`}
        </h3>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InquiryFormFields 
            register={register}
            errors={errors}
            isViewingRequest={isViewingRequest}
          />
          
          {isViewingRequest && (
            <ViewingDateSelector 
              viewingDate={viewingDate}
              setViewingDate={setViewingDate}
            />
          )}
          
          <FormActions 
            isLoading={isLoading}
            isViewingRequest={isViewingRequest}
            setIsViewingRequest={setIsViewingRequest}
            hasViewingDate={!!viewingDate}
          />
        </form>
      </CardContent>
    </Card>
  );
};

export default PropertyInquiryForm;
