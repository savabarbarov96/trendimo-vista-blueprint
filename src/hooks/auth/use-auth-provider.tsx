
import { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
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
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        if (event === 'SIGNED_IN') {
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
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
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
