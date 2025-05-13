
import { supabase } from '@/integrations/supabase/client';

/**
 * Uploads files to Supabase storage
 */
export async function uploadFilesToStorage(
  bucketName: string, 
  folderPath: string, 
  files: File[]
): Promise<string[]> {
  const urls: string[] = [];
  
  for (const file of files) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `${folderPath}${fileName}`;

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Error uploading file:', error);
      continue;
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    urls.push(publicUrl);
  }

  return urls;
}

/**
 * Gets all images from a specific folder in storage
 */
export async function getImagesFromFolder(
  bucketName: string, 
  folderPath: string
): Promise<string[]> {
  const { data, error } = await supabase.storage
    .from(bucketName)
    .list(folderPath, {
      sortBy: { column: 'created_at', order: 'desc' },
    });

  if (error) {
    console.error('Error fetching images:', error);
    return [];
  }

  // Filter for image files only
  const imageFiles = data ? data.filter(item => 
    !item.id.endsWith('/') && 
    (item.metadata?.mimetype?.startsWith('image/') || 
     item.name.match(/\.(jpg|jpeg|png|gif|webp)$/i))
  ) : [];

  // Get URLs for each image
  const urls = imageFiles.map(file => {
    const { data: { publicUrl } } = supabase
      .storage
      .from(bucketName)
      .getPublicUrl(folderPath + file.name);

    return publicUrl;
  });

  return urls;
}

/**
 * Gets all property images for a specific property
 */
export async function getPropertyImages(propertyId: string): Promise<string[]> {
  const folderPath = `property_media/${propertyId}/`;
  return getImagesFromFolder('trendimo', folderPath);
}

/**
 * Deletes a file from storage
 */
export async function deleteFileFromStorage(
  bucketName: string,
  filePath: string
): Promise<boolean> {
  const { error } = await supabase.storage
    .from(bucketName)
    .remove([filePath]);

  if (error) {
    console.error('Error deleting file:', error);
    return false;
  }

  return true;
}
