// NOTE: import only the Firebase modules that you need in your app.
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Initialize Firebase.
// These details will need to be replaced with the project specific env vars at the start of each new cohort.
const firebaseConfig = {
  apiKey: "AIzaSyDk62AqcY0yUiDoJA6dsapBiVfMmrerVwM",
  authDomain: "tcl-39-smart-shopping-list.firebaseapp.com",
  projectId: "tcl-39-smart-shopping-list",
  storageBucket: "tcl-39-smart-shopping-list.appspot.com",
  messagingSenderId: "276515233393",
  appId: "1:276515233393:web:31fb41dbda6005b518c5d0"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
