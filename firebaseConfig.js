// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBSzUi7rx9Oqgg8cfgf5klzVDiLCt_QBWzQsoSN3WX2Q",
  authDomain: "d-pr0v2.firebaseapp.com",
  projectId: "d-pr0v2",
  storageBucket: "d-pr0v2.appspot.com",
  messagingSenderId: "38800190894765",
  appId: "1:38800190549684765:web:90468f9caskicfb84eb3bcdfrud914"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
