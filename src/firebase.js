import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  // Replace with your Firebase config
  apiKey: "AIzaSyDWQXjelHaekwzkqEhrAzNhHKX4gpgAMlE",
  authDomain: "personal-portfolio-f9c92.firebaseapp.com",
  projectId: "personal-portfolio-f9c92",
  storageBucket: "personal-portfolio-f9c92.firebasestorage.app",
  messagingSenderId: "962733443654",
  appId: "1:962733443654:web:9c7e5ac1789a17df639847"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage }; 