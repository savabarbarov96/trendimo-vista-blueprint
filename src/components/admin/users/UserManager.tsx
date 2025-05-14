
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/hooks/auth/types';
import { UserWithProfile, AuthUser } from '@/components/admin/users/types';
import { toast } from '@/hooks/use-toast';
import UsersFilter from '@/components/admin/users/UsersFilter';
import UsersList from '@/components/admin/users/UsersList';
import EditUserDialog from '@/components/admin/users/EditUserDialog';

const UserManager: React.FC = () => {
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

      // Combine the data with explicit typing
      const combinedData = profiles.map(profile => {
        const authUser = (authUsers.users as AuthUser[]).find(user => user.id === profile.id);
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
    <>
      {/* Filters */}
      <UsersFilter 
        search={search}
        setSearch={setSearch}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
      />

      {/* Users table */}
      <UsersList 
        users={filteredUsers}
        isLoading={isLoading} 
        onEditUser={handleEditUser} 
      />

      {/* Edit user role dialog */}
      <EditUserDialog 
        open={editUserDialogOpen}
        onOpenChange={setEditUserDialogOpen}
        currentUser={currentUser}
        newRole={newRole}
        setNewRole={setNewRole}
        onUpdate={handleUpdateUserRole}
        isUpdating={updateUserRole.isPending}
      />
    </>
  );
};

export default UserManager;
