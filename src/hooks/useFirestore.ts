import { app } from '@/lib/firebase';
import { getFirestore } from 'firebase/firestore';
import { useMemo } from 'react';

export const useFirestore = () => {
  const firestore = useMemo(() => getFirestore(app), []);

  return firestore;
};
