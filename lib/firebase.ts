import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCMDWXtd6sNZ8TLwoH-bXiDJFF7ZwW6CCQ",
  authDomain: "gplant-a49ed.firebaseapp.com",
  projectId: "gplant-a49ed",
  storageBucket: "gplant-a49ed.appspot.com",
  messagingSenderId: "90999392276",
  appId: "1:90999392276:web:b7126d5bdece2f4022a3a1"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);