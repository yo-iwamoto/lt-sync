import { useStorage } from './useStorage';
import { useUser } from '@/hooks/useUser';
import { useCallback, useMemo } from 'react';
import { ref, uploadBytes } from 'firebase/storage';

export const useUploadFile = () => {
  const { user } = useUser();
  const storage = useStorage();

  const storageRef = useMemo(() => {
    if (!user) {
      return null;
    }

    return ref(storage, `uploads/${user.uid}/${new Date().getTime().toString()}`);
  }, [storage, user]);

  const upload = useCallback(
    (file: File) => {
      if (storageRef !== null) {
        console.log(file);
        console.log(file instanceof File);
        uploadBytes(storageRef, file);
      }
    },
    [storageRef]
  );

  return upload;
};
