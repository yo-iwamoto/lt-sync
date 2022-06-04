import { app } from '@/lib/firebase';
import { useMemo } from 'react';
import { getAuth } from 'firebase/auth';

export const useAuth = () => {
  const auth = useMemo(() => getAuth(app), []);

  return auth;
};
