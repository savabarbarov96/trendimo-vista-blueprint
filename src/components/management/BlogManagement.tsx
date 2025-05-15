import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/hooks/auth/use-user';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Loader2, 
  Plus, 
  PencilIcon, 
  Trash2Icon, 
  UploadIcon, 
  ImageIcon,
  FileEdit,
  Calendar,
  FolderOpen,
  ExternalLink
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { BlogPost } from '@/hooks/use-blog-posts';
import { format } from 'date-fns';
import { bg } from 'date-fns/locale';

const BUCKET_NAME = 'blog-images';

// Regex for URL-friendly slug
const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const formSchema = z.object({
  title: z.string().min(5, 'Заглавието трябва да бъде поне 5 символа'),
  slug: z.string().min(3, 'Slug трябва да бъде поне 3 символа').regex(slugRegex, 'Невалиден slug формат. Използвайте само малки букви, цифри и тире.'),
  content: z.string().min(20, 'Съдържанието трябва да бъде поне 20 символа'),
  excerpt: z.string().min(10, 'Краткото описание трябва да бъде поне 10 символа'),
  category: z.enum(['Market Analysis', 'Tips & News', 'Client Stories'], {
    errorMap: () => ({ message: 'Моля, изберете категория' }),
  }),
  // image_url will be handled separately with file upload
});

type FormValues = z.infer<typeof formSchema>;

