import { getStorage } from 'firebase/storage';
import { useMemo } from 'react';

export const useStorage = () => {
  const storage = useMemo(() => getStorage(), []);

  return storage;
};
