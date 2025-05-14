
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UsersFilterProps {
  search: string;
  setSearch: (search: string) => void;
  selectedRole: string | undefined;
  setSelectedRole: (role: string | undefined) => void;
}

const UsersFilter: React.FC<UsersFilterProps> = ({ 
  search, 
  setSearch, 
  selectedRole, 
  setSelectedRole 
}) => {
  return (
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
  );
};

export default UsersFilter;
