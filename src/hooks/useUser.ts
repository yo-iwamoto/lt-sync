import { useAuth } from '@/hooks/useAuth';
import { User } from 'firebase/auth';
import { useEffect, useMemo, useState } from 'react';

type UseUserReturn =
  | {
      status: 'authenticated';
      user: User;
    }
  | {
      status: 'unauthenticated';
      user: null;
    }
  | {
      status: 'loading';
      user: undefined;
    };

export const useUser = () => {
  const auth = useAuth();

  const [user, setUser] = useState<User | null>();

  const status = useMemo<'authenticated' | 'unauthenticated' | 'loading'>(() => {
    switch (user) {
      case null:
        return 'unauthenticated';
      case undefined:
        return 'loading';
      default:
        return 'authenticated';
    }
  }, [user]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);

    return () => {
      unsubscribe();
    };
  }, [auth]);

  return {
    user,
    status,
  } as UseUserReturn;
};
