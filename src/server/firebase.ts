import { env } from '@/config/env';
import { serverEnv } from '@/server/env';
import { cert, getApp, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const app =
  getApps().length !== 0
    ? getApp()
    : initializeApp({
        credential: cert({
          projectId: env.firebaseProjectId,
          privateKey: serverEnv.firebasePrivateKey.replace(/\\n/g, '\n'),
          clientEmail: serverEnv.firebaseClientEmail,
        }),
      });

export const firestore = () => getFirestore(app);
