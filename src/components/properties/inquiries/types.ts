
export interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  viewingDate?: Date;
}

export interface InquirySubmissionProps {
  propertyId: string;
  propertyTitle: string;
}
