
export interface UserProfile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: 'public' | 'authenticated' | 'agent';
  updated_at: string | null;
}
