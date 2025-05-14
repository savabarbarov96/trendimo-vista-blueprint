
import React from 'react';
import { AuthContext, AuthProvider as BaseAuthProvider } from './auth/auth-context';
import { useAuthProvider } from './auth/use-auth-provider';

// Create the actual AuthProvider component that uses the hook
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // The issue might be related to this hook being called outside the React context
  const auth = useAuthProvider();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

// Export the useAuth hook
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
