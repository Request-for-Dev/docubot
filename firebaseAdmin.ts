/* eslint-disable @typescript-eslint/no-var-requires */
import { getStorage } from 'firebase-admin/storage';
import { initializeApp, getApps, App, getApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const serviceKey = JSON.parse(process.env.FIREBASE_SERVICE_KEY as string);

if (!serviceKey) {
  throw new Error('Firebase service key is not defined');
}

let app: App;

if (getApps().length === 0) {
  app = initializeApp({
    credential: cert(serviceKey),
  });
} else {
  app = getApp();
}

const adminDb = getFirestore(app);
const adminStorage = getStorage(app);

export { app as adminApp, adminDb, adminStorage };
