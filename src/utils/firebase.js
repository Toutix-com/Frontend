// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAFjl0rM2CSVlyhTN_CBs-VgGKI35SpidQ',
  authDomain: 'toutix.firebaseapp.com',
  projectId: 'toutix',
  storageBucket: 'toutix.appspot.com',
  messagingSenderId: '899408628232',
  appId: '1:899408628232:web:c43523b9715c65af371fbd',
  measurementId: 'G-B09ELEKHML'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { app, analytics, auth, storage };
