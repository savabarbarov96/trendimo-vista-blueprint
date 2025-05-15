import React, { useState } from 'react';
import { 
  Eye, 
  Check, 
  ChevronDown,
  Calendar,
  Home 
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
import { useToast } from '@/hooks/use-toast';
import { 
  useInquiries, 
  useMarkInquiryResponded,
  useDeleteInquiry,
  type Inquiry 
} from '@/hooks/use-inquiries';

const InquiriesManagement = () => {
  const { toast } = useToast();
  const { data: inquiries, isLoading, error } = useInquiries();
  const markResponded = useMarkInquiryResponded();
  const deleteInquiry = useDeleteInquiry();

  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [currentInquiry, setCurrentInquiry] = useState<Inquiry | null>(null);

  // Open view dialog
  const handleViewClick = (inquiry: Inquiry) => {
    setCurrentInquiry(inquiry);
    setIsViewDialogOpen(true);
  };

  // Handle mark as responded
  const handleMarkResponded = (inquiryId: string, responded: boolean) => {
    markResponded.mutate({ id: inquiryId, responded }, {
      onSuccess: () => {
        toast({
          title: responded ? "Маркирано като отговорено" : "Маркирано като неотговорено",
          description: responded 
            ? "Запитването е маркирано като отговорено."
            : "Запитването е маркирано като неотговорено.",
        });
      },
      onError: (error) => {
        toast({
          title: "Грешка при промяна на статуса",
          description: error.message,
          variant: "destructive"
        });
      }
    });
  };

  // Handle delete inquiry
  const handleDeleteInquiry = (inquiryId: string) => {
    if (confirm("Сигурни ли сте, че искате да изтриете това запитване?")) {
      deleteInquiry.mutate(inquiryId, {
        onSuccess: () => {
          toast({
            title: "Запитването е изтрито успешно",
            description: "Запитването беше премахнато от системата.",
          });
          setIsViewDialogOpen(false);
        },
        onError: (error) => {
          toast({
            title: "Грешка при изтриване на запитването",
            description: error.message,
            variant: "destructive"
          });
        }
      });
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
        <p className="text-red-500">Грешка при зареждане на запитванията: {error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Запитвания за имоти</h2>
        <p className="text-muted-foreground mt-1">
          Преглед и управление на запитвания от потенциални клиенти.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {inquiries && inquiries.map((inquiry) => (
          <Card key={inquiry.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-semibold truncate pr-2">
                  {(inquiry as any).properties?.title || "Запитване за имот"}
                </CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <ChevronDown size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleViewClick(inquiry)}>
                      <Eye size={14} className="mr-2" />
                      Преглед
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem onClick={() => handleMarkResponded(inquiry.id, !inquiry.responded)}>
                      <Check size={14} className="mr-2" />
                      {inquiry.responded ? "Маркирай като неотговорено" : "Маркирай като отговорено"}
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem 
                      onClick={() => handleDeleteInquiry(inquiry.id)}
                      className="text-red-600"
                    >
                      <Check size={14} className="mr-2" />
                      Изтрий
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription className="flex flex-wrap gap-2 mt-2">
                <Badge variant={inquiry.responded ? "default" : "secondary"}>
                  {inquiry.responded ? "Отговорено" : "Чакащо"}
                </Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">От:</span>
                  <span className="font-medium">{inquiry.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Имейл:</span>
                  <span>{inquiry.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Телефон:</span>
                  <span>{inquiry.phone}</span>
                </div>
                {inquiry.message && (
                  <div>
                    <span className="text-muted-foreground">Съобщение:</span>
                    <p className="text-xs mt-1 line-clamp-2">{inquiry.message}</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <div className="text-xs text-muted-foreground">
                Създадено на: {new Date(inquiry.created_at).toLocaleDateString('bg-BG')}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* View Inquiry Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Детайли на запитването</DialogTitle>
            <DialogDescription>
              Пълна информация за запитването относно имот.
            </DialogDescription>
          </DialogHeader>

          {currentInquiry && (
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  {(currentInquiry as any).properties?.title || "Запитване за имот"}
                </h3>
                <Badge variant={currentInquiry.responded ? "default" : "secondary"}>
                  {currentInquiry.responded ? "Отговорено" : "Чакащо"}
                </Badge>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">Имот</p>
                <div className="flex items-center">
                  <Home size={16} className="mr-2 text-muted-foreground" />
                  <p className="font-medium">{(currentInquiry as any).properties?.title || "Неизвестен имот"}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Име</p>
                  <p className="font-medium">{currentInquiry.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Имейл</p>
                  <p className="font-medium">{currentInquiry.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Телефон</p>
                  <p className="font-medium">{currentInquiry.phone}</p>
                </div>
              </div>

              {currentInquiry.message && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Съобщение</p>
                  <p className="text-sm p-3 bg-gray-50 rounded-md">{currentInquiry.message}</p>
                </div>
              )}

              <div>
                <p className="text-sm text-muted-foreground mb-1">Дата на създаване</p>
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2 text-muted-foreground" />
                  <p>{new Date(currentInquiry.created_at).toLocaleDateString('bg-BG')}</p>
                </div>
              </div>

              <div className="pt-4 flex gap-2 flex-wrap">
                <Button 
                  variant={currentInquiry.responded ? "outline" : "default"} 
                  className="gap-2"
                  onClick={() => {
                    handleMarkResponded(currentInquiry.id, !currentInquiry.responded);
                    setIsViewDialogOpen(false);
                  }}
                >
                  <Check size={16} />
                  {currentInquiry.responded ? "Маркирай като неотговорено" : "Маркирай като отговорено"}
                </Button>
                
                <Button 
                  variant="destructive" 
                  className="gap-2"
                  onClick={() => {
                    setIsViewDialogOpen(false);
                    handleDeleteInquiry(currentInquiry.id);
                  }}
                >
                  <Check size={16} />
                  Изтрий
                </Button>
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

      {inquiries && inquiries.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">Няма налични запитвания</p>
        </div>
      )}
    </div>
  );
};

export default InquiriesManagement; 