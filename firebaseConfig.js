// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBSzUi7rx9OqzVDiLCt_QBWzQsoSN3WX2Q",
  authDomain: "d-pr0v2.firebaseapp.com",
  projectId: "d-pr0v2",
  storageBucket: "d-pr0v2.appspot.com",
  messagingSenderId: "388001904765",
  appId: "1:388001904765:web:90468f9cacfb84eb3bd914"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
