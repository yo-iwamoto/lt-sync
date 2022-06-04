import { useSignIn } from '@/hooks/useSignIn';
import { useSignOut } from '@/hooks/useSignOut';
import { useUploadFile } from '@/hooks/useUploadFile';
import { useUser } from '@/hooks/useUser';
import { useCallback, useState } from 'react';

export default function Page() {
  const { user, status } = useUser();
  const signOut = useSignOut();
  const signIn = useSignIn();

  const [file, setFile] = useState<File>();
  const upload = useUploadFile();
  const onSubmit = useCallback(() => {
    if (file === undefined) {
      return;
    }

    upload(file);
  }, [file, upload]);

  return (
    <div className='mt-10 flex justify-center gap-4'>
      {/* eslint-disable-next-line no-nested-ternary */}
      {status === 'authenticated' ? (
        <div className='flex flex-col items-center'>
          <div>
            <p>{user.displayName}</p>
          </div>
          <button type='button' className='border' onClick={signOut}>
            Sign out
          </button>

          <hr />

          <input
            type='file'
            accept='application/pdf'
            onChange={({ target: { files } }) => {
              if (files?.length === 1) {
                setFile(files[0]);
              }
            }}
          />

          <button type='button' onClick={onSubmit}>
            Upload!
          </button>
        </div>
      ) : status === 'unauthenticated' ? (
        <div className='flex justify-center gap-8'>
          <button type='button' className='border' onClick={signIn}>
            Sign in with Google
          </button>
        </div>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
}
