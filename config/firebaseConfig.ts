import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCKh6N7u_aIEQOpaBy6lImVUFg4BlAT2Qo",
    authDomain: "foundit-a804f.firebaseapp.com",
    projectId: "foundit-a804f",
    storageBucket: "foundit-a804f.firebasestorage.app",
    messagingSenderId: "343895746804",
    appId: "1:343895746804:ios:2f6c518f96f6a58a3456a1" // This will be different
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);