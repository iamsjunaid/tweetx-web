// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDYYjiVZcG4_JnM0z34fydZbcbm3UqwECY',
  authDomain: 'tweetx-webapp.firebaseapp.com',
  projectId: 'tweetx-webapp',
  storageBucket: 'tweetx-webapp.appspot.com',
  messagingSenderId: '979207486714',
  appId: '1:979207486714:web:657c9cdb0ea065497f9d43',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default db = getFirestore(app);