const BlogManagement = () => {
  const { data: user } = useUser();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [checkingSlug, setCheckingSlug] = useState(false);
  const [slugError, setSlugError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      category: 'Tips & News',
    },
  });

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('published_at', { ascending: false });

      if (error) {
        throw error;
      }

      // Cast the data to ensure category is a valid enum value
      const typedPosts = data?.map(post => ({
        ...post,
        category: post.category as "Market Analysis" | "Tips & News" | "Client Stories"
      })) || [];
      
      setPosts(typedPosts);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      toast({
        title: "Грешка",
        description: "Възникна проблем при зареждането на блог постовете.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  
  // Function to generate a slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')  // Remove special chars
      .replace(/\s+/g, '-')      // Replace spaces with hyphens
      .replace(/-+/g, '-');      // Remove consecutive hyphens
  };

  // Check if a slug is available (not used by another post)
  const checkSlugAvailability = async (slug: string, excludeId?: string) => {
    setCheckingSlug(true);
    setSlugError(null);
    
    try {
      let query = supabase
        .from('blog_posts')
        .select('id, slug')
        .eq('slug', slug);
        
      if (excludeId) {
        query = query.neq('id', excludeId);
      }
        
      const { data, error } = await query;
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        setSlugError('Този slug вече съществува. Моля, изберете друг.');
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error checking slug:', error);
      setSlugError('Грешка при проверка на slug.');
      return false;
    } finally {
      setCheckingSlug(false);
    }
  };

  // Watch for title changes to suggest a slug
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'title' && value.title && !editingId) {
        const generatedSlug = generateSlug(value.title as string);
        form.setValue('slug', generatedSlug);
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form, editingId]);

  const handleEdit = async (post: BlogPost) => {
    setEditingId(post.id);
    setShowEditor(true);
    
    form.reset({
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt,
      category: post.category as any,
    });
    
    setImagePreview(post.image_url);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Грешка",
        description: "Изображението не може да бъде по-голямо от 5MB.",
        variant: "destructive",
      });
      return;
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Грешка",
        description: "Моля, изберете валиден файл с изображение (JPEG, PNG, GIF, WEBP).",
        variant: "destructive",
      });
      return;
    }

    setImageFile(file);
    
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.onerror = () => {
      toast({
        title: "Грешка",
        description: "Проблем при четенето на изображението.",
        variant: "destructive",
      });
    };
    reader.readAsDataURL(file);
  };

  const uploadImage = async (id: string): Promise<string | null> => {
    if (!imageFile) return null;
    
    try {
      setIsUploading(true);
      setUploadProgress(0);
      
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}${fileExt ? `.${fileExt}` : ''}`;
      const filePath = `${id}/${fileName}`;
      
      // Upload the file
      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, imageFile, {
          upsert: true,
          contentType: imageFile.type,
        });

      if (error) {
        console.error('Supabase storage upload error:', error);
        throw error;
      }

      if (!data?.path) {
        throw new Error('Uploaded file path is undefined');
      }

      // Get the public URL
      const { data: urlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(data.path);

      if (!urlData?.publicUrl) {
        throw new Error('Failed to get public URL for uploaded image');
      }

      console.log('Uploaded image URL:', urlData.publicUrl);
      setUploadProgress(100);
      return urlData.publicUrl;
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast({
        title: "Грешка при качване на изображение",
        description: error.message || "Възникна проблем при качването на изображението",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setIsSubmitting(true);
      
      // Get the post to find the image path
      const { data: postData } = await supabase
        .from('blog_posts')
        .select('image_url')
        .eq('id', id)
        .single();
      
      // Delete from the database
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      // If there's an image, try to delete it from storage
      if (postData?.image_url) {
        try {
          // Extract the path from the URL
          const url = new URL(postData.image_url);
          const pathMatch = url.pathname.match(/\/storage\/v1\/object\/public\/blog-images\/(.+)/);
          
          if (pathMatch && pathMatch[1]) {
            await supabase.storage
              .from(BUCKET_NAME)
              .remove([decodeURIComponent(pathMatch[1])]);
          }
        } catch (storageError) {
          console.error('Error deleting image from storage:', storageError);
          // Don't throw here, just log the error, as the database deletion was successful
        }
      }

      await fetchPosts();
      
      toast({
        title: "Успешно",
        description: "Блог постът беше изтрит.",
      });
    } catch (error: any) {
      console.error('Error deleting blog post:', error);
      toast({
        title: "Грешка",
        description: error.message || "Възникна проблем при изтриването на блог поста.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setIsDeleteDialogOpen(false);
      setPostToDelete(null);
    }
  };

  const confirmDelete = (id: string) => {
    setPostToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const onSubmit = async (values: FormValues) => {
    try {
      // Validate slug uniqueness
      const isSlugValid = await checkSlugAvailability(values.slug, editingId);
      if (!isSlugValid) {
        return; // Exit if slug is not valid
      }
      
      setIsSubmitting(true);
      
      // Check if we're authenticated before proceeding
      if (!user) {
        throw new Error("Моля, влезте в системата за да добавите или редактирате блог пост");
      }
      
      let imageUrl = imagePreview;
      const now = new Date().toISOString();
      
      if (editingId) {
        // If editing and new image uploaded, update the image
        if (imageFile) {
          const newImageUrl = await uploadImage(editingId);
          if (newImageUrl) {
            imageUrl = newImageUrl;
          }
        }
        
        // Update existing post
        const { error } = await supabase
          .from('blog_posts')
          .update({
            title: values.title,
            slug: values.slug,
            content: values.content,
            excerpt: values.excerpt,
            category: values.category,
            image_url: imageUrl,
            updated_at: now
          })
          .eq('id', editingId);

        if (error) throw error;

        toast({
          title: "Успешно",
          description: "Блог постът беше обновен.",
        });
      } else {
        // For new posts, determine if we have an image to upload
        const hasImageToUpload = !!imageFile;
        
        // Create new post with required fields
        const { data, error } = await supabase
          .from('blog_posts')
          .insert({
            title: values.title,
            slug: values.slug,
            content: values.content,
            excerpt: values.excerpt,
            category: values.category,
            author_id: user.id,
            image_url: null, // Will be updated after upload if image exists
            published_at: now,
            created_at: now,
            updated_at: now
          })
          .select()
          .single();

        if (error) throw error;

        // If new image uploaded, update with the image URL
        if (hasImageToUpload && data) {
          const newImageUrl = await uploadImage(data.id);
          if (newImageUrl) {
            // Update the newly created post with the image URL
            const { error: updateError } = await supabase
              .from('blog_posts')
              .update({ image_url: newImageUrl })
              .eq('id', data.id);
              
            if (updateError) {
              console.error('Error updating image URL:', updateError);
              // Don't throw, but log the error
            }
          }
        }

        toast({
          title: "Успешно",
          description: "Блог постът беше създаден.",
        });
      }

      // Reset form and state
      resetForm();
      
      // Refresh the posts list
      await fetchPosts();

    } catch (error: any) {
      console.error('Error submitting blog post:', error);
      toast({
        title: "Грешка",
        description: `Възникна проблем при запазването: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    form.reset({
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      category: 'Tips & News',
    });
    setEditingId(null);
    setImageFile(null);
    setImagePreview(null);
    setShowEditor(false);
  };

  const handleCancel = () => {
    resetForm();
  };

  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), 'dd MMM yyyy, HH:mm', { locale: bg });
    } catch (error) {
      return dateStr;
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'Market Analysis':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Tips & News':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Client Stories':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getCategoryTranslation = (category: string) => {
    switch (category) {
      case 'Market Analysis':
        return 'Пазарен анализ';
      case 'Tips & News':
        return 'Съвети и новини';
      case 'Client Stories':
        return 'Истории на клиенти';
      default:
        return category;
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Управление на блога</CardTitle>
          <CardDescription>
            Създавайте, редактирайте и изтривайте блог постове.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!showEditor ? (
            <div className="mb-6">
              <Button 
                onClick={() => setShowEditor(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="mr-2 h-4 w-4" />
                Нов блог пост
              </Button>
            </div>
          ) : (
            <div className="space-y-6 mb-8 border rounded-lg p-6 bg-gray-50">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">
                  {editingId ? 'Редактиране на пост' : 'Създаване на нов пост'}
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                >
                  Отказ
                </Button>
              </div>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Заглавие</FormLabel>
                        <FormControl>
                          <Input placeholder="Въведете заглавие" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug (URL)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="example-post-url" 
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              // Reset error when user types
                              if (slugError) setSlugError(null);
                            }} 
                          />
                        </FormControl>
                        <FormDescription>
                          Използвайте само малки букви, цифри и тирета. Не използвайте интервали.
                        </FormDescription>
                        {slugError && <p className="text-sm text-destructive mt-1">{slugError}</p>}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Категория</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Изберете категория" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Market Analysis">Пазарен анализ</SelectItem>
                              <SelectItem value="Tips & News">Съвети и новини</SelectItem>
                              <SelectItem value="Client Stories">Истории на клиенти</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="space-y-2">
                      <FormLabel>Изображение за корицата</FormLabel>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-primary hover:bg-primary/5 transition-colors">
                        <Input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id="blog-image-upload"
                          onChange={handleImageChange}
                        />
                        <label 
                          htmlFor="blog-image-upload" 
                          className="flex flex-col items-center justify-center cursor-pointer space-y-2 h-full"
                        >
                          <UploadIcon className="h-8 w-8 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            Качете изображение (макс. 5MB)
                          </span>
                          <Button 
                            type="button" 
                            variant="secondary" 
                            size="sm"
                            onClick={(e) => {
                              e.preventDefault();
                              document.getElementById('blog-image-upload')?.click();
                            }}
                          >
                            Избери Файл
                          </Button>
                        </label>
                      </div>
                      {isUploading && (
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-primary h-2.5 rounded-full" 
                              style={{ width: `${uploadProgress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {imagePreview && (
                    <div className="relative">
                      <div className="h-40 border rounded-md overflow-hidden">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                  
                  <FormField
                    control={form.control}
                    name="excerpt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Кратко описание</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Въведете кратко описание" 
                            {...field} 
                            rows={2}
                          />
                        </FormControl>
                        <FormDescription>
                          Това ще се показва в прегледа на статията.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Съдържание</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Въведете съдържанието на поста" 
                            {...field} 
                            rows={12}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting || checkingSlug}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Запазване...
                        </>
                      ) : editingId ? (
                        'Обнови блог пост'
                      ) : (
                        'Създай блог пост'
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          )}
          
          <div className="pt-4">
            <h3 className="text-lg font-medium mb-4">Блог постове</h3>
            
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-8 bg-muted/20 rounded-lg">
                <p className="text-muted-foreground">Все още няма добавени блог постове.</p>
              </div>
            ) : (
              <div className="mt-4 overflow-hidden border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Заглавие</TableHead>
                      <TableHead>Категория</TableHead>
                      <TableHead>Slug</TableHead>
                      <TableHead>Дата на публикуване</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {posts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-2">
                            <div className="h-10 w-10 rounded-md overflow-hidden flex-shrink-0">
                              {post.image_url ? (
                                <img 
                                  src={post.image_url} 
                                  alt={post.title} 
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="h-full w-full bg-muted flex items-center justify-center">
                                  <ImageIcon className="h-5 w-5 text-muted-foreground" />
                                </div>
                              )}
                            </div>
                            <span className="truncate max-w-xs">{post.title}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getCategoryBadgeColor(post.category)}>
                            {getCategoryTranslation(post.category)}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono text-xs">
                          {post.slug}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(post.published_at)}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              asChild
                            >
                              <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4" />
                                <span className="sr-only">Преглед</span>
                              </a>
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleEdit(post)}
                            >
                              <PencilIcon className="h-4 w-4" />
                              <span className="sr-only">Редактирай</span>
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={() => confirmDelete(post.id)}
                            >
                              <Trash2Icon className="h-4 w-4" />
                              <span className="sr-only">Изтрий</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Потвърдете изтриването</DialogTitle>
            <DialogDescription>
              Сигурни ли сте, че искате да изтриете този блог пост? Това действие не може да бъде отменено.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isSubmitting}
            >
              Отказ
            </Button>
            <Button
              variant="destructive"
              onClick={() => postToDelete && handleDelete(postToDelete)}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Изтриване...
                </>
              ) : (
                'Изтрий'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogManagement; 