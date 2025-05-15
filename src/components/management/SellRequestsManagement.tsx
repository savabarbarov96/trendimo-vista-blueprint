import React, { useState } from 'react';
import { 
  Eye, 
  Check, 
  X, 
  Calendar, 
  Home,
  ChevronDown
} from 'lucide-react';
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
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/hooks/auth/use-user';
import { 
  useSellRequests, 
  useUpdateSellRequestStatus,
  useConvertSellRequestToProperty,
  type SellRequest
} from '@/hooks/use-sell-requests';

const SellRequestsManagement = () => {
  const { toast } = useToast();
  const { data: user } = useUser();
  const { data: sellRequests, isLoading, error } = useSellRequests();
  const updateStatus = useUpdateSellRequestStatus();
  const convertToProperty = useConvertSellRequestToProperty();

  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isConvertDialogOpen, setIsConvertDialogOpen] = useState(false);
  const [currentRequest, setCurrentRequest] = useState<SellRequest | null>(null);
  const [convertFormData, setConvertFormData] = useState({
    title: '',
    description: '',
    price: 0,
    address: '',
    city: '',
    property_type: ''
  });

  // Initialize convert form data
  const initializeConvertFormData = (request: SellRequest) => {
    setConvertFormData({
      title: request.title || `${request.property_type} в ${request.address.split(',')[1]?.trim() || 'града'}`,
      description: request.description || '',
      price: request.price || 0,
      address: request.address,
      city: request.address.split(',')[1]?.trim() || '',
      property_type: request.property_type
    });
  };

  // Open view dialog
  const handleViewClick = (request: SellRequest) => {
    setCurrentRequest(request);
    setIsViewDialogOpen(true);
  };

  // Open convert dialog
  const handleConvertClick = (request: SellRequest) => {
    setCurrentRequest(request);
    initializeConvertFormData(request);
    setIsConvertDialogOpen(true);
  };

  // Handle status update
  const handleStatusUpdate = (requestId: string, status: string) => {
    updateStatus.mutate({ id: requestId, status }, {
      onSuccess: () => {
        toast({
          title: "Статусът е обновен успешно",
          description: `Заявката е маркирана като "${status}".`,
        });
      },
      onError: (error) => {
        toast({
          title: "Грешка при обновяване на статуса",
          description: error.message,
          variant: "destructive"
        });
      }
    });
  };

  // Handle convert to property
  const handleConvertToProperty = () => {
    if (!currentRequest || !user) return;

    convertToProperty.mutate({
      sellRequestId: currentRequest.id,
      propertyData: convertFormData,
      ownerId: user.id
    }, {
      onSuccess: () => {
        toast({
          title: "Заявката е конвертирана в имот успешно!",
          description: "Новият имот е достъпен в секцията с имоти.",
        });
        setIsConvertDialogOpen(false);
      },
      onError: (error) => {
        toast({
          title: "Грешка при конвертиране в имот",
          description: error.message,
          variant: "destructive"
        });
      }
    });
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'number') {
      setConvertFormData({
        ...convertFormData,
        [name]: parseFloat(value)
      });
    } else {
      setConvertFormData({
        ...convertFormData,
        [name]: value
      });
    }
  };

  // Get status badge variant
  const getStatusBadgeVariant = (status: string): "default" | "destructive" | "secondary" | "outline" => {
    switch (status) {
      case 'pending':
        return 'secondary';
      case 'contacted':
        return 'default';
      case 'converted':
        return 'outline'; // Changed from success to outline as success isn't available
      case 'rejected':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  // Format status display
  const formatStatus = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Чакаща';
      case 'contacted':
        return 'Контактиран';
      case 'converted':
        return 'Конвертирана';
      case 'rejected':
        return 'Отказана';
      default:
        return status;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4">
        <p className="text-red-500">Грешка при зареждане на заявките: {error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Заявки за продажба</h2>
        <p className="text-muted-foreground mt-1">
          Преглед и управление на заявки за продажба от клиенти.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sellRequests && sellRequests.map((request) => (
          <Card key={request.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-semibold truncate pr-2">
                  {request.title || request.address.split(',')[0]}
                </CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <ChevronDown size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleViewClick(request)}>
                      <Eye size={14} className="mr-2" />
                      Преглед
                    </DropdownMenuItem>
                    
                    {request.status !== 'converted' && (
                      <DropdownMenuItem onClick={() => handleConvertClick(request)}>
                        <Home size={14} className="mr-2" />
                        Конвертирай в имот
                      </DropdownMenuItem>
                    )}
                    
                    {request.status === 'pending' && (
                      <DropdownMenuItem onClick={() => handleStatusUpdate(request.id, 'contacted')}>
                        <Check size={14} className="mr-2" />
                        Маркирай като контактиран
                      </DropdownMenuItem>
                    )}
                    
                    {request.status !== 'rejected' && request.status !== 'converted' && (
                      <DropdownMenuItem onClick={() => handleStatusUpdate(request.id, 'rejected')} className="text-red-600">
                        <X size={14} className="mr-2" />
                        Отказ
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription className="flex flex-wrap gap-2 mt-2">
                <Badge variant={getStatusBadgeVariant(request.status)}>
                  {formatStatus(request.status)}
                </Badge>
                <Badge variant="outline">
                  {request.property_type}
                </Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Клиент:</span>
                  <span className="font-medium">{request.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Контакт:</span>
                  <span>{request.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Телефон:</span>
                  <span>{request.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Адрес:</span>
                  <span className="text-right">{request.address}</span>
                </div>
                {request.price && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Очаквана цена:</span>
                    <span>{request.price.toLocaleString('bg-BG')} лв.</span>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <div className="text-xs text-muted-foreground">
                Създадена на: {new Date(request.created_at).toLocaleDateString('bg-BG')}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* View Request Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Детайли на заявката</DialogTitle>
            <DialogDescription>
              Пълна информация за заявката за продажба.
            </DialogDescription>
          </DialogHeader>

          {currentRequest && (
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  {currentRequest.title || currentRequest.address.split(',')[0]}
                </h3>
                <Badge variant={getStatusBadgeVariant(currentRequest.status)}>
                  {formatStatus(currentRequest.status)}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Тип имот</p>
                  <p className="font-medium">{currentRequest.property_type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Адрес</p>
                  <p className="font-medium">{currentRequest.address}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Име</p>
                  <p className="font-medium">{currentRequest.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Имейл</p>
                  <p className="font-medium">{currentRequest.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Телефон</p>
                  <p className="font-medium">{currentRequest.phone}</p>
                </div>
                {currentRequest.price && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Очаквана цена</p>
                    <p className="font-medium">{currentRequest.price.toLocaleString('bg-BG')} лв.</p>
                  </div>
                )}
              </div>

              {currentRequest.description && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Описание</p>
                  <p className="text-sm">{currentRequest.description}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Дата на създаване</p>
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2 text-muted-foreground" />
                    <p>{new Date(currentRequest.created_at).toLocaleDateString('bg-BG')}</p>
                  </div>
                </div>
                {currentRequest.consultation_date && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Дата за консултация</p>
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-2 text-muted-foreground" />
                      <p>{new Date(currentRequest.consultation_date).toLocaleDateString('bg-BG')}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 flex gap-2 flex-wrap">
                {currentRequest.status === 'pending' && (
                  <Button 
                    variant="outline" 
                    className="gap-2"
                    onClick={() => {
                      handleStatusUpdate(currentRequest.id, 'contacted');
                      setIsViewDialogOpen(false);
                    }}
                  >
                    <Check size={16} />
                    Маркирай като контактиран
                  </Button>
                )}
                
                {currentRequest.status !== 'converted' && (
                  <Button 
                    className="gap-2"
                    onClick={() => {
                      setIsViewDialogOpen(false);
                      handleConvertClick(currentRequest);
                    }}
                  >
                    <Home size={16} />
                    Конвертирай в имот
                  </Button>
                )}
                
                {currentRequest.status !== 'rejected' && currentRequest.status !== 'converted' && (
                  <Button 
                    variant="destructive" 
                    className="gap-2"
                    onClick={() => {
                      handleStatusUpdate(currentRequest.id, 'rejected');
                      setIsViewDialogOpen(false);
                    }}
                  >
                    <X size={16} />
                    Отказ
                  </Button>
                )}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button 
              variant="secondary" 
              onClick={() => setIsViewDialogOpen(false)}
            >
              Затвори
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Convert to Property Dialog */}
      <Dialog open={isConvertDialogOpen} onOpenChange={setIsConvertDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Конвертиране в имот</DialogTitle>
            <DialogDescription>
              Попълнете данните за новия имот. Системата е попълнила информацията от заявката.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Заглавие</Label>
                <Input
                  id="title"
                  name="title"
                  value={convertFormData.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Цена (лв.)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={convertFormData.price}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Описание</Label>
              <Textarea
                id="description"
                name="description"
                value={convertFormData.description}
                onChange={handleInputChange}
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address">Адрес</Label>
                <Input
                  id="address"
                  name="address"
                  value={convertFormData.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Град</Label>
                <Input
                  id="city"
                  name="city"
                  value={convertFormData.city}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="property_type">Тип имот</Label>
              <select
                id="property_type"
                name="property_type"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={convertFormData.property_type}
                onChange={handleInputChange}
              >
                <option value="Апартамент">Апартамент</option>
                <option value="Къща">Къща</option>
                <option value="Вила">Вила</option>
                <option value="Офис">Офис</option>
                <option value="Магазин">Магазин</option>
                <option value="Склад">Склад</option>
                <option value="Парцел">Парцел</option>
              </select>
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsConvertDialogOpen(false)}
            >
              Отказ
            </Button>
            <Button 
              onClick={handleConvertToProperty}
              disabled={convertToProperty.isPending}
            >
              {convertToProperty.isPending ? 'Създаване...' : 'Създай имот'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {sellRequests && sellRequests.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">Няма налични заявки за продажба</p>
        </div>
      )}
    </div>
  );
};

export default SellRequestsManagement; 