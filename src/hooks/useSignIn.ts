import { useAuth } from '@/hooks/useAuth';
import { useFirestore } from '@/hooks/useFirestore';
import { useCallback, useMemo } from 'react';
import { AuthError, AuthErrorCodes, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export const useSignIn = () => {
  const auth = useAuth();
  const firestore = useFirestore();

  const googleAuthProvider = useMemo(() => new GoogleAuthProvider(), []);

  const signIn = useCallback(async () => {
    const res = await signInWithPopup(auth, googleAuthProvider).catch((err: AuthError) => {
      if (err.code === AuthErrorCodes.POPUP_CLOSED_BY_USER || err.code === AuthErrorCodes.USER_CANCELLED) {
        return;
      }

      if (err.code === AuthErrorCodes.NEED_CONFIRMATION) {
        // TODO: トーストに変更
        alert(
          '既に他のプロバイダを利用してアカウントが作成されています。そちらでログイン後、設定画面から新たに別のプロバイダを紐づけることが可能です。'
        );
        return;
      }

      // TODO: トーストに変更
      if (err.code === AuthErrorCodes.USER_DISABLED) {
        alert('アカウントが停止されています。別途お問い合わせください。');
      }
    });
    if (!res) return;

    await setDoc(doc(firestore, 'users', res.user.uid), {
      uid: res.user.uid,
      providerId: res.providerId,
      provider: 'google',
      email: res.user.email,
      picture: res.user.photoURL,
    });
  }, [auth, firestore, googleAuthProvider]);

  return signIn;
};
