import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  ArrowUpDown,
  Trash2,
  Pencil,
  Plus,
  Loader2
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";

// Custom TikTok icon since it's not available in lucide-react
const TikTokIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/>
    <path d="M16 8v8"/>
    <path d="M12 16v-8"/>
    <path d="M18 8a4 4 0 0 0-4-4"/>
    <path d="M16 4h-4"/>
    <path d="M16 8a4 4 0 0 1 4 4v1"/>
  </svg>
);

// Interface for social media links
interface SocialMediaLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  is_active: boolean;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

// Icons mapping
const iconComponents: Record<string, React.ReactNode> = {
  Facebook: <Facebook />,
  Instagram: <Instagram />,
  Twitter: <Twitter />,
  Linkedin: <Linkedin />,
  TikTok: <TikTokIcon />,
};

const SocialMediaLinksManagement = () => {
  const [socialLinks, setSocialLinks] = useState<SocialMediaLink[]>([
    // Default values will be replaced when data is loaded
    { id: '1', platform: 'Facebook', url: 'https://facebook.com', icon: 'Facebook', is_active: true, display_order: 1 },
    { id: '2', platform: 'Instagram', url: 'https://instagram.com', icon: 'Instagram', is_active: true, display_order: 2 },
    { id: '3', platform: 'TikTok', url: 'https://tiktok.com', icon: 'TikTok', is_active: true, display_order: 3 },
    { id: '4', platform: 'Twitter', url: 'https://twitter.com', icon: 'Twitter', is_active: true, display_order: 4 },
    { id: '5', platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'Linkedin', is_active: true, display_order: 5 },
  ]);
  const [loading, setLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [currentLink, setCurrentLink] = useState<SocialMediaLink | null>(null);
  const { session } = useAuth();
  const [formData, setFormData] = useState({
    platform: '',
    url: '',
    icon: '',
    is_active: true,
    display_order: 0,
  });

  useEffect(() => {
    // Fetch social media links from edge function
    const fetchSocialLinks = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://zanfdpuiblradrbtfzhl.supabase.co/functions/v1/social-media-links');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        if (data && data.length > 0) {
          setSocialLinks(data);
        }
      } catch (error: any) {
        console.error('Error fetching social links:', error.message);
        toast.error(`Грешка при зареждане на социални връзки: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchSocialLinks();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Open edit dialog with selected link
  const handleEditClick = (link: SocialMediaLink) => {
    setCurrentLink(link);
    setFormData({
      platform: link.platform,
      url: link.url,
      icon: link.icon,
      is_active: link.is_active,
      display_order: link.display_order,
    });
    setIsEditDialogOpen(true);
  };

  // Open delete dialog with selected link
  const handleDeleteClick = (link: SocialMediaLink) => {
    setCurrentLink(link);
    setIsDeleteDialogOpen(true);
  };

  // Open create dialog
  const handleCreateClick = () => {
    setFormData({
      platform: '',
      url: '',
      icon: '',
      is_active: true,
      display_order: socialLinks.length + 1,
    });
    setIsCreateDialogOpen(true);
  };

  // Update link order using edge function
  const moveLink = async (id: string, direction: 'up' | 'down') => {
    try {
      const newLinks = [...socialLinks];
      const currentIndex = newLinks.findIndex(link => link.id === id);
      
      if (
        (direction === 'up' && currentIndex <= 0) ||
        (direction === 'down' && currentIndex >= newLinks.length - 1)
      ) {
        return; // Can't move further
      }

      const swapIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      
      // Swap the display orders
      const currentDisplayOrder = newLinks[currentIndex].display_order;
      newLinks[currentIndex].display_order = newLinks[swapIndex].display_order;
      newLinks[swapIndex].display_order = currentDisplayOrder;
      
      // Sort the array by display_order
      newLinks.sort((a, b) => a.display_order - b.display_order);
      
      // Update the local state immediately for better UX
      setSocialLinks(newLinks);
      
      // Update in the database via edge function
      const currentLink = newLinks[currentIndex];
      const swapLink = newLinks[swapIndex];
      
      // Check if we have an authentication token
      if (!session?.access_token) {
        throw new Error('Не сте влезли в профила си');
      }
      
      // Update first link
      const response1 = await fetch('https://zanfdpuiblradrbtfzhl.supabase.co/functions/v1/social-media-links', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify(currentLink),
      });
      
      // Update second link
      const response2 = await fetch('https://zanfdpuiblradrbtfzhl.supabase.co/functions/v1/social-media-links', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify(swapLink),
      });

      if (!response1.ok || !response2.ok) {
        throw new Error('Failed to update links order');
      }
      
      toast.success("Редът е променен успешно");
    } catch (error: any) {
      toast.error(`Грешка при промяна на реда: ${error.message}`);
    }
  };

  // Create new social media link with edge function
  const createSocialLink = async () => {
    try {
      // Validate form
      if (!formData.platform || !formData.url || !formData.icon) {
        toast.error("Моля, попълнете всички полета");
        return;
      }

      // Check if we have an authentication token
      if (!session?.access_token) {
        throw new Error('Не сте влезли в профила си');
      }

      // Create via edge function
      const response = await fetch('https://zanfdpuiblradrbtfzhl.supabase.co/functions/v1/social-media-links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          platform: formData.platform,
          url: formData.url,
          icon: formData.icon,
          is_active: formData.is_active,
          display_order: formData.display_order,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create link');
      }

      const data = await response.json();
      
      // Add the new link to the local state
      setSocialLinks([...socialLinks, data[0]]);
      
      toast.success("Социалната връзка е създадена успешно");
      setIsCreateDialogOpen(false);
    } catch (error: any) {
      toast.error(`Грешка при създаване: ${error.message}`);
    }
  };

  // Update social media link with edge function
  const updateSocialLink = async () => {
    try {
      if (!currentLink) return;

      // Validate form
      if (!formData.platform || !formData.url || !formData.icon) {
        toast.error("Моля, попълнете всички полета");
        return;
      }

      // Check if we have an authentication token
      if (!session?.access_token) {
        throw new Error('Не сте влезли в профила си');
      }

      // Update data
      const updatedLink = {
        id: currentLink.id,
        platform: formData.platform,
        url: formData.url,
        icon: formData.icon,
        is_active: formData.is_active,
        display_order: formData.display_order,
      };

      // Update via edge function
      const response = await fetch('https://zanfdpuiblradrbtfzhl.supabase.co/functions/v1/social-media-links', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify(updatedLink),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update link');
      }

      // Update in local state
      const updatedLinks = socialLinks.map(link => 
        link.id === currentLink.id ? updatedLink : link
      );

      setSocialLinks(updatedLinks);
      toast.success("Социалната връзка е обновена успешно");
      setIsEditDialogOpen(false);
    } catch (error: any) {
      toast.error(`Грешка при обновяване: ${error.message}`);
    }
  };

  // Delete social media link with edge function
  const deleteSocialLink = async () => {
    try {
      if (!currentLink) return;

      // Check if we have an authentication token
      if (!session?.access_token) {
        throw new Error('Не сте влезли в профила си');
      }

      // Delete via edge function
      const response = await fetch(`https://zanfdpuiblradrbtfzhl.supabase.co/functions/v1/social-media-links?id=${currentLink.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete link');
      }

      // Remove from local state
      const filteredLinks = socialLinks.filter(link => link.id !== currentLink.id);
      
      // Update display order for remaining links
      const updatedLinks = filteredLinks.map((link, index) => ({
        ...link,
        display_order: index + 1
      }));

      // Update each link's display order
      for (const link of updatedLinks) {
        await fetch('https://zanfdpuiblradrbtfzhl.supabase.co/functions/v1/social-media-links', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`
          },
          body: JSON.stringify(link),
        });
      }

      setSocialLinks(updatedLinks);
      toast.success("Социалната връзка е изтрита успешно");
      setIsDeleteDialogOpen(false);
    } catch (error: any) {
      toast.error(`Грешка при изтриване: ${error.message}`);
    }
  };

  // Toggle active status with edge function
  const toggleActiveStatus = async (id: string, currentStatus: boolean) => {
    try {
      // Find the link to update
      const linkToUpdate = socialLinks.find(link => link.id === id);
      if (!linkToUpdate) return;
      
      // Check if we have an authentication token
      if (!session?.access_token) {
        throw new Error('Не сте влезли в профила си');
      }
      
      // Create updated link object
      const updatedLink = {
        ...linkToUpdate,
        is_active: !currentStatus
      };
      
      // Update via edge function
      const response = await fetch('https://zanfdpuiblradrbtfzhl.supabase.co/functions/v1/social-media-links', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify(updatedLink),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update status');
      }

      // Update in local state
      const updatedLinks = socialLinks.map(link => 
        link.id === id ? updatedLink : link
      );

      setSocialLinks(updatedLinks);
      toast.success("Статусът е променен успешно");
    } catch (error: any) {
      toast.error(`Грешка при промяна на статуса: ${error.message}`);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Управление на социални мрежи</CardTitle>
        <CardDescription>
          Управлявайте връзките към социалните мрежи, които се показват във футъра на сайта
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <div className="mb-4 flex justify-end">
              <Button onClick={handleCreateClick} className="gap-2">
                <Plus className="h-4 w-4" /> Добави връзка
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Икона</TableHead>
                  <TableHead>Платформа</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead className="w-[160px]">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {socialLinks
                  .sort((a, b) => a.display_order - b.display_order)
                  .map((link) => (
                  <TableRow key={link.id}>
                    <TableCell className="font-medium">
                      {link.display_order}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                        {iconComponents[link.icon] || link.icon}
                      </div>
                    </TableCell>
                    <TableCell>{link.platform}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {link.url}
                      </a>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={link.is_active}
                          onCheckedChange={() =>
                            toggleActiveStatus(link.id, link.is_active)
                          }
                          id={`active-${link.id}`}
                        />
                        <Badge variant={link.is_active ? "default" : "secondary"} className={link.is_active ? "bg-green-500 hover:bg-green-600" : ""}>
                          {link.is_active ? "Активна" : "Неактивна"}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => moveLink(link.id, 'up')}
                          disabled={link.display_order <= 1}
                        >
                          <ArrowUpDown className="h-4 w-4 rotate-90" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => moveLink(link.id, 'down')}
                          disabled={link.display_order >= socialLinks.length}
                        >
                          <ArrowUpDown className="h-4 w-4 -rotate-90" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEditClick(link)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-red-500"
                          onClick={() => handleDeleteClick(link)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {socialLinks.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6">
                      Няма социални връзки. Натиснете "Добави връзка" за да създадете нова.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-gray-500">
          Показват се само активните връзки във футъра на сайта
        </p>
        <p className="text-sm text-gray-500 italic">
          Бележка: В момента това е само прототип. Скоро ще бъде свързан с базата данни.
        </p>
      </CardFooter>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Редактиране на социална връзка</DialogTitle>
            <DialogDescription>
              Променете данните за избраната социална мрежа
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="platform">Платформа</Label>
              <Input
                id="platform"
                name="platform"
                value={formData.platform}
                onChange={handleInputChange}
                placeholder="Напр. Facebook"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="url">URL адрес</Label>
              <Input
                id="url"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
                placeholder="https://facebook.com/example"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="icon">Икона</Label>
              <Input
                id="icon"
                name="icon"
                value={formData.icon}
                onChange={handleInputChange}
                placeholder="Facebook, Instagram, Twitter, Linkedin, TikTok"
              />
              <p className="text-xs text-gray-500">
                Поддържани икони: Facebook, Instagram, Twitter, Linkedin, TikTok
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="display_order">Ред на показване</Label>
              <Input
                id="display_order"
                name="display_order"
                type="number"
                value={formData.display_order}
                onChange={handleInputChange}
                min={1}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="is_active"
                name="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, is_active: checked })
                }
              />
              <Label htmlFor="is_active">Активна</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Отказ
            </Button>
            <Button onClick={updateSocialLink}>Запази</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавяне на социална връзка</DialogTitle>
            <DialogDescription>
              Създайте нова социална връзка
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="platform">Платформа</Label>
              <Input
                id="platform"
                name="platform"
                value={formData.platform}
                onChange={handleInputChange}
                placeholder="Напр. Facebook"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="url">URL адрес</Label>
              <Input
                id="url"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
                placeholder="https://facebook.com/example"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="icon">Икона</Label>
              <Input
                id="icon"
                name="icon"
                value={formData.icon}
                onChange={handleInputChange}
                placeholder="Facebook, Instagram, Twitter, Linkedin, TikTok"
              />
              <p className="text-xs text-gray-500">
                Поддържани икони: Facebook, Instagram, Twitter, Linkedin, TikTok
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="display_order">Ред на показване</Label>
              <Input
                id="display_order"
                name="display_order"
                type="number"
                value={formData.display_order}
                onChange={handleInputChange}
                min={1}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="is_active"
                name="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, is_active: checked })
                }
              />
              <Label htmlFor="is_active">Активна</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Отказ
            </Button>
            <Button onClick={createSocialLink}>Създай</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Изтриване на социална връзка</DialogTitle>
            <DialogDescription>
              Сигурни ли сте, че искате да изтриете тази социална връзка? Това действие не може да бъде отменено.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {currentLink && (
              <div className="flex items-center space-x-3 p-4 rounded-md bg-gray-50">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200">
                  {iconComponents[currentLink.icon] || currentLink.icon}
                </div>
                <div>
                  <p className="font-medium">{currentLink.platform}</p>
                  <p className="text-sm text-gray-500 truncate">{currentLink.url}</p>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Отказ
            </Button>
            <Button variant="destructive" onClick={deleteSocialLink}>
              Изтрий
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default SocialMediaLinksManagement; 