import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from './ui/button';
import { Upload, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface ImageUploaderProps {
  bucketName: string;
  folderPath: string;
  onUploadComplete?: (urls: string[], files: File[]) => void;
  maxFiles?: number;
  acceptedTypes?: string;
  className?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  bucketName,
  folderPath,
  onUploadComplete,
  maxFiles = 5,
  acceptedTypes = "image/*",
  className = "",
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }

      const files = Array.from(event.target.files).slice(0, maxFiles);
      setUploading(true);
      setUploadProgress(0);

      const uploadPromises = files.map(async (file, index) => {
        // Create a unique file path with timestamp and random string
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        const filePath = `${folderPath}${fileName}`;

        // Upload file
        const { data, error } = await supabase.storage
          .from(bucketName)
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          });

        // Update progress
        setUploadProgress(Math.round(((index + 1) / files.length) * 100));

        if (error) {
          throw error;
        }

        // Try to get URL - first try signed URL, then fall back to public URL if that fails
        let url = '';
        try {
          // First try to get a signed URL
          const { data: signedUrlData, error: signedUrlError } = await supabase.storage
            .from(bucketName)
            .createSignedUrl(filePath, 60 * 60 * 24 * 365); // 1 year expiry
          
          if (signedUrlData?.signedUrl && !signedUrlError) {
            url = signedUrlData.signedUrl;
          } else {
            // Fall back to public URL
            const { data: publicUrlData } = supabase.storage
              .from(bucketName)
              .getPublicUrl(filePath);
            
            url = publicUrlData.publicUrl;
          }
        } catch (urlError) {
          console.error('Error getting URL:', urlError);
          // Last attempt - construct URL directly
          url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucketName}/${filePath}`;
        }

        return { 
          path: filePath, 
          url, 
          file 
        };
      });

      const results = await Promise.all(uploadPromises);
      const urls = results.map(result => result.url);
      
      // Notify upload completion
      toast.success(`${files.length} файл${files.length > 1 ? 'а' : ''} качени успешно`);
      
      if (onUploadComplete) {
        onUploadComplete(urls, files);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Грешка при качването на файла');
    } finally {
      setUploading(false);
      setUploadProgress(0);
      // Reset input value to allow uploading the same file again
      if (event.target) {
        event.target.value = '';
      }
    }
  };

  return (
    <div className={`${className}`}>
      <label className="block">
        <Button 
          type="button"
          variant="outline" 
          className="w-full"
          disabled={uploading}
          onClick={() => document.getElementById('file-upload-input')?.click()}
        >
          {uploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Качване... {uploadProgress}%</span>
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              <span>Качи изображения</span>
            </>
          )}
        </Button>
        <input
          id="file-upload-input"
          type="file"
          accept={acceptedTypes}
          multiple={maxFiles > 1}
          onChange={handleFileUpload}
          disabled={uploading}
          className="hidden"
        />
      </label>
      {maxFiles > 1 && (
        <p className="text-xs text-neutral mt-1">
          Можете да качите до {maxFiles} файла наведнъж.
        </p>
      )}
    </div>
  );
};

export default ImageUploader;
