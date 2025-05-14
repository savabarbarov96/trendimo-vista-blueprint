
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import { Pencil, Search, Filter, MoreHorizontal, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/hooks/auth/types';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from '@/hooks/use-toast';

interface UserWithProfile extends UserProfile {
  email?: string;
  created_at?: string;
}

const Users: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState<string | undefined>(undefined);
  const [editUserDialogOpen, setEditUserDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserWithProfile | null>(null);
  const [newRole, setNewRole] = useState<UserProfile['role']>('authenticated');
  
  const queryClient = useQueryClient();

  // Fetch users with their profiles
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      // First get auth users
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) {
        toast({
          title: "Грешка при зареждане на потребителите",
          description: authError.message,
          variant: "destructive",
        });
        return [];
      }

      // Then get profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*');

      if (profilesError) {
        toast({
          title: "Грешка при зареждане на профилите",
          description: profilesError.message,
          variant: "destructive",
        });
        return [];
      }

      // Combine the data
      const combinedData = profiles.map(profile => {
        const authUser = authUsers.users.find(user => user.id === profile.id);
        return {
          ...profile,
          email: authUser?.email,
          created_at: authUser?.created_at
        };
      });

      return combinedData as UserWithProfile[];
    },
  });

  // Update user role mutation
  const updateUserRole = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: UserProfile['role'] }) => {
      const { error } = await supabase
        .from('profiles')
        .update({ role })
        .eq('id', userId);
      
      if (error) throw error;
      return { userId, role };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast({
        title: "Ролята е обновена успешно",
        description: "Потребителската роля беше променена.",
      });
      setEditUserDialogOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: "Грешка при обновяване на ролята",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const handleEditUser = (user: UserWithProfile) => {
    setCurrentUser(user);
    setNewRole(user.role);
    setEditUserDialogOpen(true);
  };

  const handleUpdateUserRole = () => {
    if (!currentUser || !newRole) return;
    
    updateUserRole.mutate({ 
      userId: currentUser.id, 
      role: newRole 
    });
  };

  // Filter users by search and role
  const filteredUsers = users?.filter(user => {
    const matchesSearch = search.trim() === '' || 
      (user.email && user.email.toLowerCase().includes(search.toLowerCase())) || 
      (user.full_name && user.full_name.toLowerCase().includes(search.toLowerCase()));
    
    const matchesRole = !selectedRole || user.role === selectedRole;
    
    return matchesSearch && matchesRole;
  });

  return (
    <div>
      <Helmet>
        <title>Управление на потребители | Trendimo Админ</title>
      </Helmet>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Управление на потребители</h1>
          <p className="text-muted-foreground">Преглед и управление на всички потребители в системата</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Търсене по име или имейл..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedRole} onValueChange={setSelectedRole}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <div className="flex items-center">
              <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{selectedRole || 'Всички роли'}</span>
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Всички роли</SelectItem>
            <SelectItem value="public">public</SelectItem>
            <SelectItem value="authenticated">authenticated</SelectItem>
            <SelectItem value="agent">agent</SelectItem>
            <SelectItem value="admin">admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Users table */}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Потребител</TableHead>
              <TableHead>Роля</TableHead>
              <TableHead>Създаден на</TableHead>
              <TableHead className="w-[80px]">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10">
                  <div className="flex justify-center items-center">
                    <Loader2 className="mr-2 h-6 w-6 animate-spin text-primary" />
                    <span>Зареждане на потребители...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10">
                  Няма намерени потребители
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{user.full_name || 'Без име'}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium 
                      ${user.role === 'admin' ? 'bg-red-100 text-red-800' : 
                      user.role === 'agent' ? 'bg-green-100 text-green-800' : 
                      user.role === 'authenticated' ? 'bg-blue-100 text-blue-800' : 
                      'bg-gray-100 text-gray-800'}`}
                    >
                      {user.role}
                    </div>
                  </TableCell>
                  <TableCell>
                    {user.created_at ? new Date(user.created_at).toLocaleDateString('bg-BG') : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Отвори меню</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Действия</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleEditUser(user)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          <span>Промени роля</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit user role dialog */}
      <Dialog open={editUserDialogOpen} onOpenChange={setEditUserDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Промяна на роля</DialogTitle>
            <DialogDescription>
              Променете ролята на потребителя {currentUser?.full_name || currentUser?.email}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-right col-span-1">Текуща роля:</span>
              <div className="col-span-3">
                <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium 
                  ${currentUser?.role === 'admin' ? 'bg-red-100 text-red-800' : 
                  currentUser?.role === 'agent' ? 'bg-green-100 text-green-800' : 
                  currentUser?.role === 'authenticated' ? 'bg-blue-100 text-blue-800' : 
                  'bg-gray-100 text-gray-800'}`}
                >
                  {currentUser?.role}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-right col-span-1">Нова роля:</span>
              <Select 
                value={newRole} 
                onValueChange={(value) => setNewRole(value as UserProfile['role'])}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Изберете роля" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">public</SelectItem>
                  <SelectItem value="authenticated">authenticated</SelectItem>
                  <SelectItem value="agent">agent</SelectItem>
                  <SelectItem value="admin">admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditUserDialogOpen(false)}>
              Отказ
            </Button>
            <Button 
              onClick={handleUpdateUserRole} 
              disabled={updateUserRole.isPending}
            >
              {updateUserRole.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Записва се...</span>
                </>
              ) : (
                <span>Запази промените</span>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Users;
