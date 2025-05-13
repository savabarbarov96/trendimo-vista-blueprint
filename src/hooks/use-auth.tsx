
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

// Define the profile interface
interface UserProfile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: 'public' | 'authenticated' | 'agent';
  updated_at: string | null;
}

interface AuthContextProps {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null; // Add profile to the context
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Clean up any existing auth state
  const cleanupAuthState = () => {
    localStorage.removeItem('supabase.auth.token');
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        localStorage.removeItem(key);
      }
    });
  };

  // Fetch user profile
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return;
      }

      setProfile(data as UserProfile);
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        // Fetch user profile if user is logged in
        if (currentSession?.user) {
          setTimeout(() => {
            fetchUserProfile(currentSession.user.id);
          }, 0);
        } else {
          setProfile(null);
        }

        if (event === 'SIGNED_IN') {
          toast({
            title: 'Успешен вход',
            description: 'Добре дошли отново!',
          });
          // Defer data fetching to prevent deadlocks
          setTimeout(() => {
            navigate('/');
          }, 0);
        }
        
        if (event === 'SIGNED_OUT') {
          toast({
            title: 'Излязохте от профила си',
            description: 'Довиждане!',
          });
          navigate('/');
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      // Fetch profile for existing session
      if (currentSession?.user) {
        fetchUserProfile(currentSession.user.id);
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      // Clean up existing state
      cleanupAuthState();
      
      // Attempt global sign out
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continue even if this fails
      }
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        toast({
          title: 'Грешка при вход',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }
    } catch (error) {
      console.error('Error signing in:', error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      setLoading(true);
      // Clean up existing state
      cleanupAuthState();
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });
      
      if (error) {
        toast({
          title: 'Грешка при регистрация',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      } else {
        toast({
          title: 'Успешна регистрация',
          description: 'Моля, проверете електронната си поща за потвърждение.',
        });
      }
    } catch (error) {
      console.error('Error signing up:', error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      // Clean up auth state
      cleanupAuthState();
      
      // Attempt global sign out
      const { error } = await supabase.auth.signOut({ scope: 'global' });
      
      if (error) {
        toast({
          title: 'Грешка при изход',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      // Clean up existing state
      cleanupAuthState();
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      
      if (error) {
        toast({
          title: 'Грешка при вход с Google',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
    } finally {
      setLoading(false);
    }
  };

  const signInWithFacebook = async () => {
    try {
      setLoading(true);
      // Clean up existing state
      cleanupAuthState();
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
      });
      
      if (error) {
        toast({
          title: 'Грешка при вход с Facebook',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }
    } catch (error) {
      console.error('Error signing in with Facebook:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        profile,
        loading,
        signIn,
        signUp,
        signOut,
        signInWithGoogle,
        signInWithFacebook,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
