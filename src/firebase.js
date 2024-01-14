import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDYYjiVZcG4_JnM0z34fydZbcbm3UqwECY',
  authDomain: 'tweetx-webapp.firebaseapp.com',
  projectId: 'tweetx-webapp',
  storageBucket: 'tweetx-webapp.appspot.com',
  messagingSenderId: '979207486714',
  appId: '1:979207486714:web:657c9cdb0ea065497f9d43',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
