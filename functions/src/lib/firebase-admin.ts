import { env } from '../config/env';
import { cert, getApp, getApps, initializeApp } from 'firebase-admin/app';

export const app =
  getApps().length !== 0
    ? getApp()
    : initializeApp({
        credential: cert({
          projectId: env.projectId,
          privateKey: env.privateKey.replace(/\\n/g, '\n'),
          clientEmail: env.clientEmail,
        }),
      });
