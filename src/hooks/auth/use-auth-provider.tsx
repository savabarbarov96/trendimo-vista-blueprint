import { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { 
  signInWithEmailPassword, 
  signUpWithEmailPassword, 
  signOutUser,
  signInWithProvider
} from './auth-utils';
import { useProfile } from './use-profile';

export function useAuthProvider() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // Use the extracted profile hook
  const { profile } = useProfile(user);

  useEffect(() => {
    let mounted = true;
    let isFirstLoad = true;

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        if (!mounted) return;

        // Update state regardless of event
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        // Only show toasts and navigate on actual auth events, not initial page loads
        if (event === 'SIGNED_IN' && !isFirstLoad) {
          toast({
            title: 'Успешен вход',
            description: 'Добре дошли отново!',
          });
          // Defer navigation to prevent deadlocks
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

        // After first auth state change, mark initial load as complete
        isFirstLoad = false;
      }
    );

    // Check for existing session and persist it
    const initializeAuth = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        
        if (mounted) {
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
          
          // If we have a session, ensure it's refreshed
          if (currentSession?.user) {
            await supabase.auth.refreshSession();
          }
          
          setLoading(false);
          isFirstLoad = false;
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    // Refresh session periodically to keep it alive
    const refreshInterval = setInterval(async () => {
      if (session?.user) {
        try {
          await supabase.auth.refreshSession();
        } catch (error) {
          console.error('Error refreshing session:', error);
        }
      }
    }, 10 * 60 * 1000); // Refresh every 10 minutes

    return () => {
      mounted = false;
      subscription.unsubscribe();
      clearInterval(refreshInterval);
    };
  }, [navigate]);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInWithEmailPassword(email, password);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    setLoading(true);
    try {
      await signUpWithEmailPassword(email, password, fullName);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await signOutUser();
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      await signInWithProvider('google');
    } finally {
      setLoading(false);
    }
  };

  const signInWithFacebook = async () => {
    setLoading(true);
    try {
      await signInWithProvider('facebook');
    } finally {
      setLoading(false);
    }
  };

  return {
    session,
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    signInWithFacebook,
  };
}
