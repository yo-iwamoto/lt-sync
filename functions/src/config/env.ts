import { functions } from '../lib/firebase-functions';

export const env = {
  projectId: functions.config().monju.project_id as string,
  privateKey: functions.config().monju.private_key as string,
  clientEmail: functions.config().monju.client_email as string,
};
