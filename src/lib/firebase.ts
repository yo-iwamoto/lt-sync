import { env } from '@/config/env';
import { getApp, getApps, initializeApp } from 'firebase/app';

export const app =
  getApps().length !== 0
    ? getApp()
    : initializeApp({
        apiKey: env.firebaseApiKey,
        authDomain: env.firebaseAuthDomain,
        projectId: env.firebaseProjectId,
        storageBucket: env.firebaseStorageBucket,
        appId: env.firebaseAppId,
      });
