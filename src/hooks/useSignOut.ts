import { useAuth } from './useAuth';
import { useCallback } from 'react';
import { signOut as FirebaseSignOut } from 'firebase/auth';

export const useSignOut = () => {
  const auth = useAuth();

  const signOut = useCallback(() => {
    FirebaseSignOut(auth);
  }, [auth]);

  return signOut;
};
