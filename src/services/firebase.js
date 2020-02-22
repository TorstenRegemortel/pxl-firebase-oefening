import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/database';

const {
  REACT_APP_API_KEY,
  REACT_APP_AUTH_DOMAIN,
  REACT_APP_DATABASE_URL,
  REACT_APP_PROJECT_ID,
  REACT_APP_STORAGE_BUCKET,
  REACT_APP_MESSAGING_SENDER_ID
} = process.env;

const config = {
  apiKey: REACT_APP_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  databaseURL: REACT_APP_DATABASE_URL,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_MESSAGING_SENDER_ID
};

const app = firebase.initializeApp(config);

export const auth = app.auth();

export const firestore = app.firestore();

export const storage = app.storage();
export const database = app.database();

export const resolveFirestoreError = errorCode => {
  switch (errorCode) {
    case 'not-found':
      return 'De opgevraagde data bestaat niet';
    case 'already-exists':
      return 'Het document bestaat al';
    case 'permission-denied':
      return 'Je hebt geen rechten om deze operatie uit te voeren';
    default:
      return 'Er is een onverwachte fout gebeurt.';
  }
};
